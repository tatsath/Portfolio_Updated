---
title: "The Investment Firms AI Operating Manual: From Earnings Season to the Trading Frontier"
date: 2026-06-01
description: "From earnings season to the trading frontier: the complete playbook for what the funds winning with AI actually do differently, and how to build the operating model around it."
categories:
 - Opinion
draft: false
ShowToc: true
---

> *The AI Operating Manual for Investment Firms* · Buy-Side Flagship

# The Investment Firms AI Operating Manual: From Earnings Season to the Trading Frontier

*Every fund, from a two-person emerging manager to a multi-strat with a twenty-person AI team, is now asking the same question. Not "should we use AI," but "what do the people who are actually winning with it do differently?" The honest answer, hidden in plain sight in what those funds have published about themselves, is that the edge was never the model. It is the operating model. Here is the whole playbook: the names, the traps, and where a small fund should start on Monday.*


---

Let me tell you the most useful thing I have learned reading everything the leading funds have published about how they actually use AI. The OpenAI case study on Balyasny, Man Group's own research on its AlphaGPT system, the benchmark papers, the regulatory filings. It is not a secret, exactly. It is just buried under a hype cycle so loud that almost nobody has bothered to notice it.

**The funds winning with AI are not the ones with the best model. They are the ones who built an operating model around it.**

That sounds like a slogan until you look at what these firms actually did, in their own words. Balyasny did not buy a better chatbot. It stood up a twenty-person Applied AI team and rebuilt research as a system. Man Group did not prompt GPT into picking stocks. It built a three-agent workflow that puts every AI-generated idea through the same investment-committee gauntlet a human analyst's idea faces. Neither story is about intelligence. Both are about discipline, evidence, and review wrapped around the intelligence.

I will be straight about where I sit. I have not run a book or sat on a quant desk. What I have done is read the primary record closely, skeptically, end to end, and synthesize it into something a fund can actually use. That turns out to be the scarce thing here. Most funds do not lack access to AI; they are drowning in vendor demos and breathless takes. What they lack is a disciplined operating model laid out plainly — what the best funds actually published, where it breaks, and how to apply it — without a platform being sold alongside it. That is the gap this essay sets out to close, and what follows is the map.

My vantage point is deliberately an outside one, and that is the point of it. I am not employed by a fund whose methods I am bound to defend, and I am not selling software, so I have no reason to talk up a tool that does not earn its place. That outside view is what keeps this honest, and what lets the essay say plainly where these systems actually fail in production — the only vantage from which the failures are visible.

It runs from research to the trading frontier. Let's go.

---

## What the winners actually do (it isn't what the demos show)

Start with the proof, because it reframes everything that follows.

**Balyasny** is the most documented case we have. Per the OpenAI study, roughly **95% of the firm's investment teams** actively use its internal research platform, built not by buying a subscription but by a dedicated Applied AI team, recruited from Google and DeepMind, that embedded the tools directly into how analysts work. **<u>[[1]](#ref-1)</u>** The results they disclosed are specific. A "Central Bank Speech Analyst" agent cut a macro scenario analysis **from two days to about thirty minutes**. A "Merger Arbitrage Superforecaster" continuously updates deal probabilities as filings land, replacing manual spreadsheet tracking. **<u>[[1]](#ref-1)</u>** But the part worth tattooing on the wall is how a Balyasny portfolio manager, Charlie Sweat, described what the system actually is: like adding a teammate who never forgets, always cites sources, and double-checks the details before sending anything back. **<u>[[2]](#ref-2)</u>** Read that again. Cites sources, double-checks the details. The value is not a smarter answer. It is a sourced, verified, reviewable one. The firm's Chief AI Officer, Charlie Flanagan, put the principle plainly: AI is enabling teams to apply first principles thinking faster, across more data, and with more structure. **<u>[[2]](#ref-2)</u>** Faster, more data, more structure. Not "AI makes the calls."

**Man Group**, the world's largest listed hedge fund at roughly $200bn-plus, is the other landmark, and the more instructive one for anyone tempted by "AI that trades." Its AlphaGPT system, which the firm details in its own published research, generates trading ideas, writes the code, and runs the backtests. But here is the architecture that matters: it is a three-agent workflow, which Man calls the **Idea Person, the Implementer, and the Evaluator**, and every AI-produced signal must demonstrate clear economic rationale and pass identical evaluation thresholds before it can be considered for deployment. **<u>[[3]](#ref-3)</u>** Identical. Whether a human or the machine generated the idea, it faces the same investment committee, the same code review, the same statistical scrutiny. As Man Numeric's Ziang Fang, who co-authored the firm's account, told an interviewer, a hypothesis has to be stated up front, and flipping a signal after seeing results is not allowed for humans or AI. **<u>[[4]](#ref-4)</u>**

Hold those two examples side by side and the pattern is unmistakable. The leaders did not deploy a chatbot. They built an operating model, with evidence, structure, review, and identical standards, and pointed AI through it.

![The Five-Layer Stack](/assets/financial-ai/R2-five-layer-stack.svg)

This is the whole game, and it is good news for a small fund. If the edge were the model, you would lose to whoever has the biggest GPU budget. Because the edge is the operating model, a disciplined two-person shop can build a version of what Balyasny built, scaled down, but on the same principles. The rest of this manual is how.

---

## Part 1. The research workflow: AI's best and safest use

The single highest-value, lowest-risk place to put AI on a fundamental desk is research, and the canonical proving ground is earnings season, where the work is a brutal capacity problem (too many names reporting in too few days) and the reflexive AI move is exactly the wrong one.

Here is the trap. Every demo shows you a model *summarizing an earnings call*. That is close to the **least** valuable thing AI can do for a serious analyst, and it is worth knowing why before you build a workflow around it. The summary was never the job, and across the whole industry, FINRA found summarization is both the most common GenAI use case at member firms *and* one it explicitly flags as hallucination-prone. **<u>[[5]](#ref-5)</u>** The most popular use is the weakest one.

The job is the *thesis update*: did anything this quarter change my variant view, and where exactly is the proof? Reframed that way, AI's real leverage shows up in three places.

The **pre-read** comes before the print. AI assembles the prep pack: last quarter's thesis, the KPIs that matter for *this* business, consensus by segment, the guidance walk, and the specific things you said last quarter you would be watching. You supply the questions; the model does the mechanical assembly that used to eat your evening.

The **post-read** is not a summary but a *reconciliation*: reported numbers against your model, consensus, and prior guidance, with the deltas computed and, the part a generic summarizer botches, the basis-change traps flagged. Adjusted versus GAAP, a segment reclassification, an organic-versus-reported sleight of hand, a beat-and-raise that raises guidance by exactly the size of the beat, which is no raise at all.

The **red team** is the most valuable single use of AI for an analyst, full stop. Feed the model your thesis and the filings and tell it to make the *strongest case against you*. Confirmation bias is the occupational disease of earnings season, and a model with no ego in the trade will say the uncomfortable thing your own notes were routing around.

One sharp point separates a real analyst from a tourist, because it is where most "AI sentiment" tools are useless: **management tone is not sentiment.** A positive or negative score on an earnings call is noise. Two decades of finance research (Loughran-McDonald) shows generic sentiment dictionaries badly misclassify financial language. **<u>[[6]](#ref-6)</u>** The signal lives in the texture, mostly in the Q&A: hedging and uncertainty creeping into the guidance, *non-answers* to specific analyst questions, the vocabulary that quietly disappeared ("strong demand" becoming "resilient"), the gap between an upbeat tone and a decelerating KPI.

![What Tone Decomposes Into](/assets/financial-ai/2-2-tone-decomposed.svg)

It is worth saying where this is heading, because it sharpens why the tone point matters. The research direction in financial AI is toward multimodal models that ingest the earnings-call audio, the tabular financials, and the market reaction in a single system, explicitly to approximate what a human analyst does when they weigh management's delivery, the numbers, and the price action at once. **<u>[[7]](#ref-7)</u>** That is a long way from a sentiment score, and it is the right destination. But notice that even the frontier version of this is doing what the red team and the reconciliation do by hand today: cross-checking tone against numbers rather than trusting either alone. The technology is chasing the discipline, not replacing it.

This is the condensed version. The full earnings-season workflow, with the pre-read pack in detail, the reconciliation traps, the tone analysis, and how to expand coverage without pretending the model does the analysis, is its own essay: ["How a Hedge Fund Should Actually Use AI for Earnings Season."](#)

---

## Part 2. The trading frontier

Now the part everyone actually wants to talk about, and where the hype is most dangerous. "AI that trades" collapses three completely different things into one phrase, and a fund needs to know which one a vendor is selling.

**First, stop comparing three different things.**

The first is **algorithmic execution**: VWAP/TWAP slicing, smart routing, market-making. Already most of US equity volume, mature, and *not what the AI conversation is about.* Your desk has done it for years. Set it aside.

The second is **research and data agents**: the Balyasny layer from Part 1. Highest near-term value, lowest risk. These do not trade; they compress the path *to* a decision.

The third is **autonomous strategy discovery and trading**: genetic strategy search, multi-agent "trading firm" architectures, the agents that act on a real account. The frontier, the hype, and the risk.

![The Agentic-Trading Spectrum](/assets/financial-ai/3-1-trading-spectrum.svg)

**The axis the spectrum hides: speed versus intelligence.** Here is a point I almost never see made cleanly, and it matters for where LLMs fit. High-frequency trading is now so fast it brushes against the speed of light. You cannot out-race a law of physics, and LLMs are *far* too slow to try. But speed only matters if your holding period is microseconds. Stretch the horizon to seconds, minutes, hours, into *mid-frequency*, and the constraint flips: edge comes from more data and better reasoning, not raw latency. As one speaker at the STAC quant-infrastructure summit framed it, this is a **Pareto frontier between speed and intelligence**, and the opportunity is not to make LLMs beat HFT engines on speed. It is to use them where intelligence is the scarce input. **<u>[[8]](#ref-8)</u>** The academic work backs this: a 2025 benchmark study of the latency-quality tradeoff (it built a tool called HFTBench) found the optimal balance varies by task and that LLM-based agents belong where you can afford to think. **<u>[[9]](#ref-9)</u>** The lesson for a fund: **LLMs do not belong in the nanosecond race. They belong in the mid-frequency, research, and monitoring work that used to depend on human discretionary judgment.**



Now the workflow, decomposed, because "AI for trading" is meaningless until you say *which stage*. Run the investment process as stages and ask, at each, whether a mistake is reversible.

![Where AI Belongs in the Trading Workflow](/assets/financial-ai/3-2-trading-workflow.svg)

The pattern: AI's value clusters where a mistake is *reversible* (a bad screen, a flawed draft, a noisy alert, all caught by a human before money moves), and the hype clusters on the one stage where a mistake is *irreversible* (execution). That is not an argument against AI in trading. It is an argument for sequencing it correctly: research first, execution last or never.

There is an architectural pattern worth knowing here, because it is how the more sober quant shops are actually wiring this up rather than handing the model the keys. The model sits as a reasoning and interface layer on top of the existing quantitative stack: it reads research, proposes signals, and explains a portfolio in plain language, while the allocation, the risk management, and the execution stay with the classical optimizers and models that were already doing that job well. Often the language model is used offline to extract features from unstructured text, which are then fed into a robust, lightweight classical model for the actual prediction. **<u>[[10]](#ref-10)</u>** That is the disciplined shape: the model amplifies the parts of the process that are about reading and reasoning, and stays away from the parts where a confident hallucination would move real money.

### The overfitting trap

This is the section that matters most, and it is where AlphaGPT becomes the perfect teacher, because Man Group, with a hundred quants and decades of infrastructure, was worried about exactly the thing that will quietly wreck an undisciplined small fund.

When you search over enough candidate strategies on the same finite history, you are *guaranteed* to find one that looks spectacular by pure luck. This is settled quantitative finance. Bailey and López de Prado's work on backtest overfitting shows selection across many trials produces strategies that shine in-sample and die live, and that the standard "past performance" disclaimer is far too lenient. **<u>[[11]](#ref-11)</u>** Now connect it to AI. A model does not test ten strategies; it tests thousands overnight. **An AI that backtests at superhuman speed is a superhuman *overfitting* machine** unless you impose discipline.

Man Group says this in its own words. The firm names the danger directly: the system can test numerous variations and combinations rapidly, increasing the probability of discovering patterns that appear significant but represent statistical artefacts, the multiple-testing problem, "sometimes called p-hacking." **<u>[[3]](#ref-3)</u>** And critically, it treats this as an engineering challenge rather than a fundamental barrier, solved with process, not hope. Every idea must be hypothesis-driven with a stated economic rationale fixed *before* the backtest. A logging system captures every decision for review. Signals face dual-track validation by the investment committee and the technology team before anything goes live. **<u>[[3]](#ref-3)</u>** That is the discipline. It is also, almost exactly, what a small fund needs, minus the infrastructure.

![The Overfitting Mirage](/assets/financial-ai/3-3-overfitting-mirage.svg)

The takeaway for any fund using AI to generate strategies: treat every auto-discovered strategy as a *hypothesis to be disproved.* Demand genuine out-of-sample and forward (paper-traded) validation, insist on an economic rationale for *why* the edge should exist, and deflate your performance stats for the number of things you tried. A beautiful backtest with no economic story is guilty until proven innocent.

I will put my own stake in the ground here, because this is where I think the "AI alpha" pitch is most quietly dangerous. The risk is not that an AI generates a bad strategy. It is that it generates a *gorgeous* one, with a Sharpe that clears every committee, that is pure overfitting, and that nobody can tell apart from a real edge without the validation discipline above. Speed makes this worse, not better, because the faster you can search, the more impressive the artefact you will eventually surface by chance. If I were stress-testing a fund's AI-assisted research stack, the first thing I would want to see is not the winners. It is the log of everything that was tried and rejected, and the rule that fixes the hypothesis before the backtest runs. A fund that cannot show me that is not doing research. It is mining noise at scale.

The full treatment, with the three-tier landscape, the genetic and agentic strategy-discovery tools, the regulatory and risk-control reality, and the RIA-specific cautions, is its own essay: ["Agentic Trading, Honestly: Where AI Actually Belongs in the Investment Workflow."](#)

---

## The platforms, named, and how to choose

Funds keep asking me which tool to buy. Here is the honest map, grouped by what they actually do, not ranked, because the right answer depends on your firm, and the meta-point matters more than any logo.

**Research and data agents** read filings and transcripts, screen, monitor, and pressure-test: **LinqAlpha, Hebbia, AlphaSense, Rogo**, and the model labs' own finance kits (**Claude for Financial Services**, the **OpenAI**-powered tooling Balyasny built on). These are the Part 1 layer.

**Data incumbents with AI layers**: **Bloomberg** (BloombergGPT, the terminal's AI tools), **FactSet**, **S&P**, **Morningstar**. Research acceleration grounded in their data, explicitly *not* buy/sell signals.

**The extraction backbone**: providers that turn messy filings into structured, normalized data, the unglamorous layer that decides whether the numbers are right (more on that in the document and "retrieval is not evidence" essays).

**Build-it-yourself**, the Balyasny and Man route, only if you have the team and have honestly priced it.

The meta-point: **do not reframe this as buy-versus-build. Reframe it as configure.** Buy the commoditized layers where a vendor has a data or integration moat you cannot replicate (you will not out-build a 500-million-document research library). Build only where the workflow is your genuine edge. And own the evidence-and-review layer regardless of whose engine you license, because that is the operating-model layer, and it does not come in the box. The metric that should drive the decision is not your subscription bill. It is the **cost per *approved* output**, one reviewed memo, one validated signal, which includes the human review and the verification that the demo never shows.

![Build / Buy / Configure](/assets/financial-ai/4-4-build-buy-configure.svg)

---

## If you're a small or emerging fund, start here

You cannot hire like Balyasny. You do not have a twenty-person Applied AI team or Man Group's decades of infrastructure. Good news: you do not need them. You need their *discipline*, applied to one workflow at a time. Here is the honest starting sequence.

**Pick one workflow** that is repeated, document-heavy, time-consuming, and reviewable. The earnings memo is the obvious first one. **Define the output** you actually want, in a fixed structure. **Define the evidence** each part must carry, with every number sourced and every claim traceable. **Name the reviewer.** **Write down the red flags** that send a draft back. Then **run it on five names you already know cold**, compare the AI-assisted result against how you did it before, on time *and* on quality and error rate, and only then scale to a second workflow.

For trading specifically, stay in the green zone. Use AI for ideation, data, research, and monitoring. If you generate strategies, validate them the way Man does: hypothesis first, economic rationale, out-of-sample and paper-traded, stats deflated for the number of trials, human sign-off, before a single dollar moves. Keep AI out of autonomous execution until you have earned the right, if ever.

That is the whole thing: narrow, measured, evidence-backed, reviewed. It is what the giants do, scaled to your size.

---

## The edge was never the model

Strip away the hype and every example in this manual says the same thing. Balyasny's PM did not praise a smarter answer; he praised a teammate that cites sources and double-checks the details. Man Group's whole AlphaGPT design is about forcing AI through the same disciplined gauntlet as a human. The benchmark papers say the system around the model matters more than the model. The leaders are not competing on intelligence you can rent. They are competing on the operating model you have to build.

That is the opportunity for every fund that is not a multi-strat giant. The durable advantage lives in the workflows, the evidence, and the controls, and those scale down. A disciplined two-person fund can run a version of what the leaders run. The model will keep changing; this year's best will be ordinary by next. The operating model is what endures.

The funds that win the next decade will not be the ones that bought the most AI or hired the most PhDs. They will be the ones who built the operating layer around the intelligence, and who knew, at every stage, where AI made them faster and where it would quietly hurt them. That is the manual. That is the work.

---

## Conclusion

Every example in this manual points the same way: the funds winning with AI are not the ones with the best model, but the ones who wrapped it in evidence, structure, and review. That advantage scales down — a disciplined two-person shop can run a smaller version of what Balyasny and Man Group built, because the durable work lives in the workflows, the evidence, and the controls, not the subscription. Start where the value is highest and the risk is lowest: pick the one research workflow your desk runs most often and ask three questions of it — is every number sourced, is there a named reviewer, and could you reconstruct it in a year? If any answer is no, that is usage, not an operating model, and that gap is exactly where to begin. The model will keep changing; the operating model is what endures.

---

## References

- <a id="ref-1"></a>**1. OpenAI** - [*How Balyasny Asset Management Built an AI Research Engine for Investing*](https://openai.com/index/balyasny-asset-management/) (March 2026)
- <a id="ref-2"></a>**2. CFOtech** - [*Balyasny Builds AI Research Platform for Hedge Fund Teams*](https://cfotech.news/story/balyasny-builds-ai-research-platform-for-hedge-fund-teams) (March 2026)
- <a id="ref-3"></a>**3. Man Group** - [*What AI Can (and Can't Yet) Do for Alpha*](https://www.man.com/insights/what-ai-can-do-for-alpha) (November 2025)
- <a id="ref-4"></a>**4. AI Street** - [*Inside Man Group's AlphaGPT*](https://www.ai-street.co/p/inside-man-group-s-alphagpt) (December 2025)
- <a id="ref-5"></a>**5. FINRA** - [*2026 Annual Regulatory Oversight Report*](https://www.finra.org/media-center/newsreleases/2025/finra-publishes-2026-regulatory-oversight-report-empower-member-firm) (December 2025)
- <a id="ref-6"></a>**6. Loughran & McDonald** - [*When Is a Liability Not a Liability?*](https://doi.org/10.1111/j.1540-6261.2010.01625.x) - *Journal of Finance* 66(1), 2011
- <a id="ref-7"></a>**7. Open-Finance-Lab** - [*Awesome Multimodal Financial Foundation Models*](https://github.com/Open-Finance-Lab/Awesome-MFFMs)
- <a id="ref-8"></a>**8. AI Street** - [*AI in Mid-Frequency Trading*](https://www.ai-street.co/p/ai-in-mid-frequency-trading) (2026, STAC Summit)
- <a id="ref-9"></a>**9. Kang et al.** - [*Win Fast or Lose Slow*](https://arxiv.org/abs/2505.19481) - arXiv:2505.19481 (2025)
- <a id="ref-10"></a>**10. Gradient Flow / Ben Lorica** - [*What's Emerging in Financial AI*](https://gradientflow.substack.com/p/emerging-ai-patterns-in-finance-what) (January 2026)
- <a id="ref-11"></a>**11. Bailey & López de Prado** - [*Pseudo-Mathematics and Financial Charlatanism*](https://ssrn.com/abstract=2308659) & [*The Deflated Sharpe Ratio*](https://ssrn.com/abstract=2460551) (2014)
