---
title: "Training Sparse Autoencoders That Produce Useful Features"
date: 2025-11-26T00:00:00Z
lastmod: 2025-11-26T00:00:00Z
draft: false
description: "A training-first interpretability write-up with Llama-3.1-8B-Instruct case study and practical failure-mode blueprint"
author: ["H.T"]
categories: ["Educational"]
ShowToc: true
mathjax: true
---

# Training Sparse Autoencoders That Produce Useful Features  

Interpretability has a tooling problem that’s more basic than “better theory”: **training**.  
A lot of teams can *run* an SAE repo, but far fewer can train SAEs that reliably produce **useful, discriminable features**: features that survive input shifts, don't collapse into redundancy, and don't turn labeling into a game of repeated generic phrases.

This post is a training-first write-up meant to make SAE training *more accessible and less mystical*. It focuses on what actually breaks in practice (hooks, data, capacity allocation, redundancy), how to evaluate without fooling yourself, and one concrete case study: **a multi-layer sweep on Llama-3.1-8B-Instruct** where the metrics make the central point vividly:

> **You can “win” reconstruction and still lose interpretability.**

---

## Why SAE training is the bottleneck

SAEs are one of the few techniques that can turn “model internals” into something closer to a coordinate system: you get sparse feature activations per token, you can compare features across runs, and you can attempt interventions (steer/suppress) in a way that’s measurable.

But the field has an uncomfortable reality: **training is fragile**. A surprising fraction of "bad SAEs" are not failures of the objective: they're failures of *plumbing*. Wrong tensor. Wrong hook. Bad activation scaling. Silent dtype issues. Activation collection that is subtly corrupted or non-stationary.

That fragility is why interpretability often devolves into what *looks* mechanistic but isn’t: post-hoc pattern matching, stories that fit the examples, and explanations that collapse under broader evaluation. If we want interpretability to scale beyond a small circle of experts, we need training write-ups that make the hidden failure modes legible.

That's the goal here: treat SAE training like engineering (run cards, evaluation discipline, and explicit failure taxonomy) so that "training an SAE" becomes a repeatable skill rather than folklore.

---

## What SAE training optimizes

An SAE is a learned dictionary over a chosen activation space. You freeze the base model, pick a representation location (layer + hook point), and train two maps:

- an **encoder** that turns activations into sparse feature coefficients  
- a **decoder** that reconstructs activations from those coefficients

The training objective is always some version of:

> minimize reconstruction error **subject to** sparsity

The sparsity mechanism matters because it changes the failure modes. If you enforce Top-K sparsity, you remove ambiguity about "how sparse" the code is (great), but you also make it easier to get **deceptively good** results: the SAE can reconstruct extremely well while learning redundant directions, wasting capacity, or producing features that are not stable enough to be called "mechanisms."

This is where the “not mechanistic” critique lands in practice. Many explanations look clean until you broaden evaluation: change the input form, the domain, the phrasing, the task. Features that felt like crisp concepts become basis-dependent and polysemantic. Even interventions can confirm the *story* while not isolating the *computation* if you’re not careful about off-manifold effects.

So the discipline is: **call it mechanistic only after it survives evaluation.**  
SAEs help because they give you handles; they don’t absolve you from measurement.

---

## Tooling landscape

When people say "I trained an SAE," they often mean "I got FVU to look reasonable once." In practice you need a *stack*: one tool that makes training iteration fast, one that makes hard runs stable (activation logistics are the real bottleneck), and one that forces you to evaluate *usefulness* rather than worship a single reconstruction scalar. The three tools below map cleanly onto those roles.

### SAE Bench

Repo: https://github.com/adamkarvonen/SAEBench **<u>[[1]](#ref-1)</u>**

SAE Bench exists for the moment you have *multiple plausible SAEs* and you need to justify which one is worth building on. It's deliberately opinionated: instead of letting you hide behind one proxy metric, it pushes you to look at a portfolio of evaluations that include reconstruction and sparsity proxies but also downstream-relevant tests (e.g., whether features are absorbed/redundant, whether certain interpretability/utility behaviors hold up, etc.). That matters because "loss recovered is high" is not the same as "this dictionary produces useful, stable features." **<u>[[1]](#ref-1)</u>**

Where it shines is *selection and discipline*. If you have two Top-K runs (one that reconstructs slightly better and one that reconstructs slightly worse) but you suspect the "better" one is riddled with redundancy (high absorption) and brittle features, SAE Bench is the tool that makes that suspicion legible and defensible. It won't fix your training loop, and it won't tell you **why** a run collapsed; it tells you **what** failed and forces you to stop guessing. That separation is healthy: training frameworks should focus on stable activation→SAE optimization, while evaluation should punish self-deception.

A good mental model: SAE Bench is what you run *after* you can produce candidates reliably, and *before* you spend days doing feature discovery, labeling, and dashboards on a dictionary that will later embarrass you. **<u>[[2]](#ref-2)</u>**

---

### Sparsify

Repo: https://github.com/EleutherAI/sparsify **<u>[[3]](#ref-3)</u>**

Sparsify is the thing you reach for when you want to get a k-sparse SAE training loop running quickly on HuggingFace models, with sensible defaults and a workflow that encourages fast iteration. It's the "I need signal this afternoon" option, great for early sweeps over context length, latent count/expansion, sparsity level (K), and learning-rate stability, especially when you're still mapping the terrain of a model family.

The upside is speed-to-first-result: you can explore whether a layer is even a sane target and whether your chosen sparsity regime is viable without building a bespoke activation-buffering pipeline from scratch. The downside shows up when runs become expensive: large models, strict reproducibility requirements, complex activation extraction, multi-stage buffering, or any scenario where the *activation pipeline* (not the SAE math) is where bugs and instabilities hide. At that point "quick" frameworks can feel like driving a race car with the hood welded shut: you can go fast, but when something smells off, you want more instrumentation and control.

A practical example: Sparsify is ideal for the first pass where you discover that "late layers give me great reconstruction but terrible feature utility," or that "this layer/hook point quietly produces garbage activations." Once you've learned those constraints, you usually graduate to a framework that makes activation logistics explicit.

---

### Dictionary Learning

Repo: https://github.com/saprmarks/dictionary_learning **<u>[[4]](#ref-4)</u>**

If Sparsify is for speed, `dictionary_learning` is for *owning the run*. This is the regime where you stop pretending SAE training is "just another PyTorch loop" and admit the truth: you're doing **dictionary learning on a streaming distribution of model activations**, and the engineering details decide whether the science is real.

The core advantage is controllability. You can structure activation buffering explicitly, decouple tiny LLM batch sizes from stable SAE optimization batches, and build "run cards" that actually let you reproduce results. When you're training on bigger models or doing careful layer/hook-point work, this kind of explicit pipeline tends to be more reliable because it surfaces the real failure modes: wrong tensor, silent dtype issues, activation normalization drift, OOM-driven truncation, cache corruption, and other problems that otherwise masquerade as "the SAE just didn't learn."

The cost is setup overhead and responsibility: you're closer to the metal, which means you own more decisions. That's exactly what you want when you're running the kind of experiments that will later become a blog post, a benchmark claim, or a product primitive, because "it worked on my machine once" is not a training story, it's a coincidence.

A useful framing: `dictionary_learning` is what you use when you already know the training *should* work and you're no longer willing to accept silent failures as "research variance." It's the tool you choose when you care about deterministic artifacts, debuggability, and long runs where the activation pipeline has to behave like production infrastructure. **<u>[[4]](#ref-4)</u>**

---

## Data choices: generic vs domain-specific

Most teams start with generic text. That’s not wrong. Generic corpora are diverse, reduce overfitting to one domain’s formatting, and tend to produce broadly reusable features.

But if you care about finance-facing interpretability, there’s a recurring practical issue: **finance occupies a distinct activation submanifold** (entities/tickers, ratios, guidance language, event phrasing, accounting verbs, numeric structures). If the SAE never sees that manifold during training, it may allocate dictionary capacity elsewhere and you end up “discovering finance features” that are weaker, less stable, or dominated by surface artifacts.

That’s where **domain-mixture SAEs** become useful: you train on a controlled mixture of generic + finance text so the dictionary is forced to allocate stable capacity to finance structures without collapsing into finance-only shortcuts.

Two cautions keep this idea honest:

First, domain-mixture is not about “making reconstruction better” on paper. It’s about *feature usefulness* under the distribution you actually care about.

Second, you don’t want to publish “exact best mixes” as if there’s one magic ratio. What matters is the principle: **guaranteed exposure to the target manifold**, verified by evaluation on both generic and finance sets.

---

## Evaluation that doesn't lie

A training run is only as good as the evaluation discipline around it. The most robust pattern is the one you already implemented:

> compute metrics **per dataset** using real activations from that dataset

You evaluate at least two distributions:

- an **in-sample / training-like** proxy (the kind of text you trained on)
- an **out-of-sample** dataset that differs in domain or task (to test generalization)

The metrics that matter most in practice:

**Loss recovered / FVU (reconstruction proxy).**  
Necessary, but not sufficient. High reconstruction can be achieved with redundant dictionaries that are interpretability-poor.

**Dead feature rate.**  
Useful only if calibrated to token budget and a principled deadness threshold. If “dead = 0%” appears in every run, it’s usually telling you more about your measurement definition than your model.

**Feature absorption (decoder weight correlation / redundancy).**  
This is the metric that often predicts downstream pain: repeated labels, generic descriptions, low discriminability, and “everything looks like earnings / punctuation / generic reasoning.”

**Out-of-sample deltas.**  
If in-sample looks great but OOS collapses, you learned a basis that is too distribution-tied (or you accidentally trained on formatting artifacts).

One additional evaluation category matters if you want to claim anything mechanistic:

**stability checks** (seed stability, paraphrase stability, drift readiness).  
A feature that cannot survive small perturbations is not a handle: it's a mirage. The EleutherAI write-up on seed similarity **<u>[[5]](#ref-5)</u>** is a good example of how to think about this stability layer.

---

## Example

This case study is included because it compresses the core lesson into one table. You trained SAEs across multiple layers of **Llama-3.1-8B-Instruct**, evaluated on an in-sample proxy and an out-of-sample dataset, and saw something that’s easy to miss if you only watch reconstruction:

> **a run can look “excellent” and still be unusable for interpretability**

Here is the training-centric summary (pattern is the point):

<table style="border-collapse: collapse; width: 100%; border: 1px solid #000;">
<thead>
<tr style="border: 1px solid #000;">
<th style="border: 1px solid #000; padding: 8px; text-align: center;">Layer</th>
<th style="border: 1px solid #000; padding: 8px; text-align: center;">Latents</th>
<th style="border: 1px solid #000; padding: 8px; text-align: center;">Loss recovered</th>
<th style="border: 1px solid #000; padding: 8px; text-align: center;">L0 sparsity</th>
<th style="border: 1px solid #000; padding: 8px; text-align: center;">Dead features</th>
<th style="border: 1px solid #000; padding: 8px; text-align: center;">Absorption</th>
<th style="border: 1px solid #000; padding: 8px; text-align: center;">What it implies</th>
</tr>
</thead>
<tbody>
<tr style="border: 1px solid #000;">
<td style="border: 1px solid #000; padding: 8px; text-align: center;">4</td>
<td style="border: 1px solid #000; padding: 8px; text-align: center;">1200</td>
<td style="border: 1px solid #000; padding: 8px; text-align: center;">97.7%</td>
<td style="border: 1px solid #000; padding: 8px; text-align: center;">~298</td>
<td style="border: 1px solid #000; padding: 8px; text-align: center;">67.7%</td>
<td style="border: 1px solid #000; padding: 8px; text-align: center;">0.395</td>
<td style="border: 1px solid #000; padding: 8px;">Deceptively good: high recon, wasted capacity, redundant basis</td>
</tr>
<tr style="border: 1px solid #000;">
<td style="border: 1px solid #000; padding: 8px; text-align: center;">10</td>
<td style="border: 1px solid #000; padding: 8px; text-align: center;">400</td>
<td style="border: 1px solid #000; padding: 8px; text-align: center;">92.8%</td>
<td style="border: 1px solid #000; padding: 8px; text-align: center;">~115</td>
<td style="border: 1px solid #000; padding: 8px; text-align: center;">40.8%</td>
<td style="border: 1px solid #000; padding: 8px; text-align: center;">0.286</td>
<td style="border: 1px solid #000; padding: 8px;">Still deceptively good: fewer issues, but deadness dominates</td>
</tr>
<tr style="border: 1px solid #000;">
<td style="border: 1px solid #000; padding: 8px; text-align: center;">19</td>
<td style="border: 1px solid #000; padding: 8px; text-align: center;">400</td>
<td style="border: 1px solid #000; padding: 8px; text-align: center;">70.3%</td>
<td style="border: 1px solid #000; padding: 8px; text-align: center;">~167</td>
<td style="border: 1px solid #000; padding: 8px; text-align: center;">19.5%</td>
<td style="border: 1px solid #000; padding: 8px; text-align: center;">0.264</td>
<td style="border: 1px solid #000; padding: 8px;">Healthiest tradeoff in this sweep</td>
</tr>
<tr style="border: 1px solid #000;">
<td style="border: 1px solid #000; padding: 8px; text-align: center;">28</td>
<td style="border: 1px solid #000; padding: 8px; text-align: center;">400</td>
<td style="border: 1px solid #000; padding: 8px; text-align: center;">0.0%</td>
<td style="border: 1px solid #000; padding: 8px; text-align: center;">~194</td>
<td style="border: 1px solid #000; padding: 8px; text-align: center;">~1%</td>
<td style="border: 1px solid #000; padding: 8px; text-align: center;">0.281</td>
<td style="border: 1px solid #000; padding: 8px;">Collapse / failure (treat as debugging first)</td>
</tr>
</tbody>
</table>

Two observations are worth lingering on.

First, **layer 4 is the trap**. The reconstruction number screams "success," but the health metrics scream "this dictionary is not allocating capacity well." High deadness means most latents never became useful. High absorption means the latents that *did* become active are too correlated, so you pay for a big dictionary and get many near-duplicates. That is exactly the regime where labeling becomes repetitive and "useful features" are hard to extract.

Second, **layer 19 looks worse on reconstruction and better on usefulness**. This is counterintuitive until you internalize that we aren't training compression: we're training a basis. A slightly worse reconstruction number can be a better sign if it comes with lower redundancy and less wasted capacity, and if it generalizes more cleanly across distributions.

Finally, **layer 28’s total failure should not be romanticized**. A “0% recovered” result is usually a debugging event before it’s a scientific conclusion. Wrong hook point, dtype mismatch, broken normalization, or activation extraction instability can all produce collapse while still yielding superficially plausible logs elsewhere.

For reproducibility trail / artifacts, the W&B links you already recorded are worth including directly:

- Llama-8B SAE run: https://wandb.ai/tatsatx-university-of-california-berkeley/sparsify/runs/mooez4dp  
- Another SAE run (Gemma reference run you cited): https://wandb.ai/tatsatx-university-of-california-berkeley/sparsify/runs/2o0is5n0  

Even if readers can’t replicate your environment exactly, these artifacts make the discussion falsifiable: they can inspect curves, plateaus, and logged metrics rather than relying on narrative.

---

## Failure-mode blueprint

Over time, SAE training outcomes fall into a small set of recognizable buckets. Naming them helps teams stop arguing about one metric and start debugging the right thing.

A **good** run is boring: reconstruction is adequate, redundancy is controlled, deadness is meaningful (not frozen at 0 or 70), and out-of-sample doesn’t crater.

A **deceptively good** run is where most teams get stuck: reconstruction is fantastic, but the dictionary is either wasting capacity (high deadness) or learning duplicates (high absorption). These runs often produce repeated, generic labels and unstable features.

A **dead** run is one where latents don’t fire in practice. Sometimes this is real; often it’s a capacity/sparsity mismatch. Sometimes it’s a measurement bug.

A **duplicated** run is one where the dictionary is “alive,” but it’s alive in the worst way: many latents are slight variants of the same direction. High absorption and repeated labels are the hallmark.

A **collapsed/noisy** run is one where metrics are nonsensical or reconstruction falls to zero. Treat these like engineering failures first: verify hooks, activation finiteness, dtype, scaling, and whether training updates are actually applied.

The point of this blueprint is safety: it keeps you from shipping interpretability stories that don't survive evaluation. It also keeps you from wasting compute "tuning hyperparameters" when the real issue is you hooked the wrong tensor.

---

## Reporting standards

If you want SAE training to become accessible, the reporting standard needs to be higher than “FVU looks good.” The minimum bar for publishable training claims is:

- a Run Card that makes replication *conceptually possible* (even if exact data schedules remain private),
- evaluation on at least one out-of-sample distribution,
- redundancy and capacity allocation metrics (absorption + deadness),
- and at least one stability check if you want to use the word “mechanistic.”

What I’d change next is not a secret hyperparameter. It’s stricter discipline:

I would treat **absorption** as a first-class constraint, because it predicts labeling pain and feature non-usefulness more consistently than reconstruction alone.

I would harden **deadness measurement** so it stops being constant. If deadness is always 0% or always huge, your definition is not aligned to token budget. A metric that doesn't move when conditions change is not a metric: it's decoration.

And I would make **out-of-sample evaluation early** a habit, because it catches the most expensive failure: “trained a dictionary that’s really good at reconstructing the training template.”

---

## References {#references}

- <a id="ref-1"></a>**1. Adam Karvonen et al.** — [SAEBench](https://github.com/adamkarvonen/SAEBench) (GitHub)  
- <a id="ref-2"></a>**2. SAE Bench** — [sae-bench on PyPI](https://pypi.org/project/sae-bench/) (PyPI)  
- <a id="ref-3"></a>**3. EleutherAI** — [Sparsify](https://github.com/EleutherAI/sparsify) (GitHub)  
- <a id="ref-4"></a>**4. Saprmarks** — [Dictionary Learning](https://github.com/saprmarks/dictionary_learning) (GitHub)  
- <a id="ref-5"></a>**5. EleutherAI** — [_SAE seed similarity_](https://blog.eleuther.ai/sae_seed_similarity/) (blog post)  

---


