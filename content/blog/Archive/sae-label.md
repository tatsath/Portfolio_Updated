---
title: "Labeling domain specific features of Sparse Autoencoders: Practical Strategies"
date: 2025-11-22T00:00:00Z
lastmod: 2025-11-22T00:00:00Z
draft: false
description: "From feature discovery to label fidelity in large language models (Nemotron + Llama case study)"
author: ["H.T"]
categories: ["Fundamental Research"]
ShowToc: true
mathjax: true
---

---

# Domain-Targeted AutoInterp for Sparse Autoencoders

_From feature discovery to label fidelity in large language models (Nemotron + Llama case study)_

---

## Why AutoInterp is still the bottleneck

The field of mechanistic interpretability has largely converged on **Sparse Autoencoders (SAEs)** as a scalable substrate for understanding large language models. Work from Anthropic, EleutherAI, and more recently Goodfire has shown that learned sparse features offer a practical middle ground between individual neurons and full circuit enumeration. Training SAEs at scale is now well understood; engineering challenges around throughput, stability, and reconstruction quality are largely solved.

What remains unresolved—and increasingly dominant—is **interpretation**.

Once an SAE is trained, we are left with tens of thousands of latents. The central problem is no longer _how to learn features_, but _how to reliably name and validate them_. Most existing AutoInterp approaches can generate labels, but those labels are often generic, unstable, or difficult to verify quantitatively. In practice, the interpretability bottleneck is not SAE training; it is **label fidelity**.

This post focuses on pushing AutoInterp beyond “plausible explanations” toward **measured, domain-relevant interpretations**, treating interpretability as an evaluation and measurement problem rather than a prompting trick.

---

## What we are actually labeling

An SAE provides a sparse representation of internal activations. Given a transformer activation $x \in \mathbb{R}^d$, a Top-K SAE computes

$$
z = \mathrm{TopK}(W_e x), \quad \hat{x} = W_d z
$$

where exactly $K$ latents are active per token. This enforces strong selectivity and encourages disentangled features.

Two metrics determine whether an SAE is usable for interpretability:

- **Sparsity (L0)**: how many features are active per token.
- **Fraction of Variance Explained (FVE)**: how much of the original activation structure is reconstructed.

In our Nemotron-Nano-9B-v2 experiment, a BatchTopK SAE trained on a generic conversational corpus achieved **66.11% variance explained at L0 = 64** with **zero dead features** across a 35,840-feature dictionary. This establishes a strong baseline: the dictionary is both sparse and alive.

However, reconstruction alone says nothing about whether individual features are _meaningful_. Interpretation begins only after this point.

---

## Three AutoInterp philosophies in practice

### Evaluation-first: SAE Bench AutoInterp

SAE Bench treats AutoInterp as one of several standardized evaluations. Its strength is comparability: features, architectures, and training regimes can be compared under a shared harness. This perspective is crucial for research, but default settings often surface generic labels unless heavily customized for domain work.

### Scale-first: Delphi / SAE-Auto-Interp

Delphi and the SAE-Auto-Interp line of work formalize automated interpretation at scale. Their key insight is that interpretation quality must be _scored_, not eyeballed, using metrics such as detection, fuzzing, and intervention-based evaluations. This reframes interpretation as a supervised prediction problem: can an explanation predict activation behavior?

The limitation is that brute-force labeling over all latents is expensive and tends to over-reward features that are easy to describe rather than those that are semantically deep.

### Domain-first: activation separation → targeted labeling

Our pipeline flips the order. Instead of labeling everything, we first ask:

_Which features actually separate the domain I care about from everything else?_

Only those features are sent through AutoInterp. This reduces labeling load, improves average label quality, and turns AutoInterp into an **evaluation step** rather than a discovery mechanism.

---

## Domain targeting without probes

Domain discovery is done **without training probes or classifiers**. Instead, we use activation-separation within a single dataset.

Token files define a concept by marking **positive positions (C⁺)** where domain-specific tokens occur, and **negative positions (C⁻)** everywhere else. For each latent, we compare activation distributions between C⁺ and C⁻.

Several separation scores are useful, but in practice a Fisher-style score dominates:

$$
S_i = \frac{(\mu_i^+ - \mu_i^-)^2}{\sigma_i^+ + \sigma_i^- + \epsilon}
$$

This favors latents that separate the domain _consistently_, not just occasionally. Empirically, these latents are far more likely to survive downstream AutoInterp scoring.

This search stage is critical. It transforms AutoInterp from “label thousands of latents” into “validate a carefully chosen shortlist”.

---

## AutoInterp as an evaluation harness

AutoInterp is most effective when treated like a test suite.

For each candidate feature, we collect activating contexts and **contrastive non-activating examples**, often retrieved via FAISS to ensure semantic similarity. Labels are generated under strict prompt constraints (e.g., 8–15 words, domain-specific objects and relations), and then evaluated using **detection F1**: can a scorer predict activation from text given only the label?

Detection F1 is not a measure of truth; it is a measure of **predictive adequacy**. Generic, task-level explanations fail this test because they apply equally well to positive and negative examples. High-F1 labels tend to be narrow, operational, and testable.

Caching latent activations is essential. By reusing activation caches and regenerating only explanations and scores, prompt iteration becomes cheap enough to be scientific rather than anecdotal.

---

## Results: what the models revealed

On Nemotron-Nano-9B-v2 (layer 28, residual stream), only **~8% of top finance and reasoning features** achieved detection F1 ≥ 0.70. The highest-scoring features were often _structural_: punctuation regimes, ticker-like patterns, tagged segments. These are easy to name and easy to detect.

This mirrors a broader finding in automated interpretability: **features that are easiest to label are not always the most semantically interesting**. Detection-based metrics strongly favor sharp textual detectors.

A multi-layer study on Llama-2-7B (layers 4/10/16/22/28) reinforced another non-obvious pattern: deeper layers are not monotonically more interpretable. Early and mid layers produced more stable, scorable labels, while later layers showed increased entanglement and lower average F1 despite appearing more “semantic”.

---

## Pushing beyond today’s AutoInterp

The main contribution of this work is not a new labeling model, but a **measurement discipline**:

- Treat domain targeting as a first-class step.
- Use activation separation to decide _what deserves interpretation_.
- Treat AutoInterp as an evaluator, not a discovery engine.
- Gate progress with quantitative metrics, not plausibility.

Future gains will likely come from calibration curves between separation scores and F1, multi-stage labeling schemas (structural vs semantic features), and intervention-based validation as a sanity check rather than a steering demo.

The broader lesson aligns with how Anthropic and Goodfire frame mechanistic interpretability: **features are an interface**, but only if we can measure which labels are real.

---

## References

- Anthropic — _Towards Monosemanticity: Decomposing Language Models with Dictionary Learning_
- Anthropic — _The Engineering Challenges of Scaling Interpretability_
- Paulo et al. (EleutherAI) — _Automatically Interpreting Millions of Features in Large Language Models_
- Delphi — Automated interpretability toolkit for SAE and transcoder features
- SAE Bench — Benchmarking sparse autoencoders and interpretability metrics
- Goodfire — Ember and production-grade mechanistic interpretability APIs
