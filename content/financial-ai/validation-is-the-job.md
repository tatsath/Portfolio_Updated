---
title: 'Validation Is the Job: Why Extraction and Generation Are the Easy 80%'
date: 2026-05-12
description: "The production is becoming a commodity. A hedge fund validating an extracted figure, an RIA validating a performance claim, a credit team validating a leverage ratio — all three fail the same way when they skip validation."
categories:
 - Technical
draft: false
ShowToc: true
---

> *The AI Operating Manual for Investment Firms*

# Validation Is the Job: Why Extraction and Generation Are the Easy 80%

*Across every AI workflow in an investment firm, the same pattern holds: getting the model to produce something — an extracted number, a drafted memo, a generated answer — is the easy 80%, and modern models do it fluently. Confirming the result is correct, and provable, is the hard 20% that decides whether you can trust it. That hard 20% has a name. It is validation, and it is the work almost everyone underbuilds. This essay makes the general case, then uses private-credit covenant analysis, the most unforgiving version of the problem in all of finance, as the worked example.*

---

Whatever an investment firm points AI at, the work splits into two unequal halves, and almost everyone budgets for the wrong one.

The first half is production: the model reads a filing and pulls a number, drafts a piece of client commentary, summarizes a meeting, generates a deck. This is the part the demos show, the part that feels like magic, and the part that has genuinely gotten good. Call it the easy 80%.

The second half is validation: confirming that the extracted number came from the right place and is right, that the drafted claim is substantiated and compliant, that the summary did not invent a commitment, that the generated figure foots. This is the part no demo shows, the part that is unglamorous and slow, and the part that decides whether the output is an asset or a liability. Call it the hard 20%. It is where trust is won or lost, and it is the single most underbuilt layer in financial AI.

The thesis of this essay is simple and it generalizes across every vertical and use case in this series: **the production is becoming a commodity; the validation is the product.** A hedge fund validating an extracted revenue figure, an RIA validating a client-facing performance claim, a private-credit team validating a covenant ratio, all three are doing the same fundamental job, and all three fail in the same way when they skip it: a fluent, confident, professional-looking output that is quietly wrong, shipped with the firm's name on it because it *looked* finished.

The general case comes first, because it applies to everything. Then the essay spends most of its time on the hardest, highest-stakes instance of it, private-credit covenant analysis, because if you can see why validation is non-negotiable *there*, you can see why it matters everywhere.

---

## The general principle: extraction and generation are the easy part

The pattern repeats with almost monotonous regularity across the use cases an investment firm cares about.

In **document extraction**, pulling a number off a page is now broadly reliable on clean inputs; confirming it came from the authoritative source, the right period, the right line, and reconciles against the rest of the model is the hard part, and it is where silent errors live. In **research and drafting**, generating a fluent memo or a thesis summary is trivial; verifying that every figure and claim in it is sourced and correct is the work, and the polish of the draft actively *hides* the errors. In **client communications**, producing a warm, professional letter takes seconds; confirming it contains no promissory language, no unsubstantiated performance claim, nothing misaligned with the client's documented profile is the part that keeps the firm out of trouble. In **generated outputs**, a model can lay out a beautiful deck; producing a *correct* exhibit in it, the right table, the right chart, the right computed value, is a distinct and weaker capability than producing fluent prose around it.

There is hard evidence that validation gets *harder* exactly where the work is most valuable. A 2026 framework for assessing intrinsic tabular hallucination in finance, built to measure how often a model's output contradicts the financial table it was given, found that hallucination errors rise as the information-extraction task grows more complex.**<u>[[1]](#ref-1)</u>** In other words, the more reasoning a financial task requires, summarize *and* calculate *and* interpret across a structured input, the more the model's unverified output drifts from the source. The implication is uncomfortable and important: the workflows where AI promises the most leverage, the multi-step, reasoning-heavy ones, are precisely the workflows where the validation layer matters most, because that is where the model is most likely to be confidently wrong.

This is why "we added citations" or "we use a grounded model" is not, by itself, validation. A citation tells you the model pointed at a document. It does not tell you the model read the number correctly, applied the right definition, or did the arithmetic right. Validation is a separate, deliberate step: re-derive the value, check it against the source and against the rest of the output, and route anything ambiguous to a human instead of resolving it with false confidence. Production answers the question "what does the model say?" Validation answers the question "is it right, and can I prove it?" Only the second question is defensible.

Now to the hardest place that question gets asked.

---

## The worked example: private-credit covenants

Private credit has spent the last decade moving from the edge of the financial system to its center. Global assets under management now sit in the low trillions, with estimates clustering around $2 trillion and running higher depending on what you count, with credible forecasts pointing toward $3–4 trillion by the end of the decade, and direct lending now rivaling the broadly syndicated loan market in size.**<u>[[2]](#ref-2)</u>** As the asset class has scaled, investors and regulators have started applying tighter scrutiny to underwriting, reporting quality, and risk management; the market is, as one outlook put it, becoming less forgiving.**<u>[[3]](#ref-3)</u>**

That combination, enormous document volume, real money at stake, and rising demand for defensible process, is why covenant analysis is the sharpest possible illustration of the validation thesis. It is also the workflow where a polished AI demo will most reliably mislead you, because the thing that breaks here is not the production. It is the *meaning*, and you can only catch the break by validating. Everything below is a credit example, but the structure, fluent extraction is easy, validating the computed result is hard and decisive, is the same structure that governs the research memo, the client letter, and the generated deck.

---

## Why a credit agreement is a system of definitions, not a document

Hand a frontier model a credit agreement and ask it to "summarize the covenants," and it will give you a fluent, confident, plausible answer. It will also, with disturbing regularity, be wrong in ways you cannot see, and the reason is structural, not a matter of model quality.

A credit agreement is not prose with some numbers in it. It is a closed system of **defined terms that reference other defined terms.** The maintenance covenant says leverage shall not exceed 5.0x. Simple, until you realize that "Leverage Ratio" is a defined term, which depends on "Consolidated Total Debt" (another defined term, with its own inclusions and exclusions) over "Consolidated EBITDA" (a defined term that may run three pages and incorporate a dozen permitted **add-backs**: cost savings, synergies, run-rate adjustments, often subject to caps and lookback periods). The "5.0x" is the easy part. The number that actually matters, the *computed* leverage ratio you compare against it, is the output of a chain of definitions that a naive read flattens into nothing.

And it gets harder, because the agreement is built to have exceptions:

- **Baskets and carve-outs.** The negative covenants prohibit incurring debt, making restricted payments, granting liens, *except* through a thicket of permitted baskets, some fixed-dollar, some "grower" baskets that scale with EBITDA, some that build and get used over time. Knowing the covenant without knowing the baskets is knowing nothing. In private credit specifically, these carve-outs have grown more elaborate, not less.
- **EBITDA add-backs.** The single most litigated, most negotiated, most easily-misread feature of modern credit. What counts as "Consolidated EBITDA" determines every ratio in the document. An add-back read wrong, included when capped, uncapped when limited, applied outside its lookback window, silently corrupts the leverage and coverage calculations downstream.
- **MFN, thresholds, and step-downs.** Most-favored-nation provisions on pricing; covenant levels that step down over the life of the loan; thresholds that trigger different obligations. A covenant level is not a constant. It is often a schedule.
- **Amendments, side letters, and waivers.** The agreement you were handed may have been amended three times. The operative covenant lives in the fourth amendment, the relevant add-back was expanded in a side letter, and a prior breach was waived in a letter that isn't in the main file. Read only the original and you are confidently analyzing a document that no longer governs.

This is why "summarize the covenants" is the wrong instruction. Summarization compresses and discards; covenant work requires the opposite, preserving an exact, interconnected structure where the discarded detail *is* the risk. The task is not to read the document. It is to *reconstruct the system the document encodes.*

![A covenant is a chain](/assets/financial-ai/6-1-covenant-chain.svg)

---

## Extraction vs. validation: the two jobs people merge into one

Here is the distinction that separates a useful covenant system from a dangerous one, and it maps directly onto the deterministic-extraction argument. There are two different jobs, and most tooling, and most pitches, blur them together.

**Extraction** is pulling the structure out of the agreement: identifying every financial, negative, affirmative, and reporting covenant; capturing each defined term and its dependencies; recording thresholds, baskets, add-backs, step-down schedules, and the amendments that modify them. This is hard, and it is where the current crop of tools concentrates, and where ParseBench's finding bites, since a credit agreement is exactly the kind of dense, table-and-clause-heavy document where parsers diverge.**<u>[[4]](#ref-4)</u>**

**Validation** is the harder, less glamorous, more valuable job: confirming the extracted structure is *correct*, and then confirming the *computed values* derived from it are correct. Does the extracted leverage definition actually match the agreement, clause for clause? When you compute the leverage ratio from the borrower's reporting, does the math foot, are the add-backs applied within their caps and lookbacks, is the result reconciled against what the borrower itself reported? And, the deterministic-layer hallmark from the previous essay, does the system *abstain* when a definition is ambiguous or a required input is missing, routing it to a human rather than inventing a clean answer?

The reason this matters is the reason the whole series matters: a covenant tool that *extracts* fluently and *validates* weakly is precisely the "looks finished, might be wrong" trap, applied to a number where being wrong is a realized loss. An IC memo that states a leverage covenant of 5.0x with 0.4x of headroom, built on an add-back the model misread, is not a harmless hallucination. It is a credit decision made on a false premise.

A practitioner who ran the leading models head-to-head on a real credit agreement put the failure precisely. Both models, he found, will hallucinate a defined-term cross-reference if you do not feed them the actual definitions section, and the output is "wrong in ways that look right." The place the errors hide, he noted, is the EBITDA bridge, the build-up from net income through the add-backs to the covenant figure, which is exactly the multi-step, reasoning-heavy computation the tabular-hallucination research flagged as most error-prone.**<u>[[5]](#ref-5)</u>** That is the general principle in one concrete observation: the model produces a confident, plausible EBITDA figure, and only validation, recomputing the bridge against the agreement's own definitions, reveals whether it is right.

The strongest tools, and the strongest internal builds, treat extraction as table stakes and compete on validation: clause-level citation to the exact page and section, confidence scores, reconciliation of computed ratios, and an explicit "ambiguous / conflicting / not found → human review" path. That is the deterministic extraction-and-validation layer from the previous essay, pointed at the hardest documents in finance.

![Extraction is table stakes. Validation is the moat.](/assets/financial-ai/6-2-extraction-vs-validation.svg)

There is a useful way to think about how such a system should be built, drawn from the broader pattern in production financial AI. The more credible designs do not lean on a single model asked to do everything; they decompose the work across specialized agents with bounded roles and route the output through governance before it lands. The former quant Ben Lorica describes the emerging shape as crews of role-specific agents, one to extract, one to compute, one acting as a risk officer or auditor, coordinating through standard tool-use protocols rather than one monolithic prompt.**<u>[[6]](#ref-6)</u>** For covenant work the mapping is natural: an extraction agent pulls the defined-term structure, a calculation agent recomputes the ratios against reporting, and a checking agent reconciles the result and flags ambiguity for a human, with each step logged. The architecture is not the point in itself. The point is that decomposition plus governance is what lets you put a clause-level citation and a recomputed number in front of a credit committee and defend both.

---

## The recurring job: borrower monitoring and covenant headroom

One-time extraction at underwriting is valuable, but the place covenant AI earns its keep over and over is **ongoing monitoring**, and it's where the manual status quo is most obviously broken.

Building a full covenant model for a single agreement takes a junior analyst a day or two. For a hundred-borrower book, that work is never truly finished, so teams build careful models for their most important positions and track the rest more loosely, and the loosely-tracked positions are not necessarily the lower-risk ones.**<u>[[7]](#ref-7)</u>** That gap is the opportunity. A monitoring workflow that ingests each borrower's monthly or quarterly reporting, recomputes covenant headroom automatically, and surfaces trajectory, flagging when a borrower's leverage is *trending toward* a maintenance threshold well before it breaches rather than after, turns a pile of static agreements into a live early-warning system.**<u>[[7]](#ref-7)</u>**

The design rules are the ones that run through everything in this series, and they are non-negotiable here because of the stakes:

- **Recompute, don't restate.** Headroom is a calculation, and the calculation must be re-run against the actual reporting and the validated definition, not lifted from a prior memo or the borrower's own compliance certificate without a check. (The borrower's certificate is itself a claim to be verified, not a source of truth.)
- **Trajectory, not just status.** "In compliance" is a snapshot. "Leverage has moved from 4.1x to 4.6x over two quarters against a 5.0x covenant stepping down to 4.75x next quarter" is a decision-relevant signal. The value is in the trend and the forward step-down, surfaced early.
- **Source-of-record discipline.** Which reporting package is authoritative, for which period? This is the wrong-source/wrong-period problem from the previous essay, and it is acute in monitoring, where stale or superseded financials circulate.
- **Monitored is not covered.** An alert opens a piece of work for a credit professional. It does not change a risk rating or a reserve on its own. The model widens the perimeter of what you watch; it does not shrink the perimeter of what a person decides.

The manual reality is what makes this worth building, and it is worth stating plainly rather than dressing up. Across a large book, the careful covenant models tend to exist for the marquee positions, while the rest are tracked more loosely, on the quiet and mistaken assumption that the smaller or older exposures are the safer ones. The single most valuable thing an automated monitoring layer does is collapse that gap: it gives the loosely-tracked names the same recomputed-headroom discipline as the marquee ones, and it surfaces a borrower drifting toward its leverage covenant from the trajectory in the reporting, rather than from a compliance certificate that arrives after the quarter has already turned. The failure this guards against, a step-down missed, an add-back applied past its cap, a waiver buried in a side letter no one had modeled, is exactly the kind of error that stays invisible until it is expensive.

---

## The IC evidence pack: the actual product

If there is a single deliverable that captures what good covenant AI should produce, it is not a summary and not a dashboard. It is an **investment-committee evidence pack**, and reframing the output this way is the whole pitch.

A credit committee does not need the AI's opinion on whether to lend. It needs to see the evidence behind a recommendation, organized so that judgment can be applied to it: here is each covenant and its level; here is the defined term it depends on, quoted from the agreement with a clause-level citation; here is the computed ratio and the arithmetic behind it; here are the add-backs applied and the caps they respect; here are the baskets and their current usage; here is the amendment history that modified any of it; and, explicitly, here is what the model extracted versus what a credit professional has reviewed and approved.

That last line is the product. The entire value of bringing AI to this workflow is not speed; it is producing work whose evidence chain is *inspectable*, where every number traces to a clause, every computation can be checked, and the boundary between machine extraction and human judgment is drawn on the page. A credit memo that asserts numbers is a liability. A credit memo where every number is a link to its source clause and a visible calculation is an asset, defensible to the IC today, and to an LP or examiner later.

![The Evidence Chain](/assets/financial-ai/R1-evidence-chain.svg)

---

## What the whole category is still getting wrong

Here is the honest state of the market, and it is not "nobody does this." Covenant extraction is now a contested space: contract-analysis platforms, generative legal-AI tools, credit-document-intelligence providers, and a wave of private-credit-specific agents are all here, several advertising very high extraction accuracy and source-linked clauses.**<u>[[8]](#ref-8)</u>** Pretending the field is empty would be the kind of claim this series does not make. The gap is more specific, and more useful to name, and the description stays at the category level rather than singling anyone out, because it's a pattern, not a vendor flaw.

**Extraction is marketed; validation is assumed.** The demos show clauses identified and covenants pulled into a table. They rarely show the computed leverage ratio reconciled against the borrower's reporting, the add-backs checked against their caps, or the abstention behavior when a definition is ambiguous. Extraction is the demoable 80%; validation of the *computed value* is the hard, invisible 20% that decides whether the number is right.

**"99% accuracy" is a claim about the wrong thing, and untested on your book.** Accuracy on *what*, measured *how*, on *whose* documents? Identifying that a leverage covenant exists is not the same as correctly computing the leverage ratio under that covenant's specific definition, with that borrower's specific add-backs. A headline accuracy figure with no stated methodology, on a vendor's chosen documents, tells you very little about performance on your messiest amended-and-restated agreement. In a space this crowded, an accuracy number you can't interrogate is marketing, not evidence.

**Defined-term reasoning is the real test, and the hardest to verify.** The thing that actually distinguishes a credit-grade system from a clever document chatbot is whether it follows the definition chain correctly, resolving "Consolidated EBITDA" through its add-backs and caps, not just locating the phrase. This is precisely what's hardest to assess from a demo and most consequential in production.

**The wrong-source/wrong-period problem is acute and under-addressed.** With amendments, side letters, restatements, and multiple reporting packages in circulation, "which document governs, for which period" is a first-order question, and, as OfficeQA Pro demonstrated on a different corpus, agents tend to stop at the first plausible answer rather than the authoritative one.**<u>[[9]](#ref-9)</u>**

**The human line is often blurred.** This is MNPI-adjacent, fiduciary, high-stakes work. A system that doesn't clearly separate what it extracted from what a person approved, and doesn't fail safely to human review on ambiguity, is producing exactly the false confidence that gets a firm in trouble.

The point of naming these is not to disparage the tools. It is that a buyer cannot tell, from a demo, which of them actually do the hard part. The only way to know is to measure on your own agreements.

---

## How to actually deploy this

The right approach is the one this whole series argues for: narrow, measured, and validated against work you already trust. A sane sequence runs as follows.

Start with **extraction on the existing book**, because it produces immediate, measurable value: a complete covenant model where, for a meaningful share of borrowers, one may not fully exist today.**<u>[[7]](#ref-7)</u>** Set up the **security and data architecture in parallel and first**, namely data classification, vendor assessment, and private or no-train deployment, because this is MNPI-adjacent and that is not optional. Then **validate against history**: run the system on agreements your team has already modeled by hand, ingest several recent quarters of borrower reporting, and confirm the system's covenant calculations match your team's historical work, noting both where it errs and where it catches something the team missed. Only once the parallel run earns the team's trust do you make it the **primary monitoring tool with human oversight**, where analysts review AI outputs rather than building from scratch, and the system improves as edge cases are incorporated.**<u>[[10]](#ref-10)</u>**

Two non-negotiables throughout. First, **measure accuracy on your own agreements**: build a covenant-extraction eval from your actual credit agreements and lead your tooling decision with the number, not the demo. Second, **keep the human as the control point**, with abstention-to-review wired in, because the cost of a silent error here is a credit loss.

---

## Why this is the best GenAI use case in finance, and the most unforgiving

Put it together and covenant work sits at a rare intersection. The documents are long, dense, repetitive, and high-stakes, exactly where automation should pay off most. The core questions are deterministic, since a leverage ratio under a defined term either computes to 4.6x or it doesn't, exactly where the extraction-and-validation tier belongs. And the output, done right, is an evidence pack that makes a credit decision more defensible, not less, exactly what a scrutinized, scaling asset class needs.

But it is unforgiving in equal measure, and that is the point. A wrong number in a market research deck is an embarrassment. A wrong covenant calculation in an IC memo is a mispriced risk, a missed early warning, or a breach you didn't see coming. The asymmetry is the whole reason this is a deterministic-extraction problem and not a summarization one: the cost of "looks right, is wrong" is not reputational here. It is financial.

So the firms that win covenant AI will not be the ones with the slickest extraction demo or the highest unqualified accuracy claim. They will be the ones who treated extraction as the easy part, built or bought genuine validation, namely clause-level citation, recomputed and reconciled ratios, defined-term reasoning, source-of-record discipline, and honest abstention, and measured it on their own agreements before trusting it. They will produce covenant work where every number traces to a clause and a calculation, and where the line between machine and judgment is drawn on the page.

A credit agreement is a system of definitions. Reading it is not the job. Reconstructing the system, validating the numbers it produces, and being able to prove both, that is the job. Summarization was never going to get you there.

---

## Back to the general case: validation is the work

Covenants are the extreme, but step back and the lesson is the one that governs every AI workflow in an investment firm. Whatever the model produces, an extracted figure, a drafted memo, a client letter, a generated exhibit, the production is the easy 80% and is rapidly becoming a commodity. The validation, confirming the result is correct and being able to prove it, is the hard 20%, and it is the part that decides whether the output is something you can stand behind.

The shape of validation is the same across verticals. Re-derive the consequential value rather than trusting the model's first answer. Tie every claim and number to its authoritative source and the right period. Reconcile the result against the rest of the output and against what you already know. Draw a visible line between what the machine produced and what a human approved. And build an explicit path for the model to say "I am not sure" and route to a person, instead of resolving ambiguity with false confidence. A hedge fund applies that to a revenue figure, an RIA to a performance claim, a credit team to a leverage ratio. The stakes differ; the discipline does not.

The uncomfortable truth underneath it, confirmed by the research, is that validation gets harder exactly where AI is most useful, in the multi-step, reasoning-heavy work where the model is most likely to be confidently wrong. So the firms that get durable value from AI are not the ones that generated the most or the fastest. They are the ones that built the validation layer the demos skip, and can therefore trust, and defend, what the model produced.

Production is the commodity. Validation is the product. Build for the validation.

---

> **Practical next step.** Take one output your firm already relies on, a covenant model, a research memo, a client letter, whatever is highest-stakes, and try to validate it the hard way. Can you re-derive every consequential number from its source? Is every claim substantiated by something you actually hold? Is there a visible line between what the model produced and what a person approved? Wherever that validation chain breaks is where your real exposure sits, and where the work is.


## References

- <a id="ref-1"></a>**1. FAITH** - [*A Framework for Assessing Intrinsic Tabular Hallucinations in Finance*](https://arxiv.org/abs/2508.05201) - arXiv:2508.05201 (2025)
- <a id="ref-2"></a>**2. AIMA / Moody's / Cleary Gottlieb** - [*Global Private Credit AUM Estimates: $2–3.5T, Forecast $3–4T by 2030*](https://www.aima.org/article/press-release-strong-growth-sees-private-credit-market-reach-us-3-5-trillion.html) (2025–2026)
- <a id="ref-3"></a>**3. Percent** - [*2026 Private Credit Outlook: The Market Is Becoming Less Forgiving*](https://www.prnewswire.com/news-releases/percent-releases-2026-private-credit-outlook-growth-continues-as-scrutiny-intensifies-302662163.html) (2026)
- <a id="ref-4"></a>**4. LlamaIndex** - [*ParseBench: A Document Parsing Benchmark for AI Agents*](https://arxiv.org/abs/2604.08538) - arXiv:2604.08538 (April 2026)
- <a id="ref-5"></a>**5. Stephen Smith** - [*Two AIs. One Credit Agreement.*](https://www.smithstephen.com/p/two-ais-one-credit-agreement-both) (2026)
- <a id="ref-6"></a>**6. Gradient Flow / Ben Lorica** - [*What's Emerging in Financial AI: Multi-Agent Architectures*](https://gradientflow.substack.com/p/emerging-ai-patterns-in-finance-what) (January 2026)
- <a id="ref-7"></a>**7. WorkWise Solutions** - [*Best AI Agents for Private Credit Firms*](https://workwisesolutions.org/guides/best-ai-agents-private-credit-2026.html) (2026)
- <a id="ref-8"></a>**8. WorkWise Solutions** - [*AI for Credit Agreement and Covenant Review*](https://workwisesolutions.org/guides/ai-credit-agreement-covenant-review.html) (2026)
- <a id="ref-9"></a>**9. Databricks AI Research** - [*OfficeQA Pro: An Enterprise Benchmark for End-to-End Grounded Reasoning*](https://arxiv.org/abs/2603.08655) - arXiv:2603.08655 (March 2026)
- <a id="ref-10"></a>**10. WorkWise Solutions** - [*AI for Private Credit & Direct Lending: The Complete Guide*](https://workwisesolutions.org/guides/ai-private-credit-complete-guide.html) (2026)
