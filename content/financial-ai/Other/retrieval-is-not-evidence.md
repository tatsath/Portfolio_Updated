---
title: "Retrieval Is Not Evidence: Why \"It Cited a Source\" Still Gets Finance Wrong"
date: 2026-05-05
draft: true
---

> *The AI Operating Manual for Investment Firms* — Essay 05

# Retrieval Is Not Evidence: Why "It Cited a Source" Still Gets Finance Wrong

### Everyone has converged on the same fix for AI hallucination: ground the model in your documents, show a citation, trust the answer. For synthesis, that works. For the number on slide 14, it quietly doesn't, and the reason exposes the most important architectural decision in financial AI. It isn't "agents vs. RAG." It's *probabilistic reading vs. deterministic extraction.*

*By [YOUR NAME] · [DATE] · ~16 min read · Nothing here is investment advice.*

---

By now the industry has settled on a reassuring story about AI accuracy. Raw language models hallucinate, the story goes, so you ground them: connect the model to your filings, your data room, your research archive; retrieve the relevant passage; show a citation next to the answer. The citation is the proof. Problem solved.

Start with the good news, because it is real and it reframes the whole conversation. A few years ago, automating document work in a fund meant rigid templates that broke on any document they had not seen before, so only a narrow slice of the most standardized paperwork was worth automating at all. That has changed. Modern AI handles messy layouts, varied formats, and documents it has never encountered, which has pushed the share of routine document work that is genuinely automatable from a thin sliver to the substantial majority. The honest framing today is not "AI can't read documents." It is the opposite: AI can now read *most* of them, well enough, most of the time. The interesting and valuable question has moved. It is no longer "can this be automated?" It is "where, specifically, does it still break, and how do I know whether I am in the part that works or the part that doesn't?"

This essay is about that remaining slice, the part that does not work, and about a confusion that makes the working part less trustworthy than it looks. Because the dangerous failures are not the documents the model visibly chokes on. They are the ones where it produces a fluent, confident, cited answer that is quietly wrong.

It is a good story, that grounding-plus-citation fix, and for a large class of work it is true. For finance, it contains a quiet and expensive error, and naming that error precisely is the most useful thing this essay can do, because it turns out to be the single most important architectural decision a firm makes when it puts AI near its numbers.

Here is the error in one line: **a citation tells you the model found a document. It does not tell you the model read the number correctly.** Those are different claims, and the gap between them is exactly where a wrong figure hides, behind a real, clickable, entirely legitimate footnote.

---

## The reframe: it was never "agents vs. RAG"

Most discussion of this sorts the world into two buckets: agents over here, retrieval-augmented generation (RAG) over there, pick your architecture. That framing will get you picked apart by anyone technical, because it misses the actual fault line.

Agents and RAG are not opposites. They are both *probabilistic reading*. In both, a language model ends up looking at some retrieved text and transcribing what it sees, and in both, it can grab the wrong cell, misread "in thousands" as "in millions," or pull a figure from the wrong period (FY24 instead of Q4, reported instead of adjusted). RAG improves *retrieval*, meaning finding the right page. It does nothing for *extraction correctness*, meaning getting the value off that page exactly right. An agent adds tools and a reasoning loop on top, but the moment it reads a number out of a document, it is doing the same fragile thing.

The real dividing line runs somewhere else entirely, between **probabilistic reading** of any kind and **deterministic extraction with validation**: parse the document into a structured representation, pull values into a defined schema, run rule checks on them, and attach a cell-level citation, a confidence score, and the ability to *abstain* when the evidence is missing or conflicting.

So the picture is three tiers, not two:

| Tier | What it is | Good for | Where it breaks |
|------|------------|----------|-----------------|
| **Agent** | Model + tools, reasons and acts in a loop | Open-ended, multi-step, flexible work | Slow, costly, hard to audit; fragile on exact numbers |
| **RAG** | Chunk → embed → retrieve → generate | Search and synthesis over a large corpus | Retrieves *text*, not *validated values*; same extraction fragility |
| **Deterministic extraction + validation** | Parse → schema → rule checks → cell-level citation + confidence + abstention | Exact, repeatable, audit-grade numbers | Needs known fields/templates; ingestion cost upfront |

And the relationship between them matters: RAG is not a peer of "agent." RAG sits *underneath* an agent or an extraction pipeline as a retrieval technique. Pitch "agents vs. RAG" to a sophisticated buyer and they hear a category error. The line that actually predicts whether you can trust an output is the line between the first two tiers and the third.

> Probabilistic reading is fine for synthesis. Finance numbers need a deterministic extraction-and-validation layer.

`[FIGURE 1 — "Three tiers, not two." Render the table above as a clean three-row stack. Crucial visual detail: show RAG as a thin horizontal band sitting UNDERNEATH both "Agent" and "Deterministic extraction" — i.e., a shared substrate, not a third peer column — to make the "RAG is not a peer category" point visually. Shade tiers 1–2 in the neutral/grey 'probabilistic reading' family and tier 3 in the teal 'deterministic' accent. Caption: "The fault line isn't agent vs. RAG. It's probabilistic reading vs. deterministic extraction."]`

---

## The evidence is now overwhelming, and recent

This is not a theoretical worry, and you no longer have to take it on assertion. Two benchmarks published in the last few months make the point with unusual force, and a third and fourth confirm it isn't new.

Start with the most brutal. In March 2026, Databricks released **OfficeQA Pro**, a benchmark built on roughly 89,000 pages of U.S. Treasury Bulletins spanning nearly a century, over 26 million numerical values, the kind of messy, table-heavy, partially-scanned corpus that actually resembles enterprise documents. The questions are designed to require finding the right figure across thousands of pages and then doing precise, "economic-grade" arithmetic on it. The results: frontier models scored **under 5% accuracy** relying on their own knowledge, **under 12%** even with web access, and, given direct access to the document corpus, **34.1% on average**, still failing more than half the questions.[^officeqa]

Then the finding that should reframe how every firm thinks about this. Databricks showed that handing the agents a **structured document representation**, produced by a dedicated parsing step rather than raw PDF, yielded a **16.1% average relative performance gain across models.**[^officeqa] Sit with that. The biggest single lever was not a smarter model. It was *better parsing.* How the AI *sees* the document mattered as much as the reasoning behind its eyes.

The second benchmark explains why parsing is so decisive. In April 2026, LlamaIndex released **ParseBench**, ~2,000 human-verified enterprise pages from finance, insurance, and government, with 169,000+ test rules across five dimensions: tables, charts, content faithfulness, semantic formatting, and **visual grounding**, meaning tracing every extracted element back to its exact spot on the page, which the authors note plainly is "required for auditability in regulated workflows." Across fourteen methods, the headline was a **fragmented capability landscape: no method was consistently strong across all five dimensions.**[^parsebench] Read those five dimensions again. They are precisely the things a financial document demands, and the best tools are each good at some and weak at others.

And lest anyone object that this is a 2026 problem with 2026 models, it isn't new. Back in 2023, the Stanford/Patronus **FinanceBench** showed a leading model with a retrieval system answering incorrectly or refusing on **81%** of deliberately clear-cut questions about public filings, even with the documents in hand.[^financebench] And a 2026 financial-retrieval benchmark, **FinRetrieval**, found the same class of model scoring ~**90.8%** with a structured-data source versus ~**19.8%** on open web, a 71-point swing driven by the data layer, not the model.[^finretrieval] Four benchmarks, two years apart, all pointing the same direction.

The conclusion is no longer arguable. **The system around the model, meaning how the document is parsed, where the number is retrieved from, and whether the value is validated, dominates the outcome far more than which model you use.** The model is not the bottleneck. The plumbing is.

`[FIGURE 2 — "It's the parsing, not the brain." A simple bar chart of OfficeQA Pro accuracy: ~5% (model alone) → ~12% (+ web) → 34.1% (+ document corpus) → then a clearly-labelled bump showing the +16.1% relative gain from structured parsing on top. Annotate the last step: "the biggest lever wasn't a smarter model — it was better parsing." Caption: source OfficeQA Pro, Databricks, March 2026. Keep the bars sober; this is a serious finding, not a victory lap.]`

---

## Where retrieval fails on a financial number, specifically

Strip it down to mechanics and the failure points are specific, and obvious to anyone who has actually read a 10-K or a credit agreement:

- **Tables.** Financial statements *are* tables, and converting a PDF table to text is where most accuracy dies: merged cells, lost column alignment, multi-level headers, a "in thousands" stated once at the top and then forgotten, parentheses that mean *negative* read as ordinary digits. OfficeQA Pro's own error analysis named "table topology failures," meaning shifted rows and mangled structure, as a core failure mode.[^officeqa] A model handed a scrambled table will give you a confident, precise, wrong number.
- **Footnotes and defined terms.** The meaning of a figure often lives somewhere other than the figure. "Adjusted EBITDA" is defined by add-backs in a footnote; a covenant ratio is computed "as defined in the Credit Agreement" fifty pages away; a segment number rests on a reclassification in fine print. Retrieval that grabs the table but not the footnote produces a sourced, precise, wrong answer.
- **The wrong-source / wrong-period problem.** This is one nobody handles well, and it is close to the heart of the matter. The same revenue figure appears in a press release, an investor deck, the 10-Q, the 10-K, and a stale third-party copy on the web, in slightly different forms, for slightly different periods, before and after a restatement. Which is authoritative? OfficeQA Pro caught exactly this: the Treasury Bulletins are revised and reissued, multiple legitimate values exist for the same data point, and the agents "stop searching once they find a plausible answer," missing the most authoritative or current one, *despite being told to find the latest.*[^officeqa] That is a silent error. It looks right. It is wrong. And a citation does not save you, because the citation points at a real document, just not the right one.
- **Silent omission, the failure you cannot see.** This is the subtlest one, and it is distinct from everything above. The cases so far are "retrieved the wrong thing." This one is "did not retrieve the thing at all, and had no idea." When an agent reads across a long filing, a stack of broker notes, or a news feed, the retrieval step surfaces some passages and silently drops the rest, and the actual signal may live in a paragraph that never made it into the model's view. The output *looks* complete and carries a clean citation to what it did read, but the agent has no awareness of what it missed, so it cannot flag the gap or hedge its confidence. This is the quiet danger in "the retrieval looked fine": looking fine is not the same as being complete, and a confident answer built on a partial read is indistinguishable, on the surface, from one built on the whole record.[^silentomission]
- **Scanned and image PDFs.** Credit agreements, older filings, and tax documents are frequently scans. OCR introduces digit-level noise, and one transposed figure is a material error in a credit memo. (OfficeQA Pro had to strip the bulletins' existing OCR layer precisely because it was too inaccurate to trust.[^officeqa])
- **Numerical reasoning.** Even with perfect inputs, models make arithmetic and unit errors: totals that don't foot, a margin off the wrong base, a currency not converted.
- **Fabrication on absence.** When the answer simply isn't in the documents, the dangerous default is to invent a plausible one rather than say "not found." FinanceBench captured this exact tension between hallucination and refusal.[^financebench]
- **Charts, and the multi-turn collapse.** This is where the "AI can read most documents now" story has a hard edge, and it is worth a specific number. A 2026 benchmark on multimodal financial documents found that vision-language models reach decent accuracy on text and tables, on the order of 85–90%, but their accuracy on *chart interpretation* falls off a cliff, into the rough range of 34–62%.[^charts] A financial report is not only prose and tables; it is bar charts, waterfalls, trend lines, allocation pies, and the model that reads the table competently may badly misread the chart beside it. The same study found a second, compounding failure: in multi-turn analysis, where you ask follow-up questions, an early mistake propagates through the conversation and drags accuracy down toward ~50% regardless of how large the model is.[^charts] So the part of the document that is hardest to extract, the visual, is exactly the part a fluent answer will gloss over, and the interactive, conversational workflow that feels most natural is the one where errors quietly compound.

Notice the through-line: in almost every case the model is *confident*, the output is *fluent*, and, if there's a RAG layer, there's *a citation attached.* None of that makes the number right. "It cited something" has quietly become the industry's substitute for "it's correct," and they are not the same thing. And notice, too, that this is the precise boundary of the good news from the top of the essay: AI now reads the *substantial majority* of routine document work well, but the residual, the chart, the scanned amendment, the wrong-period figure, the silently dropped paragraph, is concentrated exactly where the stakes in finance are highest and where a confident wrong answer does the most damage.

---

## What an evidence layer actually is

If retrieval isn't evidence, what is? Evidence is a chain you can inspect, and it is the defining feature of the third tier. For every material claim, especially every number, you should be able to see four things:

1. **The claim**, meaning the figure or assertion itself.
2. **The source**, not "the 10-K," but the exact location: page, table, cell, footnote, *and the designated source-of-record and period*, with restatements handled. The number came from the filing you chose, not whatever the index happened to surface.
3. **The calculation**, meaning any number that was computed is recomputed and reconciled: totals footed and cross-footed, ratios checked, units and currency confirmed.
4. **The reviewer**, a named human who signed off, with the authority to send it back.

This is the evidence chain that runs through this entire series, here pointed at the hardest case, a single financial figure. The difference between this and a RAG citation is the difference between "here is a document that mentions this" and "here is the exact cell this came from, here is the math I redid, here is where it sits versus the other places it appears, and here is who approved it."

`[FIGURE 3 — The Evidence Chain (reuse R1, the recurring brand figure). Use the figure/cell-level labels: Claim → Source (document · page · cell · footnote) → Calculation (recompute · reconcile) → Reviewer (sign-off), with the "rejected / sent back" loop. Caption: "The same evidence chain as the rest of the series — pointed at a single number. A RAG citation gives you the first arrow and skips the rest."]`

The architecture that delivers this is the set of controls that mirror the failure points above: **structure-aware parsing** instead of naive text-chunking (the OfficeQA lesson); a **structured-data backbone** wherever the fields are known (the FinRetrieval lesson); a **designated source-of-record and period** with provenance tracked; **grounding to the exact cell** so every figure is a link, not an assertion; a **numerical verification layer** that recomputes rather than trusting the model's arithmetic; and **explicit abstention**, where the system says "this figure is not in the provided documents" instead of inventing one. And critically, the abstention and review belong to a *deterministic* layer, not to an agent asked to double-check its own work, because a probabilistic reader auditing a probabilistic reader inherits the same blind spots.

It is worth knowing that the most serious technical work is now converging on exactly this idea, and giving it a name. The former quant Ben Lorica describes an emerging "white box" pattern in which the language model is deployed as a *critic and auditor* rather than an author: instead of trusting a generated figure, a separate checking step validates each numerical claim against the primary document it should have come from, and interrogates the underlying table rather than a fluent summary of it.[^whitebox] The research frameworks he points to are built precisely to ground outputs in structured data and to prioritize checkable factual accuracy over generative polish. That is the deterministic tier, restated from the verification side: make the model *prove* the number, not produce it. It is early-stage and not something you can buy finished, but it is the direction a firm should push its own evidence layer.

---

## The honest limits of the third tier

This essay would be hype of a different flavor if it claimed deterministic extraction is free or universal. It isn't, and saying so is part of the point.

Deterministic extraction needs **known fields or templates**. It shines on financial statements, covenant schedules, holdings files, bank statements, and structured filings, where you know what you're looking for. It is a poor fit for genuinely open-ended, exploratory work over heterogeneous documents you've never seen. There is real **ingestion cost upfront**, namely parsing, schema design, validation rules, and eval sets, that probabilistic reading skips. And ParseBench is the cold-water reminder that even the parsing layer is *not solved*: no method was strong across all five dimensions, so anyone promising perfect extraction is selling you something.[^parsebench]

So this is not "deterministic good, probabilistic bad." It is **horses for courses**, and knowing which course you're on:

- *Synthesis, search, drafting, exploration.* Use agents and RAG freely. A fuzzy answer is fine because a human reviews it and the cost of a small error is low. "Summarize the bear case across these forty documents" is a probabilistic-reading task, and a good one.
- *Exact, repeatable, consequential numbers.* Covenant thresholds, spreading, NAV, reconciliation, anything where a wrong value is not a harmless hallucination, demand the deterministic layer. "What is the leverage ratio as defined in this agreement, and is it in breach" is not a synthesis task. It is an extraction-and-validation task wearing a chatbot's clothing.

The failure mode that actually hurts firms is using a probabilistic-reading tool for a deterministic-number job, trusting the citation, and shipping the wrong figure with the firm's name on it.

`[FIGURE 4 — "Match the tier to the job." A two-column sorting diagram. Left, "Probabilistic reading is fine (agents / RAG)": cross-document research · thesis & sector synthesis · memo & note drafting · CIM summaries · deal-room search · comps screening structure. Right, "Deterministic extraction is mandatory": financial spreading · covenant thresholds & breach checks · debt schedules · NAV & holdings ingestion · position reconciliation · statement tie-outs · reported-vs-adjusted · chart-value extraction. Caption: "The mistake that costs you is using the left tool for a right-column job — and trusting the citation."]`

---

## Why this is the most important decision you'll make

Pull it together and the practical weight of the reframe becomes clear. When a firm evaluates AI for anything touching its numbers, the first question is usually "which model?" or "does it have citations?" Both are close to the wrong question. The right first question is: **is this a synthesis task or an exact-number task, and if it's an exact-number task, where is the deterministic extraction-and-validation layer?**

A tool that produces fluent answers with citations will pass every demo. It will look finished, and "looks finished" is itself the trap, because a polished, sourced, on-brand output signals *done* at exactly the moment the number is most likely wrong and most likely to leave the building. The only way to know the difference is to stop being dazzled by the citation and ask to see the chain: the cell, the recomputation, the source-of-record rule, the abstention behavior. And the only way to *buy* well is to stop trusting the demo and measure, by running the tool on a representative sample of your own documents, with answers you already know, and counting how many numbers are correct, correctly sourced, and from the authoritative version. In a space this crowded, a defensible accuracy number on *your* documents is worth more than any architecture diagram.

This is also, quietly, where the regulatory wind is blowing. The SEC's 2026 examination priorities have examiners reviewing the accuracy of firms' representations about their AI, and FINRA has flagged hallucination as a core risk of exactly the summarization-and-extraction use case this essay is about.[^reg] "We use a grounded AI with citations" is not, by itself, a defensible answer to "how do you know the numbers are right." The defensible answer describes the evidence layer.

There is a version of this failure I have watched play out more than once in how firms talk about their tools, and it is worth stating as a caution rather than a war story. A team adopts a grounded, citation-linked assistant, sees clean sourcing in the demo, and concludes the accuracy problem is solved. Months later someone checks a figure that drove a real decision and finds the citation was perfectly real, the document genuine, and the number still wrong: the right company, the prior period; the right table, a misread row. Nothing in the interface flagged it, because nothing in the interface was checking the value, only displaying the source. That is the entire gap between retrieval and evidence, and it is invisible until someone goes looking.

---

## The number is the product

Strip away the architecture debate and this resolves into the lesson underneath the whole series. Generating a fluent, grounded, cited answer is becoming a commodity, every serious tool does it, and next year's will do it better. What is scarce, and therefore valuable, is everything the citation skips: parsing the document so the value survives, drawing it from the authoritative source and period, recomputing the math, and putting a human accountable at the end.

It was never agents versus RAG. Both are probabilistic reading, and probabilistic reading is wonderful for synthesis and treacherous for exact numbers. The firms that get this right will not be the ones with the most citations. They will be the ones who drew the line in the right place, synthesis on one side, a deterministic extraction-and-validation layer on the other, and who can show, for every number that matters, the cell it came from and the check that confirmed it.

Retrieval finds text. Evidence proves a number. Build for the difference.

---

### Where this goes next

This is Essay 05 of *The AI Operating Manual for Investment Firms*. It sets up the broader principle that runs through the next essay: that producing an answer is the easy part, and **validation**, confirming the result is correct and being able to prove it, is the hard part that decides whether any of it is usable. The most demanding version of that, where the documents are longest and a misread is a real loss, is private-credit covenant analysis. The spine remains constant: the advantage is in the workflow, the evidence, and the controls, not the subscription, and not the citation.

> **Practical next step.** Take the last AI-generated number your firm relied on, a figure in a memo, a model, a client report, and try to rebuild its evidence chain. Can you point to the exact cell it came from? Was the source the authoritative filing, and the right period? Was the arithmetic re-checked, or trusted? If the chain breaks at any link, you were doing probabilistic reading on a deterministic-number job. That's the gap this essay is about.


## Sources

*Verify each against the primary link before publishing. The four benchmarks below carry the argument; all are citable from arXiv or the issuing company. I've stated each result conservatively — confirm the exact figures against the source, since precision is the entire credibility of this piece.*

[^officeqa]: Databricks AI Research, "OfficeQA Pro: An Enterprise Benchmark for End-to-End Grounded Reasoning," arXiv:2603.08655 (March 2026). Corpus: ~89,000 pages of U.S. Treasury Bulletins spanning ~100 years, 26M+ numerical values. Frontier models (Claude Opus 4.6, GPT-5.4, Gemini 3.1 Pro Preview) scored <5% on parametric knowledge, <12% with web access, and 34.1% on average with direct document-corpus access (still failing >50% of questions). A structured document representation via Databricks' `ai_parse_document` yielded a 16.1% average relative performance gain. Error analysis identified "table topology failures" and the wrong-source/wrong-period problem (bulletins are revised/reissued; agents stop at the first plausible answer despite being told to find the latest). https://arxiv.org/abs/2603.08655 ; blog: https://www.databricks.com/blog/introducing-officeqa-benchmark-end-to-end-grounded-reasoning ; code: https://github.com/databricks/officeqa

[^parsebench]: LlamaIndex, "ParseBench: A Document Parsing Benchmark for AI Agents," arXiv:2604.08538 (April 2026). ~2,000 human-verified enterprise pages (finance, insurance, government) from 1,200+ documents, 169K+ test rules, five capability dimensions: tables, charts, content faithfulness, semantic formatting, and visual grounding (the last explicitly framed as "required for auditability in regulated workflows"). Across 14 methods (VLMs, specialized parsers, LlamaParse), the result was a "fragmented capability landscape": no method consistently strong across all five dimensions (highest overall ~84.9%). https://arxiv.org/abs/2604.08538 ; blog: https://www.llamaindex.ai/blog/parsebench ; data: https://huggingface.co/datasets/llamaindex/ParseBench

[^financebench]: Pranab Islam et al. (Stanford / Patronus AI), "FinanceBench: A New Benchmark for Financial Question Answering," arXiv:2311.11944 (2023). On a 150-case sample, a leading model with a retrieval system incorrectly answered or refused ~81% of deliberately clear-cut questions about public filings, even with the documents available; primary failure modes were hallucination and high refusal. (2023-era models; the structural lesson is confirmed by the 2026 work above.) https://arxiv.org/abs/2311.11944

[^finretrieval]: E. Kim & J. Huang (Daloopa), "FinRetrieval: A Benchmark for Financial Data Retrieval by AI Agents" (January 2026). A leading model reached ~90.8% accuracy with a structured-data source vs. ~19.8% with open web search — a ~71-point gap, demonstrating that the retrieval/data layer dominates accuracy more than the model. https://arxiv.org/abs/2603.04403

[^reg]: SEC Division of Examinations FY2026 priorities direct examiners to review the accuracy of firms' representations about their AI capabilities and to assess AI supervision; FINRA's 2026 Annual Regulatory Oversight Report identifies summarization and information extraction as the top GenAI use case and flags hallucination as a core risk. SEC: cite the Division of Examinations priorities from SEC.gov. FINRA: https://www.finra.org/media-center/newsreleases/2025/finra-publishes-2026-regulatory-oversight-report-empower-member-firm

[^silentomission]: On "silent omission," namely that an agent reading over a large corpus may miss the signal in the passages it does not retrieve while the result still "looks fine," see the framing in AI Street's hedge-fund coverage (a sponsor note observing that agents reading Bloomberg or Reuters can miss the actual signal in paragraphs they never retrieved, and do not know what they are missing): https://www.ai-street.co/ . This is a retrieval-completeness failure distinct from retrieving the wrong item; corroborate against your own tool's behavior on a long document where you know the answer.

[^whitebox]: On the emerging "white box" verification pattern, namely LLMs deployed as critics/auditors that validate numerical claims against primary source documents rather than generate them, see Ben Lorica, "What's Emerging in Financial AI: From Foundation Models to Compliance-as-Code," Gradient Flow, January 13, 2026, which points to research frameworks (e.g., FISCAL, arXiv:2511.19671; FACTS, arXiv:2510.13920) built to ground outputs in structured data and check claims against source filings. Research directions, not finished products; confirm each against its paper. https://gradientflow.substack.com/p/emerging-ai-patterns-in-finance-what

[^charts]: "When Tables Go Crazy: Evaluating Multimodal Models on French Financial Documents" (MULTIMODAL FINANCE EVAL), arXiv:2602.10384 (2026). Vision-language models reached ~85–90% accuracy on text and table tasks but only ~34–62% on chart interpretation; in a multi-turn conversational setting, early mistakes propagated across turns, driving accuracy down to roughly 50% regardless of model size. https://arxiv.org/abs/2602.10384
