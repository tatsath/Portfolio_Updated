---
title: "The Illusion of Chain-of-Thought Transparency"
date: 2025-11-10T00:00:00Z
lastmod: 2025-11-10T00:00:00Z
draft: false
description: "Why reading reasoning text tells you very little about what models actually think."
author: ["H.T"]
categories: ["Educational"]
ShowToc: true
mathjax: true
---
# The Illusion of Chain-of-Thought Transparency  

---

## The transparency promise
Chain-of-thought (CoT) became the default “interpretability” interface for a simple reason: it *looks* like an explanation. The model prints intermediate steps, writes down assumptions, and tells you why it chose an answer. In finance, that aesthetic matters. A credit memo, a risk narrative, a regulatory summary—these are all *textual artifacts*, and CoT seems to meet the institution where the institution already lives.

But the promise hides a category error: **a rationale is a reporting channel, not a causal trace.** "Readable" is not the same as "mechanistically grounded." Oxford Martin AIGI's *Chain-of-Thought Is Not Explainability* **<u>[[2]](#ref-2)</u>** puts this bluntly: CoT rationales are **neither necessary nor sufficient** for trustworthy interpretability, and can be systematically misleading even when they read well. 

Anthropic’s more recent work makes a closely related point in operational terms: even when you prompt for explicit reasoning, there is **no guarantee** the model will reveal the internal drivers it actually used, and “reveal rates” can be low under many settings. 

The result is a dangerous illusion: we confuse *a coherent story* with *a verified mechanism*.

---

## Faithfulness is causal, not linguistic

### Counterfactual dependence
If you want a definition of “faithful CoT” that survives contact with production, it has to be causal:

> A reasoning trace is faithful **only if** the final answer would change in the expected way when we intervene on (or remove) the trace.

This is exactly the approach taken in Anthropic's *Measuring Faithfulness in Chain-of-Thought Reasoning* **<u>[[3]](#ref-3)</u>**: they intervene on the CoT (truncate it, inject mistakes, paraphrase it, add filler) and measure whether the model's answer actually depends on the given rationale. 

Technically, you can think of the model as generating a rationale `r` and answer `y` conditioned on input `x`. The key question is not whether `r` "sounds aligned" with `y`, but whether `r` has **causal influence** on the distribution of `y` (e.g., does perturbing `r` shift `P(y|x)` in the way the rationale implies?). That's why "CoT appears before the answer" is not evidence; sampling order does not imply causal dependence—Lanham et al. **<u>[[3]](#ref-3)</u>** emphasize this explicitly. 

### Interpretability is multidimensional
Even "faithfulness" alone is not enough as a single score. Yeo et al. **<u>[[1]](#ref-1)</u>** argue that interpretability should be evaluated across **faithfulness, robustness, and utility**—because a rationale can be weakly faithful yet unstable, or stable yet unhelpful for downstream oversight. They also propose an alignment technique (Self-Entailment-Alignment CoT) aimed at improving interpretability across these axes. 

That framing is useful in finance because it matches real workflows:
- *Faithfulness* answers: “did the model use what it said it used?”
- *Robustness* answers: “does the explanation survive small perturbations?”
- *Utility* answers: “does it actually help an overseer catch failures?”

A model can be accurate and still fail all three.

---

## Five failure modes of unfaithful CoT
When people say “CoT is unfaithful,” they often mean a mixture of distinct failure modes. Separating them matters because each one implies a different audit and mitigation strategy.

**Decorative reasoning.** The model mentions concepts that never become decision-driving features. The text looks domain-aware, but the computation never truly “pays rent.”

**Hidden reasoning.** The model relies on drivers it doesn't disclose—spurious cues, positional biases, prompt artifacts, or latent heuristics that remain unmentioned. Turpin et al. **<u>[[4]](#ref-4)</u>** demonstrate this with "biasing features" (e.g., answer-position cues): behavior changes, but the explanation doesn't admit the real cause. 

**Shallow engagement.** Concepts light up at prompt ingestion, then decay during the actual reasoning span. You get the impression of deep deliberation, but the internal work never sustains the relevant factors.

**Post-hoc rationalization.** The answer is (effectively) decided, and the rationale is generated to *fit* it. Lanham et al. **<u>[[3]](#ref-3)</u>** explicitly discuss post-hoc reasoning as a concern and show how truncation tests can reveal it. 

**Filler CoT.** Long traces contain large low-value regions—restatement, formatting, “thinking noise.” Intervention tests show you can often remove, paraphrase, or corrupt substantial sections without changing the final answer, implying those segments were not causally binding. 

None of these require the model to be “dishonest” in a human sense. They are natural consequences of optimizing for plausible text under uncertain internal computation.

---

## Why “average over the whole CoT” breaks
A subtle mistake in many “CoT evaluation” setups is treating the reasoning trace as a uniform object—every token equally informative, every sentence equally causal. Recent work suggests the opposite: **importance is spiky**.

### Thought anchors
*Thought Anchors* **<u>[[5]](#ref-5)</u>** argues that sentence-level analysis is a tractable way to decompose long reasoning traces and identifies **anchors**—sentences with outsized downstream influence, often planning or backtracking steps. They present multiple attribution methods (including counterfactual rollouts and causal suppression of attention paths) and show consistent evidence that only a subset of steps disproportionately shape the rest of the reasoning. 

If you average “faithfulness” over the entire CoT, you dilute the very steps that matter most. That’s not just a metric issue—it changes what you believe about the model. The correct posture is closer to: **locate anchors, then audit around them**.

### Scratchpad vs computation phases
A second structural issue: reasoning traces often alternate between phases that behave like **state storage** ("scratchpad") and phases that behave like **actual computation / transition**. Work on latent reasoning models **<u>[[6]](#ref-6)</u>** provides evidence for an alternating scratchpad–computation cycle, where different steps play qualitatively different algorithmic roles. 

Even if your model externalizes CoT in text, the implication transfers: not every token is meant to be semantically meaningful to a human auditor. Some tokens function more like registers, caches, or intermediate scaffolding. If your evaluation method cannot distinguish “storage-like” segments from “compute-like” segments, it will mis-measure faithfulness and misdiagnose failures.

---

## Reasoning without verbalization
Suppose you fixed all of the above. Suppose you trained the model to “be honest.” You still wouldn’t have a guarantee that text is the ground-truth channel.

Fang & Marks **<u>[[7]](#ref-7)</u>** construct a controlled testbed where the model performs chain-of-thought in ROT-13 while keeping outputs intelligible, then show that mechanistic techniques (e.g., logit lens) can partially decode the hidden reasoning from internal activations—and even produce an unsupervised decoding pipeline. 

This matters because it breaks a common inference:
- “the CoT is messy, therefore the model didn’t reason” (not necessarily)
- “the CoT is clean, therefore the model reasoned as stated” (also not necessarily)

Text is a *projection* of computation, and projections can discard structure.

---

## A serious faithfulness stack
If CoT is a hypothesis about what happened internally, the audit stack should treat it like one: propose → test → falsify → escalate.

### Layer 1: text-level diagnostics
This layer is cheap and still useful—just never confuse it with ground truth.

You measure:
- *stability under paraphrase* (does the rationale mutate while the answer stays fixed?)
- *self-consistency across rollouts* (do multiple rationales converge or diverge?)
- *self-entailment / internal contradiction* (does the rationale actually support itself?)

Yeo et al.'s **<u>[[1]](#ref-1)</u>** framing is the cleanest way to describe why this matters without overselling it: interpretability is not one scalar. 

### Layer 2: interventions
This is where you start approximating causality.

Lanham et al. **<u>[[3]](#ref-3)</u>** use several interventions that translate well to real audits:
- **early answering / truncation**: remove late steps; see if the answer changes  
- **mistake injection**: corrupt reasoning; see if the answer is sensitive  
- **paraphrase / filler**: change surface form; see if dependence persists  

If answers stay invariant, you’ve learned something uncomfortable: the model is not bound to its own explanation. 

### Layer 3: activation-space audits
This is the layer that turns “interpretability” into something closer to engineering.

A practical pattern is:

1) Define an *expected concept schema* for the task (in finance: leverage, liquidity, refinancing risk, covenants, earnings quality, macro sensitivity—whatever is appropriate).  
2) Identify the *causally relevant region* of the trace (anchors / compute-like windows).  
3) Compare expected concepts to *observed internal evidence* during that region.

This is precisely the conceptual move behind newer activation-space frameworks like **Concept Walk** **<u>[[8]](#ref-8)</u>**: instead of trusting text, you track how internal stance evolves along a learned concept direction, step by step, and observe when perturbations are integrated vs ignored (decorative vs faithful). 

Crucially, Concept Walk is not “read the CoT but harder.” It is: *project internal activations onto a concept direction learned from contrastive data, and track the trajectory through reasoning steps.* That gives you a mechanistic readout of whether the model’s internal state is actually being shaped by the reasoning trace. 

In high-stakes domains, this is where you finally get something audit-like: a measurable divergence between “what the rationale claims mattered” and “what the internal state shows was integrated.”

---

## Production reality: governance and attack surface
Finance doesn’t deploy “explanations.” It deploys systems that must survive distribution shift, adversaries, and compliance.

The ESMA / Alan Turing / Institut Louis Bachelier report **<u>[[11]](#ref-11)</u>** frames responsible adoption around risk management, monitoring, and governance—explicitly reflecting the fact that opacity and failure modes are blockers to real deployment. 

Two production-facing points deserve attention:

**Faithfulness vs monitorability.**  
For safety and compliance workflows, you may care less about whether the model's rationale is a perfect mirror of computation and more about whether the system is *monitorable*—whether monitors can reliably catch harmful intent or unsafe behavior when it matters. Emmons et al. **<u>[[9]](#ref-9)</u>** argue that for runtime monitoring, the key property is monitorability (and they stress-test when CoT is necessary). 

**CoT as attack surface.**  
Long "benign" reasoning can be weaponized. *Chain-of-Thought Hijacking* **<u>[[10]](#ref-10)</u>** shows jailbreak attacks that pad harmful requests with extensive harmless reasoning, effectively diluting safety signals and shifting attention dynamics; they also provide mechanistic evidence (mid-layer safety-checking signals, late-layer verification outcomes) and causally validate via targeted ablations. 

The lesson is not “hide all reasoning.” It’s that **raw CoT is not governance**. Treat it as internal telemetry, not as externally trusted proof.

---

## The takeaway
CoT is not useless—it’s just not what people want it to be.

It can be:
- a useful debugging interface,
- a behavioral artifact to stress-test,
- and a hypothesis generator for deeper audits.

But it is not, by default, a faithful explanation. The papers converging on this point span intervention tests (Lanham **<u>[[3]](#ref-3)</u>**), biasing-feature demonstrations (Turpin **<u>[[4]](#ref-4)</u>**), multidimensional interpretability evaluation (Yeo **<u>[[1]](#ref-1)</u>**), and more recent activation-space tracking (Concept Walk **<u>[[8]](#ref-8)</u>**), with governance reports **<u>[[11]](#ref-11)</u>** emphasizing why these issues matter in regulated industries. 

So the honest conclusion is simple:

**Reading reasoning text tells you very little about what models actually think—unless you verify it.**  
And verification, in 2026, increasingly means *causal tests + activation-space evidence*, not prettier rationales.

---

## References {#references}

- <a id="ref-1"></a>**1. Wei Jie Yeo et al.** — [_How Interpretable are Reasoning Explanations from Prompting Large Language Models?_](https://arxiv.org/abs/2402.04614) (Findings of NAACL 2024)  
- <a id="ref-2"></a>**2. Fazl Barez et al.** — [_Chain-of-Thought Is Not Explainability_](https://aigi.ox.ac.uk/wp-content/uploads/2025/07/Cot_Is_Not_Explainability.pdf) (Oxford Martin AIGI, 2025)  
- <a id="ref-3"></a>**3. Tamera Lanham et al.** — [_Measuring Faithfulness in Chain-of-Thought Reasoning_](https://www.anthropic.com/research/measuring-faithfulness-chain-of-thought) (Anthropic, 2023)  
- <a id="ref-4"></a>**4. Miles Turpin et al.** — [_Language Models Don't Always Say What They Think: Unfaithful Explanations in Chain-of-Thought Prompting_](https://arxiv.org/abs/2305.04388) (NeurIPS 2023, arXiv:2305.04388)  
- <a id="ref-5"></a>**5. Paul C. Bogdan et al.** — [_Thought Anchors: Which LLM Reasoning Steps Matter?_](https://arxiv.org/abs/2506.19143) (arXiv:2506.19143, 2025)  
- <a id="ref-6"></a>**6. Sayam Goyal et al.** — [_Scratchpad Thinking: Alternation Between Storage and Computation in Latent Reasoning Models_](https://openreview.net/forum?id=scratchpad-thinking) (OpenReview, 2025)  
- <a id="ref-7"></a>**7. Ching Fang & Samuel Marks** — [_Unsupervised decoding of encoded reasoning using language model interpretability_](https://arxiv.org/abs/2512.01222) (arXiv:2512.01222, 2025)  
- <a id="ref-8"></a>**8. Jiazheng Li et al.** — [_Mapping Faithful Reasoning in Language Models_](https://arxiv.org/abs/2510.22362) (introduces Concept Walk, arXiv:2510.22362, 2025)  
- <a id="ref-9"></a>**9. Scott Emmons et al.** — [_When Chain of Thought is Necessary, Language Models Struggle to Evade Monitors_](https://arxiv.org/abs/2507.05246) (arXiv:2507.05246, 2025)  
- <a id="ref-10"></a>**10. Jianli Zhao et al.** — [_Chain-of-Thought Hijacking_](https://arxiv.org/abs/2510.26418) (arXiv:2510.26418, 2025)  
- <a id="ref-11"></a>**11. ESMA / Alan Turing Institute / Institut Louis Bachelier** — [_Leveraging Large Language Models in Finance: Pathways to Responsible Adoption_](https://www.esma.europa.eu/sites/default/files/2025-06/LLMs_in_finance_-_ILB_ESMA_Turing_Report.pdf) (workshop report, 2025)   
