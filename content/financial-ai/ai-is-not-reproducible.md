---
title: 'AI Is Not Reproducible, and That Changes How You Deploy It'
date: 2026-06-06
description: "Run the same prompt through the same model twice, at temperature zero, and you can get two different answers. That is not a bug. It is the principle that should organize every AI deployment decision an investment firm makes."
categories:
 - Opinion
draft: false
ShowToc: true
---

> *The AI Operating Manual for Investment Firms*

# AI Is Not Reproducible, and That Changes How You Deploy It

*Run the same prompt through the same model twice, with the temperature set to zero, and you can get two different answers. That is not a bug to be fixed before you deploy. It is a property of the technology, and it is the single fact that should organize how an investment firm decides where AI belongs, where it is forbidden, how complex a system to build, what to log, and when to trust a number. This is the operating model expressed as one principle: the system is probabilistic, not deterministic, so you engineer around the variance instead of pretending it away.*

---

There is a demo every vendor gives and a fact every vendor leaves out, and the gap between them is the whole subject of this essay.

The demo shows a model reading a filing, answering a question, drafting a memo, and it works. The fact left out is that if you run that exact same input again, you may get a different output, and not because anyone changed anything. The model did not learn. The document did not change. You changed nothing. And the answer came back different anyway.

Most people's instinct, on hearing this, is to treat it as a defect that better engineering will eventually remove, the way bugs get fixed. That instinct is wrong, and acting on it is how firms waste quarters. The non-determinism is not a flaw on the way to being fixed. It is, for all practical purposes, how the technology works, and the firms that get real value from AI are the ones that designed around that reality rather than waiting for it to go away.

This is the capstone of everything in this series, because it is the principle underneath all the others. The reason you start with something basic and earn your way up. The reason you set a confidence threshold and route the rest to a human. The reason you keep a person accountable at the end and log every step. The reason there are some jobs you must never hand to a probabilistic system at all. Every one of those disciplines, which the earlier essays argued one at a time, follows from a single fact: **the system gives you a distribution of answers, not the answer.** Once you internalize that, the entire operating model stops looking like a set of arbitrary rules and starts looking like the obvious response to what the technology actually is.

---

## The fact, from the vendors themselves

Here is the experiment, run by researchers at Thinking Machines Lab, the company founded by OpenAI's former chief technology officer, and published in September 2025. They took a large open model, set the temperature to zero (which is supposed to make it pick the single highest-probability word every time, the closest thing to "no randomness" the system offers), and asked it the same question, "Tell me about Richard Feynman," one thousand times. Identical model, identical settings, identical prompt, a thousand times.

They got **eighty different answers.****<u>[[1]](#ref-1)</u>** The thousand completions were word-for-word identical for the first 102 words, and then they split: 992 of them said Feynman was born in "Queens, New York," and 8 said "New York City." From there they diverged into eighty distinct responses.**<u>[[1]](#ref-1)</u>** At temperature zero. With no randomness turned on.

The reason is worth understanding, because it tells you why this will not simply be patched away. The intuitive explanation, that GPUs do math in a slightly random order and the rounding errors snowball, turns out to be mostly wrong. The real cause is subtler and more stubborn. When you send a request to a model's server, that server is simultaneously handling other people's requests, and it batches them together for efficiency. How many other requests happen to be in flight at that instant, which depends on how busy the server is, changes the size of the batch your request rides in. And because of how floating-point arithmetic works (adding the same numbers in a different order can produce a slightly different sum), a different batch size produces a slightly different numerical result, which can tip the model toward a different word, which cascades into a different answer.**<u>[[1]](#ref-1)</u>** In plain terms: **the answer you get depends on how many strangers were using the same server at the same moment.** From your seat, that is indistinguishable from randomness, and you have no control over it.

Now, the Thinking Machines researchers also showed this can be *defeated*. With careful engineering, rewriting the low-level operations so they give the same result regardless of batch size, they got all thousand runs to come back identical.**<u>[[1]](#ref-1)</u>** So it is not a law of physics. But notice the cost: their deterministic version ran the same workload in 42 to 55 seconds versus 26 seconds for the normal one, roughly half to twice as slow, and it required custom infrastructure work that no mainstream API gives you today.**<u>[[1]](#ref-1)</u>** Determinism is achievable in a controlled, self-hosted setup by people who do this deliberately. It is not what you get when you call a commercial model, and it is not free.

This is the part that should settle the argument, because you do not have to take anyone's word for it. The model providers say so themselves, in their own documentation. OpenAI added a feature for reproducibility (a `seed` parameter plus a `system_fingerprint` to track backend changes), and its own description is hedged at every turn: the system will make a "best effort" to sample deterministically, "determinism is not guaranteed," there is "a small chance that responses differ even when request parameters and system fingerprint match, due to the inherent non-determinism of our models," and the fingerprint changes whenever they update their infrastructure, which happens "a few times a year."**<u>[[2]](#ref-2)</u>** Microsoft's Azure version of the same feature is blunter still: even with the seed and fingerprint matching, "it's currently not uncommon to still observe a degree of variability in responses," and longer outputs are less deterministic than shorter ones.**<u>[[3]](#ref-3)</u>** Anthropic's documentation states plainly that "even with a temperature of 0.0, the results will not be fully deterministic."**<u>[[4]](#ref-4)</u>**

Read that again, because it is the entire foundation of this essay. The companies that build these models, in the documents they write for the engineers who depend on them, will not promise you the same answer twice. The most they offer is "mostly," "best effort," "not guaranteed." If the people who built it will not guarantee reproducibility, no vendor reselling it on top should be able to, and any pitch that implies otherwise is selling you a comfort that does not exist.

---

## One principle, not a footnote

It would be easy to file this under "interesting technical trivia" and move on. That would be a mistake, because non-determinism is not one consideration among many. It is the root cause of nearly every operating discipline this series has argued for, and seeing the connection is what turns a pile of best practices into a coherent way of thinking.

Consider what follows directly from "the system gives you a distribution, not the answer."

If the output varies, then **you cannot fully test it the way you test ordinary software.** Normal software is deterministic: give it the same input, get the same output, write a test that checks for that output, and you are done. A system that returns eighty different answers to the same input breaks that entire model of quality assurance. You cannot write "assert output equals X" when the output is a moving target. So testing has to change shape, from checking exact answers to measuring distributions of behavior, which is a different and harder discipline.

If the output varies, then **you cannot promise an examiner or an investment committee that the process is repeatable** in the way they expect a financial process to be repeatable. That collides directly with how regulated finance has always worked, and it is why there are some uses where this technology simply does not belong, a point developed below.

If the output varies, then **a single impressive demo proves almost nothing.** You watched one sample from a distribution. The next sample might be worse. This is why "it worked in the demo" is such a dangerous basis for a decision, and why the only honest way to evaluate is to run many samples and look at how they spread.

If the output varies, then **you cannot expect 100% accuracy and you should stop designing as if you could.** There is no setting that makes the system right every time, because there is no setting that makes it do the same thing every time. So the engineering question is never "how do we make it perfect." It is "what do we do about the fraction that will be wrong," which leads straight to confidence thresholds, human review, and logs.

And if the output varies, then **the sensible way to deploy it is incrementally**, proving it on something small and low-stakes before trusting it with something large and consequential, because you are managing a probabilistic tool whose failure modes you discover by watching it, not by reading its specification.

Every one of those is an operating-model principle. Every one of them is just non-determinism, followed to its conclusion. That is why this essay is the capstone: it is the single fact from which the rest of the manual can be re-derived.

> The system gives you a distribution of answers, not the answer. Engineer for the distribution.

---

## The same fact, in every use case

The reason this is the capstone and not a niche technical aside is that the distribution-not-an-answer problem shows up, in a different costume, in every place an investment firm puts AI. It is worth seeing the four big ones side by side, because each has now been measured, and together they make the case that this is one principle, not four separate problems.

**In document extraction, it looks like the chart that gets misread.** A 2026 benchmark on multimodal financial documents found vision-language models scoring a respectable 85–90% on text and tables but collapsing to roughly 34–62% on chart interpretation, and in multi-step conversational analysis an early error propagated forward and dragged accuracy toward 50% regardless of model size.**<u>[[5]](#ref-5)</u>** The variance is not evenly distributed; it concentrates in the visual and the multi-turn, which is exactly where a confident wrong number hides in a generated deck.

**In research and synthesis, it looks like context rot.** Feed a model a long stack of documents and its accuracy does not stay flat. Stanford's "Lost in the Middle" work showed that models retrieve information well from the beginning and end of a long context but sag in the middle, with accuracy on one task falling from the low-to-mid 70s into the 50s purely as a function of *where* the relevant fact sat.**<u>[[6]](#ref-6)</u>** As an agent reads more, accumulates more, and reasons over more, the signal-to-noise ratio degrades, so a longer, more thorough-looking research run can be *less* reliable than a short one. More tokens consumed is not more value; past a point it is more noise.

**In multi-step agents, it looks like compounding error.** Reliability multiplies, and it multiplies downward. Chain several agentic steps each individually 95% reliable and the end-to-end success rate falls toward the high 70s, and because each correction an agent makes adds more context and more chances to go wrong, the failure rate of a long task grows faster than its length.**<u>[[7]](#ref-7)</u>** This is why "let the agent run a complex twenty-step workflow autonomously" so often disappoints in production even when each step demos well in isolation.

**In trading, it looks like the profit mirage.** As the trading essay details, published LLM-trading agents that look profitable are frequently reciting outcomes their model absorbed in training rather than predicting anything; move them past the model's knowledge cutoff into genuinely unseen data and the returns collapse toward zero.**<u>[[8]](#ref-8)</u>** It is the same root fact, variance and the absence of a stable, reproducible mapping from input to output, expressed in the one domain where it is most expensive.

These are not four unrelated engineering quirks. They are one property of the technology, seen from four seats. And the seat does not have to be an investment desk. The same fact reaches the compliance function directly: a non-deterministic process that produces client communications, regulatory text, or AI-generated advice cannot promise an examiner that it will do the same thing twice, which is precisely why the existing rules, fiduciary duty, recordkeeping, the duty to supervise, already reach AI misuse without any new AI-specific regulation. A regulator does not need a bespoke rule to find that a firm shipped an unsubstantiated claim a probabilistic tool generated; the gap between what a firm says its AI does and what it actually does is examinable today. Governance, in other words, is not a separate topic from non-determinism. It is non-determinism viewed from the compliance seat: the reason you log everything, keep a human accountable, and can describe your process is that the process itself will not reliably repeat.

So whatever the vertical, hedge fund, RIA, private credit, the practical question is the same, and the rest of this essay is how to answer it: given that the system gives you a distribution rather than the answer, where can you tolerate the spread, where must you clamp it down, and how do you engineer around it.

---

## Discipline one: crawl, then walk, then run

Start with the deployment mistake that wastes the most time, because it is the most common and the most avoidable.

A firm decides to "do AI." It identifies the most ambitious, most valuable, most complicated use case it can imagine, an autonomous research agent, an end-to-end document pipeline, a system that touches the trade. It goes to the most sophisticated vendor, signs up for a large pilot, and spends a quarter or two discovering that the thing does not fit its data, its workflow, or its risk tolerance. The pilot fails, the budget is gone, the organization concludes "AI doesn't work for us," and the real lesson, which is that they started in the wrong place, goes unlearned.

That is not how durable adoption happens, and the reason traces straight back to non-determinism. With deterministic software, you can reason about whether a complex system will work before you build it, because its behavior is predictable. With a probabilistic system, you cannot. You learn its failure modes by running it, at small scale, on real work, and watching where it breaks. So the only sane path is to **earn complexity rather than buy it.**

The pattern, borrowed from how careful operators actually roll this out, is crawl, walk, run. **Crawl** is the smallest useful thing: one workflow, low stakes, fully reviewed, something where a wrong answer is caught and costs nothing. You are not trying to transform the firm. You are trying to learn how this specific tool behaves on your specific documents, and to get one team to actually like using it, because a tool people quietly abandon is the most expensive kind of failure. **Walk** is expansion to adjacent workflows once the first one has earned trust, with the review burden loosened only where the evidence supports it. **Run** is the ambitious, higher-autonomy system, attempted last, on the foundation of everything the crawl and walk phases taught you about where it fails.

The temptation is always to skip to run, because run is where the exciting demos live. But the demo is one draw from the distribution, and the distribution is what you have to live with. The crawl phase is how you measure the distribution before you depend on it. This is the same "start narrow, prove it on five cases you already know cold, then scale" discipline that runs through the rest of this series, and the reason it keeps recurring is that it is the correct response to a tool whose behavior you can only learn empirically.

There is a useful piece of evidence behind this beyond first principles. MIT's 2025 study of enterprise AI found that, against an estimated thirty to forty billion dollars of spending, roughly 95% of organizations saw no measurable return, and the cause was not weak models but poor integration into real workflows and spending aimed at the wrong, flashiest use cases.**<u>[[9]](#ref-9)</u>** The same study found that buying from focused vendors and partnering succeeded about 67% of the time, while building the ambitious thing internally succeeded roughly a third as often.**<u>[[9]](#ref-9)</u>** Read through the lens of this essay, that is the crawl-walk-run lesson written in money: the firms that lost their budgets are the ones that tried to run before they could crawl, and pointed the spend at the demo instead of the boring workflow that would have actually paid off.

---

## Discipline two: engineer for failure

Here is the second instinct that has to go: the expectation that the system will be right every time, and the disappointment when it is not.

It will not be right every time. Not because the model is bad, but because hallucination, the confident production of something plausible and wrong, does not go to zero. It can be pushed down, sometimes very low, but there is always a residual rate, and a system that is right 99 times out of 100 is still wrong the hundredth time, silently, in a clean and well-formatted way. In a context where that hundredth answer is a number in a client deliverable or an input to a position, "99% accurate" is not a finish line. It is a description of a failure rate you now have to manage.

This sounds like bad news. It is actually the most clarifying news in the essay, because once you accept that the system will be wrong some fraction of the time, the engineering problem becomes tractable and concrete. You stop chasing perfection and start asking three questions: *How do I know which outputs are the risky ones? What happens to them? And how do I prove, afterward, what happened?* Those three questions have real answers.

### Confidence scoring and the threshold

The first answer is the **confidence threshold**, and it is not a theory. It is a mainstream, documented practice that the serious document-extraction platforms already build around. The idea is simple: alongside each extracted value, the system produces a confidence score, a number indicating how sure it is. You set a threshold. Values above the line flow through automatically. Values below the line are flagged and routed to a human. You have not eliminated the failure rate. You have *sorted* it, so that human attention lands exactly where the risk is concentrated, instead of being spread evenly or, worse, withdrawn entirely.

The major vendors describe this explicitly. Microsoft's document-understanding service returns a confidence score between zero and one for each field, and its own documentation says to use it "to automate high-confidence results and route low-confidence results for human review."**<u>[[10]](#ref-10)</u>** Amazon's Textract returns a confidence percentage on every field it pulls.**<u>[[11]](#ref-11)</u>** A document-AI company published a case study in which a healthcare operation processing well over a hundred thousand pages a day used field-level confidence scores to route uncertain extractions to people, lifting accuracy from under 60% to over 90% while scaling up.**<u>[[12]](#ref-12)</u>** This is not exotic. It is how grown-up extraction systems work, and it is the direct operational answer to "it will never be 100%": you do not need it to be 100%, you need it to *know what it is unsure about* and hand those cases to a person.

But here is the nuance that keeps this honest, and that the hype crowd skips. **A confidence score is itself a number you have to validate, not trust on faith.** There is a well-documented problem called miscalibration: models are frequently *overconfident*, assigning high confidence to answers that are wrong. Peer-reviewed work in 2025 found that across five leading models, all of them overstated the probability that their answers were correct, by margins ranging from about 20% to 60%.**<u>[[13]](#ref-13)</u>** Worse, the direction of the error is not even consistent: one 2026 study of extraction across clinical document types found models were *underconfident* on cleanly structured forms and *overconfident* on messy free text, so the same threshold behaves differently depending on the document.**<u>[[14]](#ref-14)</u>** The practical lesson is not "ignore confidence scores," it is "calibrate them on your own documents." You measure, on a labeled set of your own data where you know the right answers, how the model's stated confidence maps to its actual accuracy, and you set the threshold from that evidence, per field, because the cost of a wrong "sample collection date" is not the cost of a wrong narrative footnote. The threshold is a risk decision, and risk decisions belong to you, not to a vendor's default.

### The logs

The second and third answers are the same thing: **the log.** If the system is non-deterministic, then the only way to understand what it did on any given day, to debug a bad output, to satisfy an examiner, or to learn from a near-miss, is to have recorded it. With deterministic software you can reproduce a problem by re-running it. With a probabilistic system you cannot, because re-running it may give you a different result, so the run you actually shipped is gone unless you captured it.

That makes logging not a compliance nicety but a structural necessity. For every consequential output, you want a record of what went in (the prompt, the documents, the parameters), what came out, what the confidence scores were, what the human reviewer changed or approved, and, where the vendor exposes it, the backend fingerprint that tells you whether the model's infrastructure changed underneath you between then and now.

![The Evidence Chain](/assets/financial-ai/R1-evidence-chain.svg)

This is the same evidence-and-control layer the rest of the series keeps returning to, and non-determinism is the reason it is non-negotiable: the log is your only durable record of a process you cannot re-run. It is also, not incidentally, exactly what the leading institutional deployments do. Man Group's published account of its AI research system describes a logging layer that captures every decision for review, precisely so that a non-reproducible process can still be audited.**<u>[[15]](#ref-15)</u>**

Put the two together and you have the complete engineering answer to "never 100%": a confidence threshold that sorts outputs by risk and routes the uncertain ones to a person, and a log that records what happened so the process is auditable even though it is not repeatable. Neither requires the technology to be perfect. Both assume it will not be.

---

## Discipline three: variance by use case

Now bring it together into the thing a firm actually needs, which is a map. Not every use case has the same tolerance for the system giving a different answer next time. Some are entirely fine with it. Some are absolutely not. Most of the confusion in deploying AI comes from treating them all the same, applying the same enthusiasm or the same caution across the board, when the right posture differs sharply from one job to the next.

The organizing question for the map is: **if this produced a slightly different output next time, would that be fine, tolerable, or unacceptable?** That single question, asked of each use case, tells you almost everything about how to deploy it: how much autonomy to grant, what confidence threshold to set, how heavy the human review should be, and what to log. The main use cases an investment firm cares about, from most tolerant of variance to least:

**Ideation and research exploration.** Brainstorming names to look at, generating hypotheses, surfacing angles you had not considered, drafting the bear case against your own thesis. This is the *most* variance-tolerant work there is, and a different answer next time is not a problem, it is arguably a *feature*, because you wanted breadth and a fresh angle. Grant high autonomy, set a low bar, keep review light, and log lightly. The whole value here is the model's willingness to range, and non-determinism is helping you. This is where AI is safest and where firms should start.

**Summarizing meeting notes and calls.** Condensing a client meeting or an internal call into notes. Tolerant of variance in *wording* (two good summaries can read differently and both be fine), but with a hard floor: it must not invent a commitment, a number, or a fact that was not said, and the moment those notes enter a client record or drive an action, they cross into territory where accuracy matters and a human should confirm the load-bearing facts. Moderate autonomy, human confirmation of anything consequential, and a log of what was generated versus what was edited. The variance in phrasing is fine; the variance in facts is not, and the review exists to police exactly that line.

**Drafting documents: memos, commentary, first-draft reports.** Generating the first version of a research memo, a piece of portfolio commentary, an investor letter. Tolerant of variance in prose, because you are going to edit it anyway and a first draft is meant to be reworked, but every *number* and every *factual claim* in it is exactly as fragile as the extraction problem the earlier essays detailed, and a fluent draft makes those errors *harder* to catch because the polish signals "finished." Moderate-to-high autonomy on the prose, strict verification on the facts, and the now-familiar rule that the draft is a starting point a human finishes and signs, never an output that ships itself.

**Extracting exact numbers from documents.** Pulling a revenue figure, a covenant threshold, a holding, a NAV from a filing or a statement. Here the tolerance for variance *collapses*. The number is either right or it is wrong, and "a slightly different answer next time" means "sometimes wrong," which is unacceptable for a value that will drive a decision. This is the use case the confidence-threshold-and-route-to-human machinery exists for, and where extraction accuracy on a hard document can reach into the high nineties but never to certainty, so you bake in the threshold, the calibration, the cell-level citation, and the abstention behavior that says "not found" instead of inventing. Low tolerance for variance, heavy verification, and the deterministic extraction-and-validation discipline this series has argued for at length elsewhere.

**Investor reporting and client communications.** Performance explanations, client-facing letters, regulated marketing. Variance in tone is survivable; variance that produces an unsubstantiated claim, a promissory phrase, or a number the firm cannot back is a regulatory exposure, not a stylistic quibble. Low tolerance, mandatory recorded human review before anything leaves the building, and the full audit trail. The regulator has already shown it will act on the gap between what a firm says and what is true, and a non-deterministic drafting tool is a machine for occasionally generating exactly that gap, which is why the review is not optional.

**Portfolio management decisions.** Allocation, sizing, risk calls. The model can inform these, compressing the path to a judgment by assembling and pressure-testing the inputs, but the judgment itself carries fiduciary weight and must rest with a person who can explain and defend it. Use AI as a research and monitoring input, not a decision-maker, and log what informed the decision. The variance is acceptable in the *inputs* because a human weighs them; it would be unacceptable in the *decision* because no one could stand behind a position that a non-reproducible process generated and no one chose.

**Trade execution and production trading models.** The far end of the gradient, where tolerance for variance reaches zero and, in important cases, where you should not use a probabilistic model in the decision loop at all. An execution system that does something slightly different each time is not a quirk; it is uncontrolled behavior touching real money under the heaviest regulatory obligations, and a production trading model that cannot reproduce its own results cannot be validated in the way the rules require. This is the subject of the next section, because it is where "engineer around the variance" gives way to "do not put the variance here in the first place."

The map is the practical heart of this essay. Notice that it is not "AI good here, AI bad there." It is a gradient of *how much structure the variance requires*, from almost none on the left to so much on the right that the honest answer becomes "use a different kind of tool." A firm that internalizes this gradient stops asking "should we use AI" as a single question and starts asking it correctly, one workflow at a time, with the deployment posture falling out of the variance tolerance rather than out of enthusiasm or fear.

---

## Where reproducibility is non-negotiable

The right edge of that map deserves its own treatment, because it is where the stakes are highest and where the temptation to over-trust the technology does the most damage.

There are three places in an investment firm where reproducibility is not a preference but a requirement, and where a non-deterministic system therefore should not sit in the decision loop.

The first is **trade execution.** When an action moves real money and cannot be taken back, "it behaved slightly differently this time" is not an acceptable property. Execution carries the heaviest market-structure obligations of anything a firm does, and the entire apparatus of pre-trade risk controls exists precisely to make execution predictable and bounded. A probabilistic agent given direct, unsupervised control of execution is uncontrolled behavior on irreversible actions, which is why even the most aggressive consumer rollouts of "AI that trades" wrap the agent in an isolated account, hard limits, and a kill switch rather than handing over the keys.

The second is **production trading and risk models**, and here the constraint is not just prudence but regulation. The Federal Reserve and the OCC's supervisory guidance on model risk management, known as SR 11-7, has since 2011 required that a model be documented in enough detail to allow **replication**, and that the production environment reproduce the development results within acceptable tolerances, with every step of the model lifecycle logged and reproducible.**<u>[[16]](#ref-16)</u>** That is, in plain language, a legal reproducibility requirement, and it collides head-on with a technology that, as the Thinking Machines evidence showed, does not reproduce its own outputs by default. The collision is real enough that the regulators themselves have noticed it: revised guidance issued in early 2026 explicitly carved generative and agentic AI *out* of scope as "novel and rapidly evolving," and signaled a forthcoming formal request for input on how to handle AI model risk.**<u>[[17]](#ref-17)</u>** The honest reading of that is not "the rules don't apply to AI"; it is "the regulators know the existing reproducibility standard and this technology do not fit together yet, and they are working on it." Until they do, a prudent firm treats anything that must satisfy model-validation reproducibility as off-limits to a free-running probabilistic model.

The third is **regulatory and compliance outputs more broadly**, anything where the firm must later demonstrate exactly how a result was produced and reproduce it on demand. A filing, a regulatory calculation, an audit response. The standard there is reconstruction, and a process you cannot re-run cannot meet it unless every instance is captured.

So what do you do in these zones, where variance is unacceptable? You do not abandon the technology. You change its *role*, and this is the most important practical move in the essay. **You use AI as a research and reasoning aid that helps a human or a deterministic system do the work, and you keep the consequential, reproducible step in deterministic hands.**

Concretely, the toolkit looks like this. For strategy and signal work, the disciplined pattern, which the more serious quant shops have converged on, is to let the language model sit on top of the classical machinery as a reasoning and interface layer (proposing ideas, reading research, explaining a portfolio in plain language) while the allocation, the risk, and the execution stay with traditional, deterministic, well-understood models, and the language model is often used *offline* to extract features from text that a robust, reproducible classical model then trades on.**<u>[[18]](#ref-18)</u>** The variance lives where it is harmless, in the reasoning and the exploration, and the reproducible models do the part that has to be reproducible. For research that will inform a regulated decision, you use the model to assemble, summarize, and pressure-test, and you keep the human judgment and the deterministic calculation as the steps of record. For anything that must be replicated for an examiner, you either keep the model out of the load-bearing path or you log every input and output so completely that you can show what happened even though you cannot re-run it.

The principle underneath all three is the same: **match reproducibility to consequence.** Where a different answer next time is fine, let the system range. Where a different answer next time is a loss, a breach, or an exam finding, either keep the probabilistic system out of that step or wrap it so completely in deterministic controls, confidence thresholds, human sign-off, and exhaustive logging that the non-reproducibility is contained. The mistake is never "using AI." The mistake is putting the variance where the firm cannot afford it.

---

## How to read vendor guidance

Since the practical task is often choosing and evaluating tools, it is worth being precise about how vendors handle this subject, because the language is a tell.

The serious ones are increasingly honest about it, and you should reward that. The document-extraction platforms that publish confidence scores and build human-in-the-loop review into the product are, in effect, telling you the truth: the output is not certain, here is the machinery for managing that. The model providers' hedged determinism documentation is, similarly, an honest signal buried in the fine print. When a vendor talks fluently about confidence thresholds, calibration, abstention, audit logs, and human review, they are describing a product built by people who understand what they are selling.

The warning signs are the opposite of that. A flat "99% accuracy" claim with no statement of *on what documents, measured how, and with what failure mode for the other 1%* is marketing, not evidence. A claim of "no hallucinations" is, given everything above, a claim that should make you more skeptical, not less. A demo offered as proof, with no offer to run a larger evaluation on your own data, is showing you one draw from a distribution and asking you to believe it is the whole distribution. And any pitch that implies the output is deterministic, that you will get the same answer every time, is contradicted by the model providers' own documentation, and the vendor either does not understand that or is hoping you do not.

The single best question to ask any vendor is therefore not "how accurate is it." It is: **"Run it on a sample of our own documents, several times, and show me how much the output varies and what the confidence scores were."** A vendor who welcomes that question is selling something real. A vendor who deflects it is selling you the demo. The variance is the truth of the technology, and a tool worth buying is one built by people who have made their peace with that and engineered for it, rather than one sold by people pretending it away.

---

## The principle, restated

Strip everything down and this essay is one fact and its consequences. The fact: run the same input through the same model twice and you can get two different answers, the providers themselves will not promise otherwise, and that is not a defect on the way to being fixed but a property of how the technology works. The consequence: you design around the variance instead of pretending it away.

Designing around it is the whole operating model, re-derived from a single principle. You **start small and earn complexity**, because you learn a probabilistic system's failure modes by running it, not by reading its specification. You **stop expecting 100% and engineer for the failure rate**, with confidence thresholds that sort outputs by risk and route the uncertain ones to a person, and confidence scores you calibrate on your own data because the model is often overconfident. You **log everything**, because the log is your only durable record of a process you cannot re-run. You **map every use case to its tolerance for variance**, granting autonomy where a different answer next time is fine and clamping down where it is a loss. And you **keep the probabilistic system out of the steps that must be reproducible**, trade execution, validated production models, regulatory outputs, using it there only as a reasoning aid on top of deterministic machinery and human judgment.

None of that is anti-AI. It is the opposite. It is how you get real, durable value out of a genuinely powerful technology without being blindsided by the one property of it that the demos never show. The firms that win with AI are not the ones that found a version that is always right. There isn't one. They are the ones that understood the technology gives a distribution rather than an answer, and built an operating model equal to that fact.

AI is not reproducible. Once you stop fighting that and start engineering for it, everything else in this manual is just the working-out of the consequences.

---

> **Practical next step.** Take one AI workflow your firm runs and do the experiment yourself: run the same input through it five or ten times and look at how much the output varies. Then ask, for that workflow, the question this essay turns on: if the output is different next time, is that fine, tolerable, or unacceptable? The answer tells you how much autonomy to grant it, what to review, and what to log, and whether you have it pointed at the right kind of job at all.

---

## References

- <a id="ref-1"></a>**1. Horace He / Thinking Machines Lab** - [*Defeating Nondeterminism in LLM Inference*](https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference/) (September 2025)
- <a id="ref-2"></a>**2. OpenAI** - [*Reproducible Outputs with the Seed Parameter*](https://cookbook.openai.com/examples/reproducible_outputs_with_the_seed_parameter) (OpenAI Cookbook)
- <a id="ref-3"></a>**3. Microsoft Learn** - [*How to Generate Reproducible Output with Azure OpenAI*](https://learn.microsoft.com/en-us/azure/ai-foundry/openai/how-to/reproducible-output) (Azure AI Foundry documentation)
- <a id="ref-4"></a>**4. Anthropic** - [*API Documentation: Temperature and Determinism*](https://docs.anthropic.com) (Anthropic API reference)
- <a id="ref-5"></a>**5. Multimodal Finance Eval** - [*When Tables Go Crazy: Evaluating Multimodal Models on Financial Documents*](https://arxiv.org/abs/2602.10384) - arXiv:2602.10384 (2026)
- <a id="ref-6"></a>**6. Liu et al. (Stanford)** - [*Lost in the Middle: How Language Models Use Long Contexts*](https://arxiv.org/abs/2307.03172) - arXiv:2307.03172 (2023)
- <a id="ref-7"></a>**7. MindStudio / Morph / Chroma** - *Compounding Error and Context Rot in Multi-Step Agents* (practitioner research syntheses, 2024–2025)
- <a id="ref-8"></a>**8. Zhu et al.** - [*Profit Mirage: Revisiting Information Leakage in LLM-based Financial Agents*](https://arxiv.org/abs/2510.07920) - arXiv:2510.07920 (2025)
- <a id="ref-9"></a>**9. MIT Project NANDA** - [*The GenAI Divide: State of AI in Business 2025*](https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo) (July 2025)
- <a id="ref-10"></a>**10. Microsoft Learn** - [*Document Analysis with Confidence, Grounding, and Labeled Samples*](https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/document/analyzer-improvement) (Azure AI Content Understanding)
- <a id="ref-11"></a>**11. Amazon Web Services** - [*Amazon Textract: Confidence Scores and Human Review Routing*](https://docs.aws.amazon.com/textract/) (AWS documentation)
- <a id="ref-12"></a>**12. LandingAI** - [*Best Document Parsing APIs 2026*](https://landing.ai/llms/best-document-parsing-apis-2026) (2026)
- <a id="ref-13"></a>**13. Overconfidence Study** - [*Large Language Models Are Overconfident and Amplify Human Bias*](https://arxiv.org/abs/2505.02151) - arXiv:2505.02151 (2025)
- <a id="ref-14"></a>**14. Shrestha & Kim (Drexel)** - [*Conformal Prediction for Risk-Controlled Medical Entity Extraction Across Clinical Domains*](https://arxiv.org/abs/2603.00924) - arXiv:2603.00924 (2026)
- <a id="ref-15"></a>**15. Man Group (Fang & Moore)** - [*What AI Can (and Can't Yet) Do for Alpha*](https://www.man.com/insights/what-ai-can-do-for-alpha) (November 2025)
- <a id="ref-16"></a>**16. Federal Reserve / OCC** - [*SR 11-7: Supervisory Guidance on Model Risk Management*](https://www.federalreserve.gov/supervisionreg/srletters/sr1107.htm) (April 2011)
- <a id="ref-17"></a>**17. Federal Reserve / OCC** - [*SR 26-02 / OCC Bulletin 2026-13: Revised Model Risk Management Guidance*](https://www.glacis.io/guide-sr-11-7) (early 2026)
- <a id="ref-18"></a>**18. Gradient Flow / Ben Lorica** - [*What's Emerging in Financial AI: Hybrid Quant Architectures*](https://gradientflow.substack.com/p/emerging-ai-patterns-in-finance-what) (January 2026)
