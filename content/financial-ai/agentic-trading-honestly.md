---
title: "Agentic Trading, Honestly: Where AI Actually Belongs in the Investment Workflow"
date: 2026-04-07
description: "A practitioner's map of AI in the investment workflow: what the platforms actually do beneath the marketing, where real value sits, and the traps nobody puts on the slide."
categories:
 - Opinion
draft: false
ShowToc: true
---

> *The AI Operating Manual for Investment Firms*

# Agentic Trading, Honestly: Where AI Actually Belongs in the Investment Workflow

*"AI that trades" is suddenly everywhere, from Robinhood handing agents the keys to a brokerage account, to quant shops evolving strategies with genetic algorithms, to multi-agent systems that mimic a whole trading floor. This is a practitioner's map: what the platforms actually do beneath the marketing, where the real value sits, the trap almost nobody is pricing in, and how a fund or RIA should actually proceed.*

---

On May 27, 2026, Robinhood did something that would have sounded like science fiction at the start of the decade: it let customers point an AI agent at a brokerage account and tell it to trade.**<u>[[1]](#ref-1)</u>** You fund a separate, isolated account; you connect an agent through Robinhood's Model Context Protocol service; and the agent can build a portfolio, adjust concentrations, or read analyst notes and act, in beta, equities only, with options, crypto, and futures on the roadmap.**<u>[[2]](#ref-2)</u>**

Read past the headline, though, and the interesting part is the fine print. Robinhood walled the agent off in its own account so it can only touch money you deposit there. It gave you a one-tap kill switch, spending caps, push notifications, and a trade-preview option. And in its own materials it warned that agents can behave unexpectedly and that the customer remains responsible for what the agent does.**<u>[[1]](#ref-1)</u>****<u>[[3]](#ref-3)</u>**

That is the whole essay in miniature. The most aggressive consumer rollout of "AI that trades" did not hand over the keys and walk away. It wrapped the agent in isolation, limits, an off-switch, and a disclaimer. When the company most incentivized to make this look effortless is this careful, you should take the signal seriously: the hard part of agentic trading was never getting the agent to place an order. It is deciding when to trust it, proving why, and containing it when it is wrong.

There are two lazy reactions to this moment, and both are wrong. One is to hand over the keys, to assume that because an agent *can* trade, it *should*. The other is to dismiss the whole thing as hype. The useful posture is neither. It is to ask a workflow-specific question: *which part of the trading process does an agent actually improve, and at what risk?*

---

## First, stop comparing three different things

Most of the confusion in this space comes from collapsing three distinct things into one word, "agentic trading." They sit on a spectrum from boring-and-mature to frontier-and-dangerous, and a fund or RIA needs to know which one a vendor is selling.

**Algorithmic execution.** This is old news, and it is enormous. By most estimates, somewhere around 60–75% of US equity trading volume is already algorithmic, with high-frequency trading a large subset, though the exact figure depends heavily on how you define "algorithmic," and the dollar-size estimates for the "market" vary so wildly between research shops that I won't cite one.**<u>[[4]](#ref-4)</u>** VWAP and TWAP order-slicing, smart order routing, market-making. None of this is new, none of it is what the AI hype is about, and your execution desk or broker has done it for years. Set it aside.

**Research, idea, and data agents.** This is where the genuine near-term value lives for almost everyone reading this. Tools that read filings and transcripts, screen companies, assemble research, monitor positions, and pressure-test theses — LinqAlpha, Claude for Financial Services, Perplexity Finance, the AI layers inside Bloomberg and FactSet, banks' internal platforms like Citi's. These do not trade. They compress the path *to* a decision.

**Autonomous strategy discovery and trading.** This is the frontier, and the hype, and the risk. Genetic and evolutionary systems that search for trading strategies on their own; multi-agent "trading firm" architectures; the Robinhood-style consumer agents that act on a real account. The capability is real and improving fast. So is the failure mode, which deserves its own section, because it is the thing nobody puts on the slide.

![Figure 1 — The Agentic-Trading Spectrum](/assets/financial-ai/3-1-trading-spectrum.svg)

## Speed vs. intelligence: the hidden axis

That spectrum sorts tools by autonomy. There is a second axis it hides, and it decides where large language models can play at all, which is speed. High-frequency trading has been pushed so close to the physical limit that the contest is fought in nanoseconds and in the length of fibre-optic cable between two machines, and no language model is remotely fast enough to compete there. But raw speed only matters if your holding period is measured in microseconds. Stretch the horizon to seconds, minutes, or hours, the mid-frequency band, and the binding constraint flips: the edge comes from more data and better reasoning, not from lower latency. Speakers at the STAC quant-infrastructure summit framed this directly as a Pareto frontier between speed and intelligence, the point being that LLMs are not there to win the speed race but to do the slower, judgment-heavy work that used to require a human discretionary trader.**<u>[[5]](#ref-5)</u>** The academic work points the same way. A 2025 study that built a high-frequency-trading benchmark to measure the latency-versus-quality tradeoff found that the right balance depends entirely on the task, and that LLM agents belong where there is time to think rather than time only to react.**<u>[[6]](#ref-6)</u>** The practical reading for a fund is simple. Do not put a language model in the nanosecond race. Put it in the mid-frequency, research, and monitoring work where intelligence, not speed, is the scarce input.

---

## The workflow, decomposed

To reason about where an agent helps, decompose the investment process into stages, because "AI for trading" is meaningless until you say *which stage*. Usefully, the academic frontier already organizes itself this way. The widely cited **TradingAgents** framework from UCLA and MIT researchers builds a multi-agent system that mirrors a real trading firm: separate analyst agents for fundamentals, sentiment, news, and technicals; bull and bear *researcher* agents that debate; a trader that synthesizes; and, note this, a risk-management team and a fund-manager approval step before anything executes.**<u>[[7]](#ref-7)</u>** A broader survey of the field reviewed dozens of LLM-trading papers and found the same architectural instinct: decompose, specialize, and govern.**<u>[[8]](#ref-8)</u>**

Here is the workflow, stage by stage, with where AI genuinely helps and where it breaks.

1. **Ideation.** Screening the universe, surfacing candidates, mapping catalysts. AI is strong here. It widens the funnel. Failure mode: it also widens the funnel of *bad* ideas, so the screen has to feed a human filter, not a position.
2. **Data acquisition.** Pulling filings, transcripts, prices, alternative data, news. AI is strong, *if* it reaches good data. This is the layer that quietly determines everything (more below).
3. **Research and analysis.** Reconciling numbers, reading management language, comparing to a thesis. Strong. This is the earnings-season workflow from Essay 02. Failure mode: a confident summary that's subtly wrong.
4. **Signal / strategy construction.** Turning analysis into a rule or a factor. AI can propose; but a proposed signal is a hypothesis, not an edge.
5. **Backtesting and validation.** The make-or-break stage, and the one most people get catastrophically wrong. AI makes it *faster to overfit*, which is the opposite of helpful unless you impose discipline. This gets its own section.
6. **Execution.** Placing the order. Largely a solved, regulated, commoditized problem, and the stage where autonomy carries irreversible, real-money consequences and the heaviest obligations.
7. **Monitoring and risk.** Watching positions, flagging drift, surfacing breaking news. Strong, and underrated — continuous monitoring is one of AI's best uses, as in Balyasny's documented agents that update deal probabilities and push filing-discrepancy alerts.**<u>[[9]](#ref-9)</u>**

![Figure 2 — Where AI Belongs in the Trading Workflow](/assets/financial-ai/3-2-trading-workflow.svg)

The pattern is hard to miss once you draw it. AI's value is concentrated in the stages where a mistake is *reversible* — a bad screen, a flawed draft, a noisy alert, all caught by a human before money moves. The hype is concentrated in the one stage where a mistake is *irreversible*. That is not an argument against agentic trading. It is an argument for sequencing it correctly.

---

## Below the surface: what the platforms actually do

Here is the research-agent layer in real detail, because this is where a fund or RIA should look first, and where, notably, even the most advanced players keep AI firmly in the *research* seat, not the trading seat.

### The institutional research agents

**Claude for Financial Services (Anthropic).** Launched July 2025 and expanded since, this is less a chatbot than a kit. The delivery surfaces are Claude Cowork (a knowledge-work agent app), Claude Code, headless Managed Agents, and Microsoft 365 add-ins for Excel, PowerPoint, Word, and Outlook. In May 2026 Anthropic shipped roughly ten ready-to-run finance agent templates for specific jobs, among them an Earnings Reviewer, a Market Researcher, a Model Builder, plus pitchbook creation, KYC screening, and credit-memo drafting.**<u>[[10]](#ref-10)</u>** It connects to financial data through partnerships with Moody's, FactSet, Morningstar, S&P Global, and Daloopa, among others.**<u>[[11]](#ref-11)</u>** And the part that matters most: Anthropic's own documentation frames these agents as producing *drafts for qualified human review*. They do not execute transactions.**<u>[[12]](#ref-12)</u>** Financial institutions reportedly make up a large share of Anthropic's top customers, including names like JPMorgan, Goldman Sachs, Citi, Citadel, and AIG.**<u>[[10]](#ref-10)</u>**

**LinqAlpha.** A Boston-based, multi-agent research platform founded in 2022 by MIT/Harvard PhDs and ex-investment professionals, used by well over a hundred hedge funds and asset managers.**<u>[[13]](#ref-13)</u>****<u>[[14]](#ref-14)</u>** Beneath the surface it runs a pipeline that collects raw financial data (filings, transcripts, premium news, sell-side research, alternative data across 139+ countries and tens of thousands of companies), cleans and structures it, converts it into AI-friendly formats, and continuously re-ranks results, exposed through a search API and a private-data workspace.**<u>[[15]](#ref-15)</u>** Its agentic workflows cover company screening, initiation-report generation, and catalyst mapping. Its most instructive feature is a "Devil's Advocate" agent, built on Claude via Amazon Bedrock, that pressure-tests an investment thesis, and links *every counterargument back to its source document*, creating an auditable trail meant to meet institutional governance standards, with the firm's data kept in its own secure environment.**<u>[[16]](#ref-16)</u>** That is the evidence-chain discipline from Essay 01, productized and sold to a hundred-plus funds. It is not a coincidence that the serious money is buying *auditability*, not autonomy.

**The data incumbents: Bloomberg and FactSet.** Bloomberg built **BloombergGPT** in 2023, a 50-billion-parameter model trained on a corpus of roughly 363 billion financial tokens.**<u>[[17]](#ref-17)</u>** But its real strategy turned out to be data quality plus retrieval, not the standalone model. Its terminal AI earnings summaries were trained with the help of its 400 Bloomberg Intelligence analysts, are grounded by retrieval over hundreds of millions of documents and thousands of daily news stories, and surface *clickable sources*, with the product team explicit that the summaries guide rather than replace the analyst.**<u>[[18]](#ref-18)</u>** It has since added Document Search & Analysis and, cautiously, **ASKB ("Ask Bloomberg")**, a natural-language interface rolled out in early 2026, and tellingly, it still won't answer questions about your portfolio.**<u>[[19]](#ref-19)</u>** **FactSet** shipped its **Transcript Assistant** in 2024, powered by a GPT-4-class model but restricted to FactSet's own data and not trained on user queries.**<u>[[20]](#ref-20)</u>** S&P Global and others followed. The common thread across all of them is decisive: their stated goal is to *accelerate research, not to send buy/hold/sell signals.***<u>[[20]](#ref-20)</u>** The incumbents' moat is the data and the grounding, which is exactly why the model alone is not the edge.

**Perplexity Finance.** The prosumer tier. A finance vertical that synthesizes real-time quotes, an earnings hub, live transcripts, SEC-filing analysis, heatmaps, and price alerts into plain-English, source-linked answers, pulling from data providers including Morningstar, FactSet, and others, and now able to connect to a real brokerage account.**<u>[[21]](#ref-21)</u>****<u>[[22]](#ref-22)</u>** It is mostly free, which matters: retail participation in US equities roughly doubled from about 10% in 2010 to 20–25% by 2025, and tools like this are the research infrastructure behind that shift.**<u>[[22]](#ref-22)</u>** For an RIA, it is a useful lens on what your clients are now doing on their own.

**The big-bank internal build: Citi.** Worth studying as the "build it yourself at scale" case. Citi runs a proprietary stack — Citi Assist (internal knowledge), Citi Stylus (document intelligence), Stylus Workspaces (multi-step workflows), and Citi Squad (coding) — deployed to roughly 150,000+ employees and running on *both* Google's Gemini and Anthropic's Claude, with agentic capabilities added in late 2025.**<u>[[23]](#ref-23)</u>****<u>[[24]](#ref-24)</u>** Two details matter. First, Citi's CTO tracks AI progress with a "capacity" metric: if a human did a task 100 times at cost X and AI does it at cost Y, you can price the gain, which is precisely the "cost per approved output" discipline from Essay 01, practiced by a global bank.**<u>[[25]](#ref-25)</u>** Second, even Citi keeps all of this in research, operations, and advisory. Not autonomous trading.

### The strategy-discovery layer

Now the frontier. The dream is seductive: let a system *discover* profitable strategies on its own.

The classic technique is the **genetic algorithm** (and its cousins in evolutionary computation). You encode a strategy's parameters as "genes," generate a population of candidate strategies, score each by a fitness function (often the Sharpe ratio or cumulative return on historical data), then breed the best via crossover and mutation across many generations, survival of the most profitable backtest. The newest wave makes this *agentic*: frameworks like **QuantEvolve** (from Qraft Technologies) combine evolutionary, quality-diversity optimization with hypothesis-driven, multi-agent strategy generation, aiming to explore the strategy space while preserving diversity; related self-improving systems go by names like R&D-Agent-Quant and QuantAgent.**<u>[[26]](#ref-26)</u>** Open platforms such as QuantConnect's LEAN engine have hosted genetic-strategy experiments for years.

And here is where the honesty has to kick in, because the people doing this carefully will tell you so themselves. A well-known QuantConnect community example evolved a EUR/USD strategy to a striking out-of-sample Sharpe, and the author openly noted the evolved strategy could not even be replicated on the platform and that the framework's value was the *process*, not the result.**<u>[[27]](#ref-27)</u>** The frontier is real. It is also littered with strategies that looked brilliant in a backtest and died on contact with live markets. Which brings us to the thing almost nobody prices in.

---

## The overfitting trap nobody mentions

This is the single most important section in the essay, and it is the one that separates a practitioner from someone reposting "our AI found a strategy with a Sharpe of 2.3."

When you search over many candidate strategies on the same finite history, you are almost guaranteed to find one that looks spectacular, *purely by chance*. This is not a fringe worry; it is settled quantitative finance. Bailey, Borwein, López de Prado, and Zhu laid it out in work with the deliberately blunt title "Pseudo-Mathematics and Financial Charlatanism," showing how backtest overfitting produces strategies that shine in-sample and fail out-of-sample.**<u>[[28]](#ref-28)</u>** In a related paper they showed that selection bias combined with overfitting can systematically mislead investors into funding strategies that go on to *lose money*, and that the usual "past performance is no guarantee" disclaimer is far too lenient, because in these cases poor outcomes are not merely possible but likely.**<u>[[29]](#ref-29)</u>** Their proposed fix, the **Deflated Sharpe Ratio**, explicitly discounts a strategy's apparent performance by the *number of trials* you ran to find it, along with sample length and the non-normality of returns.**<u>[[29]](#ref-29)</u>** A companion framework estimates the outright probability that your chosen backtest "winner" is overfit.**<u>[[30]](#ref-30)</u>**

Now connect that to agentic strategy discovery, and the danger becomes obvious. A genetic algorithm or a tireless agent does not test ten strategies. It tests thousands, or hundreds of thousands, overnight. Every additional trial makes it *more* certain that the best-looking result is a statistical mirage, not less. An AI that can generate and backtest strategies at superhuman speed is, absent discipline, a superhuman overfitting machine. The deflated Sharpe ratio exists precisely because the number of trials is the thing that kills you, and an agent's defining feature is running an astronomical number of trials.

![Figure 3 — The Overfitting Mirage](/assets/financial-ai/3-3-overfitting-mirage.svg)

It is worth seeing how a serious quant shop handles exactly this danger, because the answer is process, not genius. Man Group, the largest listed hedge fund, has published a detailed account of its AlphaGPT system, which generates trading ideas, writes the code, and runs the backtests. The architecture is the lesson. It is a three-agent workflow Man calls the Idea Person, the Implementer, and the Evaluator, and every AI-generated signal must show a clear economic rationale and clear the same evaluation thresholds as a human analyst's idea before it can be considered for deployment.**<u>[[31]](#ref-31)</u>** Man names the multiple-testing problem explicitly, noting that a system able to test numerous variations quickly raises the odds of finding patterns that look significant but are statistical artefacts, and it treats that as an engineering problem to be solved with hypothesis-first discipline, a logging system that records every decision for review, and dual-track validation by the investment committee and the technology team before anything trades.**<u>[[31]](#ref-31)</u>** As the firm's Ziang Fang put it, flipping a signal after seeing the results is not allowed, for humans or for AI.**<u>[[32]](#ref-32)</u>** A firm with a hundred quants and decades of infrastructure was worried about precisely the overfitting trap described above, and its answer was discipline a smaller team can copy even without the infrastructure.

Two further points follow, and both cut against the fantasy of a single model that does everything. The first is architectural: the most credible production stacks keep the language model in a bounded role. As Ben Lorica describes the emerging pattern, LLMs increasingly sit on top of classical quantitative engines as a reasoning and interface layer, summarizing research, proposing signals, explaining a portfolio, while allocation, risk, and execution stay with traditional optimizers and well-understood models such as gradient-boosted trees; the language model is often used offline to turn unstructured text into features that a robust, lightweight classical model then trades on.**<u>[[33]](#ref-33)</u>** The second is about ambition: do not try to out-compute the firms whose entire existence is speed and scale. Shops like Hudson River Trading are training foundation-style models on decades of market data across more than a hundred terabytes, and a smaller fund will not win that race.**<u>[[34]](#ref-34)</u>** The wedge for everyone else is not a bigger model. It is disciplined, validated, well-governed research and monitoring built on top of the tools that already exist.

The lesson is not "don't use AI to generate strategies." It is: treat every auto-discovered strategy as a *hypothesis to be disproved*, demand genuine out-of-sample and forward (paper-traded) validation, insist on an *economic rationale* for why the edge should exist, and correct your performance statistics for the number of things you tried. Anything an agent hands you with a beautiful backtest and no economic story is guilty until proven innocent.

---

## The profit mirage: an LLM-specific danger

Overfitting is the classical danger, and it applies to any search over strategies, human or machine. But large language models introduce a second, subtler failure that is specific to them, and it is more dangerous precisely because it does not look like overfitting. It looks like skill.

The problem has a name in the recent literature: the **profit mirage**. A 2026 study re-evaluated a set of popular published LLM-trading agents and found something damning. As long as the agents were tested on the same historical window their underlying model was trained on, they looked impressive. But move them one step past the model's knowledge cutoff, into genuinely unseen market data, and the performance fell apart. The best-performing agent's returns dropped by roughly half, and across the board the dazzling backtest returns collapsed toward statistical zero; almost every published agent failed to beat a random baseline once it was forced to trade in territory the model had never read about.**<u>[[35]](#ref-35)</u>**

The cause is not bad risk management or noisy data. It is **information leakage baked into the model itself.** A modern foundation model has ingested web-scale text that includes post-hoc explanations of past price moves, sentences like "NVIDIA surged in 2023 on the AI boom." When those explanations sit in the training data, the model does not learn *why* prices moved and then apply that understanding to the future. It learns *that they moved* and recites the answer during a backtest. The backtest is not measuring prediction. It is measuring memorization. This is sometimes called pre-training contamination, and in finance it is lethal, because the entire premise of a backtest is that the system did not know the future, and a language model very often does.**<u>[[35]](#ref-35)</u>**

A related failure compounds it. Researchers have shown that LLMs carry **memorized preferences for specific securities**, leaning toward well-known large-cap names like the ones that dominate financial news, a kind of confirmation bias absorbed from the training corpus rather than derived from any signal.**<u>[[36]](#ref-36)</u>** The most elegant diagnostic for both problems is to *blindfold* the model: anonymize the tickers and company names, replacing "AAPL" with something like "STOCK_0026," and see whether the strategy's edge survives when the model can no longer recognize what it is trading. If the performance evaporates once the names are hidden, the "signal" was recognition, not insight.**<u>[[36]](#ref-36)</u>**

This reframes how a fund should validate any LLM-driven strategy. The classical overfitting checks, out-of-sample testing and deflated Sharpe ratios, are necessary but no longer sufficient, because an LLM's "out-of-sample" period may still be inside its training window. The additional discipline is to test strictly *after* the model's knowledge cutoff, to anonymize identifiers where feasible, and to treat any strategy whose performance depends on the model recognizing famous tickers as contaminated until proven otherwise. A backtest that looks brilliant on 2021 data from a model trained through 2023 is not evidence. It is the mirage.

There is a broader version of this caution worth stating plainly, because the academic field has now catalogued it. A 2026 survey of LLM-based financial multi-agent systems documented five evaluation failures that recur across the literature and can, on their own, *reverse the sign* of reported returns: look-ahead bias, survivorship bias, backtest overfitting, neglect of transaction costs, and blindness to regime shifts.**<u>[[37]](#ref-37)</u>** Any one of them can turn a losing strategy into a winning-looking backtest. A fund evaluating a vendor's or an agent's track record should treat all five as a checklist, and should ask, specifically, whether the reported returns survive realistic transaction costs, because the same body of work proposes a "coordination breakeven spread," the trading-cost threshold past which a multi-agent system's apparent cleverness stops paying for itself.**<u>[[37]](#ref-37)</u>**

---

## The other two things people are missing

Overfitting is the big one, but two more failures separate durable systems from fragile ones, and both are the operating-model thesis of this whole series, applied to trading.

**Evidence and attribution.** Can you explain *why* the agent did what it did? A research agent that links every claim to a source, the way LinqAlpha's Devil's Advocate ties each counterargument to a 10-K, broker note, or transcript, gives you something you can audit, defend, and learn from.**<u>[[16]](#ref-16)</u>** An autonomous trader that produces a P&L and a shrug does not. This is not just good practice; it is increasingly a regulatory expectation. The SEC's 2026 examination priorities direct examiners to assess whether firms adequately supervise their AI *and* to review for accuracy the claims firms make about their AI capabilities, policing the gap between what your AI is said to do and what it actually does.**<u>[[38]](#ref-38)</u>** An opaque strategy you can't explain is an exam finding waiting to happen.

**Risk controls, kill-switches, and the research-versus-execution line.** The distinction between automating *research* and automating *execution* is the whole ballgame. Research automation is reversible and reviewable; a human sees the output before it matters. Execution automation is irreversible, moves real money, and carries the heaviest obligations — broker-dealers providing market access have long been required to maintain pre-trade risk controls, and the entire market-structure rulebook applies the instant an agent can place an order. It is not an accident that Robinhood's retail launch shipped with an isolated account, hard caps, and a one-tap kill switch, or that the academic TradingAgents architecture routes every decision through a risk team and a fund-manager approval gate before execution.**<u>[[1]](#ref-1)</u>****<u>[[7]](#ref-7)</u>** On the regulatory backdrop: the SEC's prescriptive "AI rule" (the 2023 predictive-data-analytics proposal) was formally withdrawn in 2025, but that removed a specific framework, not the underlying fiduciary, recordkeeping, and supervision obligations, which apply to AI exactly as to anything else, and FINRA has been explicit that its rules are technology-neutral and that it is watching the rise of AI agents.**<u>[[39]](#ref-39)</u>****<u>[[40]](#ref-40)</u>** The absence of a bespoke rulebook does not lower the bar. It raises the importance of building your own.

---

## An operating model for AI in trading

So how should a fund or RIA actually proceed? Not by buying the most autonomous thing available. By sequencing.

- **Research-first, always.** Automate ideation, data, research, and monitoring — the reversible, high-value, low-risk stages — and earn the right to touch execution later, if ever. This is the same research-first principle from Essay 01, and it is what every serious player above actually does.
- **Treat auto-discovered strategies as hypotheses, not money printers.** Out-of-sample validation, forward paper-trading, an economic rationale, and performance statistics deflated for the number of trials. No economic story, no allocation.
- **Keep human judgment and hard risk limits as the control point.** Agents propose; humans and risk systems dispose. Build the fund-manager approval gate and the kill switch *in*, the way both Robinhood and the research literature did.
- **Build the evidence and audit layer.** Every signal traceable to its data and logic; every action logged. If you can't explain it, you can't defend it, to a PM, an investor, or an examiner.
- **Match the tool to the stage and to your firm.** A quant shop validating factors needs different things than a discretionary fund doing earnings work, which needs different things than an RIA managing client portfolios.

It is worth being concrete about how this fails in practice, because the failure is always the same shape. A strategy is discovered by search, it posts a backtest Sharpe well above two, the deck gets built, and the question that should have been asked first — namely how many strategies were tried to find this one — never gets asked. Then it goes live and decays toward zero over a few months of real trading, and the post-mortem rediscovers deflated-Sharpe arithmetic that was available the entire time. The discipline is not exotic: demand a stated economic rationale fixed before the backtest, insist on genuine out-of-sample and paper-traded validation, and deflate the performance number for the count of trials. A beautiful backtest with no economic story is guilty until proven innocent.

---

## If you're an RIA, read this part twice

Most of the agentic-trading noise is not aimed at you, and you should not let it stampede you.

The Robinhood-style "your agent trades for you" feature is a *retail consumer* product. A retail user is allowed to accept that an agent "can behave unexpectedly" and to bear the consequences personally. You are a fiduciary. You cannot pass that sentence on to a client. The bar for handing trading discretion to an autonomous agent, on a client's money, under a duty of care and loyalty, is far higher than for a retail app, and for the vast majority of RIAs, the honest answer today is: don't.

Your edge with AI is not autonomous execution. It is the green part of the workflow map — research, portfolio analysis, monitoring, and the client-facing work covered in the rest of this series. Start with a research or monitoring agent whose outputs are source-linked and human-reviewed. Use a Perplexity-style tool to understand what your clients are now doing themselves. Ignore, for now, anything that asks you to hand a black box discretion over client capital. You will not be behind. You will be exactly where a fiduciary should be.

---

## The order is the commodity; the judgment is the edge

Strip away the spectacle and agentic trading resolves into the same lesson as everything else in this series. The model that can place an order is rapidly becoming a commodity — Robinhood made it model-agnostic, plugging in whatever agent you bring through a standard protocol. What is scarce, and therefore valuable, is the operating model around it: knowing which stage of the workflow to automate, validating ruthlessly against the overfitting that an agent makes *worse*, keeping an evidence trail you can defend, and holding human judgment and hard risk limits at the point of decision.

The firms that win the agentic era will not be the ones who handed over the keys fastest. They will be the ones who knew exactly which keys to hand over, and which to keep. In trading, the order is the commodity. The judgment about whether to trust it is the edge.

And that edge is durable. The agents will get better; this year's frontier framework will be ordinary by next. None of it changes the shape of the answer, because the durable work is not in the agent that trades. It is in the operating model around the agents that research.

---

> **Practical next step.** Take the workflow map and mark, honestly, where your firm is using AI today. If every mark is in the "green" research-and-monitoring zone with source-linked outputs and human review, you are doing this right. If you're being sold something in the "red" autonomous-execution zone, ask the vendor three questions: How do you correct for the number of strategies tested? Does the track record hold up *after* the model's training cutoff, with tickers anonymized? Where is the kill switch? The quality of the answers will tell you everything.

---

## References

- <a id="ref-1"></a>**1. Bloomberg / CNBC** - [*Robinhood Launches Agentic Trading*](https://www.bloomberg.com/news/articles/2026-05-27/robinhood-launches-ai-stock-trading-purchases-on-credit-cards) (May 2026)
- <a id="ref-2"></a>**2. TechCrunch** - [*Robinhood Now Lets Your AI Agents Trade Stocks*](https://techcrunch.com/2026/05/27/robinhood-now-lets-your-ai-agents-trade-stocks/) (May 2026)
- <a id="ref-3"></a>**3. American Banker** - [*Robinhood Launches Agentic Trading and an Agentic Credit Card*](https://www.americanbanker.com/payments/news/robinhood-launches-agentic-trading-and-an-agentic-credit-card) (May 2026)
- <a id="ref-4"></a>**4. QuantifiedStrategies** - [*What Percentage of Trading Is Algorithmic?*](https://www.quantifiedstrategies.com/what-percentage-trading-is-algorithmic/)
- <a id="ref-5"></a>**5. AI Street / STAC Summit** - [*AI in Mid-Frequency Trading*](https://www.ai-street.co/p/ai-in-mid-frequency-trading) (2026)
- <a id="ref-6"></a>**6. Kang et al.** - [*Win Fast or Lose Slow: Balancing Speed and Accuracy in LLMs*](https://arxiv.org/abs/2505.19481) - arXiv:2505.19481 (2025)
- <a id="ref-7"></a>**7. Xiao, Sun, Luo & Wang (UCLA / MIT)** - [*TradingAgents: Multi-Agents LLM Financial Trading Framework*](https://arxiv.org/abs/2412.20138) - arXiv:2412.20138 (2024)
- <a id="ref-8"></a>**8. Survey** - [*Large Language Model Agent in Financial Trading: A Survey*](https://arxiv.org/pdf/2408.06361) - arXiv:2408.06361 (2024)
- <a id="ref-9"></a>**9. OpenAI** - [*How Balyasny Asset Management Built an AI Research Engine for Investing*](https://openai.com/index/balyasny-asset-management/) (March 2026)
- <a id="ref-10"></a>**10. Fortune** - [*Anthropic Brings AI Agents to Wall Street*](https://fortune.com/2026/05/05/anthropic-wall-street-financial-services-agents-jamie-dimon/) (May 2026)
- <a id="ref-11"></a>**11. Anthropic** - *Claude for Financial Services: Data Partnerships with Moody's, FactSet, Morningstar, S&P Global, Daloopa* (2026)
- <a id="ref-12"></a>**12. Anthropic** - *Claude Finance Agents Produce Drafts for Qualified Human Review* (2026)
- <a id="ref-13"></a>**13. Korea Times / LinqAlpha** - [*LinqAlpha Builds AI to Help Hedge Funds Maximize Alpha*](https://www.koreatimes.co.kr/business/banking-finance/20250312/linqalpha-builds-ai-to-help-hedge-funds-maximize-alpha) (March 2025)
- <a id="ref-14"></a>**14. AWS ML Blog** - [*LinqAlpha Adoption: 170+ Hedge Funds / 800+ Institutional Investors*](https://aws.amazon.com/blogs/machine-learning/how-linqalpha-assesses-investment-theses-using-devils-advocate-on-amazon-bedrock/) (2026)
- <a id="ref-15"></a>**15. LinqAlpha** - [*Data Pipeline: 139+ Countries, Tens of Thousands of Companies*](https://linqalpha.com/)
- <a id="ref-16"></a>**16. AWS ML Blog** - [*LinqAlpha Devil's Advocate Agent on Amazon Bedrock*](https://aws.amazon.com/blogs/machine-learning/how-linqalpha-assesses-investment-theses-using-devils-advocate-on-amazon-bedrock/) (February 2026)
- <a id="ref-17"></a>**17. Bloomberg** - [*Introducing BloombergGPT*](https://www.bloomberg.com/company/press/bloomberggpt-50-billion-parameter-llm-tuned-finance/) (April 2023)
- <a id="ref-18"></a>**18. Institutional Investor** - [*Bloomberg's First Generative AI Tool Hits the Terminal*](https://www.institutionalinvestor.com/article/2cqjgsulkx3md4n3ox2ps/portfolio/bloombergs-first-generative-ai-tool-hits-the-terminal) (January 2024)
- <a id="ref-19"></a>**19. A-Team Insight** - [*Bloomberg Launches AI-Powered Research Tool for Terminal Users*](https://a-teaminsight.com/blog/bloomberg-launches-ai-powered-research-tool-for-terminal-users/) (2026)
- <a id="ref-20"></a>**20. Institutional Investor** - [*FactSet Launches Its Own AI Earnings Tool*](https://www.institutionalinvestor.com/article/2ct67kt9n08c8stnju7eo/corner-office/on-the-heels-of-bloomberg-factset-launches-its-own-ai-earnings-tool) (2024)
- <a id="ref-21"></a>**21. Digital Finance** - [*Perplexity AI Finance Features*](https://digital.finance/blog/perplexity-ai-finance-features-revolutionizing-financial-research-and-insights) (2025)
- <a id="ref-22"></a>**22. SalesSo** - [*Retail Participation in US Equities and Perplexity Finance*](https://salesso.com/blog/how-to-access-perplexity-finance-final/) (2025)
- <a id="ref-23"></a>**23. IMD** - [*Citigroup AI Maturity 2025*](https://www.imd.org/entity-profile/citigroup-ai-maturity-2025/) (2025)
- <a id="ref-24"></a>**24. Banking Dive** - [*Citi Agentic AI Tools: Stylus Workspaces*](https://www.bankingdive.com/news/citi-agentic-AI-tools-stylus-workspaces/760868/) (2025)
- <a id="ref-25"></a>**25. Const-ins** - [*How Citi's CTO Is Rolling Out AI Productivity Tools*](https://const-ins.com/how-citis-cto-is-rolling-out-new-gen-ai-productivity-tools-to-more-employees-across-the-globe/) (2025)
- <a id="ref-26"></a>**26. Yun, Lee & Jeon (Qraft Technologies)** - [*QuantEvolve: Automating Quantitative Strategy Discovery*](https://arxiv.org/abs/2510.18569) - arXiv:2510.18569 (2025)
- <a id="ref-27"></a>**27. QuantConnect Community** - [*Developing Trading Strategies with Genetic Algorithms*](https://www.quantconnect.com/forum/discussion/2396/developing-trading-strategies-with-genetic-algorithms/)
- <a id="ref-28"></a>**28. Bailey, Borwein, López de Prado & Zhu** - [*Pseudo-Mathematics and Financial Charlatanism*](https://ssrn.com/abstract=2308659) - *Notices of the AMS* 61(5), 2014
- <a id="ref-29"></a>**29. Bailey & López de Prado** - [*The Deflated Sharpe Ratio*](https://ssrn.com/abstract=2460551) - *Journal of Portfolio Management* 40(5), 2014
- <a id="ref-30"></a>**30. Bailey, Borwein, López de Prado & Zhu** - [*The Probability of Backtest Overfitting*](https://ssrn.com/abstract=2326253) - *Journal of Computational Finance*, 2015
- <a id="ref-31"></a>**31. Man Group (Fang & Moore)** - [*What AI Can (and Can't Yet) Do for Alpha*](https://www.man.com/insights/what-ai-can-do-for-alpha) (November 2025)
- <a id="ref-32"></a>**32. AI Street** - [*Inside Man Group's AlphaGPT*](https://www.ai-street.co/p/inside-man-group-s-alphagpt) (December 2025)
- <a id="ref-33"></a>**33. Gradient Flow / Ben Lorica** - [*What's Emerging in Financial AI*](https://gradientflow.substack.com/p/emerging-ai-patterns-in-finance-what) (January 2026)
- <a id="ref-34"></a>**34. AI Street** - *Hudson River Trading: Foundation Models on 100TB+ of Market Data* (2026)
- <a id="ref-35"></a>**35. Zhu et al.** - [*Profit Mirage: Revisiting Information Leakage in LLM-based Financial Agents*](https://arxiv.org/abs/2510.07920) - arXiv:2510.07920 (2025)
- <a id="ref-36"></a>**36. Chen et al.** - [*Can Blindfolded LLMs Still Trade? An Anonymization-First Framework*](https://arxiv.org/abs/2603.17692) - arXiv:2603.17692, ICLR 2026 FinAI Workshop
- <a id="ref-37"></a>**37. Huang et al.** - [*Toward Reliable Evaluation of LLM-Based Financial Multi-Agent Systems*](https://arxiv.org/abs/2603.27539) - arXiv:2603.27539 (2026)
- <a id="ref-38"></a>**38. U.S. SEC** - [*Division of Examinations: FY2026 Examination Priorities*](https://www.sec.gov/about/divisions-offices/division-examinations/examination-priorities) (November 2025)
- <a id="ref-39"></a>**39. U.S. SEC** - [*Withdrawal of the Predictive Data Analytics Proposal*](https://www.sec.gov/rules-regulations/2025/06/s7-12-23) (June 2025)
- <a id="ref-40"></a>**40. FINRA** - [*2026 Annual Regulatory Oversight Report*](https://www.finra.org/media-center/newsreleases/2025/finra-publishes-2026-regulatory-oversight-report-empower-member-firm) (December 2025)
