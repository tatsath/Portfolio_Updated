---
title: "The Last Mile of AI in Investment Management"
date: 2026-03-10
description: "Almost every fund and advisory firm now has the tools. Very few have changed how the work actually gets done. The gap is not a software problem."
categories:
 - Opinion
draft: false
ShowToc: true
---

> *The AI Operating Manual for Investment Firms*

# The Last Mile of AI in Investment Management

*Almost every fund and advisory firm now has the tools. Very few have changed how the work actually gets done. The gap between those two facts is where the next decade of advantage will be won, and it is not a software problem.*


---

Across portfolio managers, RIA principals, and private-credit teams, the question that dominated 2023 has all but disappeared. Almost nobody asks *whether* generative AI matters anymore. The numbers settled that argument. In its 2025 research, the Alternative Investment Management Association found that 95% of fund-manager respondents now use generative AI in their work, up from 86% a year earlier. **<u>[[1]](#ref-1)</u>** Charles Schwab's January 2026 study put adoption among registered investment advisers at 63%, more than double the level of 2023. **<u>[[2]](#ref-2)</u>** At Balyasny Asset Management, roughly 95% of the firm's investment teams actively use its internal AI research platform. **<u>[[3]](#ref-3)</u>**

So the tools are everywhere. And yet, if you sit with the people inside these firms, a quieter and more uncomfortable question keeps surfacing.

**What, exactly, changed in our daily workflow?**

That question is the whole subject of this essay, and of everything I plan to write here. The frontier of AI in investment management is no longer the model. It is the last mile: the distance between a capable system sitting on a screen and a repeatable, reviewed, evidence-backed process that a firm can stand behind in front of an investor, a client, a compliance officer, or an examiner.

Most firms have not crossed that last mile. The interesting part is that the companies *selling* the tools now admit it openly.

A quick word on where I sit, since this is the first thing I am publishing in this series and you are entitled to know why you should keep reading. I have not run a book or sat on a trading desk. What I have done is read the primary record closely, the way an analyst reads a filing: the fund case studies, the model labs' own documentation, the benchmark papers, the regulatory releases. Most of what passes for AI commentary in this industry is either vendor copy or breathless prediction. The useful work, it turns out, is quieter: reading what the best firms actually disclosed about how they operate, and turning it into a playbook a smaller firm can use. That is the gap I work in, and it is the gap this series is about.

---

## Usage is not adoption

Start with the cleanest piece of evidence, because it reframes everything. In the same Schwab study that reported 63% adoption, only about one in ten advisers who use AI said they had fully integrated it into their business strategy. **<u>[[2]](#ref-2)</u>** Read those two figures together and the picture sharpens. A large majority are *using* AI. A small minority have *adopted* it.

Those are not the same thing, and conflating them is the single most expensive mistake a firm can make right now.

Usage means a person opened a tool and got a useful output. Adoption means a workflow changed, permanently, for everyone on the desk, in a way the firm can describe, measure, and defend. Adoption means the firm knows which use cases are approved and which are prohibited, which documents may be fed to a model and which may not, who reviews the output before it leaves the building, where that output is stored, what evidence supports each claim in it, and how anyone would know whether the new process is actually better than the old one.

Without that operating layer, generative AI inside a firm is a collection of impressive but fragile experiments. One analyst uses it carefully, with citations. Another pastes a confidential deal memo into a consumer chatbot. One adviser uses it to clean up grammar. Another drafts a client-facing performance explanation that no one reviews. A senior partner watches a good demo and concludes the firm "is using AI." All of that is real usage. None of it is adoption.

The pattern is easy to recognize once you look for it. A firm rarely fails at this because one person made a dramatic mistake. It fails because three capable people are each using AI in three incompatible ways, none of them written down, none reviewed the same way, and no one above them can say with confidence what the firm's actual exposure is. The risk is not the bad actor. It is the absence of a shared process, which means the firm cannot even see its own surface area.

![Figure 1 — Usage vs. Adoption](/assets/financial-ai/1-1-usage-vs-adoption.svg)

---

## The bottleneck is not the model

Here is the claim that most AI-finance commentary gets wrong. The frontier models are already good enough for an enormous range of useful work. They summarize transcripts, compare documents, draft memos and emails, extract entities, and write code at a level that was science fiction three years ago. If your firm has not changed how it works, the reason is almost never that the model is too weak.

The reason is that in investment management, a beautiful answer is not a finished one.

Consider what each desk actually needs, beyond the output itself.

**A hedge fund analyst in earnings season** does not need a summary of the call. The analyst needs to know what *changed* versus the prior quarter, which specific sentence in the transcript supports that change, whether the KPI was calculated on the same basis as last time, whether management's language quietly contradicts the existing thesis, and what still requires a human judgment call before it touches a position. "Summarize this earnings call" is a parlour trick. "Tell me where this quarter breaks my thesis, and show me the line that proves it" is a workflow, and it needs structure, evidence, and a reviewer.

**An RIA drafting a client email** does not need prose. The adviser needs to know whether the email contains promissory or performance-guaranteeing language, whether it matches the client's documented risk profile and suitability, whether every factual claim about returns is supported by data the firm actually holds, and whether compliance could reconstruct the review trail eighteen months from now if asked. One careless sentence in a client communication is not an efficiency story. It is a regulatory exposure.

**A private-credit team writing a credit memo** does not need a draft. The team needs covenant definitions pulled correctly, thresholds and baskets and EBITDA add-backs identified with their exact source pages, borrower reporting obligations laid out, ratio calculations checked, exceptions flagged, and a hard line between what the model *extracted* and what a credit professional *approved*. A credit agreement is a hundred-plus pages of defined terms that reference other defined terms. Asking a model to "summarize the covenants" and trusting the result is how a firm misreads its own downside protection.

In all three cases the model can produce the first artifact in seconds. And in all three cases, that artifact is worthless, or worse, dangerous, until it has been verified, sourced, reviewed, and recorded. That work is the last mile. It is not glamorous. It is the entire job.

This is also the part of the story that the most credible technical voices have started saying out loud. Ben Lorica, who spent years as a quant before becoming one of the more level-headed analysts of applied AI, put it well in early 2026: the near-term story in financial AI is not artificial general intelligence, it is domain-specific AI that survives audits, latency budgets, and messy production data. **<u>[[4]](#ref-4)</u>** That is the last mile, stated from the engineering side. The capability is not the constraint. Surviving contact with a real, regulated, audited workflow is the constraint.

> Prompts are disposable. Workflows and controls are durable.

---

## What "good" actually looks like

The most useful public example we have is Balyasny, because OpenAI documented it in detail in early 2026. **<u>[[3]](#ref-3)</u>** It is worth studying precisely because it is *not* a story about buying a subscription.

What Balyasny built is an operating model. The firm stood up a centralized Applied AI team, roughly twenty researchers, engineers, and domain experts, back in late 2022. Before putting a model into production, it evaluated that model across more than a dozen financial dimensions, including forecasting accuracy, numerical reasoning, and hallucination rates. **<u>[[5]](#ref-5)</u>** Its agents are designed around traceable reasoning and testable behavior, with compliance guardrails held centrally while individual desks customize agents for their own asset class. **<u>[[3]](#ref-3)</u>** The results are real: research tasks that took days now take hours, and a "Central Bank Speech Analyst" cut a two-day macro scenario analysis to about thirty minutes. **<u>[[3]](#ref-3)</u>**

Notice what carried that result. Not the model alone, but the *system* around it: evaluation, scoping, traceability, guardrails, and a team whose entire job was to embed the technology into how analysts actually work. The model was necessary. It was nowhere near sufficient.

Now notice the catch. Most firms do not have a twenty-person Applied AI team. A multi-strategy fund with billions under management can build that operating layer internally. A solo RIA, a boutique credit shop, or a sub-$1bn fund cannot, and that is precisely the divide the rest of the industry is now organizing around. The largest funds build the operating model themselves. Everyone else needs to acquire it some other way. That gap is real, it is structural, and it is not closed by another subscription.

The clearest signal that the gap is structural is who is rushing to fill it. The labs are no longer just selling models; they are selling *implementation*. In 2026 Anthropic shipped a set of ready-to-run finance agent templates for tasks like pitchbook creation, KYC screening, earnings review, and credit-memo drafting, and, tellingly, its own documentation states the agents produce drafts intended for qualified human review rather than executing anything autonomously. **<u>[[6]](#ref-6)</u>** **<u>[[7]](#ref-7)</u>** Around the same time, Anthropic formed a roughly $1.5bn joint venture with Blackstone, Hellman & Friedman, and Goldman Sachs whose explicit purpose is to embed engineers inside companies that cannot otherwise afford to build AI systems on their own. **<u>[[8]](#ref-8)</u>** You do not raise that kind of capital to sell software licenses. You raise it because the bottleneck is delivery.

When the people who make the models tell you the hard part is putting them to work, believe them.

---

## The operating model, in five layers

If the last mile is the problem, what does crossing it actually require? Strip away the vocabulary and every durable AI workflow in a regulated investment firm has the same five layers. Most firms have built exactly one of them.

The **model layer** is the frontier system itself: Claude, GPT, Gemini, or an internal model. This is the layer everyone obsesses over and the one that matters least to your outcome, because it is largely a commodity you rent.

The **data layer** is what you point the model at: filings, transcripts, portfolio and CRM data, research archives, due-diligence questionnaires, credit agreements, policies, internal memos. The quality and accessibility of this layer dominates results, a point I will return to, because there is now hard evidence for it.

The **workflow layer** is the repeatable sequence a person follows: the input rules, the steps, the output format. This is where "usage" becomes "adoption." It is mostly absent in firms that are merely experimenting.

The **evidence layer** is what separates finance from casual AI use: citations, source pages, numerical checks, source coverage, and contradiction detection. Not "the model said so" but "here is the claim, here is the line it came from, here is the math, and here is what it conflicts with."

The **control layer** is human approval, review status, logging, policy rules, and an audit trail: the part that lets a CCO, an investor, or an examiner reconstruct what happened and why.

> The firms that win will not be the ones with the best model layer. They will be the ones that built the other four.

![Figure 2 — The Five-Layer Stack](/assets/financial-ai/R2-five-layer-stack.svg)

There is a reason to study finance specifically here, rather than treating it as one more industry adopting AI. Finance combines high-frequency data, hard regulatory constraints, and unusually clear economic incentives, which makes it the place where a new technology either survives real production conditions or is quietly abandoned. Lorica makes this point too, calling financial services the bellwether for how emerging technology moves from the research lab into production. **<u>[[4]](#ref-4)</u>** If a workflow holds up here, under audit and review and the cost of being wrong, it will hold up most places. The five layers are how it holds up.

---

## Retrieval is not evidence

Of those five layers, the one that quietly breaks the most projects is the evidence layer, and it breaks because of a confusion that sounds harmless: the belief that if a model retrieved a document, it has supported a claim.

It has not. Retrieval finds text. Evidence proves a specific assertion. The distance between the two is where finance lives.

There is now empirical weight behind this. A January 2026 benchmark called FinRetrieval tested AI agents on 500 financial retrieval questions with known answers. The leading configuration reached 90.8% accuracy when it could pull from a structured financial database, but only 19.8% when it was limited to general web search. That is a 71 percentage-point swing driven not by the model's intelligence but by what it was allowed to retrieve from. **<u>[[9]](#ref-9)</u>** Related work points the same direction: state-of-the-art agents remain fragile on realistic, high-difficulty financial search, with recurring weaknesses in temporal reasoning and evidence integration. **<u>[[10]](#ref-10)</u>**

Read that the right way. The bottleneck is not the model's reasoning. It is the system around it, the data it can reach and the discipline with which claims are checked against sources. A model that confidently cites the wrong fiscal period, the wrong table, or the wrong defined term has retrieved something and proven nothing.

The fix is to stop treating an AI output as an answer and start treating it as a chain that can be inspected. For every material claim: what is the claim, what source supports it, which page or section, what calculation produced any number in it, and who signed off. That chain, claim to source to calculation to reviewer, is the difference between an AI-assisted memo you can defend and a plausible document you merely hope is right.

![Figure 3 — The Evidence Chain](/assets/financial-ai/R1-evidence-chain.svg)

This deserves its own essay, and it gets one later in the series. For now the point stands: an evidence layer is not a nice-to-have. It is the thing that makes everything above it usable.

---

## The regulatory reality, stated correctly

This is where a lot of AI-finance writing loses its credibility, so let me be precise, because precision here is itself a signal that you actually read the source material.

A common claim is that a sweeping SEC "AI rule" is coming for advisers. It is not. The SEC's 2023 proposal on conflicts of interest in the use of predictive data analytics, the rule everyone meant when they said "the AI rule," was **formally withdrawn in June 2025**, as part of a withdrawal of fourteen Gensler-era proposals. **<u>[[11]](#ref-11)</u>** **<u>[[12]](#ref-12)</u>** The Commission stated it does not intend to finalize it and would have to start over with a fresh proposal to act in that area.

If you stop reading there, you draw the wrong conclusion. The withdrawal removed a specific *prescriptive* framework. It removed none of the existing obligations. **<u>[[11]](#ref-11)</u>** An adviser's fiduciary duties of care and loyalty still apply to AI-assisted work. Recordkeeping rules still apply to AI-generated communications. The duty to supervise still applies to AI tools. The principles-based regime did not relax; only the bespoke rulebook went away.

And the supervisory attention is, if anything, sharper for being principles-based. The SEC's examination priorities for fiscal 2026 single out AI directly: examiners will look at whether firms have adequate policies to supervise their use of AI, and, this is the part to underline, they will *review for accuracy the representations firms make about their AI capabilities.* **<u>[[13]](#ref-13)</u>** **<u>[[14]](#ref-14)</u>** In plain terms, the regulator is now policing the gap between what a firm claims its AI does and what it actually does. That is AI-washing, and it is examinable.

FINRA points the same way. In its 2026 oversight report, FINRA identified summarization and information extraction as the single most common generative-AI use case among member firms, and in the same breath flagged hallucination as a core risk of exactly that use case. **<u>[[15]](#ref-15)</u>** **<u>[[16]](#ref-16)</u>** The most popular thing firms do with AI is also the thing most likely to produce a confident, well-formatted, wrong answer. That is not an argument against using it. It is an argument for the evidence and control layers.

Investors have arrived at the same conclusion from the other side. AIMA found that 29% of institutional allocators already include specific AI questions in their due-diligence questionnaires, with another 29% planning to add them, questions about model oversight, data privacy, IP, and compliance. **<u>[[17]](#ref-17)</u>** The AI DDQ is no longer hypothetical. A firm that cannot describe its AI operating model in writing is, increasingly, a firm that loses an allocation to one that can.

Put the regulatory picture together and the conclusion is almost the opposite of the hype. The absence of a prescriptive rule does not make a defensible process optional. It makes it the *commercial* differentiator, the thing investors reward and examiners probe, precisely because no one is going to hand you a checklist.

---

## The cost nobody budgets for

One more myth to retire before the path forward. When firms ask "what will AI cost us," they look at the model bill: the seats, the API usage, the data add-ons. That bill is real, and it is the smallest line item.

The real cost lives in the other four layers: cleaning and parsing data, tuning retrieval, designing and testing workflows, building the review process, doing vendor diligence, training staff, and, the one nobody forecasts, the cost of failed adoption, where a firm pays for capability that quietly goes unused. The right unit of measurement is not "what is our AI bill." It is "what does it cost us to produce one *approved* output": one reviewed earnings memo, one compliant client letter, one signed-off credit memo. Measure that, and the build-versus-buy conversation changes completely.

This gets its own essay later in the series. I flag it here so the thesis is complete.

---

## The path across the last mile

So what does a firm actually do on Monday? Not "use AI more." The opposite, narrow on purpose.

Pick one workflow. Choose something that is repeated often, document-heavy, time-consuming, and reviewable: an earnings memo, a DDQ response, portfolio commentary, a client communication, a covenant extraction. Then build the operating layer around just that one workflow, in order.

Define the **output** you actually want, in a fixed structure. Define the **evidence** each part of that output must carry. Name the **human reviewer** and what they are accountable for. Write down the **red flags** that send a draft back. Specify where the output is **stored and logged**. Then run the workflow on five historical cases you already know the answers to, and compare the AI-assisted result against how you did it before, on time, on quality, and on error rate.

Only after that comparison earns its keep do you scale to a second workflow. This is slower than "roll out AI to the firm," and it is the only version that produces something you can measure, defend, and repeat.

There is a discipline here worth naming, because it runs against the instinct that AI rewards moving fast and broad. The firms that get real value are the ones that go narrow and deep first: one workflow, fully instrumented, measured against the old way, before the second. The breadth comes later, and it compounds, because each workflow you harden becomes the template for the next. Start everywhere at once and you get the scattered usage from the top of this essay. Start with one and finish it, and you get an operating model.

---

## The advantage was never the subscription

The firms that win with generative AI will not be the ones that gave everyone a login and hoped. They will be the ones that turned capability into approved, evidence-backed, workflow-specific systems, and can prove it.

They will know where AI is allowed and where it is prohibited. They will know which outputs require review and which do not. They will know which documents were used, which claims are source-backed, and how much time was actually saved. And when an investor, a client, a compliance officer, or an examiner asks how the firm uses AI, they will have a written answer rather than a shrug about people experimenting.

That is the real advantage. It was never the subscription. It is the operating model.

The models will keep changing. Claude, GPT, and Gemini will leapfrog each other; today's best tool will be unremarkable in a year. None of that touches the thesis, because the durable work is not at the model layer. It is in the workflows, the evidence, and the controls, the things that stay relevant no matter which logo is on the model.

Prompts are disposable. Workflows and controls are durable. Everything I write here will be about building the durable part.

---

## Conclusion

The frontier of AI in investment management is no longer the model — it is the last mile between a capable system on a screen and a repeatable, reviewed, evidence-backed process a firm can stand behind. Usage is everywhere; adoption is rare, and the difference is the operating layer of workflows, evidence, and controls that turns an impressive tool into a defensible result — the one thing no vendor hands you in the box. Cross that last mile one workflow at a time: take a single AI-assisted process your firm runs — a client communication, a DDQ response, a research memo, a credit memo, a piece of portfolio commentary — and ask three questions of it. Is every claim source-backed? Is there a named reviewer? Could you reconstruct the process in a year? If the answer to any is no, that workflow is usage, not adoption — and that gap is where the next decade of advantage will be won.

---

## References

- <a id="ref-1"></a>**1. AIMA** - [*Charting the Course: Lessons from AI Leaders in Alternative Investments*](https://www.aima.org/article/press-release-front-office-gen-ai-adoption-shifts-from-if-to-when-for-leading-fund-managers-aima-research-finds.html) (2025)
- <a id="ref-2"></a>**2. Charles Schwab** - [*RIA and AI Research Study*](https://pressroom.aboutschwab.com/press-releases/press-release/2026/Schwab-Study-Reveals-RIA-AI-Adoption-More-Than-Doubles---But-Most-Firms-Still-in-Early-Stages/default.aspx) (January 2026)
- <a id="ref-3"></a>**3. OpenAI** - [*How Balyasny Asset Management Built an AI Research Engine for Investing*](https://openai.com/index/balyasny-asset-management/) (March 2026)
- <a id="ref-4"></a>**4. Gradient Flow / Ben Lorica** - [*What's Emerging in Financial AI*](https://gradientflow.substack.com/p/emerging-ai-patterns-in-finance-what) (January 2026)
- <a id="ref-5"></a>**5. OpenAI** - [*Balyasny Case Study: Model Evaluation Across 12+ Financial Dimensions*](https://openai.com/index/balyasny-asset-management/) (March 2026)
- <a id="ref-6"></a>**6. Fortune** - [*Anthropic Brings AI Agents to Wall Street*](https://fortune.com/2026/05/05/anthropic-wall-street-financial-services-agents-jamie-dimon/) (May 2026)
- <a id="ref-7"></a>**7. Anthropic** - [*Claude Finance Agents: Drafts for Qualified Human Review*](https://fortune.com/2026/05/05/anthropic-wall-street-financial-services-agents-jamie-dimon/) (2026)
- <a id="ref-8"></a>**8. Fortune** - [*Anthropic's $1.5bn Joint Venture with Blackstone, Goldman & Hellman Friedman*](https://fortune.com/2026/05/04/anthropic-claude-consulting-industry-joint-venture-blackstone-goldman-sachs/) (May 2026)
- <a id="ref-9"></a>**9. Kim & Huang (Daloopa)** - [*FinRetrieval: A Benchmark for Financial Data Retrieval by AI Agents*](https://arxiv.org/abs/2603.04403) (January 2026)
- <a id="ref-10"></a>**10. FinAgentBench** - [*Agentic Retrieval over S&P-500 Filings*](https://dl.acm.org/doi/10.1145/3768292.3770362) (ACM ICAIF 2025)
- <a id="ref-11"></a>**11. U.S. SEC** - [*Withdrawal of the Predictive Data Analytics Proposal*](https://www.sec.gov/rules-regulations/2025/06/s7-12-23) (June 2025)
- <a id="ref-12"></a>**12. Dechert** - [*SEC Withdraws a Significant Number of Rule Proposals*](https://www.dechert.com/knowledge/onpoint/2025/6/sec-withdraws-significant-number-of-rule-proposals.html) (2025)
- <a id="ref-13"></a>**13. U.S. SEC** - [*Division of Examinations: FY2026 Examination Priorities*](https://www.sec.gov/about/divisions-offices/division-examinations/examination-priorities) (November 2025)
- <a id="ref-14"></a>**14. Corporate Compliance Insights** - [*SEC 2026 Examination Priorities for Financial Services*](https://www.corporatecomplianceinsights.com/sec-2026-examination-priorities-financial-services/) (2025)
- <a id="ref-15"></a>**15. FINRA** - [*2026 Annual Regulatory Oversight Report*](https://www.finra.org/media-center/newsreleases/2025/finra-publishes-2026-regulatory-oversight-report-empower-member-firm) (December 2025)
- <a id="ref-16"></a>**16. FINRA** - [*2026 Report: Generative AI Section*](https://www.finra.org/rules-guidance/guidance/reports/2026-finra-annual-regulatory-oversight-report/gen-ai) (2025)
- <a id="ref-17"></a>**17. AIMA** - [*Front-Office Gen AI Adoption: DDQ Findings*](https://www.aima.org/article/press-release-front-office-gen-ai-adoption-shifts-from-if-to-when-for-leading-fund-managers-aima-research-finds.html) (2025)
