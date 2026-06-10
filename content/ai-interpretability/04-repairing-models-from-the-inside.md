---
title: "Repairing Models from the Inside"
date: 2026-05-08
description: "A practical guide to interpretability-guided model repair, from LoRA baselines to SAE-guided fine-tuning, circuit-restricted edits, and RL with feature rewards."
categories:
 - Opinion
draft: false
ShowToc: true
---

# Repairing Models from the Inside

*Standard fine-tuning treats the model as a black box. Interpretability turns repair into a procedure: you know what is broken, where it lives inside the model, and how to change only that.*

*A practical guide to interpretability-guided model repair, and when each method earns its place.*

---

## Why retraining alone is too blunt

The first three essays in this series argued for looking inside the model. Output-watching misses what matters; runtime steering can act on internals without changing weights; the toolkit can find what is actually broken. This essay is about the step after diagnosis. When you have located a real failure inside a model and you want a **persistent fix** rather than a runtime intervention, what do you do?

The default answer is to fine-tune on more or better data, with LoRA or full SFT, and hope the failure goes away. Sometimes it does. Often it does not, and the cost is larger than it looks. Standard fine-tuning treats the model as a black box. It applies a gradient signal at the output, lets the optimizer rewrite whatever weights it wants, and accepts whatever regressions show up on other tasks as the price of fixing the one in front of you.

Interpretability changes the contract. Once you know what is broken and where it lives inside the model, you can write a training update that targets only that. The result is a class of methods that range from gently improved fine-tuning to surgical weight edits on a single circuit.

---

## The repair spectrum

There is no one repair method, and the trade-offs across them are real.

![Figure 1: The repair spectrum, from blunt to surgical](/assets/ai-interpretability/repair-fig-spectrum.svg)

*Figure 1. Five families of repair methods, ordered loosely from blunt (no internal signal, broad weight changes) to surgical (a small subset of parameters changed using internal evidence).*

The top row of the figure is familiar territory: standard fine-tuning with no interpretability signal at all. The lower four rows are the contribution of mechanistic interpretability: training that uses a probe direction, an SAE feature, a hidden-state intervention, or a circuit as its constraint. The shift down the figure is a shift from "change whatever the gradient wants" to "change exactly what the evidence says is responsible."

The choice between rows is not a contest, it is a match against your situation. Probe-guided training is the right answer when you have a clean detector for the failure. SAE-guided training is the right answer when the failure has a clear feature signature. Circuit-restricted edits make sense when you can localize the mechanism. Standard LoRA, with a KL anchor, is the right answer when you have none of those and a tight budget.

---

## The loop

Every method in the figure above shares the same skeleton.

![Figure 2: The repair loop](/assets/ai-interpretability/repair-fig-loop.svg)

*Figure 2. The repair loop. The interpretability tools from the previous essay supply the signal. The training or editing step does the work. The verify step is not optional.*

You identify the failure, find an internal signal that explains it, apply a constrained training or editing step keyed to that signal, and then verify that the target metric improved without breaking everything else. The last step is the one most teams skip and most often regret. A repair that lifts the target by ten points and silently degrades five other tasks is not a repair. It is a swap.

---

## Standard baselines: LoRA, KL anchor, head repair

The honest baseline for any repair is **LoRA**, which adds low-rank trainable matrices to a frozen base and learns the fix in a small parameter budget. **[[1]](#ref-1)** **LoRA + KL anchor**, the variant that adds a KL divergence penalty against the original model on a held-out anchor set, is the version that practitioners reach for when non-regression matters. The pattern descends from InstructGPT-style RLHF, where the same KL term keeps the policy from drifting away from a sane prior. **[[2]](#ref-2)**

For encoder classifiers, **head repair and calibration** are even simpler and often sufficient. Retraining only the classifier head, or applying temperature scaling, fixes a common class of failures (miscalibration, distribution shift on a narrow slice) without touching the backbone at all.

These methods deserve respect. They are cheap, they work when the failure is well-specified, and they are the right comparison against anything fancier. If a more elaborate method does not beat LoRA + KL on both target metric and non-regression, it does not earn its complexity.

---

## Probe-guided LoRA

The first interpretability-guided method is also the simplest. You train a small classifier (a probe) on the model's hidden states to distinguish the failure state from the desired state. Then, during LoRA training, you add a penalty term that pushes the model's hidden states off the probe direction for the failure cases. **[[3]](#ref-3)** **[[4]](#ref-4)**

![Figure 3: Probe-guided LoRA before and after training](/assets/ai-interpretability/repair-fig-probe-lora.svg)

*Figure 3. The probe direction is the visible "failure axis" in activation space. Before training, bad examples sit far along it; after training, they have been pulled off it, while the rest of the representation is preserved.*

The geometric intuition is exactly that of the figure. The probe defines an axis, and the penalty rotates the bad cluster away from that axis without disturbing the orthogonal components of the representation. The good examples barely move because they were not on the axis to begin with. This is the same logic as **amnesic probing**, applied as a training objective rather than a diagnostic. **[[4]](#ref-4)**

A close cousin uses a **contrastive direction** instead of a trained probe. You collect a set of pairs that differ along the desired axis (refusal vs compliance, formal vs casual, helpful vs evasive), compute the mean difference of their hidden states, and use that direction as the constraint. This is the representation engineering and contrastive-activation-addition style. **[[5]](#ref-5)** The mathematics are similar; the difference is whether you trained a probe with control tasks or used a contrast as a closed form.

Tooling here is mature. **pyvene** provides intervention hooks on either probes or contrastive directions, and the work fits comfortably in days, not weeks. **[[12]](#ref-12)**

---

## SAE-guided LoRA and SASFT

If your model has a sparse autoencoder attached, you get a sharper signal than a probe. The features in an SAE are concept-level rather than directional; "Chinese language," "deceptive intent," "code-switch trigger" are first-class objects that you can read, point at, and penalize. **[[7]](#ref-7)** **[[8]](#ref-8)**

**SASFT**, the canonical example, identifies the specific SAE features that fire excessively when a model is about to code-switch, then adds a training penalty that keeps the pre-activation of those features in a target range. The method reduces unexpected code-switching by more than 50% across five models and three languages, eliminates it entirely in several configurations, and does so without regressing on six multilingual benchmarks. **[[6]](#ref-6)**

![Figure 4: SAE-guided LoRA / SASFT](/assets/ai-interpretability/repair-fig-sae-guided.svg)

*Figure 4. The SAE turns the residual stream into a feature dictionary. SASFT identifies the one feature whose excessive activation drives the failure and adds a loss term that holds it down, without touching the others.*

The "named feature" part matters more than it sounds. With a probe direction, you have a vector. With an SAE feature, you have a thing the model already recognizes as a unit of meaning. Penalizing it is closer to telling the model "use this concept less" than to "move along this axis." The downside is real too: you need an SAE for your model, with the relevant features labeled.

For encoder classifiers, the same idea applies. The internal SAE on a sentiment model, for instance, can identify the spurious features driving a misclassification and target only those with a LoRA update. The repair stays inside a small parameter budget while removing a specific bug.

Access has gotten easier. **Gemma Scope** ships open SAEs for Gemma **[[9]](#ref-9)**, **Neuronpedia** hosts and lets you search features for many open models **[[10]](#ref-10)**, and the **Qwen-Scope** collection extends the same picture to Qwen. **[[19]](#ref-19)** If the SAE exists and the failure has a feature signature, this is often the highest-leverage method on the menu.

---

## ReFT: training the representation, not the weights

A different angle on parameter efficiency is worth knowing about. **ReFT** (Representation Finetuning) does not learn low-rank weight updates the way LoRA does. It learns small interventions that are applied to hidden representations at specific layers. The result is 15x to 65x fewer parameters than LoRA for comparable task performance, because what you are learning is the intervention rather than a parameter shift. **[[11]](#ref-11)**

ReFT is not interpretability-guided in the strict sense; it does not use a probe or feature signal. But it sits naturally next to interpretability methods because it operates on representations, not weights, and it composes well with probe- and feature-based constraints. Practically, when LoRA's parameter budget is uncomfortable, ReFT is the next thing to try, and the **pyreft** library makes it accessible. **[[13]](#ref-13)**

---

## Circuit-restricted edits and direct editing

When you can locate the failure as a small circuit, you can update only those parameters and leave the rest of the model genuinely untouched.

**C-ΔΘ** is the cleanest example. The method localizes a refusal-causing circuit using **EAP-IG** (an efficient gradient-based variant of activation patching), then computes a weight update Δθ\_C supported only on that circuit, typically less than 5% of the model's parameters. The selective behavior change moves entirely offline, deploying as a standard checkpoint with no runtime hooks. **[[14]](#ref-14)** **[[15]](#ref-15)**

![Figure 5: Circuit-restricted weight edit](/assets/ai-interpretability/repair-fig-circuit-restricted.svg)

*Figure 5. EAP-IG finds the small subset of components responsible for the behavior. The weight update is restricted to those components; the remaining ~95% of the model is held fixed.*

The intellectual ancestors here are **ROME** and its scaled successor **MEMIT**, which edit factual associations directly with a rank-one MLP update. **[[16]](#ref-16)** **[[17]](#ref-17)** ROME and MEMIT are the right tool when the failure is a specific factual error rather than a behavioral pattern; C-ΔΘ is the right tool when the failure is a behavioral pattern with a localizable circuit.

The honest caveat is that circuit-level methods inherit their reliability from circuit discovery, which the field's own surveys still treat as an open problem. **[[21]](#ref-21)** When the circuit is clean, the repair is surgical. When it is fuzzy, the repair is no better than a careful LoRA.

---

## RL with interpretability rewards

The last family uses internal signals not as constraints during supervised training, but as **reward functions** during reinforcement learning.

**RLFR** (Reinforcement Learning from Feature Rewards), from Goodfire, is the headline example. A lightweight probe is trained on the model's internal activations to detect hallucinated or uncertain claims. That probe is then used as the reward signal in a standard RL loop: rollouts that score well by the probe are reinforced; rollouts that score poorly are discouraged. On Gemma-3-12B, RLFR reduced hallucination rates by 58% without degrading benchmark performance, and the same probe transfers to the trained policy as a runtime monitor afterwards. **[[18]](#ref-18)**

![Figure 6: RLFR, RL with interpretability rewards](/assets/ai-interpretability/repair-fig-rlfr.svg)

*Figure 6. The probe is the reward function. Rollouts are scored by what the model's internal state implies, not by what the surface output claims, and the policy is updated toward rollouts whose internals look right.*

A related approach is **SAE-steered rare-negative RL**, where SAE steering is used to surface rare bad rollouts that vanilla sampling would never catch, and the model is then trained to be less likely to produce them. Open SAE collections like Qwen-Scope make this tractable on a real-sized model. **[[19]](#ref-19)** A simpler relative is **DPO**, which uses preference pairs (not internal signals) to repair behavior boundaries; the comparison is useful because DPO is what you fall back to when no probe or feature exists. **[[20]](#ref-20)**

Both interp-reward methods invert the usual RLHF/RLVR contract. Instead of asking a human or a verifier whether the output looks good, they ask the model's own internals whether the rollout was being generated for the right reasons. That shift is powerful, and it is also the most controversial method in this essay, for reasons I will come back to.

---

## What works on what

Not every method applies to every model. A rough taxonomy by model type:

**Encoder classifiers**, of the FinBERT and similar kind. Calibration, head repair, vanilla LoRA, and probe-guided LoRA are the methods of choice. SAE-guided LoRA also works when an SAE is available for the encoder. Circuit-restricted edits and direct editing are less developed for encoders, though the principles transfer.

**Small to mid-size decoder LMs**, the Qwen-2/3 7-9B, Gemma-2 9B, Llama-3 8B class. The full menu applies. SASFT, DPO, probe- and SAE-guided LoRA, ReFT, C-ΔΘ, and RLFR have all been demonstrated at this scale, and the open-weights ecosystem (Gemma Scope, Qwen-Scope, pyvene, pyreft) makes the tooling tractable.

**Larger decoders**, 30B and up. Cost is the dominant constraint. ReFT's parameter efficiency makes it the most attractive learning method at this scale, and circuit-restricted edits scale gracefully because they touch a fraction of the parameters. Full-model SFT and even LoRA become expensive choices when the model is large.

---

## Does this actually beat clean-data SFT?

The hardest honest question. If you can construct a clean dataset that demonstrates the desired behavior, and you SFT on it with a KL anchor, does any of the interpretability-guided machinery do better?

The answer is **sometimes**, and the *sometimes* is worth being precise about.

Interp-guided methods win on **non-regression**. When the failure is narrow and the rest of the model is fine, restricting the update to a probe direction, an SAE feature, or a circuit measurably reduces collateral damage. SASFT demonstrates this directly: it not only reduces code-switching but maintains or improves multilingual benchmark scores; standard SFT on the same data does worse on both axes at once. **[[6]](#ref-6)**

They win on **data efficiency**. When you cannot collect a clean demonstration dataset (because the failure is rare, or the desired counterfactual is hard to write), an internal signal is often the only thing you have. RLFR's probe-on-hallucinations is a paradigm case: there is no clean dataset of "honest Gemma-3 outputs" to SFT on, but there is a learnable probe on the model's internal uncertainty. **[[18]](#ref-18)**

They win on **scope**. When the question is "fix this specific behavior and only that," circuit-restricted edits and direct editing methods do something LoRA cannot: they leave the rest of the model formally unchanged.

They do not automatically win on **raw target-metric performance**. If you have a clean dataset and the budget to train on it, plain LoRA with a KL anchor is often within a few points of the fancier methods on the target itself. The case for interpretability-guided repair is built on the other three axes: non-regression, data efficiency, and scope.

---

## Choosing in practice

![Figure 7: Match the repair method to the situation](/assets/ai-interpretability/repair-fig-match.svg)

*Figure 7. A starting heuristic for matching method to situation. The right method is determined by what evidence you have, not by what method sounds most impressive.*

The pattern across all of these methods is the one from the previous essay: start with the cheapest baseline that could fix the failure, then escalate to an interpretability-guided method only when the baseline costs too much in regressions, in data requirements, or in scope. Sometimes the answer is LoRA + KL anchor and a few thousand examples. Sometimes the answer is C-ΔΘ because you cannot afford a quarter-point regression on anything else. The discipline is in matching, not in picking the most surgical option available.

---

## A note on training on interpretability

There is a real concern about all of this that deserves to be stated honestly.

When you use an interpretability signal as a training target, you create pressure for the model to look good to that signal regardless of whether the underlying behavior actually improved. Penalize a probe direction and the model may learn to suppress the probe's view while keeping the behavior. Reward a feature and the model may learn to activate it spuriously. The LessWrong community calls this the "Most Forbidden Technique" family of failure modes, and recent commentary on RLFR-style training makes the case explicitly. **[[22]](#ref-22)**

The methods in this essay do not solve this concern, they mitigate it. SASFT-style training penalizes a small number of named features rather than reshaping the entire representation, which is harder to game cleanly. C-ΔΘ touches a small subset of parameters, which limits how much can be quietly relocated. Verification on held-out probes, not the ones used during training, catches a class of obvious gaming.

But the worry is real. The strongest argument for taking interpretability-guided repair seriously is also the strongest argument for being careful with it: when the model can read the same signal you are training on, you cannot fully separate "the behavior improved" from "the model learned to satisfy your probe." The discipline is to keep adding new probes, on independent data, and watch how long the behavior holds up.

---

## The repair mindset

The same mindset that organized the toolkit also organizes the repair menu. Pick the cheapest method that could fix the failure, escalate when the evidence says it cannot, combine only when the question genuinely requires it. The new ingredient is internal evidence: a probe direction, an SAE feature, a circuit, a feature reward.

Standard fine-tuning will not go away. For a lot of failures it remains the right answer. The case for interpretability-guided repair is not that it is universally better. It is that for a growing class of problems where regression matters, where clean data does not exist, or where the change has to be narrow, the internal evidence is what turns a blunt training loop into a surgical one.

The toolkit that the previous essay assembled was never an end in itself. Its real value shows up here: once you know what is broken inside the model, you can change it without breaking everything else around it.

---

## References

- <a id="ref-1"></a>**1. Edward Hu et al.** - [*LoRA: Low-Rank Adaptation of Large Language Models*](https://arxiv.org/abs/2106.09685) (2021)
- <a id="ref-2"></a>**2. Long Ouyang et al.** - [*Training Language Models to Follow Instructions with Human Feedback*](https://arxiv.org/abs/2203.02155) (2022)
- <a id="ref-3"></a>**3. John Hewitt &amp; Percy Liang** - [*Designing and Interpreting Probes with Control Tasks*](https://aclanthology.org/D19-1275/) (EMNLP 2019)
- <a id="ref-4"></a>**4. Yanai Elazar et al.** - [*Amnesic Probing: Behavioral Explanation with Amnesic Counterfactuals*](https://arxiv.org/abs/2006.00995) (TACL 2021)
- <a id="ref-5"></a>**5. Andy Zou et al.** - [*Representation Engineering: A Top-Down Approach to AI Transparency*](https://arxiv.org/abs/2310.01405) (2023)
- <a id="ref-6"></a>**6. Boyi Deng, Yu Wan, Baosong Yang, Fei Huang, Wenjie Wang, Fuli Feng** - [*SASFT: Sparse Autoencoder-guided Supervised Finetuning to Mitigate Unexpected Code-Switching in LLMs*](https://arxiv.org/abs/2507.14894) (ICLR 2026)
- <a id="ref-7"></a>**7. Trenton Bricken et al. (Anthropic)** - [*Towards Monosemanticity: Decomposing Language Models With Dictionary Learning*](https://transformer-circuits.pub/2023/monosemantic-features/) (2023)
- <a id="ref-8"></a>**8. Adly Templeton et al. (Anthropic)** - [*Scaling Monosemanticity: Extracting Interpretable Features from Claude 3 Sonnet*](https://transformer-circuits.pub/2024/scaling-monosemanticity/) (2024)
- <a id="ref-9"></a>**9. Google DeepMind** - [*Gemma Scope: open sparse autoencoders for Gemma*](https://deepmind.google/models/gemma/gemma-scope/) (2024)
- <a id="ref-10"></a>**10. Johnny Lin** - [*Neuronpedia: an open platform for interpretability tooling, features, and steering*](https://www.neuronpedia.org/) (2023–)
- <a id="ref-11"></a>**11. Zhengxuan Wu et al.** - [*ReFT: Representation Finetuning for Language Models*](https://arxiv.org/abs/2404.03592) (NeurIPS 2024)
- <a id="ref-12"></a>**12. Zhengxuan Wu et al.** - [*pyvene: A Library for Understanding and Improving PyTorch Models via Interventions*](https://github.com/stanfordnlp/pyvene) (2024)
- <a id="ref-13"></a>**13. Zhengxuan Wu et al.** - [*pyreft: A Representation Finetuning Library*](https://github.com/stanfordnlp/pyreft) (2024)
- <a id="ref-14"></a>**14.** - [*C-ΔΘ: Circuit-Restricted Weight Arithmetic for Selective Refusal*](https://arxiv.org/abs/2602.04521) (2026)
- <a id="ref-15"></a>**15. Michael Hanna, Sandro Pezzelle, Yonatan Belinkov** - [*Have Faith in Faithfulness: Going Beyond Circuit Overlap When Finding Model Mechanisms (EAP-IG)*](https://arxiv.org/abs/2403.17806) (2024)
- <a id="ref-16"></a>**16. Kevin Meng et al.** - [*Locating and Editing Factual Associations in GPT (ROME)*](https://arxiv.org/abs/2202.05262) (NeurIPS 2022)
- <a id="ref-17"></a>**17. Kevin Meng et al.** - [*Mass-Editing Memory in a Transformer (MEMIT)*](https://arxiv.org/abs/2210.07229) (ICLR 2023)
- <a id="ref-18"></a>**18. Aaditya Vikram Prasad, Connor Watts, Jack Merullo, Dhruvil Gala, Owen Lewis, Thomas McGrath et al. (Goodfire)** - [*RLFR: Reinforcement Learning from Feature Rewards*](https://www.goodfire.ai/research/rlfr) (2026)
- <a id="ref-19"></a>**19. Qwen Team** - [*Qwen-Scope: open sparse autoencoders for Qwen*](https://huggingface.co/collections/Qwen/qwen-scope) (2024)
- <a id="ref-20"></a>**20. Rafael Rafailov et al.** - [*Direct Preference Optimization: Your Language Model is Secretly a Reward Model*](https://arxiv.org/abs/2305.18290) (NeurIPS 2023)
- <a id="ref-21"></a>**21. Lee Sharkey et al.** - [*Open Problems in Mechanistic Interpretability*](https://arxiv.org/abs/2501.16496) (2025)
- <a id="ref-22"></a>**22. LessWrong** - [*Goodfire and Training on Interpretability*](https://www.lesswrong.com/posts/B3DQvjCD6gp2JEKaY/goodfire-and-training-on-interpretability) (2026)

---

*For speaking, podcasts, or collaboration on interpretability and high-stakes AI, reach out via [htatsat.com](https://htatsat.com/).*
