---
title: "Debugging Tool Use in Agent Systems"
date: 2025-10-07T00:00:00Z
lastmod: 2025-10-07T00:00:00Z
draft: true
description: "Using internal activations to diagnose and fix tool-use failures in agentic AI systems."
author: ["H.T"]
categories: ["Opinion"]
ShowToc: true
mathjax: true
---

## The Agent Reliability Challenge

Modern enterprises are increasingly deploying LLM agents that orchestrate tools for research, analytics, and decision-making. However, the path to reliable agent deployment is proving more challenging than initially anticipated.

Recent empirical studies reveal the scale of the problem. A comprehensive UC Berkeley study examining multi-agent systems across 150+ tasks found that failures stem from many distinct modes: specification and design errors, inter-agent misalignment, verification and termination issues, and tool-related misfires. The study argues that these failures "require more complex solutions" than simple orchestration tweaks. Even after extensive tracing and debugging, reliability remains a fundamental blocker.

Industry surveys reflect this challenge. McKinsey's 2025 global survey found that only **23%** of organizations report they are _scaling_ an agentic AI system, while many remain in the "experimenting" phase. This limited confidence for broad deployment suggests that observability alone is insufficient. Gartner predicts that **over 40% of agentic AI initiatives may be canceled by 2027** due to risk, ROI, and operational issues, indicating that while tooling exists, trust remains fragile.

The core issue: **observability does not equal confidence**. Having visibility into what agents _did_ is not the same as understanding what they _intended_ to do, or whether their internal reasoning was sound.

---

## Current Approaches to Agent Monitoring

### External Observability Platforms

A growing ecosystem of observability platforms has emerged to address agent reliability:

**Fiddler** provides "agentic observability" with guardrails, safety checks, faithfulness scoring, and PII detection. Their approach focuses on monitoring agent runs, collecting traces (steps, tool calls, prompts/outputs), and adding evaluations using LLM-as-judge for groundedness, relevance, and safety scoring.

**LangSmith** offers deep tracing and monitoring with alerts and evaluation workflows to analyze production traces. It provides comprehensive instrumentation for agent runs with dashboards and automated workflows.

**Arize Phoenix** (open-source) provides tracing and evaluation tooling based on OTEL/OpenInference standards, enabling teams to instrument agent applications and troubleshoot issues.

**TruLens** (open-source) uses "feedback functions" (often LLM-based) to score agent runs on relevance, groundedness, and other dimensions.

These platforms share a common approach: instrument agent runs, collect traces, add evaluations, and provide dashboards and alerts. They can trigger guardrails, alerts, or automated workflows based on output and evaluation scores. However, they operate primarily on **external signals**: what happened (actions/outputs), not what was internally intended.

### The External-Only Limitation

External monitoring can observe:

- Which tools were called
- What arguments were passed
- What outputs were generated
- Evaluation scores (relevance, groundedness, safety)

It cannot observe:

- The internal intent that drove tool selection
- Latent misalignment between intent and action
- Silent failures where intent exists but tools aren't called
- Spurious tool calls that occur despite weak internal support

This gap is particularly problematic in regulated industries like financial services, where tool misuse can have significant consequences and where regulatory requirements demand understanding of internal decision-making processes.

---

## Internal Monitoring Approaches

### Activation Probes

Recent research has demonstrated that internal activations encode task-relevant information that can be extracted via probes. **Li et al. (2025)** showed that hidden activations encode tool-use intention and can be predicted via linear probes. **McKenzie et al. (2025)** demonstrated that probes can predict whether a conversation is "high stakes" using classification on hidden representations, evaluating on tool-use scenarios and showing that internal states contain information not visible in outputs.

These works establish the feasibility of probe-based monitoring but typically require training probes for each specific task or toolset, which can be labor-intensive and may not provide interpretable feature-level analysis.

### Mechanistic Interpretability via SAEs

**Anthropic's SAE Research** has shown that Sparse Autoencoders can extract monosemantic, interpretable features encoding formatting modes, sentiment, structured output, and latent skills. Their work demonstrates that SAEs decompose dense activations into sparse, interpretable components that correspond to human-understandable concepts.

When comparing base models to tool-fine-tuned models, new or shifted features emerge that correspond to tool-use patterns: features that recognize function-call JSON, tool schemas, and structured output modes. This suggests that tool-intent information is localized to specific internal features that can be identified and monitored.

**CorrSteer** (Cho et al., 2025) demonstrates that SAE features can be correlated with task success/failure and used to steer model behavior at inference time. The methodology applies to various tasks including QA, bias mitigation, and reasoning benchmarks, showing that internal features encode decision-relevant information that can be monitored and controlled.

### Why Mid-Layers Matter

Most interpretability work (Anthropic, Nanda et al., etc.) finds distinct patterns across layers:

- **Early layers**: Mostly lexical/shallow syntactic features
- **Mid-layers (16-20 in 32-layer models)**: High-level semantics and "decision points" (e.g., "this is toxic", "we're in JSON mode", "I'm summarizing now")
- **Late layers**: More "surface realization" – turning decisions into tokens

Tool-call decisions are semantic control decisions ("I should call the calendar tool now"), so it's natural to look at mid-layers where these decisions are encoded. This aligns with where CorrSteer and similar works find the most steerable task features.

---

## Intent-Action Consistency as a Control

For regulated industries, internal activation monitoring can be positioned as a **regulatory and validation control**, similar to model risk validation frameworks.

**Control Objective**: "Agent must not call tools without latent intent; must not skip tools when latent intent is high."

This becomes a **pre-action gate** (risk management) or **post-action audit** (compliance). By comparing internal intent signals with external tool calls, organizations can detect:

- Silent failures where tools should have been called but weren't
- Spurious tool calls that occur without strong internal support
- Intent drift where internal reasoning diverges from expected patterns

The approach provides an orthogonal signal: **latent intent–action consistency** that trace evaluations often miss because outputs can look "fine" even when internal reasoning is flawed.

---

## Practical Considerations

### Adoption Constraints

This approach has natural adoption constraints. It works best in:

- **Regulated/on-prem open-model deployments** (banks, funds, healthcare) where access to internal activations is available
- **Open-source agent stacks** where model internals can be instrumented

It will **not** be adopted broadly by teams living entirely on closed models (no activations), so the commercial wedge is: **"intent-aware validation layer for open-source agent stacks."**

### Integration Path

The practical integration path is to add internal intent checks as **an extra field in traces** (JSON verdict + intent scores) so teams can keep existing observability platforms (LangSmith, Fiddler, Phoenix) for operations, while using internal monitoring for "intent-aware reliability."

Setup is practical: train SAE once per base model, add light calibration thresholds, and compare to probes which may need retraining per toolset/agent. This makes it more scalable than probe-based approaches for multi-tool scenarios.

---

## The Interpretability Advantage

Beyond detection, SAE-based monitoring provides interpretability. Features can be labeled using automated interpretation tools (AutoInterp, Delphi) to provide human-readable descriptions of what each tool-intent feature represents. This enables:

- **Feature-level auditing**: Understanding which specific internal concepts drive tool selection
- **Debugging**: Identifying why tools are called incorrectly by examining feature activation patterns
- **Validation**: Verifying that tool-intent features align with expected semantic patterns

Research from Anthropic and Goodfire shows that tool-use features often correspond to "structured output" and "technical content" patterns rather than purely domain-specific keywords. This suggests that tool-intent lives in a general semantic subspace that can be identified and monitored across different tool types and domains.

---

## Limitations and Future Directions

This approach has several limitations:

1. **Model Specificity**: Feature discovery is model-specific. Features identified in one model may not transfer directly to others.

2. **Distribution Shift**: Feature correlations require maintenance as agent prompts and use cases evolve.

3. **Layer Specificity**: Tool-intent features may vary across layers. Multi-layer analysis could provide more comprehensive coverage.

4. **Feature Interpretability**: While AutoInterp provides labels, some features may not have clear semantic interpretations.

Future work could explore:

- **Causal Interventions**: Validating tool-intent features through causal interventions
- **Active Steering**: Using tool-intent features to actively steer tool-call behavior (following CorrSteer methodology)
- **Multi-Agent Systems**: Extending to multi-agent systems to detect inter-agent misalignment
- **Cross-Model Analysis**: Comparing tool-intent features across different models to understand how tool training affects feature localization
- **Dynamic Calibration**: Developing adaptive calibration that adjusts to distribution shift

---

## Conclusion

The agent reliability challenge is real and multifaceted. While external observability platforms provide essential tooling for monitoring agent behavior, they operate on surface-level signals. Internal activation monitoring (whether via probes or SAEs) offers a complementary approach that provides visibility into what models internally intend, not just what they externally do.

For regulated industries and high-stakes applications, this internal visibility becomes a critical control mechanism. It enables detection of failure modes that external monitoring cannot observe: silent failures, spurious calls, and intent-action misalignments.

The key insight is that tool-call correctness is fundamentally an internal decision, and we can monitor it directly rather than inferring it from outputs alone. As agent deployments scale, combining external observability with internal intent monitoring will be essential for building reliable, auditable agent systems.

---

## References

- UC Berkeley (2025). "Why Do Multi-Agent LLM Systems Fail?" — Comprehensive analysis of multi-agent failure modes across 150+ tasks
- McKinsey & Company (2025). "The State of AI" — Global survey on agentic AI adoption and scaling challenges
- Gartner (2025). Predictions on agentic AI initiative cancellations due to risk/ROI issues
- Anthropic. "Towards Monosemanticity: Decomposing Language Models with Sparse Autoencoders" — SAE research and tool-use feature discovery
- Anthropic Blog. "Cross-Coder and Model-Diffing" — Tool-use features in fine-tuned models
- Cho et al. (2025). "Steering Improves Task Performance and Safety in LLMs through Correlation-based Sparse Autoencoder Feature Selection" (CorrSteer)
- Li et al. (2025). "Adaptive Tool Use with Meta-Cognition Probe" — Activation probes for tool-intent
- McKenzie et al. (2025). "Detecting High-Stakes Interactions with Activation Probes" — Internal state monitoring
- ToolACE (2024). Large-scale benchmark for function-calling correctness
- Toolformer (Meta, 2023). LLM learns API calls via self-supervised signals
- Goodfire. Production-grade mechanistic interpretability APIs and SAE tooling
- Fiddler AI. Agentic observability platform documentation
- LangSmith. LangChain observability and monitoring tools
- Arize Phoenix. Open-source LLM observability platform
- TruLens. Open-source feedback functions for LLM evaluation
