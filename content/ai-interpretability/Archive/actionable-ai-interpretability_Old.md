---
title: "From Outputs to Internals"
date: 2025-01-16T00:00:00Z
lastmod: 2025-01-16T00:00:00Z
draft: true
description: "Why internal activations are the only stable evaluation surface."
author: ["H.T"]
categories: ["Educational"]
---

## Introduction

The shift from evaluating outputs to inspecting internals represents a fundamental change in how we understand and evaluate AI systems. Internal activations provide the only stable evaluation surface for understanding model behavior.

## The Instability of Outputs

Output-level evaluation is inherently unstable:

- **Outputs can be correct for wrong reasons**: A model may produce the right answer through flawed reasoning
- **Outputs hide internal failures**: Silent breakdowns occur inside the model without affecting outputs
- **Outputs are context-dependent**: The same internal state can produce different outputs in different contexts
- **Outputs don't reveal uncertainty**: Models may be uncertain but produce confident outputs

## Why Internals Are Stable

Internal activations provide a stable evaluation surface because:

- **Direct measurement**: We observe what the model actually computes, not what it reports
- **Mechanistic insights**: Internal activations reveal the actual reasoning process
- **Early failure detection**: Problems can be detected before they reach outputs
- **Causal understanding**: We can trace how inputs map to internal states to outputs

## The NeuronLens Approach

NeuronLens inspects internal activations using:

- **Sparse autoencoders**: Decompose activations into interpretable features
- **Probe-based evaluation**: Detect specific failure modes and behaviors
- **Feature steering**: Directly manipulate internal states to understand causality

## The Future of Evaluation

Moving from outputs to internals enables:

- **Proactive failure detection**: Catch problems before they affect users
- **Mechanistic understanding**: Know why models make decisions
- **Targeted improvements**: Fix specific internal failures without retraining

---

_More details to be added._
