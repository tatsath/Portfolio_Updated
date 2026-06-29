---
title: "Open Source, With Control"
date: 2026-06-28
description: "Should safety be decentralized? The case for democratizing the guardrails, and the model-level understanding, that today sit with a few labs ,  and what it means for high-stakes sectors like finance."
categories:
 - Opinion
draft: false
ShowToc: true
---

# Open Source, With Control

There is an endless online debate about open versus closed source. So, a disclaimer first: this is my view, based on my own experience working with AI inside a regulated industry. It is not in anyone's favor, just a logical take of my own. It may have flaws. I am making it anyway.

The debate is real, and both sides are serious. One camp warns that the real danger is concentration: if the most capable models, and the economic and strategic power they confer, end up held by a few companies or governments, that itself is a systemic risk, and open weights are the check on it. The other camp warns that some capabilities are dangerous enough that releasing them widely hands real uplift to bad actors, and that once weights are public, nothing can be pulled back. Both can be true at once. **What matters is what you do about it.**

The honest answer is not "release everything" or "let one lab or one state decide." The better path is harder: visible safeguards and refusals, auditable fallback, independent evaluation, the ability to look inside the model, and an open ecosystem treated as part of safety, not its enemy. And here is the deeper point. Today safety is, in effect, vendor-operated. The strongest guardrails, and the understanding of what a model is doing inside, sit with a handful of labs, and that knowledge barely reaches industry ,  regulated industry least of all. It does not have to be that way. The more people who can study, check, and operate the safety of these models, the safer the field gets.

---

## Can the safeguards be rebuilt on open models?

The worry is that closed models carry safety controls open ones cannot. So look at how that safety actually works. Much of it is a classifier layer that sits around the model, not inside the weights. Constitutional classifiers are the clearest example **[[1]](#ref-1)**: you write a constitution, a plain-language list of what is allowed and what is not, use it to generate synthetic examples of safe and unsafe exchanges, and train two small classifiers, one on the input and one on the output, to flag and block anything that crosses the line. Some deployments add routing on top, handing flagged categories to a safer fallback model instead of answering. Either way, the safeguard is largely separable from the model.

My view: nothing in that recipe needs the weights to be closed. An organization can write its own constitution, its own policies and regulatory red lines, generate its own synthetic data, and train its own input and output classifiers around an open model. That is the part most worth democratizing, because the rules a bank needs are not the rules a consumer app needs, and only the bank can write them.

![Figure 1: Screenshot from the Anthropic Constitutional Classifiers paper ,  a written constitution generates synthetic safe and unsafe examples used to train input and output classifiers](/assets/ai-interpretability/open-closed-fig-anthropic.webp)

*Figure 1. Screenshot from the [Anthropic Constitutional Classifiers paper](https://www.anthropic.com/research/constitutional-classifiers) (arXiv:2501.18837) ,  how a written constitution becomes a working safety classifier.* **[[1]](#ref-1)**

And the tooling is no longer scarce. Every major cloud already ships guardrails: AWS Bedrock Guardrails, Azure AI Content Safety, Google Cloud Model Armor. **[[2]](#ref-2)** And there are strong open, self-hostable equivalents: Llama Guard, ShieldGemma, Granite Guardian, and frameworks like NeMo Guardrails. **[[3]](#ref-3)** **[[4]](#ref-4)** It helps to see safety as living at two levels: inside the model, through alignment and targeted safety fine-tuning, and around it, through the classifier and guardrail layer. Both are available on an open model. So much of this is already standard on managed and closed platforms that there is no technical reason it cannot be assembled around open weights. Wrap an open model in these guards, fine-tune for the lines you care about, layer in your own constitution, and you have the same shape of safety, with one advantage: you choose it, and you can see it.

This is not theoretical, and it is moving fast. Both leading labs have now described the same architecture. In OpenAI's monitor design for its GPT-5.6 preview, a fast first-tier classifier, some versions reading the model's own activations, flags whether a request touches a sensitive domain, then escalates anything flagged to a second-tier safety reasoner that checks it against a threat taxonomy and blocks high-risk responses. **[[8]](#ref-8)** Anthropic describes a close parallel: a set of classifiers that detect misuse and route flagged categories, such as cybersecurity, biology, and chemistry, to a safer fallback model instead of answering. **[[9]](#ref-9)** Two labs, the same shape: a cheap screen, then escalation to a stronger check. That is an engineering pattern, not a trade secret. The hard and valuable part is the threat taxonomy and the policies behind it, which an organization can write for its own domain.

![Figure 2: Screenshot from the OpenAI GPT-5.6 Preview System Card ,  the two-tier monitor design: a fast topical or activation classifier that escalates flagged content to a specially trained safety reasoner](/assets/ai-interpretability/open-closed-fig-openai.webp)

*Figure 2. Screenshot from the [OpenAI GPT-5.6 Preview System Card](https://deploymentsafety.openai.com/gpt-5-6-preview) ,  two tiers: a fast classifier that reads the model's signals, then a safety reasoner that makes the call.* **[[8]](#ref-8)**

One honest caveat sharpens the case rather than weakening it. The strongest version of this, reading the model's internal activations, is only possible if you self-host an open-weight model. A closed API gives you the prompt, the output, and perhaps a moderation score, but never the activations themselves. So the very signal the frontier is moving toward is available only to those who run the weights. Open weights are not the obstacle to this kind of safety. They are the precondition for it.

I do not want to oversell this. No single guard is perfect or enough on its own; they miss things, and for a regulated workload you still need an independent audit layer on top. Even the strongest closed classifiers were not unbreakable. Both labs even note that theirs are deliberately tuned to be over-cautious and still fire on plenty of benign requests, a sign that this is iterative work, not a solved problem. And there is a deeper gap. A classifier tells you a request looks unsafe; it does not tell you what the model is doing inside, or whether the safety has been quietly bypassed or fine-tuned away. That understanding of the internals is where the field is still stuck, and it is the part most worth investing in.

---

## Finance, and why I looked inside

In finance, explanation was never optional. Decline a loan with a model and you owe a reason; a number has a reason code. Generative AI is different. The output is a memo, a recommendation, an action, not a number, and some will say explanation matters less when you are only generating text. In low-stakes work, maybe. But the high-stakes cases are where this bites. The text starts a decision: a memo a banker relies on, a summary that moves a trade, an agent that acts. And when a regulator knocks, you cannot point upstream and say the provider's model said so. The accountability is yours.

So what can you do? Look inside. In my paper, *Beyond the Black Box* **[[7]](#ref-7)**, I put a simple conditional check on hallucination by reading the model's internals. Using sparse autoencoders, I found the features that represent real financial concepts, and when those features went too quiet on an output, the model was likely drifting from grounded content, so I triggered retrieval to anchor the answer in actual filings before trusting it. I did not stop there. I used the same reading of the internals for sentiment, judging tone from the features that actually carry it rather than from the surface words, and to inform the signals I built and trained on.

It is the same move the safety question needs: find the concepts inside the model, watch them, and turn what is happening inside into a control, one you can run before the model acts, not only after. Make the knowledge of the internals usable, for reliability and for safety alike.

<img src="/assets/ai-interpretability/open-closed-fig-look-inside.png" alt="Figure 3: Read the model's internal financial features; if they go quiet, ground the answer in filings before trusting it" style="max-width: 50%; display: block; margin: 1rem auto;" />

*Figure 3. A check you can run before the model acts, not only after. Source: [Beyond the Black Box](https://arxiv.org/abs/2505.24650) (arXiv:2505.24650).* **[[7]](#ref-7)**

My method is a simple, early start, not a finished answer. But it is a real start, and a feasible direction for organizations, which is what I am targeting.

---

## And if a bad actor tampers with a powerful open model?

The hardest question. Once weights are out, safety can be fine-tuned away with no recall, and this has already happened. WormGPT and FraudGPT were uncensored chatbots that criminals built by stripping the safety from open models, WormGPT on the open GPT-J model, then sold on underground forums to mass-produce phishing emails, business email compromise, and malware. **[[10]](#ref-10)** A related case, PoisonGPT, showed that a tampered open model could be uploaded to a public model hub and pass standard checks while quietly spreading false information. None of these were hypotheticals.

The answer is layered. Do not open everything: gate the genuinely dangerous capabilities, real bio, chemical, or serious cyber uplift, model by model. Ask the right question: not "could this be misused," but whether opening it raises risk above what a bad actor can already do today, which for most models, finance included, is little. **[[6]](#ref-6)** Make safety harder to remove: tamper-resistant methods now survive hundreds of fine-tuning steps while still allowing honest fine-tuning. **[[5]](#ref-5)** And use the internals to verify whether the safety still holds. None of this is complete, and a determined attacker is hard for anyone. But the extremes are the easy answers. The real one is tiered release, marginal-risk thinking, tamper-resistant safeguards, and the same looking-inside that runs through all of it.

---

## Where this leaves us

So here is my view, and I might be wrong. The fight over open versus closed is the wrong fight. The real question is whether we can put real, visible, checkable safety around the models we use, and whether that safety can be democratic rather than held by a few.

The shape that follows is hybrid, and it pairs naturally with democratized safety: open models, wrapped in guardrails and internal checks that you build and can see, for the work where privacy and scrutiny matter most, such as lending, compliance, or anything a regulator will examine; and closed frontier models where you only need raw capability, such as broad research or drafting.

On the evidence, the guardrail layer is feasible today, a genuine start for any organization willing to write its rules and do the work. The harder and more important frontier is learning to read the model itself, because in a high-stakes domain like finance a guardrail at the door is not enough. When a regulator knocks, you have to show what the model did and why, and that means turning the internals into controls. That is why interpretability is not a research luxury here. It is the thing that makes open models trustworthy enough to use where it matters most. It is difficult, and it takes real effort, but it is the direction worth taking.

Open source, with control. In regulated industries, the systems that earn trust will not be the most impressive ones. They will be the ones we can open.

---

## References

- <a id="ref-1"></a>**1. Anthropic** - [*Constitutional Classifiers*](https://www.anthropic.com/research/constitutional-classifiers) (2025) ,  arXiv:2501.18837
- <a id="ref-2"></a>**2. Cloud provider guardrails** - AWS Bedrock Guardrails; Azure AI Content Safety; Google Cloud Model Armor
- <a id="ref-3"></a>**3.** Inan et al., Meta AI - [*Llama Guard*](https://arxiv.org/abs/2312.06674) (2023) ,  arXiv:2312.06674; ShieldGemma, Google (2024); Granite Guardian, IBM (2024)
- <a id="ref-4"></a>**4. NVIDIA** - [*NeMo Guardrails*](https://github.com/NVIDIA/NeMo-Guardrails); LlamaFirewall, Meta AI
- <a id="ref-5"></a>**5.** Tamirisa et al. - [*Tamper-Resistant Safeguards for Open-Weight LLMs*](https://arxiv.org/abs/2408.00761) (2024) ,  arXiv:2408.00761
- <a id="ref-6"></a>**6.** Kapoor, Bommasani et al. - [*On the Societal Impact of Open Foundation Models*](https://arxiv.org/abs/2403.07918) (2024) ,  arXiv:2403.07918
- <a id="ref-7"></a>**7.** Tatsat and Shater - [*Beyond the Black Box: Interpretability of LLMs in Finance*](https://arxiv.org/abs/2505.24650) ,  arXiv:2505.24650
- <a id="ref-8"></a>**8. OpenAI** - [*GPT-5.6 Preview System Card*](https://deploymentsafety.openai.com/gpt-5-6-preview) (June 2026)
- <a id="ref-9"></a>**9. Anthropic** - [*Claude Fable 5 and Claude Mythos 5*](https://www.anthropic.com/news/claude-fable-5-mythos-5) (June 2026)
- <a id="ref-10"></a>**10.** SlashNext Security Research - WormGPT and FraudGPT: uncensored models built on GPT-J and sold on underground forums; PoisonGPT: tampered open model that passed standard safety checks (2023)

---

*Views are my own. For speaking, podcasts, or collaboration on interpretability and high-stakes AI, reach out via [htatsat.com](https://htatsat.com/).*
