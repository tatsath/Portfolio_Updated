---
title: "The Interpretability Toolkit"
date: 2026-04-22
description: "A practical guide to the tools of mechanistic interpretability, from the logit lens to full circuits, and how to choose the right one for the question in front of you."
categories:
 - Opinion
draft: false
ShowToc: true
---

# The Interpretability Toolkit

*From the logit lens to full circuits, each tool buys a different kind of insight at a different cost. The skill is matching the tool to the question.*

*A practical guide to the tools of mechanistic interpretability, and how to choose the right one for the question in front of you.*

---

## A toolkit on a ladder

Mechanistic interpretability is often discussed as though it were a single thing, but in practice it is a **toolkit**. It is a set of instruments for looking inside a model, and they are not interchangeable. Each one answers a different question, exposes a different layer of the model's internals, and costs a different amount to run.

The useful way to organize them is as a ladder of resolution. The lower rungs tell you, cheaply, roughly what a model is doing. The higher rungs tell you, expensively, exactly how it does it, with causal evidence to back the claim.

![Figure 1: The interpretability ladder](/assets/ai-interpretability/toolkit-fig-ladder.svg)

*Figure 1. Five tools, ordered by how deep they look and how much they cost to run. Each rung answers the question printed beside it.*

The single most useful habit is to reach for the tool whose question matches yours, and no higher. A linear probe that flags an unsafe internal state is a complete, shippable result on its own; you do not need a circuit diagram to act on it. Climbing to the top of the ladder when a lower rung would answer the question is not extra rigor. It is wasted effort.

The rest of this essay walks the ladder from the bottom up, explains each tool intuitively, and shows what kind of question it is built to answer.

---

## Level 1: The logit lens

The cheapest useful tool needs no training at all.

A transformer refines its guess about the next token gradually, layer by layer. The **logit lens** takes the model's internal state at each layer and runs it through the model's own output head, as if the model had to answer right there. The result is a readout of the model's evolving guess at every depth. **[[1]](#ref-1)**

![Figure 2: The logit lens](/assets/ai-interpretability/toolkit-fig-logit-lens.svg)

*Figure 2. Read each layer's hidden state through the output head and you see the running guess. Early layers may favor one token; later layers refine it into the final answer.*

The intuition is that of a developing photograph. Early layers hold a blurry impression of the answer; later layers sharpen it. Watching where the final token first appears tells you where in the network the decision actually forms.

The plain version has a known bias: the readout is most trustworthy near the final layers and can mislead earlier. The **tuned lens** fixes this by learning a small per-layer correction so the readout is reliable across depth. **[[2]](#ref-2)**

For a quick "where does the model commit to this answer?" investigation, the logit lens is frequently all you need, and it costs minutes inside a library like TransformerLens. **[[25]](#ref-25)** A close cousin, attention maps, is tempting but treacherous: attention shows what the model looked at, not why it decided, so treat it as a hint and reach for the causal tool at Level 3 when you actually need cause.

---

## Level 2: Probes

One rung up, you start asking the activations direct questions.

A **probe** is a small classifier, often a single logistic regression, trained on the model's hidden states to detect whether some property is present: a topic, a sentiment, a refusal, an intent to deceive. **[[3]](#ref-3)**

![Figure 3: A linear probe](/assets/ai-interpretability/toolkit-fig-probe.svg)

*Figure 3. The model reads a sentence; a small classifier reads the model's hidden state and predicts a label, here whether the text implies the price will go up, before the model writes a word of its own answer.*

The logic is simple and powerful. If a linear probe can separate "honest" from "deceptive" internal states at high accuracy, then that property is explicitly written into the model's activations, and you can read it directly. Because the probe sits on the hidden state, it can fire before the model produces any output at all.

This is one of the clearest cases where a single tool is a finished product. Anthropic showed that a simple probe can catch a "sleeper agent" model in a dangerous internal state, with no feature dictionary and no circuit required. **[[5]](#ref-5)** A probe wired into a live system is a runtime monitor, and nothing more elaborate is needed to act on its signal.

A sharper variant, **sparse probing**, forces the probe to rely on only a few internal directions, which both improves interpretability and helps pin down where a concept lives. **[[4]](#ref-4)** The tooling is mature: a few model hooks and scikit-learn, and you have a working probe in days.

---

## Level 3: Activation patching

Probes tell you a property is present. The next question is causal: which part of the model is actually responsible for a behavior?

**Activation patching** answers it. Run the model on a clean input and on a corrupted variant, then copy a single component's activation from the clean run into the corrupted run and watch what happens to the output. If the output flips, that component is causally responsible; if nothing changes, it is not. **[[21]](#ref-21)** **[[24]](#ref-24)**

![Figure 4: Activation patching](/assets/ai-interpretability/toolkit-fig-activation-patching.svg)

*Figure 4. Copy one component's activation from a run that behaves correctly into a run that does not. If the output flips, that component caused the behavior, rather than merely correlating with it.*

The intuition is the difference between "this part lit up" and "this part caused it." Correlation is cheap; the patch is what buys causation. The technique is also called causal tracing, and it is the method that located factual associations inside GPT in the original ROME work. **[[21]](#ref-21)**

Done by hand, patching one component at a time is slow, so faster gradient-based approximations, known as attribution patching, estimate the same effect across the whole model at once and make the search tractable on larger models. **[[23]](#ref-23)**

On its own, this answers a precise and valuable question: which component drives this behavior? That is exactly what you need before any targeted fix, and it requires no feature dictionary and no full circuit. The tooling is mature, with TransformerLens and NNsight turning a focused causal test into a matter of days. **[[25]](#ref-25)** **[[27]](#ref-27)**

---

## Level 4: Sparse autoencoders and feature steering

Activation patching tells you which component matters, but not what concept that component carries. The next rung names the concepts, and lets you act on them.

A model packs far more concepts into its activations than it has dimensions, by overlapping them, a phenomenon called superposition. A **sparse autoencoder (SAE)** learns to pull that tangle apart, re-expressing the activations in a much larger dictionary where each entry tends to correspond to a single, human-readable feature. **[[7]](#ref-7)**

![Figure 5: A sparse autoencoder](/assets/ai-interpretability/toolkit-fig-sae.svg)

*Figure 5. The residual stream carries many concepts mixed together. The SAE separates that flow into individual, named features, here Dog, Cat, Automobile, Tree, that you can read and adjust one at a time.*

The plumbing metaphor in the figure is apt. A mixed stream of concepts flows in; the SAE acts like a manifold that splits it into separate, labeled taps. At scale this yields millions of named features, from "the Golden Gate Bridge" to "deceptive behavior." **[[8]](#ref-8)**

Once features are named, you can do two things with them. You can *read* them, to see which concepts are active for a given input. And you can *steer* them, dialing a feature up or down to change behavior at inference time. I treat steering at length in the companion essay on [tuning a model at runtime](https://htatsat.com/ai-interpretability/), including the related inference-time interventions, where a probe direction doubles as the steering direction. **[[30]](#ref-30)**

The honest caveats matter here, because this is the most over-hyped rung on the ladder. Large evaluations find SAEs genuinely valuable for *discovering unknown* concepts, but for acting on concepts you already know, simpler baselines often match or beat them. **[[11]](#ref-11)** **[[12]](#ref-12)** Benchmarks now exist to keep such claims honest. **[[13]](#ref-13)** The access situation, though, is excellent: Gemma Scope ships open SAEs for a capable model **[[9]](#ref-9)**, and Neuronpedia lets you search and steer tens of millions of features interactively. **[[10]](#ref-10)** Expect to spend days to weeks.

---

## Level 5: Circuits

Activation patching tested one component. Sparse autoencoders named the concepts. The top rung puts them together: tracing the causal pathway among interpretable features for a whole behavior, from input to output.

The technique, which Anthropic calls **circuit tracing**, uses interpretable features as nodes and traces the causal influence between them for a single prompt. The result is an **attribution graph**: a directed map of which features drove which others on the way to the answer. **[[15]](#ref-15)**

![Figure 6: Circuit tracing produces an attribution graph](/assets/ai-interpretability/toolkit-fig-circuits.svg)

*Figure 6. Asked for the capital of the state containing Dallas, the model does not look up one fact. Circuit tracing shows it going Dallas to Texas to Austin internally, combining a "say a capital" step with the Texas step. The visualization is called an attribution graph. (After Anthropic's circuit-tracing work. [[14]](#ref-14))*

The Dallas example is the clearest illustration of why this matters: the model reaches "Austin" through a chain of intermediate concepts, not a single lookup, and the graph makes that chain visible. Applied across many prompts, circuit tracing has surfaced genuinely surprising structure, including evidence that the model plans ahead and reasons in a language-agnostic conceptual space before committing to words. **[[14]](#ref-14)** **[[16]](#ref-16)** Under the hood it leans on transcoders, which re-express a layer's computation in clean features so the graph has good nodes to connect. **[[17]](#ref-17)**

Searching for these mechanisms by hand is brutal, so automated methods like **ACDC** discover candidate circuits. **[[22]](#ref-22)** The payoff, when it works, is a validated, general mechanism, like the indirect-object-identification circuit in GPT-2 or the induction heads behind in-context learning. **[[19]](#ref-19)** **[[20]](#ref-20)**

This is the most expensive rung by a wide margin, measured in weeks to months of skilled work, and until recently it was available only on a lab's own models. That is changing: Neuronpedia's open-source circuit tracer now produces attribution graphs on open models such as Gemma-2-2B. **[[18]](#ref-18)** But even specialists consider full, reliable circuit analysis an open problem **[[28]](#ref-28)**, so reserve it for the rare case where you must understand a mechanism end to end rather than merely observe it.

---

## Combining tools, briefly

The tools are not mutually exclusive, and a few combinations genuinely earn their keep. You can train a probe on SAE features rather than raw activations to get a **sparse probe**, whose detections come with a human-readable reason and which can be more robust when labeled data is scarce **[[6]](#ref-6)**; you can let a probe *detect* a problem and a steering intervention *act* on it, the detect-then-act loop behind inference-time intervention **[[30]](#ref-30)**; and you can run a cheap probe continuously and trigger an expensive circuit trace only on the inputs it flags, paying for the heavy tool exactly where it is warranted. The caveat is that combining multiplies cost, latency, and failure surface, and two correlated tools agreeing is not independent confirmation, so compose only when a single tool genuinely cannot answer the question.

---

## Choosing in practice

The practical heuristic is to start with the cheapest tool that could answer your question and escalate only when the evidence demands it.

![Figure 7: Match the tool to the question](/assets/ai-interpretability/toolkit-fig-match.svg)

*Figure 7. A starting guide. The right tool is the one whose question matches yours, not the most powerful one available.*

The tooling reality on open-weight models is better than most teams assume, and it maps cleanly onto the ladder. Probes need only model hooks and scikit-learn and land in days. Activation patching and causal analysis are well supported by TransformerLens and NNsight. **[[25]](#ref-25)** **[[27]](#ref-27)** SAE analysis is a weeks-long effort with SAELens and Neuronpedia, drawing on open dictionaries from Gemma Scope. **[[26]](#ref-26)** **[[10]](#ref-10)** Circuit tracing is now feasible on smaller open models through Neuronpedia's open-source tracer, though full coverage of large production models still takes real investment. **[[18]](#ref-18)**

That maps onto a short list of production uses. Probes make excellent always-on monitors. Activation patching pins down which component drives a behavior when you need to fix it. SAE features give you interpretable dashboards over what a model is representing. And attribution graphs, even partial ones, are the closest thing we have to a ground-truth explanation of a specific decision, which matters as regulators move from accepting post-hoc rationalizations toward expecting evidence of what a model actually did. **[[29]](#ref-29)**

The gaps deserve the same honesty. SAEs remain an active research problem rather than a finished product. **[[28]](#ref-28)** Attention is correlational. Causal validation is expensive. Circuit-level tooling is still labor-intensive and uneven across model families. A practitioner who knows these limits will choose far better than one who treats any single tool as a silver bullet.

---

## The toolkit mindset

The goal of interpretability work is not to reach the top of the ladder. It is to answer a question with the least machinery that will do it.

A probe that catches an unsafe state is not a lesser result than a circuit diagram. For the job of catching that state, it is the better result: cheaper, faster, and easier to trust. The circuit diagram is the right tool for a different question entirely.

This is what it looks like for interpretability to become an engineering discipline rather than a research curiosity. Learn what each tool sees, pick the cheapest one that answers your question, and reserve the expensive instruments for the moments that genuinely require them. The toolkit is getting better and more accessible every quarter, and the practitioners who get the most from it are the ones who reach for the right tool, not the most impressive one.

---

## References

- <a id="ref-1"></a>**1. nostalgebraist** - [*interpreting GPT: the logit lens*](https://www.lesswrong.com/posts/AcKRB8wDpdaN6v6ru/interpreting-gpt-the-logit-lens) (LessWrong, 2020)
- <a id="ref-2"></a>**2. Nora Belrose et al.** - [*Eliciting Latent Predictions from Transformers with the Tuned Lens*](https://arxiv.org/abs/2303.08112) (2023)
- <a id="ref-3"></a>**3. Guillaume Alain &amp; Yoshua Bengio** - [*Understanding Intermediate Layers Using Linear Classifier Probes*](https://arxiv.org/abs/1610.01644) (2016)
- <a id="ref-4"></a>**4. Wes Gurnee et al.** - [*Finding Neurons in a Haystack: Case Studies with Sparse Probing*](https://arxiv.org/abs/2305.01610) (TMLR, 2023)
- <a id="ref-5"></a>**5. Monte MacDiarmid et al. (Anthropic)** - [*Simple Probes Can Catch Sleeper Agents*](https://www.anthropic.com/research/probes-catch-sleeper-agents) (2024)
- <a id="ref-6"></a>**6. Subhash Kantamneni, Joshua Engels, Senthooran Rajamanoharan, Max Tegmark, Neel Nanda** - [*Are Sparse Autoencoders Useful? A Case Study in Sparse Probing*](https://arxiv.org/abs/2502.16681) (ICML 2025)
- <a id="ref-7"></a>**7. Trenton Bricken et al. (Anthropic)** - [*Towards Monosemanticity: Decomposing Language Models With Dictionary Learning*](https://transformer-circuits.pub/2023/monosemantic-features/) (2023)
- <a id="ref-8"></a>**8. Adly Templeton et al. (Anthropic)** - [*Scaling Monosemanticity: Extracting Interpretable Features from Claude 3 Sonnet*](https://transformer-circuits.pub/2024/scaling-monosemanticity/) (2024)
- <a id="ref-9"></a>**9. Google DeepMind** - [*Gemma Scope: open sparse autoencoders for Gemma*](https://deepmind.google/models/gemma/gemma-scope/) (2024)
- <a id="ref-10"></a>**10. Johnny Lin** - [*Neuronpedia: an open platform for interpretability tooling, features, and steering*](https://www.neuronpedia.org/) (2023–)
- <a id="ref-11"></a>**11.** - [*Use Sparse Autoencoders to Discover Unknown Concepts, Not to Act on Known Concepts*](https://arxiv.org/abs/2506.23845) (2025)
- <a id="ref-12"></a>**12. Zhengxuan Wu et al.** - [*AxBench: Steering LLMs? Even Simple Baselines Outperform Sparse Autoencoders*](https://arxiv.org/abs/2501.17148) (2025)
- <a id="ref-13"></a>**13. Adam Karvonen et al.** - [*SAEBench: A Comprehensive Benchmark for Sparse Autoencoders*](https://arxiv.org/abs/2503.09532) (ICML 2025)
- <a id="ref-14"></a>**14. Anthropic (Jack Lindsey et al.)** - [*On the Biology of a Large Language Model*](https://transformer-circuits.pub/2025/attribution-graphs/biology.html) (2025)
- <a id="ref-15"></a>**15. Anthropic (Emmanuel Ameisen et al.)** - [*Circuit Tracing: Revealing Computational Graphs in Language Models*](https://transformer-circuits.pub/2025/attribution-graphs/methods.html) (2025)
- <a id="ref-16"></a>**16. Anthropic** - [*Tracing the Thoughts of a Large Language Model*](https://www.anthropic.com/research/tracing-thoughts-language-model) (2025)
- <a id="ref-17"></a>**17. Jacob Dunefsky, Philippe Chlenski, Neel Nanda** - [*Transcoders Find Interpretable LLM Feature Circuits*](https://arxiv.org/abs/2406.11944) (2024)
- <a id="ref-18"></a>**18. Neuronpedia** - [*Circuit Tracer: open-source attribution graphs (Anthropic collaboration)*](https://www.neuronpedia.org/blog/circuit-tracer) (2025)
- <a id="ref-19"></a>**19. Kevin Wang et al.** - [*Interpretability in the Wild: A Circuit for Indirect Object Identification in GPT-2 Small*](https://arxiv.org/abs/2211.00593) (2022)
- <a id="ref-20"></a>**20. Catherine Olsson et al. (Anthropic)** - [*In-Context Learning and Induction Heads*](https://transformer-circuits.pub/2022/in-context-learning-and-induction-heads/index.html) (2022)
- <a id="ref-21"></a>**21. Kevin Meng et al.** - [*Locating and Editing Factual Associations in GPT (ROME)*](https://arxiv.org/abs/2202.05262) (2022)
- <a id="ref-22"></a>**22. Arthur Conmy et al.** - [*Towards Automated Circuit Discovery for Mechanistic Interpretability (ACDC)*](https://arxiv.org/abs/2304.14997) (2023)
- <a id="ref-23"></a>**23. János Kramár et al. (DeepMind)** - [*AtP\*: An Efficient and Scalable Method for Localizing LLM Behaviour to Components*](https://arxiv.org/abs/2403.00745) (2024)
- <a id="ref-24"></a>**24. Stefan Heimersheim &amp; Neel Nanda** - [*How to Use and Interpret Activation Patching*](https://arxiv.org/abs/2404.15255) (2024)
- <a id="ref-25"></a>**25. Neel Nanda &amp; Joseph Bloom** - [*TransformerLens: a library for mechanistic interpretability*](https://github.com/TransformerLensOrg/TransformerLens) (2022–)
- <a id="ref-26"></a>**26. Joseph Bloom et al.** - [*SAELens: training and analyzing sparse autoencoders*](https://github.com/jbloomAus/SAELens) (2024–)
- <a id="ref-27"></a>**27. Jaden Fiotto-Kaufman et al.** - [*NNsight and NDIF: Democratizing Access to Foundation Model Internals*](https://nnsight.net/) (2024)
- <a id="ref-28"></a>**28. Lee Sharkey et al.** - [*Open Problems in Mechanistic Interpretability*](https://arxiv.org/abs/2501.16496) (2025)
- <a id="ref-29"></a>**29. Dario Amodei** - [*The Urgency of Interpretability*](https://www.darioamodei.com/post/the-urgency-of-interpretability) (2025)
- <a id="ref-30"></a>**30. Kenneth Li et al.** - [*Inference-Time Intervention: Eliciting Truthful Answers from a Language Model*](https://arxiv.org/abs/2306.03341) (2023)

---

*For speaking, podcasts, or collaboration on interpretability and high-stakes AI, reach out via [htatsat.com](https://htatsat.com/).*
