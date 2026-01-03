---
title: "Training Sparse Autoencoders That Produce Useful Features: A Practical Guide"
date: 2025-12-14T00:00:00Z
lastmod: 2025-12-14T00:00:00Z
draft: false
description: "A practical guide to training sparse autoencoders across model families, covering frameworks, failure modes, evaluation metrics, and case studies."
author: ["H.T"]
categories: ["Fundamental Research"]
ShowToc: true
mathjax: true
---

---

## Summary

Sparse Autoencoders (SAEs) provide a powerful lens into transformer representations by decomposing activations into interpretable, sparse features. However, training SAEs that produce genuinely useful features is fragile and failure-prone. This guide presents a practical failure-mode atlas based on extensive training across model families—from Nemotron-Nano-9B-v2 to Llama-3.1-8B-Instruct to FinBERT. We introduce a taxonomy of SAE outcomes (good, deceptively-good, dead, duplicated, noisy) and demonstrate why reconstruction metrics alone are insufficient. Through three detailed case studies, we show how "97% loss recovered" can mask unhealthy dictionaries, why small models invert success criteria, and what distinguishes a clean run in the useful regime. We cover frameworks (SAE Bench, Sparsify, dictionary_learning), data strategies (generic vs domain-mixture), evaluation metrics (stability, coherence, health, drift-readiness), and common failure modes. The core principle: tune toward health metrics—absorption, deadness calibration, OOS behavior—not just reconstruction. This work provides the evaluation framing and practical recipes needed to train SAEs that yield interpretable, distinct features rather than generic templates.

---

## Introduction

Sparse Autoencoders (SAEs) are a very particular kind of model training: you **freeze the base model** and train a learned **dictionary** that reconstructs internal activations using a sparse code. When it works, you get a controllable lens into representation space—per-token feature activations, feature neighborhoods, the ability to compare circuits across model families, checkpoints, and domains, and a foundation for downstream workflows like feature discovery and automated interpretation.

They're also fragile. Not because the idea is exotic, but because you're training on **activations**, not raw text. A single wrong hook point, a subtle dtype mismatch, unstable activation statistics, or a broken sparsity constraint can create a run that "looks alive" while learning the wrong object. Most wasted days in SAE work are not about tuning learning rates—they're about silently incorrect activation pipelines.

---

## Training Methodology

### The Training Stack

A dependable stack for SAE training on transformer activations is straightforward:

- PyTorch (CUDA for serious work)
- `transformers` for model loading/tokenization
- `datasets` for streaming text at scale
- a training framework (Sparsify or dictionary_learning in our setup)
- W&B (or equivalent) for metrics curves and run comparison

The key practical reality is that you're training on **model activations**—our loop is bound by forward passes plus buffering/caching. If activation extraction is unstable (OOM churn, wrong tensor, accidental fp16 overflow), the SAE can "train" and still be useless.

### The Run Card: What to Log

If you want runs that compare cleanly across models and time, treat metadata as part of the result:

- model name **and exact revision**
- layer index **and hook point** (residual stream vs MLP in/out vs attention out)
- activation dimension `d_model`
- dictionary size / number of latents
- sparsity mechanism (Top-K vs L1), K, and any threshold adaptation settings
- LR schedule, warmup, optimizer
- batch sizes (LLM forward batch vs SAE batch), context length
- dataset names + preprocessing templates
- in-sample + at least one OOS dataset used during training monitoring

If any of these are missing, "good vs bad" becomes storytelling rather than science.

### Frameworks in Practice

We've used three layers of tooling that compose nicely:

**SAE Bench** is best treated as the evaluation backbone: it bundles multiple evaluations beyond proxy metrics, which is exactly what you need if you want to avoid the "deceptively-good" regime.

**Sparsify** is the quickest path to train k-sparse SAEs/transcoders on HuggingFace model activations and iterate fast on core knobs (K, latents, context length).

**dictionary_learning** is the most controllable and stable in our experience, especially for large models where activation buffering and trainer logistics matter more than convenience. This is why, in our setup, it ends up being "the better framework" for serious runs.

For automated interpretation workflows, EleutherAI's **Delphi** is a commonly used set of tools for generating and scoring feature explanations.

### Data Strategy

Our Nemotron pipeline embodies a principle that scales: train a **generic dictionary** first, then specialize via feature discovery and labeling.

But finance is special in one consistent way: the activation submanifold for finance text is shaped by structured entities, numbers, ratios, and event language. If you train purely on non-finance, the SAE often under-allocates capacity to that submanifold. If you train purely on finance, the SAE can become brittle and template-driven.

#### Domain-Mixture SAE Training

A controlled mixture—often 70–90% generic text and 10–30% finance text—tends to improve finance-relevant reconstruction and feature usefulness without collapsing into "finance-only shortcuts." A simple curriculum (generic-heavy warmup → steady mixture → stable evaluation) often works better than a static mix because it avoids early overfitting to domain templates.

This is also where interpretability meets product reality: if our downstream goal is finance lenses (market events, earnings language, credit risk signals), we want an SAE that has _seen finance structure_ during training but still generalizes.

**Safe to discuss:** the rationale, mixture idea, and evaluation framing.  
**Not to disclose:** exact best mix ratios for our setup, exact schedules, or "the one optimal dataset blend."

### Choosing Latent Dimensionality

Latent dimensionality (dictionary size / number of features) is not "bigger is always better." It's an allocation decision with predictable tradeoffs:

- Larger dictionaries can increase reconstruction and granularity, but they raise the risk of **duplication/absorption** and can produce many "weakly distinct" features that are hard to label reliably.
- Smaller dictionaries force compression, which can improve feature distinctness but can also underfit, especially at hook points with high entropy.

The most reliable principle is to choose dimensionality to support **feature diversity under our sparsity constraint**, then judge it using health metrics (absorption, deadness calibrated to tokens, OOS behavior), not just reconstruction. Avoid over-optimizing latent count to a single metric: exact "best latent counts" are notoriously non-transferable across models, layers, and domains.

### A Practical Top-K Training Recipe

Top-K SAEs make a strong design choice: you enforce that exactly (or effectively) K features fire per token/activation vector. That simplifies one aspect—L0 becomes a constraint check—but it intensifies other failure modes (duplication, redundancy, poor allocation).

A robust run has four moving parts that must align:

**(a) Choose the representation location.** Be explicit about layer and tensor: residual stream vs MLP in/out vs attention out. "Wrong tensor, right code" is the #1 silent failure class.

**(b) Activation buffering.** Large models often require tiny LLM batch sizes (e.g., 1–2). SAE optimization wants stable batches. A buffer that decouples forward passes from SAE updates is often the difference between a clean run and noisy collapse.

**(c) Explicit sparsity mechanism.** For BatchTopK, L0 is enforced. If measured L0 doesn't match K, gating/thresholding is broken.

**(d) Early evaluation on two distributions.** Evaluate on a training-like proxy and at least one OOS dataset early. Otherwise you can train for a day and discover you learned formatting templates.

Hyperparameters that consistently matter most (conceptually, not as "exact optimal values"):

- dictionary size / expansion factor (capacity)
- K (interpretability pressure)
- learning rate + warmup (stability)
- steps / token budget (whether features settle)
- threshold adaptation / auxiliary losses (enforce K without collapse)
- context length (especially important in finance where entities/numbers span context)

---

## Evaluation

### Training Outcomes Taxonomy

When people say "my SAE is good," they often mean "FVU went down." That is not enough. In practice, SAE outcomes fall into a small taxonomy that repeats across model families:

**Good.** Reconstruction is solid _and_ features are diverse and usable. Deadness is not pathological, absorption is moderate, and OOS degradation is reasonable. Downstream feature discovery yields interpretable clusters rather than generic templates.

**Deceptively-good.** Reconstruction looks excellent, but the dictionary is unhealthy: many dead features, high absorption (redundant decoder directions), or an effectively dense code. These SAEs often produce repeated/generic labels and weak separation in AutoInterp-style scoring. They look great on one scalar, then fail at the thing you actually care about: useful, distinct features.

**Dead.** Large fractions of the dictionary never fire under realistic token budgets, or fire only under artifacts. This can be real (bad capacity allocation) or a measurement artifact (deadness threshold miscalibrated to tokens seen), but in either case it blocks interpretability.

**Duplicated.** You paid for many latents but learned near-duplicates—high decoder cosine similarity / absorption. This correlates strongly with "labels repeat," "features are too generic," and low detection quality.

**Noisy.** The SAE fires erratically or is dominated by formatting artifacts. In finance settings, the noisy regime often manifests as punctuation/ticker/special-tag features overwhelming semantic structure.

This taxonomy is the core "failure-mode atlas" mindset: name the regime, then tune _toward health_, not toward one headline metric.

### Evaluation Suite

Our evaluation framing is correct: compute metrics per dataset by extracting **real activations** from that dataset, passing through encode/decode, and measuring reconstruction and sparsity behavior.

A practical evaluation suite for "useful features" should answer four questions:

- **Health:** Is the dictionary diverse and utilized, or redundant and wasteful?
- **Stability:** Do metrics and key features remain consistent across seeds, shards, or small data shifts?
- **Coherence:** Do top-activating contexts form semantic clusters, or are they formatting artifacts?
- **Drift-readiness:** Does performance degrade gracefully on OOS datasets, or collapse?

#### Core Metrics

- **Loss recovered / FVU:** dataset-dependent reconstruction proxy; necessary, not sufficient.
- **L0:** for Top-K, mostly a constraint check.
- **Dead features %:** dataset- and token-budget dependent; meaningful only if threshold is calibrated to tokens processed.
- **Feature absorption:** mostly dataset-independent; a strong early warning for redundancy and repeated/generic labels.

A subtle but important point that matches downstream experience: if AutoInterp quality is poor (generic repeated labels, low detection F1), the culprit is often **absorption/redundancy** rather than FVU.

---

## Case Studies

### Nemotron-Nano-9B-v2: A Clean Run

This is the cleanest training story because configuration and metrics align.

We trained a BatchTopK SAE on **NVIDIA Nemotron-Nano-9B-v2**:

- layer: 28 (semantically rich)
- activation dimension: 4480
- dictionary size: 35,840 (8× expansion)
- K: 64 (≈0.18% active)
- dataset: `lmsys/lmsys-chat-1m` formatted as plain text conversations
- steps: 10,000
- LR: 1e-4 with warmup
- threshold adaptation: enabled after an initial phase (`threshold_start_step=1000`, `threshold_beta=0.999`)
- batching: `llm_batch_size=2`, `sae_batch_size=32` for stability under memory constraints

Logged results:

- loss recovered: **66.11%**
- L2 loss: **0.1684**
- L0: **64** (exactly K)
- dead features: **0** (under our current definition)

Interpretation: reconstruction is solid at extremely low sparsity, which is typically enough to justify feature discovery and labeling. The only caveat we already flagged is correct: "dead=0" can be genuine or an artifact if the dead threshold is misaligned with tokens seen.

### Llama-3.1-8B-Instruct: Why "97% Loss Recovered" Can Be Bad

Our multi-layer sweep on **Llama-3.1-8B-Instruct** is the strongest argument for the outcome taxonomy.

Training: LMSYS-Chat-1M. Evaluation: WikiText-103 (proxy) + SQuAD (OOS task shift).

| Layer | Latents | Loss recovered |   L0 | Dead % | Absorption | Outcome          |
| ----: | ------: | -------------: | ---: | -----: | ---------: | ---------------- |
|     4 |    1200 |          97.7% | ~298 |  67.7% |      0.395 | deceptively-good |
|    10 |     400 |          92.8% | ~115 |  40.8% |      0.286 | unhealthy        |
|    19 |     400 |          70.3% | ~167 |  19.5% |      0.264 | good tradeoff    |
|    28 |     400 |           0.0% | ~194 |    ~1% |      0.281 | dead/failed      |

Layer 4 is the textbook "deceptively-good" SAE: the reconstruction scalar looks incredible while the dictionary is unhealthy—extreme deadness and high absorption imply wasted capacity and redundant features. This is exactly the regime where downstream feature labeling tends to repeat generic phrases and separation degrades.

Layer 19 is the first layer where metrics tell a coherent story: moderate reconstruction, manageable deadness, lower absorption, and stability across datasets. That's why "layer 19 baseline" is a defensible recommendation.

Layer 28's 0% recovered should be treated as a debugging event before a scientific conclusion: hook mismatch, dtype/normalization issues, or activation instability can produce a run that outputs numbers but reconstructs nothing.

### FinBERT / BERT-base: Small Models Invert Success Criteria

BERT-family models change the geometry: smaller hidden size and different training objectives mean you can see **perfect utilization and decent diversity** alongside weak reconstruction.

A representative BERT-base style outcome looks roughly like:

- loss recovered ~28.8%
- dead features 0%
- absorption ~0.156 (healthy diversity)

This is not necessarily "broken." It often means under-capacity or overly strict constraints for that hook point. In smaller models, dictionary size, K, and layer choice can dominate outcomes more sharply because there's less representational slack.

This is also where domain-mixture training can help if finance is the target: ensuring finance exposure during training prevents limited capacity from being spent mostly on generic artifacts.

---

## Common Failure Modes

The failure modes we highlighted map cleanly onto real runs:

**Dead features.** Often a capacity allocation issue, but deadness must be calibrated to tokens seen; otherwise "0% dead" becomes meaningless.

**Feature collapse / duplication.** High absorption and near-duplicate decoder directions produce repeated labels and low separability.

**Over-fragmentation.** Too many latents or too strict sparsity can split a concept across many weak features—hard to label, low detection quality, and poor transfer.

**Label nonsense.** When features are dominated by formatting artifacts or are too redundant, automated labeling tends to produce generic, repeated phrases that don't correspond to crisp mechanisms.

---

## Discussion

### Limitations & Future Work

Three limitations show up consistently across the field and across runs:

**Scalability.** Training is bounded by activation extraction and token budgets; stable buffering and reproducible pipelines matter as much as optimizer choices.

**Standard benchmarks.** Reconstruction metrics are not a full benchmark. The ecosystem is moving toward richer evaluation suites (SAE Bench-style framing), but we still lack universally accepted "feature usefulness" benchmarks.

**Transfer.** Feature transferability across base vs fine-tuned models is limited. Even when two models are architecturally similar, fine-tuning can rotate representation spaces enough that direct feature reuse degrades.

### Reporting Standards

If the goal is to be seen as someone who trained SAEs across model families **without revealing the recipe**, the safest and most credible posture is:

**Safe to share (recommended):**

- the failure-mode taxonomy
- what to log (Run Card)
- evaluation framing (in-sample vs OOS)
- health metrics (absorption, deadness calibration, OOS behavior)
- qualitative interpretation of the three case studies at the level of outcomes and tradeoffs

**Don't share (avoid):**

- exact schedules and step-by-step recipes
- exact optimal latent counts for our setup
- exact best data mixes or dataset blends
- anything that lets someone replicate our best-performing pipeline from the blog alone

That boundary preserves credibility and thought leadership while keeping the proprietary edge where it belongs: in the tuned configurations and operational details.

---

## References

- SAE Bench (evaluation suite) — https://github.com/sae-bench/sae-bench
- Sparsify (k-sparse SAE/transcoder training) — https://github.com/EleutherAI/sparsify
- dictionary_learning (dictionary-learning training framework) — https://github.com/saprmarks/dictionary_learning
- EleutherAI Delphi (AutoInterp utilities) — https://github.com/EleutherAI/delphi
