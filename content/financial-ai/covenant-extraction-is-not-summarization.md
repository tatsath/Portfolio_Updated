---
title: "Covenant Extraction Is Not PDF Summarization"
date: 2026-05-12
description: "Of every job in finance you could point an AI at, private-credit covenant work is the one where the demos lie hardest. Here is what the work actually demands."
categories:
 - Technical
draft: true
ShowToc: true
---

> *The AI Operating Manual for Investment Firms*

# Covenant Extraction Is Not PDF Summarization

*Of every job in finance you could point an AI at, private-credit covenant work is the one where the technology matters most and the demos lie hardest. A credit agreement is a hundred-plus pages of defined terms that reference other defined terms, and "summarize the covenants" is precisely the wrong instruction. Here is what the work actually demands, and why a wrong number here is a loss, not a typo.*


---

Private credit has spent the last decade moving from the edge of the financial system to its center. Global assets under management now sit in the low trillions, with estimates clustering around $2 trillion and running higher depending on what you count, with credible forecasts pointing toward $3–4 trillion by the end of the decade, and direct lending now rivaling the broadly syndicated loan market in size. **<u>[[1]](#ref-1)</u>** But the more interesting development for anyone building or buying AI is the second-order one: as the asset class has scaled, investors and regulators have started applying tighter scrutiny to underwriting, reporting quality, and risk management. **<u>[[2]](#ref-2)</u>** The market is, as one outlook put it, becoming less forgiving.

That combination, namely enormous document volume, real money at stake, and rising demand for defensible process, is why covenant work is the single best argument for the deterministic-extraction thesis I laid out in the last essay. It is also why it is the workflow where a polished AI demo will most reliably mislead you. Because the thing that breaks here is not summarization. It is *meaning*.

This essay is about the hardest version of the document problem in all of finance, and what it actually takes to do it in a way you could defend to an investment committee, an LP, or an examiner.

---

## The agreement as a system, not a document

Hand a frontier model a credit agreement and ask it to "summarize the covenants," and it will give you a fluent, confident, plausible answer. It will also, with disturbing regularity, be wrong in ways you cannot see, and the reason is structural, not a matter of model quality.

A credit agreement is not prose with some numbers in it. It is a closed system of **defined terms that reference other defined terms.** The maintenance covenant says leverage shall not exceed 5.0x. Simple, until you realize that "Leverage Ratio" is a defined term, which depends on "Consolidated Total Debt" (another defined term, with its own inclusions and exclusions) over "Consolidated EBITDA" (a defined term that may run three pages and incorporate a dozen permitted **add-backs**: cost savings, synergies, run-rate adjustments, often subject to caps and lookback periods). The "5.0x" is the easy part. The number that actually matters, the *computed* leverage ratio you compare against it, is the output of a chain of definitions that a naive read flattens into nothing.

And it gets harder, because the agreement is built to have exceptions:

- **Baskets and carve-outs.** The negative covenants prohibit incurring debt, making restricted payments, granting liens, *except* through a thicket of permitted baskets, some fixed-dollar, some "grower" baskets that scale with EBITDA, some that build and get used over time. Knowing the covenant without knowing the baskets is knowing nothing. In private credit specifically, these carve-outs have grown more elaborate, not less.
- **EBITDA add-backs.** The single most litigated, most negotiated, most easily-misread feature of modern credit. What counts as "Consolidated EBITDA" determines every ratio in the document. An add-back read wrong, included when capped, uncapped when limited, applied outside its lookback window, silently corrupts the leverage and coverage calculations downstream.
- **MFN, thresholds, and step-downs.** Most-favored-nation provisions on pricing; covenant levels that step down over the life of the loan; thresholds that trigger different obligations. A covenant level is not a constant. It is often a schedule.
- **Amendments, side letters, and waivers.** The agreement you were handed may have been amended three times. The operative covenant lives in the fourth amendment, the relevant add-back was expanded in a side letter, and a prior breach was waived in a letter that isn't in the main file. Read only the original and you are confidently analyzing a document that no longer governs.

This is why "summarize the covenants" is the wrong instruction. Summarization compresses and discards; covenant work requires the opposite, preserving an exact, interconnected structure where the discarded detail *is* the risk. The task is not to read the document. It is to *reconstruct the system the document encodes.*

![A covenant is not a number — it's a chain](/assets/financial-ai/6-1-covenant-chain.svg)

---

## Extraction vs. validation

Here is the distinction that separates a useful covenant system from a dangerous one, and it maps directly onto the deterministic-extraction argument. There are two different jobs, and most tooling, and most pitches, blur them together.

**Extraction** is pulling the structure out of the agreement: identifying every financial, negative, affirmative, and reporting covenant; capturing each defined term and its dependencies; recording thresholds, baskets, add-backs, step-down schedules, and the amendments that modify them. This is hard, and it is where the current crop of tools concentrates, and where ParseBench's finding bites, since a credit agreement is exactly the kind of dense, table-and-clause-heavy document where parsers diverge. **<u>[[3]](#ref-3)</u>**

**Validation** is the harder, less glamorous, more valuable job: confirming the extracted structure is *correct*, and then confirming the *computed values* derived from it are correct. Does the extracted leverage definition actually match the agreement, clause for clause? When you compute the leverage ratio from the borrower's reporting, does the math foot, are the add-backs applied within their caps and lookbacks, is the result reconciled against what the borrower itself reported? And, the deterministic-layer hallmark from the last essay, does the system *abstain* when a definition is ambiguous or a required input is missing, routing it to a human rather than inventing a clean answer?

The reason this matters is the reason the whole series matters: a covenant tool that *extracts* fluently and *validates* weakly is precisely the "looks finished, might be wrong" trap, applied to a number where being wrong is a realized loss. An IC memo that states a leverage covenant of 5.0x with 0.4x of headroom, built on an add-back the model misread, is not a harmless hallucination. It is a credit decision made on a false premise.

The strongest tools, and the strongest internal builds, treat extraction as table stakes and compete on validation: clause-level citation to the exact page and section, confidence scores, reconciliation of computed ratios, and an explicit "ambiguous / conflicting / not found → human review" path. That is the deterministic extraction-and-validation layer from the previous essay, pointed at the hardest documents in finance.

![Extraction is table stakes. Validation is the moat.](/assets/financial-ai/6-2-extraction-vs-validation.svg)

There is a useful way to think about how such a system should be built, drawn from the broader pattern in production financial AI. The more credible designs do not lean on a single model asked to do everything; they decompose the work across specialized agents with bounded roles and route the output through governance before it lands. The former quant Ben Lorica describes the emerging shape as crews of role-specific agents, one to extract, one to compute, one acting as a risk officer or auditor, coordinating through standard tool-use protocols rather than one monolithic prompt. **<u>[[4]](#ref-4)</u>** For covenant work the mapping is natural: an extraction agent pulls the defined-term structure, a calculation agent recomputes the ratios against reporting, and a checking agent reconciles the result and flags ambiguity for a human, with each step logged. The architecture is not the point in itself. The point is that decomposition plus governance is what lets you put a clause-level citation and a recomputed number in front of a credit committee and defend both.

---

## Ongoing monitoring and headroom

One-time extraction at underwriting is valuable, but the place covenant AI earns its keep over and over is **ongoing monitoring**, and it's where the manual status quo is most obviously broken.

Building a full covenant model for a single agreement takes a junior analyst a day or two. For a hundred-borrower book, that work is never truly finished, so teams build careful models for their most important positions and track the rest more loosely, and the loosely-tracked positions are not necessarily the lower-risk ones. **<u>[[5]](#ref-5)</u>** That gap is the opportunity. A monitoring workflow that ingests each borrower's monthly or quarterly reporting, recomputes covenant headroom automatically, and surfaces trajectory, flagging when a borrower's leverage is *trending toward* a maintenance threshold well before it breaches rather than after, turns a pile of static agreements into a live early-warning system. **<u>[[5]](#ref-5)</u>**

The design rules are the ones that run through everything in this series, and they are non-negotiable here because of the stakes:

- **Recompute, don't restate.** Headroom is a calculation, and the calculation must be re-run against the actual reporting and the validated definition, not lifted from a prior memo or the borrower's own compliance certificate without a check. (The borrower's certificate is itself a claim to be verified, not a source of truth.)
- **Trajectory, not just status.** "In compliance" is a snapshot. "Leverage has moved from 4.1x to 4.6x over two quarters against a 5.0x covenant stepping down to 4.75x next quarter" is a decision-relevant signal. The value is in the trend and the forward step-down, surfaced early.
- **Source-of-record discipline.** Which reporting package is authoritative, for which period? This is the wrong-source/wrong-period problem from the last essay, and it is acute in monitoring, where stale or superseded financials circulate.
- **Monitored is not covered.** An alert opens a piece of work for a credit professional. It does not change a risk rating or a reserve on its own. The model widens the perimeter of what you watch; it does not shrink the perimeter of what a person decides.

The manual reality is what makes this worth building, and it is worth stating plainly rather than dressing up as a personal anecdote. Across a large book, the careful covenant models tend to exist for the marquee positions, while the rest are tracked more loosely, on the quiet and mistaken assumption that the smaller or older exposures are the safer ones. The single most valuable thing an automated monitoring layer does is collapse that gap: it gives the loosely-tracked names the same recomputed-headroom discipline as the marquee ones, and it surfaces a borrower drifting toward its leverage covenant from the trajectory in the reporting, rather than from a compliance certificate that arrives after the quarter has already turned. The failure this guards against, a step-down missed, an add-back applied past its cap, a waiver buried in a side letter no one had modeled, is exactly the kind of error that stays invisible until it is expensive.

---

## The IC evidence pack: the actual product

If there is a single deliverable that captures what good covenant AI should produce, it is not a summary and not a dashboard. It is an **investment-committee evidence pack**, and reframing the output this way is the whole pitch.

A credit committee does not need the AI's opinion on whether to lend. It needs to see the evidence behind a recommendation, organized so that judgment can be applied to it: here is each covenant and its level; here is the defined term it depends on, quoted from the agreement with a clause-level citation; here is the computed ratio and the arithmetic behind it; here are the add-backs applied and the caps they respect; here are the baskets and their current usage; here is the amendment history that modified any of it; and, explicitly, here is what the model extracted versus what a credit professional has reviewed and approved.

That last line is the product. The entire value of bringing AI to this workflow is not speed; it is producing work whose evidence chain is *inspectable*, where every number traces to a clause, every computation can be checked, and the boundary between machine extraction and human judgment is drawn on the page. A credit memo that asserts numbers is a liability. A credit memo where every number is a link to its source clause and a visible calculation is an asset, defensible to the IC today, and to an LP or examiner later.

![The Evidence Chain](/assets/financial-ai/R1-evidence-chain.svg)

---

## What the whole category is still getting wrong

Here is the honest state of the market, and it is not "nobody does this." Covenant extraction is now a contested space: contract-analysis platforms, generative legal-AI tools, credit-document-intelligence providers, and a wave of private-credit-specific agents are all here, several advertising very high extraction accuracy and source-linked clauses. **<u>[[6]](#ref-6)</u>** Pretending the field is empty would be the kind of claim this brand doesn't make. The gap is more specific, and more useful to name, and I'll keep it at the category level rather than singling anyone out, because it's a pattern, not a vendor flaw.

**Extraction is marketed; validation is assumed.** The demos show clauses identified and covenants pulled into a table. They rarely show the computed leverage ratio reconciled against the borrower's reporting, the add-backs checked against their caps, or the abstention behavior when a definition is ambiguous. Extraction is the demoable 80%; validation of the *computed value* is the hard, invisible 20% that decides whether the number is right.

**"99% accuracy" is a claim about the wrong thing, and untested on your book.** Accuracy on *what*, measured *how*, on *whose* documents? Identifying that a leverage covenant exists is not the same as correctly computing the leverage ratio under that covenant's specific definition, with that borrower's specific add-backs. A headline accuracy figure with no stated methodology, on a vendor's chosen documents, tells you very little about performance on your messiest amended-and-restated agreement. In a space this crowded, an accuracy number you can't interrogate is marketing, not evidence.

**Defined-term reasoning is the real test, and the hardest to verify.** The thing that actually distinguishes a credit-grade system from a clever document chatbot is whether it follows the definition chain correctly, resolving "Consolidated EBITDA" through its add-backs and caps, not just locating the phrase. This is precisely what's hardest to assess from a demo and most consequential in production.

**The wrong-source/wrong-period problem is acute and under-addressed.** With amendments, side letters, restatements, and multiple reporting packages in circulation, "which document governs, for which period" is a first-order question, and, as OfficeQA Pro demonstrated on a different corpus, agents tend to stop at the first plausible answer rather than the authoritative one. **<u>[[7]](#ref-7)</u>**

**The human line is often blurred.** This is MNPI-adjacent, fiduciary, high-stakes work. A system that doesn't clearly separate what it extracted from what a person approved, and doesn't fail safely to human review on ambiguity, is producing exactly the false confidence that gets a firm in trouble.

The point of naming these is not to disparage the tools. It is that a buyer cannot tell, from a demo, which of them actually do the hard part. The only way to know is to measure on your own agreements.

---

## How to actually deploy this

The right approach is the one this whole series argues for: narrow, measured, and validated against work you already trust. A sane sequence runs as follows.

Start with **extraction on the existing book**, because it produces immediate, measurable value: a complete covenant model where, for a meaningful share of borrowers, one may not fully exist today. **<u>[[5]](#ref-5)</u>** Set up the **security and data architecture in parallel and first**, namely data classification, vendor assessment, and private or no-train deployment, because this is MNPI-adjacent and that is not optional. Then **validate against history**: run the system on agreements your team has already modeled by hand, ingest several recent quarters of borrower reporting, and confirm the system's covenant calculations match your team's historical work, noting both where it errs and where it catches something the team missed. Only once the parallel run earns the team's trust do you make it the **primary monitoring tool with human oversight**, where analysts review AI outputs rather than building from scratch, and the system improves as edge cases are incorporated. **<u>[[8]](#ref-8)</u>**

Two non-negotiables throughout. First, **measure accuracy on your own agreements**: build a covenant-extraction eval from your actual credit agreements and lead your tooling decision with the number, not the demo. Second, **keep the human as the control point**, with abstention-to-review wired in, because the cost of a silent error here is a credit loss.

---

## The best GenAI use case

Put it together and covenant work sits at a rare intersection. The documents are long, dense, repetitive, and high-stakes, exactly where automation should pay off most. The core questions are deterministic, since a leverage ratio under a defined term either computes to 4.6x or it doesn't, exactly where the extraction-and-validation tier belongs. And the output, done right, is an evidence pack that makes a credit decision more defensible, not less, exactly what a scrutinized, scaling asset class needs.

But it is unforgiving in equal measure, and that is the point. A wrong number in a market research deck is an embarrassment. A wrong covenant calculation in an IC memo is a mispriced risk, a missed early warning, or a breach you didn't see coming. The asymmetry is the whole reason this is a deterministic-extraction problem and not a summarization one: the cost of "looks right, is wrong" is not reputational here. It is financial.

So the firms that win covenant AI will not be the ones with the slickest extraction demo or the highest unqualified accuracy claim. They will be the ones who treated extraction as the easy part, built or bought genuine validation, namely clause-level citation, recomputed and reconciled ratios, defined-term reasoning, source-of-record discipline, and honest abstention, and measured it on their own agreements before trusting it. They will produce covenant work where every number traces to a clause and a calculation, and where the line between machine and judgment is drawn on the page.

A credit agreement is a system of definitions. Reading it is not the job. Reconstructing the system, validating the numbers it produces, and being able to prove both, that is the job. Summarization was never going to get you there.

---

## Conclusion

Covenant work is unforgiving because a wrong number here is a mispriced risk, not an embarrassment — which is exactly why it rewards the firms that treat extraction as the easy part and compete on validation: clause-level citation, recomputed and reconciled ratios, defined-term reasoning, source-of-record discipline, and honest abstention. The way to tell a credit-grade system from a document chatbot is to run it on one agreement your team already knows cold, ideally an amended-and-restated one with real add-backs and a step-down. Did it follow the defined-term chain to the right computed ratio? Did it catch the amendments and side letters? Does every covenant carry a citation you can click? Then ask the vendor how it validates the computed value, and what it does when a definition is ambiguous. Reconstructing the system the agreement encodes — and proving every number it produces — is the whole job, and it is what turns covenant AI from a demo into work an investment committee can stand behind.

---

## References

- <a id="ref-1"></a>**1. AIMA / ACC** - [*Financing the Economy 2025*](https://www.aima.org/article/press-release-strong-growth-sees-private-credit-market-reach-us-3-5-trillion.html) (2025)
- <a id="ref-2"></a>**2. Percent** - [*2026 Private Credit Outlook*](https://www.prnewswire.com/news-releases/percent-releases-2026-private-credit-outlook-growth-continues-as-scrutiny-intensifies-302662163.html) (2026)
- <a id="ref-3"></a>**3. LlamaIndex** - [*ParseBench: A Document Parsing Benchmark for AI Agents*](https://arxiv.org/abs/2604.08538) (April 2026)
- <a id="ref-4"></a>**4. Gradient Flow / Ben Lorica** - [*What's Emerging in Financial AI*](https://gradientflow.substack.com/p/emerging-ai-patterns-in-finance-what) (January 2026)
- <a id="ref-5"></a>**5. WorkWise Solutions** - [*Best AI Agents for Private Credit Firms*](https://workwisesolutions.org/guides/best-ai-agents-private-credit-2026.html) (2026)
- <a id="ref-6"></a>**6. WorkWise Solutions** - [*AI for Credit Agreement and Covenant Review*](https://workwisesolutions.org/guides/ai-credit-agreement-covenant-review.html) (2026)
- <a id="ref-7"></a>**7. Databricks** - [*OfficeQA Pro: An Enterprise Benchmark for End-to-End Grounded Reasoning*](https://arxiv.org/abs/2603.08655) (March 2026)
- <a id="ref-8"></a>**8. WorkWise Solutions** - [*AI for Private Credit & Direct Lending: The Complete Guide*](https://workwisesolutions.org/guides/ai-private-credit-complete-guide.html) (2026)
