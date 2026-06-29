---
title: "Tuning the Mind of AI at Runtime"
date: 2026-04-01
description: "Editing a model's behavior from the inside, at inference, without retraining. A field guide to activation steering and the case for using it in production."
categories:
 - Opinion
draft: true
ShowToc: true
---

# Tuning the Mind of AI at Runtime

*We can reach into a running model and turn a behavior up or down. The limits are real; the production payoff is closer than the skeptics think.*

*Editing a model's behavior from the inside, at inference, without retraining ,  and the case for using it in production.*

---

## The most direct lever we have

Almost everything we do to control a model happens at arm's length.

We rewrite the prompt and hope the model reads it the way we intended. We bolt a guardrail onto the output after the fact. We fine-tune and redeploy, paying for a full training run and a fresh set of weights just to move a single behavior.

**Activation steering** asks a more audacious question. Can we reach inside the model *while it is thinking*, mid-forward-pass, at inference, and turn a behavior up or down directly?

No retraining. No gradient step. Just a deliberate nudge to the model's internal state as the computation flows through it.

For a real and useful class of behaviors, the answer is yes. The idea is old enough now to have a name. The researchers who first added a "wedding" vector to a running GPT-2 called it *activation engineering*: "a low-overhead way to steer models at runtime." **[[1]](#ref-1)**

Once you have watched it work, it is hard to go back. A model becomes measurably more cautious, or more concise, or more willing to refuse a harmful request, because you added one direction to its hidden state. That is a different relationship with the model than treating it as a sealed box you can only talk *at*.

Steering is the most direct expression of the inside-out view: not just reading a model's mind, but adjusting it.

---

## How steering works, in one minute

The core mechanism is almost embarrassingly simple.

You write two small sets of prompts. One set exhibits the behavior you want more of; the other exhibits its opposite. You run both through the model and record the hidden states at some layer. You take the difference of the means.

That difference is a **steering vector**: a direction in activation space pointing from "less of this behavior" toward "more of it." At inference, you add a scaled copy of it to the residual stream, and the output shifts. **[[2]](#ref-2)** **[[3]](#ref-3)**

![Figure 1: How activation steering works](/assets/ai-interpretability/steering-fig1-pipeline.svg)

*Figure 1. Contrast pairs in, a mean-difference direction out, added at a chosen layer during generation. That is the whole method, with no weight changes.*

Why should adding a vector do anything coherent at all? Because of a property the field calls the **linear representation hypothesis**: many human-meaningful concepts are encoded, to a good approximation, as straight-line directions in the model's activation space. **[[6]](#ref-6)** If "formality" or "refusal" really is a direction, then moving along it should turn that property up, and moving against it should turn it down. Steering is the practical cash-out of that geometry.

There is also a clean duality worth holding onto. Train a classifier on the same activations and you have a **probe** that *detects* a behavior. Add the direction back in and you have *control*. Same geometry, opposite verb.

That symmetry is why an inside-out toolkit gets detection and steering for nearly the same price. And it runs cheaply. In one careful study, a contrastive steering vector generalized *better than fine-tuning* with only a slight dip in general-knowledge benchmarks; because it is literally a constant folded into one of the model's bias terms, it added essentially zero inference cost and stacked on top of both fine-tuning and few-shot prompting. **[[3]](#ref-3)**

Cheap, reversible, composable, applied at runtime. That combination is what makes steering worth taking seriously as more than a research curiosity.

---

## A field guide to the families of steering

"Steering" is not one technique. It is a family of methods that share a single move, *intervene on internal activations*, but differ in three ways: how they find the direction, how interpretable that direction is, and how surgically they apply it.

It is worth walking through them, because the trade-offs differ and the most exciting recent work lives at the precise, conditional end of this spectrum.

![Figure 5: The families of steering at a glance](/assets/ai-interpretability/steering-fig5-families.svg)

*Figure 5. Five families, ordered roughly from the blunt and opaque to the selective and interpretable.*

### The workhorse: difference-of-means vectors

The original recipe was crude. Cache the activations for a single pair of contrasting prompts, subtract, and add the result back at a chosen layer with a coefficient and an injection location. It worked often enough on GPT-2 to be startling, and it was nearly as easy as prompting. **[[1]](#ref-1)** **[[2]](#ref-2)**

The move that turned this into something dependable was **Contrastive Activation Addition (CAA)**. Instead of one pair, you average the difference over *hundreds* of diverse contrast pairs. Averaging cancels the idiosyncratic noise that any single pair carries, leaving a much cleaner encoding of the behavior you actually care about. CAA also adds the vector to every token position after the prompt, rather than just one, so the effect persists through the response. **[[3]](#ref-3)**

This difference-of-means recipe is still the backbone of most steering in practice. It is what people mean when they say "steering vector," and it is exactly what Figure 1 describes.

### Probing, then pushing: ITI and representation engineering

A second family finds the direction with a *probe* rather than a raw mean, which buys precision.

**Inference-Time Intervention (ITI)** trains small linear classifiers on individual attention heads, locates the few heads that actually carry a property (truthfulness, in the original work), and then shifts activations along the probe's direction only in those heads, and only as much as needed. It is the surgical version: intervene where the signal lives, and leave everything else untouched. **[[4]](#ref-4)**

![Figure 6: Probing, then pushing](/assets/ai-interpretability/steering-fig6-probe-push.svg)

*Figure 6. A probe separates two behaviors; its normal vector is the steering direction. ITI pushes activations along that normal, only in the heads that carry the signal.*

**Representation Engineering (RepE)** generalizes the idea into a top-down program. Use a stimulus set to *read out* the direction a concept occupies, then *control* with that same direction. Zou and colleagues applied it across honesty, power-seeking, emotion, and more, and argued that reading and steering population-level directions should be a primary lens on the model rather than an afterthought. **[[5]](#ref-5)**

The throughline across this family is simple: a probe finds the direction, and the intervention pushes along it. Detection and control, once again, two sides of one coin.

### One direction, one behavior: concept editing

Sometimes a single direction governs an entire behavior, and editing that one direction edits the behavior wholesale.

The clearest example is refusal. Arditi and colleagues showed that in chat models, refusal is mediated by *one* direction in the residual stream. Add it and the model refuses more. Project it out at every layer, an operation called directional ablation, and the model's safety training is effectively bypassed: it begins complying with requests it would normally decline. **[[7]](#ref-7)**

![Figure 7: One direction, one behavior](/assets/ai-interpretability/steering-fig7-refusal-direction.svg)

*Figure 7. Amplifying the refusal direction hardens refusal; ablating it removes refusal, even for harmful requests. The power and the danger are the same fact.*

Two lessons sit inside that result. First, high-level behaviors can be remarkably low-rank, which is consistent with the linear-representation picture and is *why* steering them works at all. Second, the same lever cuts both ways. The direction that hardens refusal also, when removed, defeats it. Any honest treatment of steering has to hold both the power and the danger together.

### Steering named concepts: SAE features

The difference-of-means vector has one real weakness: it is opaque. You know it shifts a behavior, but you do not fully know what *else* it encodes, which makes side effects hard to anticipate.

SAE feature steering attacks that legibility problem head-on. A sparse autoencoder decomposes the model's dense activations into thousands of sparse, individually *named* features, with labels like "Golden Gate Bridge," "code with bugs," or "deceptive language," and you steer those instead of an unlabeled direction. **[[8]](#ref-8)**

![Figure 8: Steering named concepts](/assets/ai-interpretability/steering-fig8-sae-clamping.svg)

*Figure 8. Decompose the activation into named features, clamp the one you want to a chosen strength, then decode the modified features back into the residual stream.*

This is the technique behind Golden Gate Claude. Anthropic clamped the Golden Gate Bridge feature to a high value, and the model began relating every topic back to the bridge, fluently rather than as gibberish. The entertaining demo carried a serious point: clamping a feature establishes a *causal* link between an interpretable concept and the model's behavior. **[[8]](#ref-8)**

Mechanically there are two options. You can add the feature's decoder direction to the residual stream, the way you would add any steering vector; or you can *clamp* the feature's activation to some multiple of its maximum and splice the modified reconstruction back in, which is the formulation Anthropic uses. **[[8]](#ref-8)** **[[17]](#ref-17)**

And this is no longer a lab-only trick. Neuronpedia exposes tens of millions of features across open models like Gemma and lets you search for one and steer it live, through a browser or an API: Golden Gate Claude, except with any concept you can find. **[[11]](#ref-11)** The underlying sparse autoencoders ship as open artifacts. **[[12]](#ref-12)**

The honesty was baked in from the start, though. Anthropic's own follow-up study found that feature steering produces *unpredictable* changes across unrelated domains and degrades response quality at extreme strengths. **[[9]](#ref-9)** And the payoff depends heavily on *which* feature you pick: steering works well only when you select the right features, which is its own hard problem. **[[10]](#ref-10)**

---

## What steers cleanly, and what doesn't

Here is the part the breathless version leaves out, and the part the dismissive version gets wrong too. Steering is neither magic nor a toy. It works *reliably* for one kind of behavior and fails for another, and the dividing line is not mysterious.

![Figure 2: The steerability spectrum](/assets/ai-interpretability/steering-fig2-spectrum.svg)

*Figure 2. What steering is good at, what it is shaky at, and what it cannot do. The boundary tracks dimensionality: register steers, computation does not.*

The behaviors that steer cleanly live in low-dimensional, stylistic directions. Refusal and compliance, the original and still most robust application **[[2]](#ref-2)** **[[7]](#ref-7)**, along with sentiment, formality, verbosity, and the expression of uncertainty.

The reason they steer well is that they affect *register* more than *logic*. A model can say the same thing in a more formal key, or hedge instead of asserting, without its underlying reasoning collapsing. You are turning a tone knob, not rewiring a computation.

What does *not* steer is anything that requires the model to compute differently.

You cannot add a "be correct" vector and make a model know a fact it never learned. What you get instead is more *confidence*, not more accuracy, which is worse than useless because it sounds right. And you cannot steer your way through a multi-step proof, because reasoning is sequential computation spread across many layers, not a single direction at one of them.

The honest rule is one line. Steering changes how a model behaves, not what it knows or how hard it can think. Respect that boundary and steering is a precise instrument. Ignore it and you will conclude, wrongly, that the whole idea is broken.

---

## The knobs: where, what, and how hard

A steering vector has three knobs, and a practitioner earns their results by respecting all three.

**Where you inject.** Late layers carry the high-level semantic properties (intent, style, register) that behavioral steering targets. Early layers carry the model's grip on language itself, and injecting there tends to corrupt syntax before it changes behavior. A useful default is to start around three-quarters of the way through the network and sweep a few layers either side.

**What you contrast.** A steering vector is only as clean as its contrast pairs. If your "positive" examples are simultaneously more formal *and* more helpful *and* longer, the resulting vector entangles all three, and you will move things you never intended to move. Good pairs differ on exactly one dimension; a few dozen to a hundred of them, varied across topics, is the working range.

**How hard you steer.** This is the subtlest knob, because the relationship is not monotonic. Turn the strength up expecting more effect, and past a point the effect can *weaken or even reverse* while coherence falls apart. That non-monotonicity has now been characterized formally across many models. **[[14]](#ref-14)**

![Figure 3: The strength dial is non-monotonic](/assets/ai-interpretability/steering-fig3-strength.svg)

*Figure 3. More is not more. Below the sweet spot the vector does nothing; above it, the intended effect can reverse and output quality degrades. Schematic, based on the formal analysis of steering magnitude in **[[14]](#ref-14)**.*

Two practical wrinkles follow from these knobs.

First, you usually cannot stack many behaviors at one point. Two directions that share representation space, refusal and helpfulness for instance, interfere when you add them together. The cleaner approach is to inject *different* vectors at *different* layers, so they do not collide.

Second, steering fades. Over a long generation, the model's autoregressive conditioning on its own output gradually pulls it back toward default, so a single injection at the prompt can wash out after a few hundred tokens. If you need the effect to hold, you re-inject as generation proceeds, or you use one of the adaptive schemes discussed below.

None of this is exotic. It is just the difference between steering that holds up in use and steering that looks great in a demo and falls apart in production.

---

## Where steering bites back

I want to be blunt about the failure modes without being dismissive, because some of them are genuinely sneaky, and a few are safety-relevant.

**The same vector behaves differently on different inputs.** A direction you characterized by its *average* effect can misbehave badly on inputs you never tested. You cannot summarize a steering vector by one number; you have to reason about the variance across the whole input distribution. **[[13]](#ref-13)**

**A "safe-looking" steering vector can quietly loosen safety.** This is the one that should worry anyone deploying steering for protection. An over-refusal vector tuned to pass standard evaluations can simultaneously *increase* the model's vulnerability to adversarial jailbreaks. You tighten the front door while leaving a window open, and your tests never see it. **[[15]](#ref-15)** That is exactly the failure mode that survives the lab and bites in production, and it is an argument *for* steering with discipline, not against steering.

**Steering can shift calibration, not just tone.** Dialing an "uncertainty" feature does not only change how the model talks about confidence; it can move the actual distribution of token probabilities, sometimes improving accuracy by hedging and sometimes degrading it. The output you read is not the only thing that changed.

**Steering vectors are not unique.** Recent theory shows they are fundamentally *non-identifiable*: many different directions produce indistinguishable behavior. So when two teams find "different" vectors for the same concept, both may be right, and we should stop treating any single vector as a clean, interpretable artifact even as we keep using it. **[[16]](#ref-16)**

A candid community accounting reaches the same two-sided verdict: steering is genuinely useful and genuinely oversold at once. **[[18]](#ref-18)** And on behaviors where a well-written prompt already does the job, the prompt is sometimes simply the better tool. Careful baselines can match or beat steering, so steering should earn its place where prompting cannot reach. **[[17]](#ref-17)**

None of this is a verdict against steering. It is the operating manual.

---

## From a blunt vector to a conditional dial

The objection that used to end the conversation was simple. A steering vector is *always on*. Add a refusal direction and the model refuses *everything* harder, which is useless when most of your traffic is benign.

That objection is dissolving fast, and watching it dissolve is the most exciting thing happening in this corner of the field.

The pivotal idea is **conditional steering**. You analyze the activations during inference and apply the vector *only when the input meets a condition*, where the condition is itself read off the model's own representations, with no extra classifier in the loop. In effect: if this looks harmful, steer; otherwise, do not. **[[19]](#ref-19)**

![Figure 4: Conditional, probe-gated steering](/assets/ai-interpretability/steering-fig4-conditional.svg)

*Figure 4. Conditional steering applies the dial only when an internal condition fires, decided in activation space, and it acts before the model's action does.*

That single move turns a blunt instrument into a selective one, and it is the bridge from academic steering vectors to production safety systems.

The frontier past it is moving in weeks, not years.

Instead of one static vector applied uniformly, **steering vector fields** learn a direction that *varies with the activation itself*, coordinated across layers: context-dependent control rather than a global nudge. **[[20]](#ref-20)** **Fine-grained** methods steer only the few discriminative dimensions, at a per-input strength, touching less and achieving more. **[[21]](#ref-21)**

A wave of **sparse-autoencoder-guided** steering aims the dial at interpretable features rather than opaque directions. It can control reasoning strategies like backtracking and verification **[[22]](#ref-22)**, learn a policy that picks which feature to amplify token by token while emitting a readable log **[[23]](#ref-23)**, and even learn sparse steering targets without contrast pairs at all, with no measured loss of general ability. **[[24]](#ref-24)**

Compositional approaches replace additive vectors with soft projections that support boolean operations over concepts, so you can combine goals without the interference that plagues naive vector addition. **[[25]](#ref-25)** And a unifying view is emerging that places fine-tuning, LoRA, and steering on a single spectrum of control signals, which means the trade-off between control and coherence can eventually be *optimized* rather than guessed at. **[[26]](#ref-26)**

The common direction of all of this: steering is becoming conditional, fine-grained, and legible. Exactly the three properties a blunt mean-difference vector lacked.

---

## The case for steering in production

So: should you steer a live model, at inference time, in production?

My answer is yes, narrowly, conditionally, and with the instruments on. And I think the people who still say "not yet" are anchored to the always-on blunt vector that the last year has already moved past.

The reason to *want* runtime steering is that it occupies a niche nothing else fills.

Prompting reaches the model from the outside and hopes. Fine-tuning is expensive, slow to ship, and a sledgehammer for a tap. Steering is *inference-time* (no retraining, no redeploy), *reversible* (turn the dial down and it is gone), *fine-grained* (a continuous strength, not a binary switch), and, crucially for agents, it works *even when you do not control the prompt*, because it operates on the model's internal state rather than its input.

That last property is the one that matters most for where AI is going. In a multi-tenant agent stack, a poisoned document or a hijacked tool call can arrive mid-trajectory, long after your prompt. The place you most want a lever in that moment is inside the model, before the action fires. Steering is the only lever that sits there.

Put conditional steering and runtime probing together and you get something close to an **immune system for the model**. Probes watch the activations; the instant they detect a problem state (sandbagging, a drift toward an unsafe tool call, a sycophantic collapse), a steering intervention corrects it in real time, only for that input, before it ever reaches the output. Early systems already demonstrate exactly this detect-then-steer loop **[[19]](#ref-19)** **[[27]](#ref-27)**, and general-purpose tooling to run it at the application layer now exists. **[[11]](#ref-11)** **[[28]](#ref-28)**

There is a governance bonus, too. Because every intervention is an explicit, logged event ("probe X fired at strength Y on request Z"), conditional steering produces an audit trail by construction. You can show a reviewer not only what the model did, but what you detected and what you did about it, before the output left the building.

I will keep the honesty intact, because the bounds are real.

Steering is *probabilistic, not a guarantee*. It needs *access to activations*, so it lives on open-weight or self-hosted models and on sidecars, not behind a closed API. And it is the wrong tool for factual control, where retrieval or fine-tuning belong.

The disciplined recipe is non-negotiable. A narrow, well-defined behavior. Conditional application rather than always-on. Side effects measured *including under adversarial pressure*. Per-input strength. And continuous monitoring, so the dial can be re-tuned as the model and the traffic shift.

But within those bounds, the thing works, and it gets more precise every month.

The deepest reason I am bullish is that steering is the natural endpoint of taking interpretability seriously. If we can read what a model is about to do from the inside, the next question is unavoidable: can we change it, gently, while it is still deciding?

Increasingly, the answer is yes. And that is a far more powerful place to stand than waiting at the output to see what the model already did.

---

## References

- <a id="ref-1"></a>**1. Alex Turner, Monte MacDiarmid, David Udell et al.** - [*Steering GPT-2-XL by Adding an Activation Vector*](https://www.lesswrong.com/posts/5spBue2z2tw4JuDCx/steering-gpt-2-xl-by-adding-an-activation-vector) (LessWrong / Alignment Forum, 2023)
- <a id="ref-2"></a>**2. Alex Turner et al.** - [*Activation Addition: Steering Language Models Without Optimization*](https://arxiv.org/abs/2308.10248) (2023)
- <a id="ref-3"></a>**3. Nina Rimsky et al.** - [*Steering Llama 2 via Contrastive Activation Addition*](https://arxiv.org/abs/2312.06681) (2024)
- <a id="ref-4"></a>**4. Kenneth Li et al.** - [*Inference-Time Intervention: Eliciting Truthful Answers from a Language Model*](https://arxiv.org/abs/2306.03341) (2023)
- <a id="ref-5"></a>**5. Andy Zou et al.** - [*Representation Engineering: A Top-Down Approach to AI Transparency*](https://arxiv.org/abs/2310.01405) (2023)
- <a id="ref-6"></a>**6. Kiho Park, Yo Joong Choe, Victor Veitch** - [*The Linear Representation Hypothesis and the Geometry of Large Language Models*](https://arxiv.org/abs/2311.03658) (2024)
- <a id="ref-7"></a>**7. Andy Arditi et al.** - [*Refusal in Language Models Is Mediated by a Single Direction*](https://arxiv.org/abs/2406.11717) (2024)
- <a id="ref-8"></a>**8. Adly Templeton et al. (Anthropic)** - [*Scaling Monosemanticity: Extracting Interpretable Features from Claude 3 Sonnet*](https://transformer-circuits.pub/2024/scaling-monosemanticity/) (2024): feature clamping / Golden Gate Claude
- <a id="ref-9"></a>**9. Anthropic (Durmus et al.)** - [*Evaluating Feature Steering: A Case Study in Mitigating Social Biases*](https://www.anthropic.com/research/evaluating-feature-steering) (2024)
- <a id="ref-10"></a>**10. Dana Arad, Aaron Mueller, Yonatan Belinkov** - [*SAEs Are Good for Steering, If You Select the Right Features*](https://arxiv.org/abs/2505.20063) (2025)
- <a id="ref-11"></a>**11. Johnny Lin** - [*Neuronpedia: interactive feature steering and tooling for analyzing neural networks*](https://www.neuronpedia.org/steer) (2023–)
- <a id="ref-12"></a>**12. Google DeepMind** - [*Gemma Scope: open sparse autoencoders for Gemma*](https://deepmind.google/models/gemma/gemma-scope/) (2024)
- <a id="ref-13"></a>**13. Daniel Tan et al.** - [*Analysing the Generalisation and Reliability of Steering Vectors*](https://arxiv.org/abs/2407.12404) (NeurIPS 2024)
- <a id="ref-14"></a>**14. Magamed Taimeskhanov, Samuel Vaiter, Damien Garreau** - [*Towards Understanding Steering Strength*](https://arxiv.org/abs/2602.02712) (2026)
- <a id="ref-15"></a>**15. Nikhil Goyal &amp; Hal Daumé III** - [*Steering Safely or Off a Cliff? Rethinking Specificity and Robustness in Inference-Time Interventions*](https://arxiv.org/abs/2602.06256) (2026)
- <a id="ref-16"></a>**16. S. Venkatesh &amp; A. Kurapath** - [*On the Identifiability of Steering Vectors in Large Language Models*](https://arxiv.org/abs/2602.06801) (2026)
- <a id="ref-17"></a>**17. Zhengxuan Wu et al.** - [*AxBench: Steering LLMs? Even Simple Baselines Outperform Sparse Autoencoders*](https://arxiv.org/abs/2501.17148) (2025)
- <a id="ref-18"></a>**18. KASL / UCL DARK** - [*A Sober Look at Steering Vectors for LLMs*](https://www.alignmentforum.org/posts/QQP4nq7TXg89CJGBh/a-sober-look-at-steering-vectors-for-llms) (2024)
- <a id="ref-19"></a>**19. Bruce W. Lee et al.** - [*Programming Refusal with Conditional Activation Steering (CAST)*](https://openreview.net/forum?id=Oi47wc10sm) (ICLR 2025)
- <a id="ref-20"></a>**20. J. Li et al.** - [*Steering Vector Fields for Context-Aware Inference-Time Control in LLMs*](https://arxiv.org/abs/2602.01654) (2026)
- <a id="ref-21"></a>**21. AUSteer** - [*Fine-Grained Activation Steering: Steering Less, Achieving More*](https://arxiv.org/abs/2602.04428) (2026)
- <a id="ref-22"></a>**22. Y. Fang, W. Wang et al.** - [*Controllable LLM Reasoning via Sparse Autoencoder-Based Steering*](https://arxiv.org/abs/2601.03595) (2026)
- <a id="ref-23"></a>**23. S. Cho, Z. Wu, A. Koshiyama** - [*Control Reinforcement Learning: Interpretable Token-Level Steering via SAE Features*](https://arxiv.org/abs/2602.10437) (2026)
- <a id="ref-24"></a>**24. YaPO** - [*Learnable Sparse Activation Steering Vectors for Domain Adaptation*](https://arxiv.org/abs/2601.08441) (2026)
- <a id="ref-25"></a>**25. Rinske Postmus et al.** - [*From Steering Vectors to Conceptors: Compositional Affine Activation Steering for LLMs*](https://openreview.net/forum?id=0Yu0eNdHyV) (2024)
- <a id="ref-26"></a>**26.** - [*Why Steering Works: Toward a Unified View of Language Model Parameter Dynamics*](https://arxiv.org/abs/2602.02343) (2026)
- <a id="ref-27"></a>**27. ARGUS** - [*Activation-Guided Steering Against Multimodal Attacks*](https://arxiv.org/abs/2501.09661) (2025)
- <a id="ref-28"></a>**28. IBM** - [*activation-steering: a general-purpose activation steering library*](https://github.com/IBM/activation-steering) (ICLR 2025)

---

*For speaking, podcasts, or collaboration on interpretability and high-stakes AI, reach out via [htatsat.com](https://htatsat.com/).*
