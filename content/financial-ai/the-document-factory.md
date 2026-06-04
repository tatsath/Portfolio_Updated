---
title: "The Document Factory: Why the Hard Part of AI-Generated Reports Isn't the Report"
date: 2026-04-22
description: "AI-generated pitchbooks and credit memos are the easy 80%. The number on slide 14 — correct, sourced, from the right period — is the hard 20%. It is the entire point."
categories:
 - Technical
draft: false
ShowToc: true
---

> *The AI Operating Manual for Investment Firms*

# The Document Factory: Why the Hard Part of AI-Generated Reports Isn't the Report

*Pitchbooks, equity research, credit memos, diligence reports: a dozen platforms now generate them from your filings, the web, your data rooms, and your internal systems, in minutes instead of days. The polished deck is the easy 80%. The number on slide 14, pulled from the right source, the right period, the right line, and actually correct, is the hard 20%. And it is the entire point. A field guide to the players, the technical crux, what the whole category underinvests in, and how to choose.*


---

In this industry, the document *is* the product. A banker's week is pitchbooks and profiles and models. An equity analyst's output is the note. A credit team's deliverable is the memo and the investment-committee pack. A diligence process is, in the end, a pile of documents that someone has to produce, check, and stand behind. So when a wave of AI platforms arrives promising to generate all of it, from your filings, your data rooms, the open web, and your internal systems, in minutes rather than days, it lands on the single most time-consuming part of the job. The demos are genuinely impressive.

They are also where the trouble starts, because the demo shows you the easy part.

Here is the uncomfortable truth that separates a system you can actually use from one that quietly becomes a liability. Generating a fluent, well-formatted, on-brand report is the easy 80%, and modern models do it beautifully. The hard 20% is the number on slide 14: was it pulled from the right document, the right period, the right line of the right table; was it reconciled; is it *correct*? In document generation for investment firms, accuracy of extraction from the right source is not a feature you evaluate alongside others. It is the whole game. A pitchbook with one wrong revenue figure is worse than no pitchbook, because it carries your firm's name and a false confidence.

This essay is about that hard 20%: the players racing to solve it, the technical reasons it is genuinely difficult, the part of the problem the entire category underinvests in, and how a confused bank, fund, or advisory firm should actually choose what to buy and what to build.

There is a reason this problem is getting more urgent, not less, and it is worth naming up front because it inverts the usual hype. As parsing and language models improve, extracting text from a document is getting cheaper and easier every quarter. That sounds like good news, and for the generation step it is. But cheaper extraction means firms will generate *more* AI documents, faster, which means *more* numbers that have to be checked against a source before anyone can rely on them. The cost of producing a draft is collapsing. The cost of making a draft *trustworthy* is not. So the bottleneck is moving, visibly, from generation to verification. The firms that see that early will build for the bottleneck. The rest will keep optimizing the part that was already easy.

---

## The architecture everyone is building

Strip the logos off and almost every one of these platforms is the same pipeline. Here it is formally.

**Inputs**, meaning regulatory filings and PDFs, the open web, and internal sources (data rooms, SharePoint, CRM, research archives, models), flow into **ingestion and extraction** (parsing documents, pulling out the numbers and facts), then **retrieval and grounding** (finding the right evidence for a given question), then an **agentic drafting** step (assembling the deliverable), then, if the firm is serious, a **verification and review** gate, producing the **output**: an equity report, a pitchbook, a credit memo, a diligence report, a tax document.

![Figure 1 — The Document Factory Pipeline](/assets/financial-ai/4-1-document-pipeline.svg)

The deception is structural. The inputs are obvious and the output is what everyone sees, so that is where attention and marketing concentrate. But the trustworthiness of the whole thing is decided in the two stages in the middle, extraction and verification, which are invisible in a demo and unglamorous to build. Hold that thought; it is the spine of everything below.

---

## The landscape, mapped (not ranked)

There are now a lot of players, and they blur together in pitches. The useful way to see them is along two axes: **horizontal vs. vertical** (general productivity vs. purpose-built for finance), and **bring-your-own-data vs. bring-the-data** (works over your documents vs. ships with a content library). Here is the map, described neutrally, by what each does rather than who is "best."

**The horizontal productivity layer.** Microsoft 365 Copilot sits inside Word, Excel, PowerPoint, Outlook, and Teams, reads your organization's data through Microsoft Graph, and drafts documents, decks, and emails from it; Copilot Studio lets firms build custom agents, and a Researcher agent handles multi-step research. **<u>[[1]](#ref-1)</u>** It is general-purpose and meets people in the tools they already use. Two caveats worth internalizing: it is only as good as what is in your Graph and how it is governed (governance is the firm's job, not automatic), and adoption is not automatic. By one widely cited estimate roughly a third of enterprise AI seats sit idle, even as deployments like Lloyds Banking Group report meaningful daily time savings. **<u>[[2]](#ref-2)</u>** Copilot drafts from your documents; it is not purpose-built to parse a 10-K's tables or guarantee the number came from the right filing. That gap is what the vertical players sell against.

**The vertical finance platforms.** These are built for the document factory specifically:

- **Rogo** positions itself as an "AI operating system for investment banking," used by 35,000+ professionals at 250+ institutions, with a multi-model architecture and integrations spanning deal data, filings, market databases, CRM, and SharePoint; it produces comps, company profiles, models, and decks in PowerPoint, Excel, and Word, and emphasizes *auditable sourcing* and cross-document inconsistency flagging. **<u>[[3]](#ref-3)</u>** **<u>[[4]](#ref-4)</u>**
- **Model ML** is an AI workflow builder that generates client-ready Word, PowerPoint, and Excel, namely pitchbooks, diligence reports, and investment memos, in a firm's *exact prior formats*; technically, its agents interpret data schemas, reason across sources, and write code to extract and transform data, with explicit verification steps to reduce errors. **<u>[[5]](#ref-5)</u>** **<u>[[6]](#ref-6)</u>**
- **Hebbia**, through its Matrix product, lets analysts aggregate any document type (PDFs, decks, emails, images) into one workspace and returns answers in a citation-linked, spreadsheet-like grid; its retrieval approach (it calls it Iterative Source Decomposition) is designed to preserve structure and formatting across documents rather than shred them into naive chunks. **<u>[[7]](#ref-7)</u>** **<u>[[8]](#ref-8)</u>**
- **AlphaSense** pairs a library of 500M+ premium documents (filings, transcripts, broker research, expert calls, news) with generative tools, namely Generative Search, a tabular Generative Grid, Deep Research, and a Financial Data layer that blends structured financials with qualitative content, built on a multi-agent retrieve-analyze-synthesize architecture, and it generates reports and pitchbook slides on firm templates. **<u>[[9]](#ref-9)</u>** **<u>[[10]](#ref-10)</u>**
- **LinqAlpha** is a multi-agent research platform used by well over a hundred funds, notable here for a "Devil's Advocate" agent that links every claim back to its source document to create an auditable trail. **<u>[[11]](#ref-11)</u>**

**The data incumbents, now with AI.** Bloomberg built a finance-specific model (BloombergGPT) and has layered AI earnings summaries, document search, and a natural-language assistant onto the terminal, grounded in its data with clickable sources; FactSet, S&P Global, and Morningstar have shipped comparable assistants over their own content. **<u>[[12]](#ref-12)</u>** Their stated goal is consistent and telling: accelerate research, not issue buy/sell calls, and their moat is the data and the grounding. **<u>[[13]](#ref-13)</u>**

**The extraction backbone.** Beneath all of this sits a less visible but decisive layer: providers that turn messy filings into clean, structured, normalized financial data (Daloopa is one example), because, as the technical section will show, a structured data source beats free-text retrieval by a wide margin. **<u>[[14]](#ref-14)</u>**

**The big-firm internal builds and model-lab suites.** Large institutions increasingly build their own (Citi's internal Stylus platform, running on multiple frontier models, is a good public example), and the model labs now ship finance-specific agent kits. Anthropic's Claude for Financial Services includes ready-made templates for pitchbook creation, credit-memo drafting, and model building, among others, framed as producing drafts for human review. **<u>[[15]](#ref-15)</u>** **<u>[[16]](#ref-16)</u>**

**The prosumer tier.** Perplexity Finance brings source-linked, real-time research to individuals and small teams for free, useful mainly as a window into what your clients are now doing themselves. **<u>[[17]](#ref-17)</u>**



Notice what nearly all of them now advertise: citations, "grounded" answers, auditable sourcing. That convergence is the tell. The whole category has realized that for this use case, *trust* is the product, which makes the question not "who generates the nicest deck" but "whose numbers are actually right, and can you prove it." That question has an empirical answer, and it is sobering.

---

## The technical crux: right-source extraction

Getting the numbers extracted from the right place is the key, and it is genuinely hard. Here is why, with the evidence.

### The numbers are not as good as the demos suggest

Start with the most important benchmark in this space. Researchers at Stanford and Patronus AI built **FinanceBench**, a test of thousands of *deliberately clear-cut* questions about public companies, paired with the source filings, a minimum competence bar rather than a hard exam. The headline result, in 2023: a leading model used with a retrieval system answered incorrectly or refused on **81% of questions**, even with the right documents available; across realistic configurations, performance landed around 47% correct, 26% outright wrong, and 27% non-answers. **<u>[[18]](#ref-18)</u>** Those were 2023-era models, and frontier models have improved meaningfully since. But the *structural* lesson has not changed, and a 2026 financial-retrieval benchmark proves it: the same class of model scored about **90.8% accuracy when it could query a structured financial database, versus 19.8% on open web search**, a 71-percentage-point swing driven not by the model's intelligence but by what it was allowed to retrieve from. **<u>[[19]](#ref-19)</u>**

Read those two findings together and the conclusion is unavoidable. **The system around the model, meaning extraction, retrieval, and the source it draws on, dominates the outcome far more than the model does.** The model is not the bottleneck. The plumbing is.

### Where accuracy is actually lost

Drill into that plumbing and the failure points are specific and, to anyone who has read a 10-K, obvious:

- **Tables.** Financial statements are tables, and naive PDF-to-text conversion mangles them, merging cells, losing column alignment, dropping multi-level headers, missing that the unit is "in thousands" stated once at the top, misreading parentheses that denote negatives. A model handed a scrambled table produces a confident, wrong number.
- **Footnotes and defined terms.** The real meaning of a figure often lives somewhere other than the figure. "Adjusted EBITDA" is defined by add-backs disclosed in a footnote; a segment number depends on a reclassification noted in fine print; a covenant ratio is computed "as defined in the Credit Agreement," fifty pages away. Retrieval that grabs the table but not the footnote is retrieval that produces a precise, sourced, wrong answer.
- **The right-source problem.** The same revenue figure may appear in a press release, an investor deck, the 10-Q, the 10-K, and a stale third-party copy on the web, in slightly different forms, for slightly different periods, before and after a restatement. Which one is authoritative? Which period does your slide actually need? Pulling a real number from the wrong source or the wrong vintage is a *silent* error: it looks right and it is wrong. This is the failure most tools treat most casually, because they answer from whatever happens to be in the index, not from the designated source of record.
- **Scanned and image PDFs.** Credit agreements, older filings, and tax documents are frequently scanned images. OCR introduces digit-level noise, and a single transposed figure is a material error in a credit memo.
- **Numerical reasoning.** Even with perfect inputs, models make arithmetic and unit mistakes. Totals that do not foot, a margin computed off the wrong base, a currency not converted. Trust without recomputation is misplaced.
- **Fabrication on absence.** When the answer simply is not in the provided documents, the dangerous default is to invent a plausible one rather than say "not found." FinanceBench captured exactly this tension between hallucination and refusal. **<u>[[18]](#ref-18)</u>**

![Figure 2 — Where Accuracy Is Won or Lost](/assets/financial-ai/4-2-accuracy-won-lost.svg)

### What "good" looks like

The architecture that actually wins is the set of controls opposite those failures, and you can see the serious players reaching for pieces of it:

1. **Structure-aware parsing**, not naive text-chunking, preserving tables, headers, and units (structure-preserving retrieval is exactly what some platforms now build their retrieval engines around).
2. **A structured-data backbone where possible**, querying normalized financials rather than re-reading prose every time (the 90.8%-vs-19.8% gap is the whole argument for this).
3. **A designated source of record and period**, with provenance tracked and restatements handled, so the number comes from the filing you chose, not whatever the index surfaced.
4. **Grounding to the exact location**, meaning page, table, cell, footnote, so every figure is a link, not an assertion. This is the evidence chain from the first essay in this series, applied to numbers.
5. **A numerical verification layer**, recompute, foot and cross-foot, reconcile across documents, instead of trusting the model's arithmetic.
6. **Explicit abstention**, where the system says "this figure is not in the provided documents" rather than inventing one.
7. **Evals on your own documents**, a labeled regression set (FinanceBench-style) that measures extraction accuracy, citation validity, and numerical correctness, so you are buying on measured performance over *your* filings, not on a demo.

There is an emerging architecture worth knowing about here, because it is the same idea pointed at the verification problem specifically. A growing body of work puts the language model in the role of *critic and auditor* rather than author: the model's job is not to write the number but to check a number that already exists against the primary document it should have come from. The former quant Ben Lorica describes this as "white box" verification, and points to research frameworks built precisely to validate numerical claims against source filings and to interrogate tabular data rather than trust a generated summary. **<u>[[20]](#ref-20)</u>** The design instinct is the one this whole essay argues for: ground every output in structured data, make the model prove the figure rather than produce it, and treat factual accuracy as a separate, checkable step rather than a hoped-for property of fluent generation. It is early, and it is not a finished product you can buy off a shelf, but the direction is exactly right, and it is the direction a serious firm should push its own verification layer.

![Figure 3 — The Evidence Chain](/assets/financial-ai/R1-evidence-chain.svg)

---

## What the whole category underinvests in

Step back from any individual vendor, and I will deliberately not name names here, because this is a gap in the *category*, not a knock on any one product. Across the board, the same things get shortchanged.

The **generation gets the budget; the extraction and verification get the leftovers.** Fluent output is the easy, demoable 80%; the trustworthy number is the hard, invisible 20% that is the entire point, and the incentives push toward the demo.

**Retrieval is treated as evidence, and it is not.** A citation that points at a document is not proof the number is right, complete, or from the right period. "It cited something" has quietly become the industry's substitute for "it's correct." It is not the same thing, and the gap between them is where a wrong figure hides behind a real footnote. (You will also see "no hallucinations" and "citation equals trust" claimed in marketing across the category; treat both as hypotheses to test, not guarantees.)

**Nobody makes you measure.** Buyers are dazzled by a live demo on a familiar company and almost never run a regression test on a representative sample of their *own* filings. You cannot manage an extraction-accuracy problem you have never quantified, and on your messiest credit agreement, the demo company's clean 10-K tells you nothing.

**The source-of-record problem is hand-waved.** Most systems answer from the index, not from a designated authoritative source and period, which is precisely how silent, look-right errors enter a deck.

**There is rarely a real numerical-verification layer**, and **abstention behavior is weak**, because confident fabrication reads better in a demo than an honest "not found."

And finally, the **"looks finished" trap.** A polished, branded, on-format deliverable *signals* done, so the human review gets compressed or skipped, at exactly the moment the numbers are most likely to be wrong and most likely to leave the building with your name on them. This is not a hypothetical risk in a regulated industry: the SEC's 2026 examination priorities have examiners reviewing the accuracy of firms' representations about their AI, and FINRA has flagged hallucination as a core risk of the summarization-and-extraction use case that is precisely this one. **<u>[[21]](#ref-21)</u>**

The pattern across all six is the same, and it is worth stating directly because it is the practical core of the essay. The trustworthy number is the hard part, the expensive part, and the invisible part. A wrong figure does not announce itself; it sits in a clean, branded deck behind a real citation, and it leaves the building with the firm's name on it. The only defense is to treat extraction and verification as the product, not the plumbing, and to measure them on documents you already know cold.

---

## Build vs. buy: a framework, not a recommendation

The question every confused firm asks is "what should we buy?" The honest answer for most is: stop framing it as buy-versus-build, and reframe it as **configure**.

- **Buy** the parts that are commoditized and broadly applicable, where a vendor has a data or integration moat you cannot realistically replicate. You are not going to out-build a 500-million-document research library, a terminal's market data, or years of finance-tuned extraction. General research search, market intelligence, standard pitchbook scaffolding, filing and transcript coverage: buy these.
- **Build or own** the parts that are your actual edge or your actual risk: your internal research archive, your house credit-memo and covenant logic, your firm-specific models and templates, and anything touching confidential live-deal data. Critically, **the verification, evidence, and review layer should be yours regardless of whose engine you buy**, because that is the operating-model layer this whole series is about, and it does not come in the box.
- **Configure** is the synthesis and the right default for most firms: license the engine and the content, then own the workflow, the house format, the source-of-record rules, the numerical checks, the controls, and the evals on top of it.

The decision reduces to four questions: Is this capability a source of competitive edge or is it table stakes? How proprietary or sensitive is the data it touches? How firm-specific is the workflow? And can you maintain what you build? Underneath all four sits the only metric that ultimately matters, the one Citi's technology leadership uses internally: not "what does the tool cost" but **what does it cost to produce one *approved*, defensible output**, the cost-per-approved-output measure from the first essay in this series. **<u>[[15]](#ref-15)</u>**

![Figure 4 — Build / Buy / Configure](/assets/financial-ai/4-4-build-buy-configure.svg)

---

## What different firms should do next

The right next step depends on what kind of firm you are:

- **Large banks / bulge bracket:** you are already building internally and partnering with labs. Govern AI at the enterprise level, measure capacity, and make the numerical-verification layer non-negotiable before any AI-produced figure reaches a client deliverable.
- **Boutique investment banks / M&A advisory:** buy a deliverable engine that produces pitchbooks and profiles in your formats, then configure your house style, your source-of-record rules, and a verification pass. Do not try to build the model; do own the checking.
- **Hedge funds (fundamental):** adopt research and extraction agents with auditable, source-linked outputs, build the proprietary research-archive layer that is your edge, and run evals on your own coverage names. This is the document-side complement to the earnings-season workflow covered earlier in this series.
- **Private credit:** covenant extraction and the credit memo are the sharpest, highest-stakes case in all of finance for this technology: long agreements, defined terms that reference other defined terms, numbers whose meaning lives in footnotes. Invest here in structure-aware extraction, footnote-and-definition handling, numerical verification, and an investment-committee evidence pack that separates what the model extracted from what a credit professional approved.
- **RIAs / wealth managers:** your documents are portfolio commentary, client reporting, and planning materials. The extraction-accuracy stakes are lower than IB or credit, but source-linking and compliance review still matter, so buy, configure to your compliance rules, and keep a human reviewer.

The common error across all five is the same one, and it is worth naming as a caution rather than a personal anecdote: a firm buys on the strength of a demo run against a clean, familiar company, then discovers in production that its real documents, the amended credit agreement, the scanned older filing, the segment table that was reclassified last year, are where the tool quietly breaks. The firms that get this right invert the order. They run the tool against their own messiest documents first, count the errors, and only then decide what to buy and what to keep in-house. The build-versus-buy decision is downstream of an accuracy measurement most firms never make.

---

## How to produce one equity report you can defend

The way to start is not to automate the whole thing. Produce *one* report, the disciplined way, and measure it.

Fix the **output structure** first. Designate the **authoritative sources and the exact periods** up front, the filing of record, not whatever the web surfaces. **Extract** with structure-aware parsing, pulling each figure together with its footnote and definition. **Ground** every number to its source cell or page. **Reconcile** the math, foot the totals, check the margins, confirm the units. Run an explicit **red-team and abstention pass**: is anything in here fabricated, from the wrong period, or from a non-authoritative source? Then a **human sign-off**, and **log** the whole chain. Finally, run this exact process on five equity reports you have already produced by hand, and compare, on accuracy first, time second. Five known cases will tell you more than any vendor demo, because you already know which numbers are right.

That is the difference between a report that compresses your week and a report that ends it.

---

## The prose is the commodity; the number is the product

Strip away the platform names and the demos, and the document factory resolves into the same lesson as the rest of this series. Generating a fluent, on-brand report is rapidly becoming a commodity, every serious tool can do it, and next year's will do it better. What is scarce, and therefore valuable, is everything the demo skips: extracting the right number from the right source, grounding it so it can be checked, verifying the arithmetic, and putting a human accountable at the end.

The firms that win this will not be the ones who generated the prettiest pitchbook fastest. They will be the ones whose every figure is correct, sourced to the document of record, and defensible to a client, a committee, or an examiner, because they invested in the unglamorous extraction-and-verification layer that the rest of the category treats as an afterthought.

In document generation, the prose is the commodity. The number, pulled from the right source, verified, and traceable, is the product. Build for the number.

---

## Conclusion

In document generation, the fluent, on-brand report is the easy 80%, and it is becoming a commodity. The hard, valuable 20% is the number on slide 14 — pulled from the right source, the right period, the right line, verified, and traceable. A wrong figure does not announce itself; it sits in a polished deck behind a real citation and leaves the building with the firm's name on it, so the only defense is to treat extraction and verification as the product, not the plumbing, and to measure them on your own documents rather than a vendor's clean demo. Take the last AI-generated deliverable your firm produced and audit ten numbers against the source filings — the right filings, the right periods — and count how many are correct, correctly sourced, and from the authoritative version. That number, not the demo, is your real starting point: the prose is the commodity, but the number is the product.

---

## References

- <a id="ref-1"></a>**1. Microsoft** - [*4 Ways Microsoft Copilot Empowers Financial Services Employees*](https://www.microsoft.com/en-us/microsoft-cloud/blog/financial-services/2025/06/16/4-ways-microsoft-copilot-empowers-financial-services-employees/) (June 2025)
- <a id="ref-2"></a>**2. ABT** - [*Copilot Quick Wins for Financial Institutions*](https://www.myabt.com/blog/copilot-quick-wins-financial-institutions) (2026)
- <a id="ref-3"></a>**3. PR Newswire** - [*Rogo Raises $160M Series D to Scale the Agentic Platform for Finance*](https://www.prnewswire.com/news-releases/rogo-raises-160m-series-d-to-scale-the-agentic-platform-for-finance-302756546.html) (April 2026)
- <a id="ref-4"></a>**4. OpenAI** - [*Rogo Case Study*](https://openai.com/index/rogo/) (2026)
- <a id="ref-5"></a>**5. PR Newswire** - [*Model ML Raises $75M to Transform Financial Services with AI Workflow Automation*](https://www.prnewswire.com/news-releases/model-ml-raises-75m-in-one-of-the-largest-fintech-series-a-rounds-in-history-to-transform-financial-services-with-ai-workflow-automation-302624414.html) (November 2025)
- <a id="ref-6"></a>**6. Fintech Global** - [*Model ML Secures $75M to Expand AI Workflow Product*](https://fintech.global/2025/11/24/model-ml-secures-75m-to-expand-ai-workflow-product/) (November 2025)
- <a id="ref-7"></a>**7. Tech Times** - [*Hebbia Matrix Transforms Knowledge Work*](https://www.techtimes.com/articles/311222/20250707/hebbia-matrix-transforms-knowledge-work-how-financial-giants-process-millions-documents-minutes.htm) (July 2025)
- <a id="ref-8"></a>**8. Hebbia** - [*How Hedge Funds Use Hebbia*](https://www.hebbia.com/blog/how-hedge-funds-use-hebbia)
- <a id="ref-9"></a>**9. AlphaSense** - [*Market Intelligence Platform*](https://www.alpha-sense.com/)
- <a id="ref-10"></a>**10. PR Newswire** - [*AlphaSense: End-to-End AI Workflows for Structured Financial Data*](https://www.prnewswire.com/news-releases/alphasense-innovations-in-end-to-end-ai-workflows-for-structured-financial-data-expert-content-and-enterprise-intelligence-fuel-rapid-growth-302577532.html) (October 2025)
- <a id="ref-11"></a>**11. AWS ML Blog** - [*How LinqAlpha Assesses Investment Theses Using Devil's Advocate on Amazon Bedrock*](https://aws.amazon.com/blogs/machine-learning/how-linqalpha-assesses-investment-theses-using-devils-advocate-on-amazon-bedrock/) (2026)
- <a id="ref-12"></a>**12. Bloomberg** - [*Introducing BloombergGPT*](https://www.bloomberg.com/company/press/bloomberggpt-50-billion-parameter-llm-tuned-finance/) (2023)
- <a id="ref-13"></a>**13. Institutional Investor** - [*FactSet Launches Its Own AI Earnings Tool*](https://www.institutionalinvestor.com/article/2ct67kt9n08c8stnju7eo/corner-office/on-the-heels-of-bloomberg-factset-launches-its-own-ai-earnings-tool) (2024)
- <a id="ref-14"></a>**14. Kim & Huang (Daloopa)** - [*FinRetrieval: A Benchmark for Financial Data Retrieval*](https://arxiv.org/abs/2603.04403) (January 2026)
- <a id="ref-15"></a>**15. Banking Dive** - [*Citi Rolls Out Agentic AI Tools (Stylus Workspaces)*](https://www.bankingdive.com/news/citi-agentic-AI-tools-stylus-workspaces/760868/) (2025)
- <a id="ref-16"></a>**16. Fortune** - [*Anthropic Brings AI Agents to Wall Street*](https://fortune.com/2026/05/05/anthropic-wall-street-financial-services-agents-jamie-dimon/) (May 2026)
- <a id="ref-17"></a>**17. Digital.Finance** - [*Perplexity AI Finance Features*](https://digital.finance/blog/perplexity-ai-finance-features-revolutionizing-financial-research-and-insights)
- <a id="ref-18"></a>**18. Islam et al. (Stanford / Patronus AI)** - [*FinanceBench: A New Benchmark for Financial Question Answering*](https://arxiv.org/abs/2311.11944) (2023)
- <a id="ref-19"></a>**19. Kim & Huang (Daloopa)** - [*FinRetrieval: A Benchmark for Financial Data Retrieval by AI Agents*](https://arxiv.org/abs/2603.04403) (January 2026)
- <a id="ref-20"></a>**20. Gradient Flow / Ben Lorica** - [*What's Emerging in Financial AI*](https://gradientflow.substack.com/p/emerging-ai-patterns-in-finance-what) (January 2026)
- <a id="ref-21"></a>**21. FINRA** - [*2026 Annual Regulatory Oversight Report*](https://www.finra.org/media-center/newsreleases/2025/finra-publishes-2026-regulatory-oversight-report-empower-member-firm) (December 2025)
