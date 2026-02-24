---
title: "Interpretability : The Missing Link in Enterprise AI"
date: 2026-01-05T00:00:00Z
lastmod: 2026-01-05T00:00:00Z
draft: true
description: 'From "Understanding Neurons" to Measurable Control Systems'
author: ["H.T."]
categories: ["Opinion"]
ShowToc: true
---

# Interpretability : The Missing Link in Enterprise AI  
*Why the next era of AI adoption will be won by teams who can **inspect, debug, and govern** models, not just prompt them.*

---

## The invisible risk

**The next financial crisis could be one model failure away.** This might sound dramatic at first, but it may be true if you think about it deeply.

Not because a single model will "cause" a crisis in isolation (systems don't collapse that cleanly), but because crises are born from **correlated opacity**: many institutions relying on mechanisms they cannot fully interrogate, operating under stress, while incentives push decision cycles faster than understanding.

In 2008, models weren't malicious. They were **opaque in practice**: assumptions, sensitivities, and failure modes were not legible to the people who depended on them. The damage wasn't just "wrong numbers." It was **delayed comprehension**: we learned too late what we didn't understand.

That same structure is returning, but with a new shape: modern AI systems can fail **quietly** while sounding correct.

Today's AI is in many ways a **computer without a monitor**: we have guardrails, system prompts, and surface-level controls, but almost nothing that lets organizations look inside. Responsibility and control are not keeping pace with model development. When a self-driving car gets a ticket, it's the owner who pays—not the company that built the system. Organizations need to be ready with a response, and that requires visibility into how models behave, not just how they answer.

### When “correct” is still unsafe

The most dangerous failure mode in modern generative AI is not an obviously wrong answer. It is **a right-looking answer produced for unstable internal reasons**.

That distinction matters because the operating environment always shifts:

- inputs drift,  
- incentives change,  
- workflows expand,  
- models update,  
- tooling chains grow longer.  

A system can look fine under a narrow test harness and still be fragile under distribution shift. The real risk is not “inaccuracy,” it’s **internal fragility hidden by plausible outputs**.

The best public articulation of this is the "race" framing: model capability is compounding faster than interpretability maturity, and if interpretability arrives late, we still deploy, just deploy blind. **<u>[[1]](#ref-1)</u>**

---

## From answers to actions

Generative AI is no longer just summarizing. It is being wired into workflows that **act**:

- drafting client communications,  
- extracting covenant terms,  
- recommending operational steps,  
- routing cases,  
- calling tools,  
- orchestrating multi-step processes.  

Once the model is in the loop, the failure modes are no longer confined to a wrong sentence. They become **cascades**: one small error becomes an irreversible chain reaction, especially in agentic systems where tool-use compounds mistakes.

This is why interpretability is not a “nice-to-have.” It is the missing layer that makes scaled deployment **governable** rather than faith-based.

---

## Why interpretability gets dismissed

If you want a convincing argument, you don’t pretend skepticism is ignorance. You concede what is true:

A lot of interpretability work has looked fragile, slow, and academic to practitioners.

And the skeptics are responding to real gaps. The way to avoid interpretability being dismissed is not to argue past that gap but to give enterprises **deployable tools**—and in practice, the tools that are deployable often go under different names (observability, model governance, acceptance testing).

### The engineering bar

The strongest critique is simple:  
**“Show me the interpretability tools that can be deployed in production.”**

That bar is not anti-science. It is an insistence on:

- repeatability,  
- automation,  
- revalidation after model updates,  
- measurable benefit against strong baselines,  
- clear operational integration.  

That critique has been stated explicitly in "engineer-first" framings of interpretability progress: compelling narratives often outrun deployable leverage. **<u>[[4]](#ref-4)</u>**

### The benchmark gap

Interpretability research historically produced insight without always producing **measurement**. That is why the benchmark question is not a footnote: it's the bridge to enterprise adoption.

When benchmarks arrive, two things happen:

1. weak methods stop being protected by aesthetics,  
2. progress becomes legible to non-believers.  

Recent benchmark work has sharpened this into a hard standard: if your elegant method cannot beat a simple baseline, you do not get to claim operational progress.

A concrete example is **AxBench**, which evaluates representation-based steering and shows how strong "boring" baselines can be. **<u>[[6]](#ref-6)</u>**  
And interpretability-specific suites like **SAEBench** exist precisely because proxy metrics (like reconstruction loss) are not enough. You need evaluations tied to capabilities people care about: disentanglement, concept detection, and practical tasks. **<u>[[5]](#ref-5)</u>**

### The closed-model trap

In many enterprises, teams don’t have the kind of access that a lot of mechanistic interpretability assumes (weights, activations, intervention hooks). With frontier closed APIs, causal inspection is constrained.

So the critique is fair:  
**“How can interpretability matter if we can’t look inside the model?”**

But it becomes less paralyzing once you stop treating interpretability as a microscope and start treating it as infrastructure:

- you can build **white-box controls** on open or internal models,  
- use them to develop **acceptance tests** and **detectors**,  
- and enforce system-level governance even when the vendor remains closed.  

In other words: closed models don't eliminate interpretability. They shift where interpretability lives (in the stack, in evaluation gates, in vendor requirements, in hybrid architectures).

### Limited to one or two layers

Another legitimate complaint:  
**“Understanding one neuron doesn’t explain a decision.”**

Correct. Most mechanistic interpretability tools are still limited to one or two layers and some circuits; they don't yet go much beyond that. Reasoning and control are typically **distributed** and entangled. Single-layer “gotchas” collapse under distribution shift.

This is exactly why the field has moved toward **features**, **circuits**, and **interventions**: because the goal is not a cute neuron story; it's identifying the mechanisms that actually compute behavior across contexts. **<u>[[7]](#ref-7)</u>** **<u>[[11]](#ref-11)</u>** **<u>[[13]](#ref-13)</u>**

---

## Where the frontier is

The enterprise perception of interpretability is often stuck in an old picture: researchers “staring at neurons.” That’s not where the frontier is.

The shift is more important than it looks:

> Interpretability should become a toolkit that can be engineered into systems.

### Features at scale

A core blockage in early mechanistic interpretability was **superposition**: many concepts represented in overlapping, mixed ways. Dictionary-learning approaches (often discussed under the banner of monosemanticity) operationalize a scalable idea:

> learn a representation where internal activations become decomposable into more separable “features.”

This reframes interpretability from hand-labeling neurons to building **feature dictionaries** that can be searched, tested, and versioned. **<u>[[7]](#ref-7)</u>** **<u>[[8]](#ref-8)</u>**

Platforms that expose these artifacts matter because they turn interpretability into something shareable: feature browsers, activation examples, clustering, labeling workflows, and reproducible pointers into the model's internals. **<u>[[9]](#ref-9)</u>**

### From features to circuits

Features answer: **“what is represented?”**  
Circuits aim to answer: **“what computation is implemented?”**

The circuits framing remains one of the cleanest statements of the mission: not merely correlate internal units with concepts, but reverse-engineer the algorithms the network uses. **<u>[[10]](#ref-10)</u>** **<u>[[11]](#ref-11)</u>** **<u>[[12]](#ref-12)</u>**

And the most persuasive circuit work tends to share a trait enterprises recognize immediately: it attempts to meet an engineering standard: faithfulness tests, quantitative evaluation, and clear criteria for what counts as an explanation.

A flagship example is the **Indirect Object Identification** circuit work in GPT-2 small, which explicitly tries to bridge "toy interpretability" and "real model behavior" with measurable completeness. **<u>[[11]](#ref-11)</u>**

### From observation to intervention

The real inflection point is causality.

Observation alone doesn’t govern a model. Governance requires the ability to answer:

- *If I dampen this mechanism, does the behavior change the way the hypothesis predicts?*  
- *If I patch in an activation from a clean run, do I recover the correct behavior?*  
- *If a failure appears, can I localize a causal contributor rather than guess?*  

That's why activation patching / attribution patching became central as a "best practice" discipline: interpretability is not a story until it survives intervention tests. **<u>[[13]](#ref-13)</u>** **<u>[[14]](#ref-14)</u>**

This is also where healthy skepticism belongs. If a method doesn't beat strong baselines on steering, detection, or control tasks, the method isn't "almost there": it's not yet an operational tool. That standard is not anti-interpretability. It's what makes interpretability adoptable. **<u>[[6]](#ref-6)</u>** **<u>[[5]](#ref-5)</u>**

---

## Enterprise level interpretability

Here is the reframing that unifies nearly every point above:

**Interpretability fails when it is treated as a microscope.  
It works when it is treated as enterprise-level interpretability.**

A microscope produces insights.  
Enterprise-level interpretability produces **governance**.

### What enterprise-level interpretability produces

A serious interpretability layer in a production stack should produce artifacts that survive scrutiny:

**Model diffs**  
What changed internally between v1 and v2? What new mechanisms appeared? What weakened?

**Trace artifacts**  
For a given decision: which internal features/circuits were active, and how did they route evidence?

**Causal tests**  
What happens when we suppress, patch, or amplify candidate mechanisms?

**Runtime monitors**  
Internal signals that predict failure earlier than output-based monitoring can.

**Governance outputs**  
Exportable evidence packs: versioned, reproducible, reviewable, built for audit, not vibes.

This is why benchmarks like SAEBench are important: they move the field from "we saw something interesting" to "we can measure whether a method is reliably disentangling, localizing, and supporting practical interventions." **<u>[[5]](#ref-5)</u>**

### How this fits regulated deployment

In regulated settings, the deployment question is rarely “does it work in a demo?” It is:

- Can we bound failure modes?  
- Can we detect regressions after an update?  
- Can we provide an audit trail for decisions?  
- Can we show incident response procedures that are more rigorous than prompt tweaks?  

Public system cards and safety documentation are already converging on this governance shape: evaluation, mitigations, and structured evidence. Interpretability strengthens that layer by adding mechanistic evidence rather than purely black-box outcome tests. **<u>[[3]](#ref-3)</u>** **<u>[[15]](#ref-15)</u>**

---

## The high-stakes bar

Interpretability becomes convincing when it is framed as the bar for high-stakes systems:

If a model can move money, approve credit, generate legal text, or trigger operational actions, then it must be governable.

“Governable” means: measurable, auditable, monitorable, and debuggable.

### A minimal bar for high-stakes workflows

A reasonable minimum standard looks like:

- repeatable evaluations that detect drift and regressions,  
- mechanism-aware checks where available (features/circuits/interventions),  
- upgrade gates that prevent silent behavior shifts,  
- incident playbooks that go beyond “change the prompt and hope.”  

Real deployment incidents make the point: black-box evaluation can miss behavior shifts that only become obvious after release, and post-hoc debugging is painful when you can't see what changed internally. **<u>[[3]](#ref-3)</u>**

### Why monitoring isn't enough

Output monitoring is necessary, but it is not sufficient.

Monitoring answers: *"Something went wrong."*  
Enterprise-level interpretability answers: *"What changed, why it broke, and what control fixes it without collateral damage."*

The difference is the difference between:

- reacting to symptoms, and  
- debugging root causes.  

This is the same pattern that separates fragile prototypes from real systems in every mature engineering discipline.

---

## Conclusion: the teams that win

We are going to deploy powerful models. Incentives make that nearly inevitable. The real question is how we deploy them:

- as black-box oracles surrounded by rituals, or  
- as engineered systems surrounded by controls.  

The "race" framing captures the stakes: interpretability must mature quickly enough to matter. **<u>[[1]](#ref-1)</u>**  
The optimism case is also real: the information is not hidden. We have computational graphs, internal structure, and early evidence that scalable methods can surface meaningful mechanisms. **<u>[[2]](#ref-2)</u>**  
And the skeptic discipline is necessary: progress must be benchmarked against strong baselines, and explanations must survive causal tests. **<u>[[16]](#ref-16)</u>** **<u>[[6]](#ref-6)</u>**

**Interpretability is the difference between AI that scales and AI that scares.**  
Not because it makes models transparent in a philosophical sense, but because it enables the engineering primitives that high-stakes deployment requires: diagnosis, control, evidence, and accountability.

The teams that win the next era will not merely build smarter agents.  
They will build **governable** agents.

Interpretability, done as infrastructure, is how you get there.

---

## References {#references}

- <a id="ref-1"></a>**1. Dario Amodei** — [_The Urgency of Interpretability_](https://www.darioamodei.com/post/the-urgency-of-interpretability) (Apr 2025)  
- <a id="ref-2"></a>**2. Eric Ho (Goodfire)** — [_On Optimism for Interpretability_](https://www.goodfire.ai/blog/on-optimism-for-interpretability) (Jul 2025)  
- <a id="ref-3"></a>**3. OpenAI** — [_Expanding on what we missed with sycophancy_](https://openai.com/index/expanding-on-sycophancy/) (May 2025)  
- <a id="ref-4"></a>**4. Stephen Casper** — [_The Engineer's Interpretability Sequence_](https://www.alignmentforum.org/s/6GfFLrY9v8x7zMZ7N) (Alignment Forum)  
- <a id="ref-5"></a>**5. Adam Karvonen et al.** — [_SAEBench: A Comprehensive Benchmark for Sparse Autoencoders_](https://openreview.net/forum?id=qrU3yNfX0d) (OpenReview)  
- <a id="ref-6"></a>**6. AxBench** — [concept steering / method-vs-baseline benchmarking (project/paper hub)](https://axbench.org/)  
- <a id="ref-7"></a>**7. Anthropic** — [_Towards Monosemanticity: Decomposing Language Models with Dictionary Learning_](https://www.anthropic.com/research/towards-monosemanticity-decomposing-language-models-with-dictionary-learning)  
- <a id="ref-8"></a>**8. Transformer Circuits** — [_Decomposing Language Models With Dictionary Learning_](https://transformer-circuits.pub/2023/monosemantic-features)  
- <a id="ref-9"></a>**9. Neuronpedia** — [SAE feature explorer and docs](https://www.neuronpedia.org/)  
- <a id="ref-10"></a>**10. Chris Olah (Distill)** — [_Circuits: Zoom In_](https://distill.pub/2020/circuits/zoom-in/)  
- <a id="ref-11"></a>**11. Anthropic Interpretability Team** — [_Transformer Circuits Thread_](https://transformer-circuits.pub/)  
- <a id="ref-12"></a>**12. Anthropic Interpretability Team** — [_Transformer Circuits_](https://transformer-circuits.pub/) (overview / index)  
- <a id="ref-13"></a>**13. Neel Nanda** — [_Attribution Patching_](https://www.neelnanda.io/) (methods + best practices)  
- <a id="ref-14"></a>**14. Neel Nanda** — [writing on probes / mechanistic interpretability (incl. Othello-GPT materials)](https://www.neelnanda.io/)  
- <a id="ref-15"></a>**15. Anthropic** — [model safety/evaluation artifacts (example transparency patterns)](https://www.anthropic.com/transparency)  
- <a id="ref-16"></a>**16. Chris Potts** — [_Assessing skeptical views of interpretability research_](https://web.stanford.edu/~cgpotts/) (talk / notes)  
- <a id="ref-17"></a>**17. CIO / IDC reporting** — [estimates on how many AI pilots fail to reach production (one widely cited figure: 88%)](https://www.cio.com/article/2471646/ai-projects-fail-in-production-88-percent-fail-to-make-it-from-pilot-to-production.html)
---
title: "Interpretability: The Missing Link in Enterprise AI"
date: 2026-01-05T00:00:00Z
lastmod: 2026-01-05T00:00:00Z
draft: false
description: 'From "Understanding Neurons" to Production-Ready Interpretability'
author: ["H.T."]
categories: ["Opinion"]
ShowToc: true
---

# Interpretability: The Missing Link in Enterprise AI  
*How enterprises can **inspect, debug, and govern** AI internals — not just prompt them.*

---

## The invisible risk

If an autonomous car gets a ticket, who pays? Not the manufacturer. The operator does — the person or organization that chose to deploy it. That is what "production" means: not usage, but ownership of consequences.

Enterprise AI is crossing the same line. Once models shape credit decisions, draft legal text, move money, or trigger operational actions, "the model did it" stops being an explanation. The enterprise becomes responsible for outcomes, and responsibility requires more than output monitoring. It requires the ability to explain behavior, defend decisions, and show what changed when something breaks.

### When "correct" is still unsafe

The most dangerous failure mode in modern generative AI is not an obviously wrong answer. It is a right-looking answer produced for unstable internal reasons.

That matters because the operating environment always shifts: inputs drift, workflows expand, tools change, models update. A system can look reliable under a narrow test harness and still be fragile under distribution shift. The real risk is not inaccuracy. It is internal fragility hidden by plausible outputs.

This is why the "race" framing matters: capability is compounding faster than interpretability maturity, and if interpretability arrives late, we will still deploy — just deploy blind. **<u>[[1]](#ref-1)</u>**

---

## Why it gets dismissed

A convincing case for interpretability cannot treat skepticism as ignorance. It has to concede what is true: much of it — including **mechanistic interpretability**, the kind that looks inside the model at weights, activations, and how computation flows — has looked fragile, slow, and academic to practitioners.

The skepticism is often a practical response to one question:

### Not production-ready 

The production bar is not anti-science. It is a demand for repeatability and operational fit: can the approach be automated; can it be revalidated after model updates; does it demonstrate measurable benefit against strong baselines; can it integrate into deployment, incident response, and audit review.

The production-first critique makes this point directly: compelling narratives can outrun deployable leverage. **<u>[[4]](#ref-4)</u>**

### Not measurable 

Interpretability has historically produced insight without always producing measurement. That is why benchmarks matter: they make progress legible to non-believers and prevent "interesting" results from being confused with deployable control.

A concrete example is **AxBench**, which evaluates representation-based steering and shows how strong "boring" baselines can be. **<u>[[6]](#ref-6)</u>**  
And suites like **SAEBench** exist because proxy metrics (like reconstruction loss) are not enough; you need evaluations tied to things people care about — disentanglement, concept detection, and practical control tasks. **<u>[[5]](#ref-5)</u>**

### Built for open-source

The current mechanistic interpretability toolkit works well where you have access: open-source or small models, with weights, activations, and intervention hooks in the clear. With closed frontier APIs, those internals are hidden — and the same toolkit cannot be applied. You cannot patch activations or trace circuits when you cannot see inside the model.

This, however, does not make interpretability irrelevant. It changes where and how you apply it: build deeper visibility on models you *can* inspect (open or internal), turn those results into acceptance tests, monitors, and governance requirements, and apply those controls at the system level even when part of the stack is closed.

---

## The interpretability toolkit

The enterprise perception of interpretability is often stuck in an old picture: "staring at neurons." That is not where the frontier is. The frontier is trying to turn interpretability into a toolkit that helps answer production questions:

- What changed after the last update?
- Which internal mechanism drove this behavior?
- What control actually fixes the failure without collateral damage?

### Observing model internals

A core blockage in early mechanistic interpretability was **superposition**: many concepts represented in overlapping, mixed ways. Dictionary-learning approaches (often discussed under the banner of monosemanticity) operationalize a scalable idea:

> learn a representation where internal activations become decomposable into more separable "features."

This reframes interpretability from hand-labeling neurons to building **feature dictionaries** that can be searched, tested, and versioned. **<u>[[7]](#ref-7)</u>** **<u>[[8]](#ref-8)</u>**

Platforms that expose these artifacts matter because they turn interpretability into something shareable: feature browsers, activation examples, clustering, labeling workflows, and reproducible pointers into the model's internals. **<u>[[9]](#ref-9)</u>**

### From features to circuits

Features answer: **"what is represented?"**  
Circuits aim to answer: **"what computation is implemented?"**

The circuits framing remains one of the cleanest statements of the mission: not merely correlate internal units with concepts, but reverse-engineer the algorithms the network uses. **<u>[[10]](#ref-10)</u>** **<u>[[11]](#ref-11)</u>** **<u>[[12]](#ref-12)</u>**

And the most persuasive circuit work tends to share a trait enterprises recognize immediately: it attempts to meet an engineering standard — faithfulness tests, quantitative evaluation, and clear criteria for what counts as an explanation.

### From observation to intervention

The real inflection point is causality.

Observation alone doesn't govern a model. Governance requires the ability to answer:

- *If I dampen this mechanism, does the behavior change the way the hypothesis predicts?*
- *If I patch in an activation from a clean run, do I recover the correct behavior?*
- *If a failure appears, can I localize a causal contributor rather than guess?*

That's why activation patching / attribution patching became central as a "best practice" discipline: interpretability is not a story until it survives intervention tests. **<u>[[13]](#ref-13)</u>** **<u>[[14]](#ref-14)</u>**

This is also where healthy skepticism belongs. If a method doesn't beat strong baselines on steering, detection, or control tasks, the method isn't "almost there": it's not yet an operational tool. That standard is not anti-interpretability. It's what makes interpretability adoptable. **<u>[[6]](#ref-6)</u>** **<u>[[5]](#ref-5)</u>**

---

## Moving to enterprise-level interpretability

Treating interpretability as a research tool produces insights. Treating it as an enterprise discipline produces governance.

In practice, this means building interpretability into the production lifecycle: versioning, regression testing, incident response, and audit-ready documentation — so that interpretability does not depend on a few experts or a one-time investigation.

### What enterprise interpretability should produce

A serious interpretability layer should generate artifacts that survive scrutiny:

**Model diffs**  
What changed internally between v1 and v2? What weakened? What new behavior appeared?

**Trace artifacts**  
For a given decision: which internal signals mattered and how did evidence route to the output?

**Causal tests**  
What happens when we suppress, patch, or amplify candidate mechanisms?

**Runtime monitors**  
Internal signals that can warn of failure earlier than output-only monitoring.

**Governance outputs**  
Exportable evidence packs: versioned, reproducible, reviewable, built for audit — not vibes.

This is why benchmarks like SAEBench matter: they move interpretability from "we saw something interesting" to "we can measure whether a method reliably separates, localizes, and supports intervention." **<u>[[5]](#ref-5)</u>**

### How this fits regulated deployment

In regulated settings, the deployment question is rarely "does it work in a demo?" It is whether an organization can bound failure modes, detect issues after updates, produce audit trails for decisions, and demonstrate incident response procedures that go beyond prompt tweaks.

Real deployment incidents show why: black-box evaluation can miss behavioral shifts that only become obvious after release, and post-hoc debugging is painful when you cannot see what changed internally. **<u>[[3]](#ref-3)</u>**

A common pattern looks like this: a model update clears pre-deployment tests, but under stress (a regional downturn, a new product, a policy change) it quietly changes how it treats a narrow slice of users. The first signal is a business KPI moving weeks later — higher delinquency, unusual refund patterns, or suddenly skewed case routing — with no clear story about what changed inside the system.

Interpretability makes that possible by adding mechanistic evidence rather than purely black-box outcome tests. **<u>[[3]](#ref-3)</u>** **<u>[[15]](#ref-15)</u>**


---

## How to stay ahead

We are going to deploy powerful models. Incentives make that nearly inevitable. The only real choice is how we deploy them: as black-box oracles surrounded by rituals, or as engineered systems surrounded by controls.

The "race" framing captures the stakes: interpretability must mature quickly enough to matter. **<u>[[1]](#ref-1)</u>**  
The optimism case is real: the information is not hidden; the computational graph is observable; early methods show that scalable approaches can surface meaningful structure. **<u>[[2]](#ref-2)</u>**  
And the skeptic discipline is necessary: progress must be benchmarked against strong baselines, and explanations must survive causal tests. **<u>[[16]](#ref-16)</u>** **<u>[[6]](#ref-6)</u>**

Interpretability is the missing link because it turns capability into governability — not through philosophical transparency, but through the engineering primitives high-stakes deployment requires: diagnosis, control, evidence, and accountability.

---

## References {#references}

- <a id="ref-1"></a>**1. Dario Amodei** — [_The Urgency of Interpretability_](https://www.darioamodei.com/post/the-urgency-of-interpretability) (Apr 2025)  
- <a id="ref-2"></a>**2. Eric Ho (Goodfire)** — [_On Optimism for Interpretability_](https://www.goodfire.ai/blog/on-optimism-for-interpretability) (Jul 2025)  
- <a id="ref-3"></a>**3. OpenAI** — [_Expanding on what we missed with sycophancy_](https://openai.com/index/expanding-on-sycophancy/) (May 2025)  
- <a id="ref-4"></a>**4. Stephen Casper** — [_The Engineer's Interpretability Sequence_](https://www.alignmentforum.org/s/6GfFLrY9v8x7zMZ7N) (Alignment Forum)  
- <a id="ref-5"></a>**5. Adam Karvonen et al.** — [_SAEBench: A Comprehensive Benchmark for Sparse Autoencoders_](https://openreview.net/forum?id=qrU3yNfX0d) (OpenReview)  
- <a id="ref-6"></a>**6. AxBench** — [concept steering / method-vs-baseline benchmarking (project/paper hub)](https://axbench.org/)  
- <a id="ref-7"></a>**7. Anthropic** — [_Towards Monosemanticity: Decomposing Language Models with Dictionary Learning_](https://www.anthropic.com/research/towards-monosemanticity-decomposing-language-models-with-dictionary-learning)  
- <a id="ref-8"></a>**8. Transformer Circuits** — [_Decomposing Language Models With Dictionary Learning_](https://transformer-circuits.pub/2023/monosemantic-features)  
- <a id="ref-9"></a>**9. Neuronpedia** — [SAE feature explorer and docs](https://www.neuronpedia.org/)  
- <a id="ref-10"></a>**10. Chris Olah (Distill)** — [_Circuits: Zoom In_](https://distill.pub/2020/circuits/zoom-in/)  
- <a id="ref-11"></a>**11. Anthropic Interpretability Team** — [_Transformer Circuits Thread_](https://transformer-circuits.pub/)  
- <a id="ref-12"></a>**12. Anthropic Interpretability Team** — [_Transformer Circuits_](https://transformer-circuits.pub/) (overview / index)  
- <a id="ref-13"></a>**13. Neel Nanda** — [_Attribution Patching_](https://www.neelnanda.io/) (methods + best practices)  
- <a id="ref-14"></a>**14. Neel Nanda** — [writing on probes / mechanistic interpretability (incl. Othello-GPT materials)](https://www.neelnanda.io/)  
- <a id="ref-15"></a>**15. Anthropic** — [model safety/evaluation artifacts (example transparency patterns)](https://www.anthropic.com/transparency)  
- <a id="ref-16"></a>**16. Chris Potts** — [_Assessing skeptical views of interpretability research_](https://web.stanford.edu/~cgpotts/) (talk / notes)  
- <a id="ref-17"></a>**17. CIO / IDC reporting** — [estimates on how many AI pilots fail to reach production (one widely cited figure: 88%)](https://www.cio.com/article/2471646/ai-projects-fail-in-production-88-percent-fail-to-make-it-from-pilot-to-production.html)
