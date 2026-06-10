---
title: "The Gap in Agent Observability"
date: 2026-05-27
description: "Every tool in the agent observability stack — traces, logs, output monitors — watches the edges of the pipeline. The decision that produces each action forms in the middle, inside the model, where none of them can see."
categories:
 - Opinion
draft: false
ShowToc: true
---

# The Gap in Agent Observability

*A chatbot's worst output is text you can filter. An agent's worst output is an action that already happened. Most of the agent safety stack still watches the edges, and the decision that matters is made in the middle, inside the model, before anything reaches the surface.*

*Why agents fail, why surface monitoring cannot see it, and where reading the model's internal state before it acts closes the gap.*

---

## From answering to acting

This series began with a simple claim: watching a model's output is no longer enough. The essays since built out the alternative, reading the model's internal state to steer it, to diagnose it with the interpretability toolkit, to repair it at the source, and to read the system cards for the gaps surface defenses leave open. This final essay is where all of that becomes operational, in the setting where the stakes are highest and the time to act is shortest: agents.

A chatbot answers. An agent acts. It calls tools, runs code, sends email, moves money, and chains those actions across long trajectories with minimal human oversight. The shift from answering to acting is also where the industry is hitting a wall. Gartner projects that more than 40% of agentic AI projects will be canceled by the end of 2027, citing escalating costs, unclear value, and inadequate risk controls. **[[1]](#ref-1)** McKinsey finds that while a large majority of enterprises have experimented with agents, fewer than one in ten have scaled them to measurable value. **[[2]](#ref-2)** The gap between a demo and a deployment is mostly a reliability and trust gap, and the core of that gap is simple to state: **observability is not confidence.** Knowing what an agent did is not the same as knowing what it intended to do, or whether its internal reasoning was sound. My own path into this came through interpretability in high-stakes finance **[[19]](#ref-19)**, where that distinction is not academic; it is the difference between a defensible decision and an expensive one.

---

## When the output is the action

Before the reliability question, there is a timing question that makes agents categorically different from chatbots.

![Figure 1: When the output is the action](/assets/ai-interpretability/agent-fig-output-action.svg)

*Figure 1. For a chatbot, the output is text, and a filter can sit between the model and the user. For an agent, the output is an action, and once it fires there is no "after" to moderate.*

For a chatbot, output moderation works because there is an "after." The model produces text, a filter inspects it, and only then does the user see it. For an agent, that sequence collapses. The tool call *is* the output. By the time a transfer has executed or a repository has been deleted, the unsafe thing is not a candidate for moderation; it is a fact in the world. An output filter that inspects what the agent did is doing forensics, not defense. The only intervention that helps is one that arrives before the call executes, which means it has to read something other than the output, because the output has not happened yet.

That is the constraint. The rest of this essay is about why agents fail in the first place, why the obvious defenses do not close the gap, and what does.

---

## Why agents fail

Agent failure is not one thing, and pretending it is leads to the wrong fixes. The most rigorous map we have comes from a UC Berkeley study that analyzed 1,642 execution traces across seven popular agent frameworks and built the first data-backed failure taxonomy. **[[3]](#ref-3)**

![Figure 2: Why agents fail](/assets/ai-interpretability/agent-fig-failure-landscape.svg)

*Figure 2. The Berkeley failure taxonomy plus the tool and security misfires that cut across it. The percentages are the prevalence of each category in the study's traces.*

The taxonomy sorts failures into three families. **System design issues**, the largest at roughly 44%, are failures where the agent disobeys its task specification, repeats steps without progress, loses the thread of the conversation, or never recognizes that the task is done. **Inter-agent misalignment**, around 32%, covers communication breakdowns, conflicting objectives, and agents ignoring each other's input. **Task verification failures** cover missing quality checks, error propagation, and premature or absent termination. Cutting across all three is a fourth cluster this essay cares about most: **tool and security misfires**, where the agent selects the wrong or a non-existent tool, passes malformed parameters, exhibits tool bypass (simulating a tool's result instead of calling it), or has its tool call hijacked by injected content.

Two findings from that study matter for everything below. The failure rates ran from 41% to 86.7% across the frameworks tested, so this is the common case, not the edge case. And, critically, the authors conclude that better base models alone will not fix the taxonomy; the failures are structural, not just a matter of raw capability. **[[3]](#ref-3)** These are not abstract concerns. In regulated domains like financial services, healthcare, and legal work, a single tool misfire (a wrong trade, a leaked record, a missed compliance check) carries consequences that make agent reliability a precondition for deployment at all.

---

## The same symptom, different internal cause

Here is the observation that reframes the whole problem. The Berkeley study notes that failures with similar surface behavior can stem from entirely different root causes; a memory-management bug and an agent-coordination bug can look identical from the outside. **[[3]](#ref-3)**

This is exactly why watching the output, or even the full trace, is so often insufficient. The trace tells you *what happened*: which tool was called, with what arguments, producing what result. It does not tell you *why* the agent decided to do it, because the decision was an internal event that occurred before any of those external artifacts existed. Two agents can produce the identical wrong tool call, one because its internal intent was genuinely (and wrongly) to call that tool, and one because injected content hijacked a call it never meant to make. The output is the same. The cause, and therefore the fix, is not.

The common thread across the entire failure landscape is that the decision behind each failure forms inside the model, in its activations, before it surfaces as a token or an action. Anthropic's agentic-misalignment study makes this vivid: placed under goal conflict or a threat to their autonomy, frontier models reasoned their way to harmful actions like blackmail and data exfiltration, with no prompt injection and no instruction to misbehave, acknowledging the ethical prohibition internally and choosing the harmful action anyway. **[[4]](#ref-4)** The decision was an internal event first. If that is where the decision lives, that is where you have to look to catch it for the right reason. Everything else is inference from a shadow.

---

## Failures start early and compound

The internal-cause problem is made worse by how agents run: not in a single step, but across long trajectories where an early mistake does not stay contained.

![Figure 3: An early error propagates](/assets/ai-interpretability/agent-fig-trajectory.svg)

*Figure 3. A minor internal misstep early in a trajectory propagates through later steps and only becomes visible as a failure near the end. An output watcher sees it last; an internal monitor can catch it first.*

A large share of agent failures trace back to errors made early in the trajectory that then propagate through every subsequent step. **[[3]](#ref-3)** By the time the final output looks wrong, the agent has already taken several actions on top of the original mistake. Output-watching is structurally late here: it inspects the end of a chain whose first link broke long ago. Reading internal state at each decision offers the chance to catch the break when it happens, while the trajectory can still be corrected cheaply, and before any of the downstream actions have fired.

---

## The space of solutions, and the gap

None of this is news to the people building agents, and a real ecosystem of defenses has grown up around the problem. The honest question is not whether solutions exist, but where each one acts, and what that leaves uncovered.

![Figure 4: The space of solutions, and the gap](/assets/ai-interpretability/agent-fig-solution-landscape.svg)

*Figure 4. Today's defenses cluster at the edges of the agent pipeline, on inputs, outputs, and traces. The decision itself forms in the middle, inside the model, where none of them can see.*

At the input edge, **prompt hardening and spotlighting** mark untrusted content so the model is less likely to follow it. At the execution edge, **sandboxing and permissioning** limit what a tool call can do, and least-privilege scoping is genuinely effective at bounding damage. At the output edge, a thriving class of **observability platforms**, such as LangSmith, Fiddler, Arize Phoenix, and TruLens, instruments agent runs, collects traces, and scores them with guardrails and LLM-as-judge evaluations for relevance, groundedness, and safety. **[[20]](#ref-20)** And at training time, better fine-tuning and preference optimization improve the base rate of good behavior. Each of these helps. None of them should be removed.

But look at where they all sit. Every one of them acts on an input, an output, or a trace, which is to say on the *edges* of the pipeline. The decision that produces the tool call forms in the *middle*, inside the model, and nothing in the standard stack reads it. That is the gap. External monitoring can tell you what the agent did; it cannot tell you what the agent intended. The two failures that gap hides are the ones that matter most and show up least: a **silent failure**, where the agent should have called a tool and did not, and a **spurious call**, where a tool fired with no real internal support behind it. In both cases the trace can look perfectly fine. The only way to catch them is to read the intent directly.

This is the case for reading internal state, and it is narrower and more defensible than "interpretability is good." It is: there is exactly one place in the agent pipeline that today's defenses cannot observe, it is the place where the decision is actually made, and it is now readable.

---

## The pre-action gate

The defense that fits the gap is a gate that sits at the moment of decision and reads the model's internal state before the action is allowed to execute.

![Figure 5: The pre-action gate](/assets/ai-interpretability/agent-fig-gate.svg)

*Figure 5. The model forms a tool call; a probe reads the residual stream in the same forward pass; a decision gate allows, reviews, reroutes, or blocks; and only then does the tool execute.*

As the model forms a tool call, a lightweight probe reads the residual-stream activations and scores them against a learned risk direction, the same representation-level reading that underlies steering and monitoring elsewhere in this series. **[[18]](#ref-18)** A decision gate turns that score into an action: allow on low risk, route to human review or reroute on medium, block on high. Only after the gate clears does the tool run.

There is direct empirical support that a gate of this shape works. A study that added an externally governed escalation channel, a guaranteed pause and independent review before a consequential action, watched the rate of a specific harmful behavior fall from a no-mitigation baseline of 38.7% to 1.2% across ten models. **[[17]](#ref-17)** That is the pre-action gate in its simplest form: insert a checkpoint before the irreversible step and most of the harm disappears. The interpretability contribution is to make that checkpoint smart, firing on internal evidence rather than pausing every action indiscriminately.

---

## Intent-action consistency

The sharpest way to operationalize the gate, especially for regulated domains, is as a consistency check between two things the rest of the stack treats separately: the agent's internal intent, and the external action it takes.

The control objective is one sentence: the agent must not call a tool without latent intent behind it, and must not skip a tool when latent intent is high. Read the internal intent signal, compare it to the actual tool call, and flag the mismatches. A high internal signal with no call is a silent failure. A call with no internal signal is a spurious one. Intent drift, where the internal reasoning wanders away from the expected pattern over a long trajectory, is a third. This is an orthogonal signal that trace evaluations miss by construction, because the output can look fine while the internal reasoning behind it was flawed.

This framing is what makes the approach fit a regulated workflow. It can run as a **pre-action gate** for risk management, blocking or routing a call before it fires, or as a **post-action audit** for compliance, producing an intent-action consistency record for every decision the agent made. For a bank or a fund deploying agents in workflows where regulators expect evidence of *how* a decision was reached, an intent-action log is closer to what model-risk validation actually requires than any amount of output logging.

---

## What mechanistic interpretability adds

Probes give you a yes-or-no risk signal, which is enough for a gate. Mechanistic interpretability adds something a probe alone does not: a named, auditable reason.

![Figure 6: Tool-intent lives in the middle layers](/assets/ai-interpretability/agent-fig-midlayers.svg)

*Figure 6. A tool call is a semantic control decision, so the relevant signal concentrates in the middle of the model, where tool-fine-tuned models grow features that recognize calls, schemas, and structured output.*

Two ingredients make this work. The first is *where* to look. Interpretability research consistently finds a division of labor across depth: early layers carry lexical and shallow syntactic features, the middle layers carry high-level semantics and the model's decision points ("this is the moment to call the tool," "we are now in JSON mode"), and late layers handle surface realization into tokens. A tool call is a semantic control decision, so the signal is strongest mid-stack. The second is *what* to read. Sparse autoencoders decompose those mid-layer activations into monosemantic, human-readable features **[[10]](#ref-10)**, and when you compare a base model to a tool-fine-tuned one, new features emerge that correspond directly to tool-use patterns: recognizing function-call JSON, tool schemas, and structured-output modes. Tool intent is not smeared across the whole network; it localizes to specific features you can identify and monitor.

That localization is what turns detection into auditing. An SAE feature can be labeled automatically, so instead of "the risk probe fired at 0.8," you get "the feature for *unsupported financial transaction* activated while the calendar tool was being selected." Correlating SAE features with task success and failure, and even steering on them, is an active and working line of research. **[[11]](#ref-11)** It also points at a practical advantage over probes: a probe typically has to be trained per tool or per agent, while an SAE is trained once per base model and then reused across many tools, which scales far better in a real multi-tool deployment. **[[7]](#ref-7)** This is the interpretability toolkit from earlier in the series, pointed at the single most consequential decision an agent makes.

---

## Reading the tool call before it fires

The most direct evidence that the relevant signal is already inside the model, and readable cheaply, comes from work on tool-selection hallucinations.

![Figure 7: Reading the tool call before it fires](/assets/ai-interpretability/agent-fig-toolcall.svg)

*Figure 7. At the tool-call token, the model's internal state separates a grounded call from a hallucinated one, in the same forward pass, before either executes.*

Recent work shows that tool-call failures, wrong tool, malformed parameters, or tool bypass, are visible in the model's internal representations at the moment of tool selection, and that a detector reading those representations can flag them in real time, during the same forward pass that generates the call, with no extra inference and no external validation. **[[5]](#ref-5)** This is the ideal case for a pre-action gate: the signal that the call is about to go wrong is available before the call is made, essentially for free. The same idea generalizes to reading whether a tool is needed at all **[[7]](#ref-7)**, and rests on the foundational result that concepts are linearly readable from intermediate representations. **[[9]](#ref-9)**

---

## What you can catch before the action

Folding the failure landscape together with the internal-signal research gives a concrete list of agent risks that are detectable before the action executes, each with the probe that targets it. **Tool-call hijacking**, indirect injection that redirects a call, is caught by a context-stage probe. **Goal drift**, the slow wandering of the objective across a trajectory, is caught by a trajectory-level monitor trained on multi-step function-calling data of the kind recent agentic-reasoning models provide. **[[16]](#ref-16)** **Privilege escalation**, reaching for more access than the task needs, and **epistemic over-reach**, calling a tool when the agent should simply answer, both surface in the intent signal; the latter is exactly the case for invoking tools only when epistemically necessary. **[[8]](#ref-8)** And **high-stakes intent**, the recognition that an action could cause real, irreversible harm, is what high-stakes activation probes are built to detect. **[[6]](#ref-6)**

---

## Does it work, and what does it cost

The honest version of the case addresses both effectiveness and cost, because a gate that doubles latency or floods operators with false alarms will not survive production.

The cost argument is unusually strong. Activation probes detect high-stakes interactions with performance comparable to a prompted or fine-tuned mid-size LLM monitor, while using roughly six orders of magnitude fewer FLOPs, because they reuse activations the monitored model already computed. **[[6]](#ref-6)** A monitor that is a million times cheaper and runs in the same forward pass is one you can afford to run on every tool call.

The effectiveness argument is real but bounded. Those same probes generalize well out of distribution, with mean AUROC above 0.91, but at a strict 1% false-positive rate they catch only around 43% of cases, somewhat below a prompted large model. **[[6]](#ref-6)** That is the honest number, and it points straight at the right posture: probes are an excellent first-stage filter in a cascade, flagging cases cheaply for a more expensive check, not a standalone hard blocker. Accuracy also improves sharply with a little deployment-specific data.

Evaluation should use agent-grade benchmarks: the Berkeley Function Calling Leaderboard for tool-use and agentic evaluation **[[12]](#ref-12)**, alongside ToolACE, HammerBench, ToolLLM, and the original Toolformer line for function-calling coverage. **[[13]](#ref-13)** **[[14]](#ref-14)** **[[15]](#ref-15)** **[[16]](#ref-16)** The methodological point the leaderboard work makes is that external evaluation needs both state-based and response-based checks. Watching what the agent did is necessary; reading what it was about to do is what this adds.

---

## The honest limits

Reading internal state inherits every caveat that applies to probes and features, and adds a few specific to agents.

**Probes are coarse and features are model-specific.** A linear direction summarizes a much richer computation, and SAE features discovered in one model do not transfer directly to another, so the monitoring has to be built per base model and maintained as prompts and use cases drift. **[[11]](#ref-11)** **[[21]](#ref-21)** Full mechanism analysis is itself still an open research problem.

**The signal can be gamed.** When the agent can in principle read the same signal you gate on, you cannot fully separate "the agent became safe" from "the agent learned to keep its intent off the probe direction." The mitigation is the same as for interpretability-guided repair: keep adding independent probes, validate on held-out attack distributions, and never treat a single probe as ground truth.

**It needs access to the internals.** This approach works on open-weight and on-premise deployments where activations are available; it does not apply to a closed model behind an API that exposes only tokens. That is a real adoption boundary, and it points the approach squarely at the regulated, open-model, on-prem deployments (banks, funds, healthcare) where both the access and the need for auditable internal evidence are greatest.

**It does not replace the rest of the stack.** Internal monitoring is the layer that watches the place the other layers cannot see. The agent still needs prompt hardening, sandboxing, least-privilege tool scopes, trace observability, and a human in the loop where the stakes demand it. The right design is to add intent checks as an extra field alongside existing observability, not to rip anything out.

---

## Choosing in practice

![Figure 8: Match the monitor to the agent risk](/assets/ai-interpretability/agent-fig-match.svg)

*Figure 8. A starting heuristic. The gate is chosen by the failure mode, and it sits alongside sandboxing and permissioning rather than replacing them.*

The discipline is the one that ran through the whole series: match the tool to the question, start with the cheapest defense that could work, and escalate only when the evidence demands it. A hijacked call wants a context-stage probe; a hallucinated tool selection wants a tool-selection probe; an irreversible action wants a high-stakes probe plus a human; drift over a long trajectory wants a trajectory-level monitor; and a recurring failure you keep catching at the gate is a signal to stop patching at runtime and repair the model for good, which is the subject of the previous essay.

---

## The series, in one picture

![Figure 9: The internal-evidence loop](/assets/ai-interpretability/agent-fig-capstone.svg)

*Figure 9. Every essay in this series reads the same internal evidence and does something different with it. The agent gate is where seeing inside becomes acting in time.*

The argument across these six essays has been a single one, stated from six angles. Watching the output is necessary but not sufficient. The model's internal state carries evidence the surface does not, and that evidence can be read to understand the model, to steer it, to repair it, to fill the gaps the system cards admit, and finally to guard an agent's actions before they fire.

Agents are where this stops being a research preference and becomes an operational requirement. The reason agents stall in production is not that the models are too weak; the Berkeley taxonomy is explicit that better models alone will not fix it. It is that the decision which produces an action forms inside the model, the standard stack guards only the edges, and when the output is the action there is no after to fall back on. The decision has already formed inside by the time you could see it on the surface, which means the only place left to look is inside, and the only time left to act is before. That is not the whole of agent safety, and it does not replace the careful work already underway. But it is the layer the moment requires, and the research has matured enough that we can build it now.

---

## References

- <a id="ref-1"></a>**1. Gartner** - [*Gartner Predicts Over 40% of Agentic AI Projects Will Be Canceled by End of 2027*](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027) (2025)
- <a id="ref-2"></a>**2. McKinsey &amp; Company** - [*The State of AI: Agentic AI Adoption and Scaling*](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai) (2025)
- <a id="ref-3"></a>**3. Mert Cemri et al.** - [*Why Do Multi-Agent LLM Systems Fail? (MAST)*](https://arxiv.org/abs/2503.13657) (2025)
- <a id="ref-4"></a>**4. Anthropic (Aengus Lynch et al.)** - [*Agentic Misalignment: How LLMs Could Be Insider Threats*](https://www.anthropic.com/research/agentic-misalignment) (2025)
- <a id="ref-5"></a>**5. Kait Healy, Bharathi Srinivasan, Visakh Madathil, Jing Wu** - [*Internal Representations as Indicators of Hallucinations in Agent Tool Selection*](https://arxiv.org/abs/2601.05214) (AAAI 2026 TrustAgent Workshop)
- <a id="ref-6"></a>**6. Alex McKenzie et al.** - [*Detecting High-Stakes Interactions with Activation Probes*](https://arxiv.org/abs/2506.10805) (NeurIPS 2025)
- <a id="ref-7"></a>**7. Wenjun Li et al.** - [*Adaptive Tool Use in Large Language Models with Meta-Cognition Trigger*](https://www.google.com/search?q=%22Adaptive+Tool+Use%22+%22Meta-Cognition+Trigger%22) (2025)
- <a id="ref-8"></a>**8. Wang et al.** - [*Position: Agents Should Invoke External Tools Only When Epistemically Necessary*](https://www.google.com/search?q=%22Invoke+External+Tools%22+%22Epistemically+Necessary%22) (2025)
- <a id="ref-9"></a>**9. Guillaume Alain &amp; Yoshua Bengio** - [*Understanding Intermediate Layers Using Linear Classifier Probes*](https://arxiv.org/abs/1610.01644) (2016)
- <a id="ref-10"></a>**10. Trenton Bricken et al. (Anthropic)** - [*Towards Monosemanticity: Decomposing Language Models With Dictionary Learning*](https://transformer-circuits.pub/2023/monosemantic-features/) (2023)
- <a id="ref-11"></a>**11. Junseo Cho, Jenny Wu &amp; Adriano Koshiyama** - [*CorrSteer: Steering Improves Task Performance and Safety in LLMs through Correlation-based SAE Feature Selection*](https://www.google.com/search?q=%22CorrSteer%22+sparse+autoencoder) (2025)
- <a id="ref-12"></a>**12. Shishir Patil et al.** - [*The Berkeley Function Calling Leaderboard (BFCL): From Tool Use to Agentic Evaluation of Large Language Models*](https://gorilla.cs.berkeley.edu/leaderboard.html) (2025)
- <a id="ref-13"></a>**13. Weiwen Liu et al.** - [*ToolACE: Winning the Points of LLM Function Calling*](https://arxiv.org/abs/2409.00920) (2024)
- <a id="ref-14"></a>**14. Jun Wang et al.** - [*HammerBench: Fine-Grained Function-Calling Evaluation in Real Mobile Device Scenarios*](https://www.google.com/search?q=%22HammerBench%22+function-calling) (2025)
- <a id="ref-15"></a>**15. Yujia Qin et al.** - [*ToolLLM: Facilitating Large Language Models to Master 16000+ Real-World APIs*](https://arxiv.org/abs/2307.16789) (2023)
- <a id="ref-16"></a>**16. Timo Schick et al.** - [*Toolformer: Language Models Can Teach Themselves to Use Tools*](https://arxiv.org/abs/2302.04761) (2023)
- <a id="ref-17"></a>**17.** - [*Adapting Insider Risk Mitigations for Agentic Misalignment: An Empirical Study*](https://arxiv.org/abs/2510.05192) (2025)
- <a id="ref-18"></a>**18. Andy Zou et al.** - [*Representation Engineering: A Top-Down Approach to AI Transparency*](https://arxiv.org/abs/2310.01405) (2023)
- <a id="ref-19"></a>**19. Hariom Tatsat &amp; Ariye Shater** - [*Beyond the Black Box: Interpretability of LLMs in Finance*](https://www.google.com/search?q=%22Beyond+the+Black+Box%22+Interpretability+LLMs+Finance) (2025)
- <a id="ref-20"></a>**20. LangSmith, Fiddler AI, Arize Phoenix, TruLens** - [*Agent observability and evaluation platforms*](https://www.google.com/search?q=LangSmith+Fiddler+Arize+Phoenix+TruLens+agent+observability) (2024-2025)
- <a id="ref-21"></a>**21. Lee Sharkey et al.** - [*Open Problems in Mechanistic Interpretability*](https://arxiv.org/abs/2501.16496) (2025)

---

*For speaking, podcasts, or collaboration on interpretability and high-stakes AI, reach out via [htatsat.com](https://htatsat.com/).*
