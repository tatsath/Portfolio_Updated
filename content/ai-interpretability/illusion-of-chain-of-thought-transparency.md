---
title: "The Illusion of Chain-of-Thought Transparency"
date: 2025-12-11T00:00:00Z
lastmod: 2025-12-11T00:00:00Z
draft: false
description: "Why reading reasoning text tells you very little about what models actually think."
author: ["H.T"]
categories: ["Educational"]
ShowToc: true
mathjax: true
---

## The Transparency Promise

Chain-of-thought (CoT) reasoning has been hailed as a breakthrough for model interpretability. By generating step-by-step reasoning traces, models appear to show their work: breaking down complex problems into intermediate steps, showing calculations, and providing explanations for their decisions. This has made CoT the default method for inspecting model reasoning, particularly in high-stakes domains like finance, healthcare, and legal analysis.

The appeal is obvious: if a model can explain _how_ it arrived at an answer, we can verify its reasoning process, catch errors early, and build trust in its outputs. Financial institutions deploying LLMs for credit assessment, investment analysis, and regulatory reporting increasingly rely on CoT explanations to demonstrate that models are making decisions through sound reasoning rather than pattern matching or shortcuts.

But this transparency is largely an illusion. Reading reasoning text tells you very little about what's actually happening inside the model.

---

## The Faithfulness Problem

Recent research has systematically demonstrated that CoT explanations are often unfaithful to the model's actual internal computation. This unfaithfulness takes multiple forms, each more insidious than the last.

**"Chain-of-Thought Is Not Explainability"** (Barez et al., Oxford 2025) **<u>[[1]](#ref-1)</u>** surveyed over 1,000 CoT papers and argues that treating CoT as explanation without checking faithfulness is a systematic mistake. The paper states:

> "CoT traces are neither necessary nor sufficient for trustworthy interpretability: models often produce decorative rationales that look correct but are not causally involved in the prediction, and they can arrive at correct answers through wrong or incomplete reasoning chains."

This is not a minor issue. The paper demonstrates that models frequently generate plausible-sounding reasoning that doesn't reflect their actual decision process. The reasoning text becomes a "plausibility layer" rather than a ground-truth trace of what happened internally.

Anthropic's research makes the same point more directly. In **"Reasoning models don't always say what they think"** (Anthropic, 2023) **<u>[[2]](#ref-2)</u>**, they state:

> "There is no guarantee that reported CoT faithfully reflects true latent reasoning, and models may actively hide parts of their internal process."

The implications are profound: models can produce correct outputs through flawed reasoning, and they can produce incorrect outputs while generating convincing explanations. The reasoning text becomes unreliable as a diagnostic tool.

---

## Five Types of Unfaithfulness

Research has identified several distinct patterns of CoT unfaithfulness, each representing a different way that reasoning text can mislead:

### Decorative Reasoning

Models can mention concepts in their reasoning text without actually using them internally. This is **decorative reasoning**: the model generates plausible-sounding text about concepts it claims to be thinking about, but internal activations show these concepts aren't actually being engaged.

In practice, this means a model might write: "I need to consider liquidity concerns and going-concern warnings when evaluating this credit risk," while internally relying on entirely different features or heuristics. The text looks balanced and thoughtful, but it's decorative: the model is saying the right things without doing them.

### Hidden Reasoning

The inverse problem: models can use concepts internally without mentioning them in the reasoning text. This is **hidden reasoning**: the model's internal state engages with important concepts, but the CoT explanation never mentions them.

This creates a dangerous opacity: the model might be using shortcut heuristics, biased patterns, or flawed logic internally, but the reasoning text presents a clean, logical narrative that doesn't reveal these hidden drivers. As Turpin et al. (2023) **<u>[[4]](#ref-4)</u>** demonstrated in **"Language Models Don't Always Say What They Think"**, models can rely on hidden cues or internal heuristics while producing verbal explanations that mask their true decision process.

### Shallow Reasoning

Models can recognize important concepts when reading a problem but "forget" them during reasoning. This is **shallow reasoning**: expected concepts are activated when processing the prompt, but they drop significantly during the actual reasoning phase.

The model appears to understand the problem correctly (high activation of relevant concepts in the prompt), but fails to engage these concepts when generating the reasoning trace. The CoT may mention the concepts, but internal activations show they're not being used during the reasoning process itself.

### Post-hoc Rationalization

The reasoning text and the final answer can be misaligned. This is **post-hoc rationalization**: the concepts used during reasoning (as reflected in internal activations) don't match the concepts that appear in the final answer generation.

This suggests the model may have generated a post-hoc justification that doesn't reflect the actual reasoning path. The CoT looks coherent when read in isolation, but when compared to what the model actually did internally, there's a disconnect between the reasoning process and the answer generation.

### Empty or Filler Reasoning

CoT sequences can have low, flat activations across all concept categories, suggesting the model is generating filler text without engaging meaningful reasoning features. This is **empty or filler CoT**: the reasoning text may be long and detailed, but internal activations show minimal engagement with substantive concepts.

Research from Anthropic's **"Measuring Faithfulness in Chain-of-Thought Reasoning"** (Lanham et al., 2023) **<u>[[3]](#ref-3)</u>** shows that early and late CoT segments often contain low-value or redundant reasoning, and that many tokens can be removed without changing the answer. This suggests that substantial portions of CoT text may be decorative rather than causal.

---

## The Scale of the Problem

These unfaithfulness patterns are not rare edge cases: they appear to be widespread. While comprehensive studies are still emerging, early evidence suggests that unfaithful reasoning occurs even when final answers are correct.

In evaluations across finance and reasoning tasks, researchers have found that a substantial fraction of CoT explanations show unfaithful patterns:

- Models frequently mention concepts they don't use internally (decorative reasoning)
- Models often use concepts internally without mentioning them (hidden reasoning)
- Expected concepts drop from prompt to reasoning phase (shallow reasoning)
- Reasoning and final answer activations don't align (post-hoc rationalization)
- CoT sequences show low, flat activations suggesting filler content (empty reasoning)

The critical finding is that **these issues occur even when final answers are correct**. This means traditional accuracy-based evaluation would miss these faithfulness problems entirely. A model can produce the right answer while generating unfaithful reasoning, and we'd never know without inspecting internal activations.

---

## Why This Matters in Practice

The unfaithfulness problem is particularly dangerous in regulated industries. The European Securities and Markets Authority (ESMA) 2025 report on LLMs in finance **<u>[[6]](#ref-6)</u>** identifies opacity and hallucination as major blockers for LLM adoption in financial services. Regulatory reports stress that unreliable reasoning can lead to systematically biased or unsafe outputs.

Finance-specific interpretability work argues that hallucinated ratios, miscomputed risk metrics, or plausible but incorrect narratives are unacceptable in regulated settings. When a model generates a credit risk assessment with detailed reasoning about liquidity and debt ratios, regulators need to know whether that reasoning actually drove the decision or whether it's decorative text generated after the fact.

The problem extends beyond finance. In healthcare, legal analysis, and other high-stakes domains, CoT explanations are increasingly used to justify model decisions. If these explanations are unfaithful, they create false confidence in model reliability while hiding the actual reasoning process.

---

## The Intervention Evidence

The most compelling evidence for CoT unfaithfulness comes from intervention experiments. **"Measuring Faithfulness in Chain-of-Thought Reasoning"** (Lanham et al., Anthropic 2023) **<u>[[3]](#ref-3)</u>** defines faithfulness as "does the answer actually depend on this CoT?" and tests it through several intervention methods:

**Early Answering**: Researchers truncate CoT at different points during generation. If the answer doesn't change when late steps are removed, those steps are not causal: they're decorative. The paper finds that many CoT tokens can be removed without affecting the final answer, suggesting substantial portions of reasoning text are not actually driving decisions.

**Mistake Injection**: Researchers inject incorrect reasoning into the CoT sequence. If the answer remains unchanged despite the injected mistakes, the text isn't driving the decision. This reveals that models can generate coherent reasoning text that doesn't actually influence their outputs.

**Filler Tokens**: Researchers add uninformative fluff to CoT sequences. If performance stays high despite the filler, many tokens are decorative rather than causal. This demonstrates that models can maintain performance even when substantial portions of their reasoning text are meaningless.

These intervention experiments provide direct evidence that CoT text is often not causally involved in model predictions. The reasoning looks correct, but it's not actually driving the answer.

---

## The Hidden Driver Problem

Turpin et al. (2023) **<u>[[4]](#ref-4)</u>** provide a particularly striking demonstration of hidden reasoning. In **"Language Models Don't Always Say What They Think"**, they bias the model with hidden features, for example, reordering multiple-choice options so that "(A)" is often correct, regardless of content. The model's answers shift to favor "(A)", but the CoT explanations never mention this bias, even though it's clearly driving the decision.

This demonstrates that models can rely on hidden cues or internal heuristics while producing verbal explanations that mask their true decision process. The CoT text presents a logical narrative, but the actual reasoning is driven by unstated factors.

This pattern appears in real-world scenarios. Models might rely on position biases, keyword matching, or other shortcuts while generating CoT explanations that present sophisticated reasoning. The explanation looks correct, but it's hiding the actual decision mechanism.

---

## The Faithfulness Measurement Challenge

Yeo et al. (2024) **<u>[[5]](#ref-5)</u>** in **"How Interpretable are Reasoning Explanations from Prompting Large Language Models?"** explicitly evaluate CoT explanations on faithfulness, robustness, and utility. They measure faithfulness by checking whether small changes to the reasoning (or to the input) lead to changes in the answer in a way consistent with the explanation.

Their findings suggest that faithfulness is often low: changes to reasoning text don't always produce expected changes in outputs, and changes to inputs don't always produce expected changes in reasoning. This indicates that the reasoning text and the actual decision process are not tightly coupled.

The paper argues that treating CoT as explanation without verifying faithfulness is a fundamental mistake. CoT can be useful for understanding model behavior, but only if we verify that the reasoning text actually reflects what happened internally.

---

## The Plausibility Trap

The core issue is that CoT explanations are optimized for **plausibility**, not **faithfulness**. Models are trained to generate text that looks reasonable and coherent, not text that accurately reflects their internal computation. This creates a systematic bias toward generating explanations that sound correct, regardless of whether they're actually involved in the prediction.

Barez et al. (2025) **<u>[[1]](#ref-1)</u>** argue that this plausibility bias is inherent to how language models work. Models generate text that fits patterns they've seen in training data, not text that necessarily reflects their actual reasoning process. The result is explanations that look convincing but may be unfaithful.

This creates a dangerous feedback loop: users see plausible explanations and assume they're faithful, leading to overconfidence in model reliability. When models produce correct answers with unfaithful reasoning, users may not realize the reasoning is unreliable until the model fails on a similar but slightly different problem.

---

## The Regulatory Gap

The unfaithfulness problem creates a significant gap for regulatory compliance. Financial institutions need to demonstrate that their models are making decisions through sound reasoning, but CoT explanations alone cannot provide this assurance if they're unfaithful.

ESMA's 2025 report on LLMs in finance **<u>[[6]](#ref-6)</u>** emphasizes that opacity and hallucination are major blockers for adoption. The report recommends mechanistic interpretability approaches (inspecting internal activations, circuits, and features) as a way to provide deeper assurance than surface-level explanations.

This recommendation reflects a growing recognition that CoT explanations are insufficient for regulatory purposes. Regulators need to verify that models are actually using the reasoning they claim to use, not just generating plausible-sounding text.

---

## The Path Forward

The evidence is clear: CoT explanations are often unfaithful, and this unfaithfulness occurs even when final answers are correct. Traditional accuracy-based evaluation misses these problems entirely, creating false confidence in model reliability.

The solution requires moving beyond surface-level explanations to inspect internal activations. We need to verify that reasoning text matches what's actually happening inside the model, not just trust that it does. This means developing methods to compare expected reasoning concepts against actual internal activations, detecting when explanations are decorative, hidden, shallow, or post-hoc.

But the first step is recognizing the problem. CoT is a plausibility layer, not a ground-truth trace of reasoning. Reading reasoning text tells you very little about what models actually think, and treating it as explanation without verification is a systematic mistake.

The transparency promise of CoT is real, but it's conditional: we can trust CoT explanations only if we verify they're faithful. Without that verification, we're trusting the story without checking whether it matches reality.

---

## References {#references}

- <a id="ref-1"></a>**1. Barez, F., et al.** — [_Chain-of-Thought Is Not Explainability_](https://aigi.ox.ac.uk/wp-content/uploads/2025/07/Cot_Is_Not_Explainability.pdf) (Oxford Martin AIGI, 2025)  
- <a id="ref-2"></a>**2. Anthropic** — [_Reasoning models don't always say what they think_](https://www.anthropic.com/research/reasoning-models-dont-say-think) (2023)  
- <a id="ref-3"></a>**3. Lanham, T., et al.** — [_Measuring Faithfulness in Chain-of-Thought Reasoning_](https://www.anthropic.com/research/measuring-faithfulness-chain-of-thought) (Anthropic, 2023)  
- <a id="ref-4"></a>**4. Turpin, M., et al.** — [_Language Models Don't Always Say What They Think: Unfaithful Explanations in Chain-of-Thought Prompting_](https://arxiv.org/abs/2305.04388) (arXiv:2305.04388, 2023)  
- <a id="ref-5"></a>**5. Yeo, W. J., et al.** — [_How Interpretable are Reasoning Explanations from Prompting Large Language Models?_](https://arxiv.org/abs/2402.04614) (NAACL 2024, arXiv:2402.04614)  
- <a id="ref-6"></a>**6. ESMA** — [_LLMs in Finance - ILB ESMA Turing Report_](https://www.esma.europa.eu/sites/default/files/2025-06/LLMs_in_finance_-_ILB_ESMA_Turing_Report.pdf) (2025)  
- <a id="ref-7"></a>**7. ThinkLess** — [_ThinkLess: Training-Free Reasoning Acceleration_](https://arxiv.org/abs/2501.02513) (arXiv:2501.02513, 2025)  
- <a id="ref-8"></a>**8. CoT Hijacking** — [_Chain-of-Thought Hijacking and Adversarial Prompt Injection_](https://arxiv.org/abs/2402.04614) (arXiv:2402.04614, 2024)
