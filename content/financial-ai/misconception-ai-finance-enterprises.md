---
title: "The AI Misconceptions Keeping Financial Enterprises Stuck"
date: 2026-06-29
description: "Most financial firms have already bought the models and the compute. Almost none have them doing trustworthy work in production. That gap is not a model problem or a budget problem. Here are the seven misconceptions that do the most damage, and the one posture that dissolves all of them."
categories:
 - Opinion
draft: false
ShowToc: true
---

> *The AI Operating Manual for Investment Firms*

# The AI Misconceptions Keeping Financial Enterprises Stuck

*Nothing here is investment advice.*

---

There is a scene that repeats at several financial firms.

Leadership decides to "do AI." A budget appears. Enterprise deals get signed with one or more of the big providers. Maybe there is a GPU allocation, an internal platform team, a pilot or three. The slideware is gorgeous.

Then you ask the only question that matters: *what is actually in production, trusted, and used every day by the people who do the work?*

And the honest answer is: not much.

The firm has bought the most powerful engine on the market, and it is sitting idle. Not because the engine is weak. Because the hard part was never the engine. It is the last mile: getting the thing into trustworthy production, wired into real workflows, validated, governed, actually used (Figure 1).

![The engine is in the shop, few firms get it on the road](/assets/financial-ai/misconception-fig-ferrari.png)

And the reason so many firms stall on that last mile is that they have absorbed a set of misconceptions about how this technology works and what it takes to ship it. They share a root, and naming it up front makes the rest land harder: **the value is not in the thing you buy.** The model is rented, and commoditizing by the month. The value is in what you build around it, the orchestration, the validation, the controls, the fit to your actual workflow, and that part does not come in anyone's box.

![Figure 1: Firms buy the engine; few get it into production. The gap is the last mile.](/assets/financial-ai/misconception-fig-last-mile.png)

*Figure 1. The last mile: capability bought vs. capability trusted in production.*

> **A note on where this comes from.** I do not sell models, platforms, or pilots. This is the view from reading the primary record and watching where these systems break, which is the only vantage from which most of these misconceptions are even visible, because every one of them is comfortable for somebody who is selling you something.

---

## 1. "Just buy a platform."

When a firm decides to move, the instinct is to go shopping. And the market splits cleanly into two kinds of sellers, each of which leaves you stuck in a different way.

On one side: the hyperscalers and frontier labs. Enormous capability, world-class models, almost no hand-holding. They will sell you the raw engine and a thick stack of docs, and then it is your problem to integrate it, make it reliable, fit it to your desk. They are not coming to figure out why your document extraction breaks on your messiest filing. That is not the business model. For a firm without serious internal build capability, "we bought access to the best model" quietly becomes "we own the engine and nobody here can get it running."

On the other side: the specialist vendors. These hand-hold enthusiastically, because hand-holding is how they close. They will run a pilot, tailor a demo to your data, sit in the room. The catch is the incentive. Their job is to sell their product, and the pilot is a sales motion, not a deployment. You spend real time and money standing it up, and a depressing share of the time you land in the same place: *this is not quite what we needed.* The thing that demoed beautifully does not survive your real documents and your real controls.

This is not a rare outcome. Industry studies put the share of enterprise AI proofs-of-concept that never reach production in the high eighties, and in financial services the average *failed* AI project runs into eight figures. **[[1]](#ref-1)** A separate MIT-backed study tracking tens of billions in enterprise AI spending found that the substantial majority of organizations saw no measurable return, with poor integration and spend aimed at the most visible rather than the most valuable use cases as the leading causes. **[[6]](#ref-6)**

> **95% of enterprise GenAI implementations showed no measurable ROI.** That is not a model failure. It is a last-mile failure, and the distinction matters for every decision below.

Here is the reframe that springs the trap, and it is the spine of this whole piece. **Stop asking "what should we buy?" Start asking "which layer is commodity, and which layer is my edge?"**

Because they are different layers, and the entire game is buying the first and building the second.

The model is a commodity. So are the connectors, the infrastructure, the undifferentiated plumbing. *Rent* those. You will not out-build a frontier lab's model or a data vendor's coverage, so do not try. But the layer on top, the orchestration that strings the pieces into your workflow, the validation that makes the output trustworthy, the controls that make it defensible, the fit to how your desk actually works, *that* is your edge. And it is the one part no vendor can sell you, because it is shaped like your firm and nobody else's.

The mistake firms make is exactly backwards. They try to *build the commodity* (standing up their own model, reinventing infrastructure) or *buy the edge* (a black-box platform that promises to be their whole workflow). Both fail.

Think Lego. The labs and data vendors now sell extraordinary *bricks*: models, embeddings, parsers, connectors, all off the shelf. What they cannot sell you is the *thing you build* from the bricks. The firms that win are not the ones who bought the most expensive set. They are the ones who got good at assembly.

---

## 2. "It all has to run in the hyperscaler's cloud "

This is the one I most want to correct, because it is both widely believed and, for a regulated firm, dangerously wrong.

The belief: serious AI requires a hyperscaler. To get capable models you must ship your data to an external API. Nothing good enough to matter runs on hardware you control. "On your own GPU" means toy models.

Not true anymore, and the gap closed faster than most firms realize.

Open-weight models, Qwen, Gemma, DeepSeek, Mistral, Llama, OpenAI's own open releases, now land within a few percent of the frontier closed models on the work that fills a firm's day: summarization, classification, retrieval, extraction, drafting, internal tooling. Several run on a single GPU. The people tracking this in 2026 put it bluntly: for most real-world tasks, a well-chosen local model on private infrastructure is competitive with what you paid frontier-API prices for not long ago. You are no longer choosing between good AI and local AI, but between two flavors of good AI. **[[2]](#ref-2)**

Why it matters for a firm is not ideology. It is the boundary.

The thing that makes consumer AI cheap and easy, *send your data to the model*, is the thing a regulated firm often cannot do. Your positions, your research, your MNPI-adjacent material: much of it cannot leave your control. And "we send it to OpenAI" is increasingly a sentence that ends a procurement conversation in finance. **[[2]](#ref-2)**

Flip the boundary from problem to design constraint, and the on-prem, open-model path stops looking like a compromise. It starts looking like the natural architecture: capable models on a box you own, inside your perimeter, nothing phoning home.

The corrected belief is not "never use a hyperscaler." Some jobs are worth the trip outside, and some firms have no appetite to run inference. The corrected belief is that **the choice is real, and the default is no longer "cloud."** A firm that has never seriously evaluated the local option on-prem GPU option has been quietly sold the most expensive and least private architecture as if it were the only one.

---

## 3. "The model is the hard part."

If the model were the hard part, this would already be solved, because everyone already has the model.

The hard part is everything the model does not do by itself. And the most important piece of it now has a name: the **harness**, the scaffolding around the model that turns a powerful but unpredictable engine into a reliable system. Memory, tool use, context discipline, error handling, retries, human checkpoints, everything except the weights.

Here is the finding that should reset where you spend your effort. The *same* model can score as differently as 46% versus 80% on an identical benchmark, depending only on how the harness around it is built, a spread that often exceeds the gap between one frontier model and the next. **[[3]](#ref-3)**

> "Context engineering is the new prompt engineering." *Andrej Karpathy, June 2025*

The progression of the last two years runs prompt engineering, context engineering, harness engineering: building the environment the model runs in. The verdict from the people actually doing it is that the model is no longer the hard part. Building the system around it is. **[[3]](#ref-3)**

This is the single most important misconception to kill, because it decides where your effort goes.

Believe the model is the hard part, and you chase the best model, upgrade on every release, treat model selection as the central decision. Understand that the harness is the hard part, and you spend your effort on the thing that actually moves results: the orchestration, the retrieval, the validation, the workflow fit.

And here is the reassuring part for any firm worried about being left behind. Because the value lives in the harness, and the harness is buildable in-house, the edge is available to you. You do not need to win the model race. You need to win the assembly race, and that one is not decided by who has the biggest GPU budget (Figure 2).

![Figure 2: Rent the commodity, build the edge. Firms stall by building the bottom or buying the top.](/assets/financial-ai/misconception-fig-rent-build.png)

*Figure 2. Rent the commodity layer, build the edge — firms stall by doing the reverse.*

---

## 4. "More complex is better, and the most advanced thing is an agent."

There is a status game in enterprise AI where the most elaborate architecture wins the meeting. Multi-agent swarms, autonomous planners, the full agentic apparatus, presented as self-evidently superior to anything simpler. And the single most complicated thing on the menu, the one everybody reaches for precisely *because* it is the most complicated, is the agent. So these are really one misconception wearing two hats: *more complex is better*, and its favorite child, *the most advanced thing is an agent, so build one.*

It is usually wrong, and expensively so.

The right question is never "what is the most advanced thing we can deploy?" It is "what is the simplest thing that solves *this* job reliably?" And the honest answer varies enormously.

Some tasks genuinely suit a retrieval setup, where the work is finding the right passage and grounding an answer in it. Some need an agent, a real multi-step loop with tools, because the work requires planning and acting across stages. And a great many tasks, more than vendors will ever admit, are best served by something boring: a tuned extraction with a deterministic check, a single focused model call, a classical pipeline with a model doing one bounded thing inside it.

The most valuable of those boring jobs is also the least glamorous: reading documents. Roughly 80% of the data inside a financial firm is unstructured, locked in filings, memos, contracts, statements, and PDFs, and financial services carries the largest share of unstructured data of any industry. **[[7]](#ref-7)** Almost every downstream use case, the summary, the screen, the risk flag, the model, is only as good as the extraction beneath it: read the document wrong and everything built on top inherits the error. Get document processing right and an enormous amount of trapped value comes loose, since modern extraction can now turn the large majority of that locked data into usable, validated fields at high accuracy. **[[7]](#ref-7)** Reaching for an autonomous multi-agent swarm to do a job a well-built extraction pipeline would nail is not sophistication. It is paying more, waiting longer, and adding failure surface for nothing.

Agents themselves are a real, valuable tool, just for a narrow shape of problem: open-ended, multi-step work where the path cannot be specified in advance and the system genuinely needs to plan, act, observe, adapt. For that shape, nothing else does as well. But most of what a firm needs from AI is not that shape, and the tell that you are being agent-washed is when a vendor sells autonomy as the feature rather than the means. Autonomy is not a benefit. It is a cost you accept only when the problem demands it.

Complexity is not free, and in agentic systems it compounds. Every extra step is another place to fail, and the failures multiply rather than add. It costs real money too: an agentic workflow can burn many times the tokens of a single call, and the production economics of a multi-step loop bear no relationship to the pilot economics of a one-shot demo. **[[4]](#ref-4)**

The discipline is simple. Match the tool to the job, and use the least autonomy that works (Figure 3). Reach for the simplest architecture that clears the bar, then add complexity only when a specific failure forces you to. "Is it an agent?" is the wrong question. "Does this job actually require one?" is the right one, and for most of a firm's work the answer is no.

![Figure 3: Match the tool to the job. Not everything is an agent.](/assets/financial-ai/misconception-fig-match-tool.png)

*Figure 3. Match the tool to the job — most work needs retrieval or a single call, not an agent.*

---

## 5. "What works in the demo will work in our shop."

A leader watches a slick demo, or a YouTube walkthrough, or reads a blog post with a clean reference architecture, and concludes the thing will work inside the firm.

In a regulated institution, this is the most reliably false assumption of all, and it is false for a specific technical reason almost no demo discloses.

The demo runs on the open internet. It assumes the model can be called over an external API, that components can reach web services, that data flows freely, that telemetry and logs go wherever the vendor's architecture sends them.

None of that is safe inside a regulated firm.

A large share of the typical vendor toolkit, and of the tutorial stacks online, is built on external connectors and outbound calls: the orchestration framework that quietly sends data back out, the component that ships usage telemetry to the vendor, the "managed" feature that quietly routes your data through someone else's cloud. Inside a regulated boundary, where data residency, egress controls, and information barriers are not negotiable, much of that cannot run as shipped.

You discover this not in the demo but three weeks into the integration, when security flags that half the stack is making calls you cannot allow (Figure 4).

![Figure 4: Much of the off-the-shelf toolkit assumes the open internet. Inside a regulated firm, a large share cannot run as shipped.](/assets/financial-ai/misconception-fig-phones-home.png)

*Figure 4. The parts that quietly phone home — the outbound calls that fail procurement inside a regulated perimeter.*

Which lands on the conclusion this whole piece keeps reaching from different directions. Because so much of the off-the-shelf, internet-native toolkit dies at a regulated perimeter, the realistic path is to **orchestrate it yourself**: assemble components you control, run where your data is allowed to be, design out the outbound calls you cannot make from the start rather than discover them late.

That is not paranoia. It is a description of what the compliance boundary actually requires. The reference architecture in the blog post was drawn for a world without information barriers. You do not live there.

---

## 6. "You can't really do this in-house."

The weight of the previous five produces a sixth, and it is the most defeating: the belief that all of this is too hard, too specialized, too fast-moving to do internally, so the only real path is to outsource it wholesale and hope.

This gets it exactly backwards, and by now you can see why.

Yes, the models matter, and you should rent the best ones for the jobs that need them. But the models are the *commodity* layer, correctly rented. The part that is your edge, the orchestration, the validation, the harness, the workflow fit, does not require a frontier research lab. It requires people who understand your workflow and can assemble good components into a reliable system. That is a demanding engineering and domain problem, not a moonshot.

And everything above points the same way: capable models run on hardware you control, the harness that decides your results is buildable and is where the value lives, and much of the vendor toolkit cannot run inside your walls anyway. Put those together and the conclusion is not "you cannot do this in-house." It is that for the majority of your use cases, in-house orchestration is the *better* path, and increasingly the only one that fits your constraints.

The honest qualification: "in-house" does not mean "from scratch" or "alone." It means owning the layer that is yours, the assembly, the validation, the controls, while renting the commodity underneath and, where useful, bringing in outside help to build that layer rather than to sell you a black box that replaces it.

The distinction is between buying a *result* you cannot see inside or change, and building a *capability* you own. The first leaves you stuck the next time your needs shift. The second compounds. That muscle is the durable asset. The vendor relationship is not.

---

## 7. "ROI is about the token cost."

The last misconception is about measurement, and getting it wrong quietly distorts every decision above it.

The belief: the way to think about AI economics is the token bill. Cheaper tokens mean better ROI. The goal is to minimize cost per token, or, worse, to maximize tokens consumed as if usage were the return.

Both framings are wrong, and the second is genuinely backwards. An agent that burns fifty times the tokens to produce a worse answer is not delivering more value. It is delivering more cost.

The token is close to the least important number in the whole picture. What matters is **return per user**, and **cost per useful, approved output**: the fully loaded cost of producing one thing a person actually trusts and uses, which includes the integration, the validation, and the human review, not just the model call. One global bank's tech leadership reframed exactly this way, tracking AI by capacity: if a task done by a human a hundred times costs X and AI does it at Y, you can price the real gain. **[[5]](#ref-5)** The token cost is a rounding error inside it.

And the harder truth the vendors will not volunteer: **durable, measurable GenAI ROI is genuinely difficult to show right now.** The largest study of enterprise deployments found that against tens of billions in spending, the substantial majority of organizations saw no measurable return, and the cause was not weak models but poor integration and spend aimed at the most visible rather than the most valuable use cases. **[[6]](#ref-6)** Surveys consistently find only about half of enterprises can confidently evaluate their AI ROI at all. **[[4]](#ref-4)**

That is not a reason to give up. It is a reason to measure honestly and point the spend correctly (Figure 5).

![Figure 5: Token-maxing is not ROI. Return per user, on the right workflow, is.](/assets/financial-ai/misconception-fig-roi.png)

*Figure 5. The wrong number vs. the right one — token consumption vs. return per approved output.*

A firm that measures cost per approved output, per user, on the workflows where that output genuinely beats the manual cost, will be in the small minority that can show a return. A firm that celebrates its token consumption is measuring the one number that tells it nothing.

---

## The posture that dissolves all seven

Step back and the seven collapse into a single operating posture. This is the part to keep.

**Rent the commodity.** Models, connectors, raw infrastructure, are bricks you buy off the shelf, including capable open-weight models you run on your own hardware, inside your own walls. Do not build them. Do not overpay a hyperscaler when a local model clears the bar. Do not make model selection your central decision.

**Build the edge.** Orchestration, the harness, retrieval and context design, validation, controls, workflow fit, is where results are actually decided and where your advantage lives. It is buildable in-house and specific to your firm. This is where your effort and spend belong.

**Orchestrate it yourself.** Because much of the vendor-assembled, internet-native toolkit cannot survive your perimeter, and because the value is in the assembly anyway, assemble the pieces you control rather than buy a black box that breaks at your boundary.

**Match the tool to the job, and use the least autonomy that works.** Retrieval where retrieval wins, an agent only where the problem requires one, boring deterministic fundamentals for the large majority of jobs. Complexity is a cost, not a credential.

**Measure return per user and cost per approved output, never the token bill.** And be honest that durable ROI is hard right now, which is exactly why measuring it correctly, and pointing spend at the workflows where it pays, is what separates the few who get value from the many who do not.

The engine is already in your shop. Every firm has it; the engine was never the hard part. The firms that pull ahead will not be the ones who bought a more powerful model or a more autonomous one. They will be the ones who understood that the model is rented and the edge is built, who assembled the pieces themselves inside their own walls, reached for the simplest thing that worked, and measured whether it actually paid.

That is not a model you can buy. It is an operating model you have to build. And everything you need to start is already sitting there, waiting to be wired together.

---

> **One practical next step.** Take your current AI stack and sort every piece twice. First: *commodity I am renting* (models, connectors, infra) versus *edge I am building* (orchestration, validation, controls, fit). If the second bucket is empty, or worse, if you are paying a vendor to own it, that is why nothing is in production. Second: which pieces make outbound calls your compliance boundary cannot actually allow? The overlap, edge you do not own *and* things that break at your perimeter, is the exact work to bring in-house first.

---

## References

- <a id="ref-1"></a>**1. RAND Corporation** - [*Enterprise AI Adoption and Project Failure Rates in Financial Services*](https://rand.org/pubs/research_reports/RRA2680-1.html)
- <a id="ref-2"></a>**2. Hugging Face / Daya Shankar** - [*Open-Source LLM Models to Run Locally in 2026*](https://huggingface.co/blog/daya-shankar/open-source-llm-models-to-run-locally) (2026)
- <a id="ref-3"></a>**3. MindStudio** - [*Agent Harness and Scaffolding Matters More Than the Model*](https://mindstudio.ai/blog/agent-harness-scaffolding-matters-more-than-model); see also Andrej Karpathy on context engineering, X/Twitter, June 2025
- <a id="ref-4"></a>**4. EY / CloudZero** - [*Agentic AI Token Costs*](https://ey.com/en_us/insights/ai/agentic-ai-token-costs); [*Inference Cost and ROI Visibility*](https://cloudzero.com/blog/inference-cost/)
- <a id="ref-5"></a>**5. Citi Technology** - [*How Citi's CTO Is Rolling Out Gen AI Productivity Tools Across the Globe*](https://const-ins.com/how-citis-cto-is-rolling-out-new-gen-ai-productivity-tools-to-more-employees-across-the-globe/)
- <a id="ref-6"></a>**6. MIT / Fortune** - [*95% of Enterprise GenAI Pilots Failing to Show Measurable ROI*](https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/) (2025)
- <a id="ref-7"></a>**7. Snowflake / MIT Sloan** - [*How Financial Services Institutions Should Think About Unstructured Data*](https://www.snowflake.com/en/blog/financial-services-unstructured-data/); [*Tapping the Power of Unstructured Data*](https://mitsloan.mit.edu/ideas-made-to-matter/tapping-power-unstructured-data)

---

*Views are my own. For speaking, podcasts, or collaboration on AI in financial services, reach out via [htatsat.com](https://htatsat.com/).*
