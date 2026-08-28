---
title: "Frequently Asked Questions"
date: 2026-08-20
---

## AI-Generated Code & Ownership

{{< faqitem q="Do I own the code an AI tool generates for me?" >}}
Most AI vendors' terms assign you whatever rights exist in the output. The problem is what exists: under current U.S. copyright law, output from purely generative AI lacks a human author and therefore **cannot be copyrighted**. You may hold the code, but there may be no copyright in it to own.
{{< /faqitem >}}

{{< faqitem q="Does writing detailed prompts make me the author?" >}}
Prompts guide the system, but typically lack the **determinism and creative specificity** required to establish human authorship under copyright law.
{{< /faqitem >}}

{{< faqitem q="Can I copyright AI-generated code?" >}}
Only the portions created or significantly modified by a human author qualify. Pure AI output cannot be copyrighted.
{{< /faqitem >}}

{{< faqitem q="But I paid for it. Doesn't that make it mine?" >}}
No. Payment is irrelevant to copyright ownership. Ownership follows authorship: work created by an employee within the scope of employment belongs to the employer as a work made for hire, and anyone else who writes code keeps the copyright unless they sign a written assignment. The development shop you pay $250,000 to build your application still owns the copyright in that code unless the contract assigns it to you in writing, and the same is true of a freelancer you pay by the hour. AI-generated code adds a second problem: there is no author at all, so there is no copyright for anyone to assign to you, no matter what you paid for the tool or the prompts.
{{< /faqitem >}}

{{< faqitem q="Can I monetize AI-generated code even if I don't own it?" >}}
Yes, but ownership uncertainty significantly increases risk in licensing, fundraising, enforcement, and exits. Without clear ownership, you cannot create or defend a **lawful monopoly** over your software, allowing competitors to copy it with impunity and leaving the company with revenue but no defensible asset to protect or sell.
{{< /faqitem >}}

## Vibe Coding & AI Assistance

{{< faqitem q="What is “vibe coding”?" >}}
“Vibe coding” refers to prompting an AI to generate large amounts of functional code with minimal human design, structure, or revision.
{{< /faqitem >}}

{{< faqitem q="Why is vibe coding risky from an ownership perspective?" >}}
Because the AI, not the human, is doing the expressive work. Under current law, vibe-coded output is **not human-authored** and therefore **not a legally protectable asset**.
{{< /faqitem >}}

{{< faqitem q="Is an AI prompt processed by a large language model equivalent to source code compiled by a traditional compiler?" >}}
No. Compilers deterministically preserve human authorship by transforming source code into another form. Generative AI systems are non-deterministic and generate new expression, severing the one-to-one link required for copyright protection.
{{< /faqitem >}}

## Human Authorship & Mixed Codebases

{{< faqitem q="If I edit or refine AI output, do I become the author?" >}}
Possibly. Meaningful human revision, selection, restructuring, or creative judgment may establish authorship.
{{< /faqitem >}}

{{< faqitem q="How much human input is “enough”?" >}}
There is no bright-line rule. The U.S. Copyright Office makes this determination initially at registration, and its refusals can be challenged in court, which is precisely what cases like *Allen v. Perlmutter* are testing. Courts look for creative contribution and judgment, not just the volume of edits. In practice, the issue is typically resolved only if and when authorship is tested in litigation, where prompt history, revision records, and other AI usage artifacts may be examined or compelled through discovery or subpoena. Because this analysis is highly fact-specific, [our workshops](https://whoownsthecode.com/workshops) cover how to evaluate authorship risk before it is tested in court.
{{< /faqitem >}}

{{< faqitem q="Does refactoring or rewriting AI code make it mine?" >}}
Not automatically. Deterministic or mechanical changes (such as simple transcription or formatting) are insufficient. Authorship may arise only where refactoring reflects independent creative decisions.
{{< /faqitem >}}

{{< faqitem q="Can I fix it by having a human retype the AI output, or by publishing it?" >}}
No. Retyping, re-entering, reformatting, or running AI output through another tool is mechanical work, not creative judgment, so the result is still the AI's expression with no human author. Publishing it does not help either: posting code to GitHub, a website, or social media fixes it in a tangible medium, but fixation only creates a copyright when a human authored what was fixed. Laundering the output through a person or a platform does not solve the authorship problem.
{{< /faqitem >}}

{{< faqitem q="Can I combine AI-generated and human-written code and own all of it?" >}}
You own what *you* create. AI-generated portions remain unowned unless replaced or transformed through human authorship.
{{< /faqitem >}}

## Open Source, Licensing & Compliance

{{< faqitem q="Can I apply MIT, GPL, or other licenses to AI-generated code?" >}}
Applying an open-source license requires copyright ownership. Because pure AI output has no copyright holder, any open-source license applied to that portion would be legally ineffective and unenforceable.
{{< /faqitem >}}

{{< faqitem q="What if AI generates code similar to open-source material?" >}}
Similarity can still trigger licensing obligations or infringement risk, especially with [copyleft](https://en.wikipedia.org/wiki/Copyleft) licenses, and can retroactively undermine your IP position, turning what you believed was proprietary software into an enforceable obligation to share it. These issues often surface late and are expensive to unwind; identifying open-source exposure before audits or exits is a core topic in [our workshops](https://whoownsthecode.com/workshops).
{{< /faqitem >}}

{{< faqitem q="Can derivative works based on publicly available code be copyrighted?" >}}
Yes, but only the new, human-created portions qualify for protection, and the underlying code's license still governs your use of it. This principle long predates AI, and AI does not change the rule. It only makes violations easier to create and harder to detect.
{{< /faqitem >}}

{{< faqitem q="Does AI usage violate open-source terms?" >}}
Not inherently, but unmanaged mixing of sources can silently violate open-source obligations, forcing disclosure or redistribution of proprietary code and surfacing only when an audit, lawsuit, or acquisition makes the problem impossible to ignore.
{{< /faqitem >}}

## Employment, Contractors & Work-for-Hire

{{< faqitem q="If an employee uses AI, does the company own the code?" >}}
The company owns the human-authored portions via work-for-hire, but it cannot assert ownership over purely AI-generated sections. As a result, parts of a company’s core product may be legally unowned and unenforceable, creating ownership gaps that often surface only during litigation, audits, or an attempted exit.
{{< /faqitem >}}

{{< faqitem q="What if a contractor uses AI to deliver code?" >}}
Ownership of AI-generated portions may not transfer unless contracts explicitly address AI usage, authorship, and IP allocation. This can leave critical components of your software legally outside the company’s control, with no clear right to enforce, license, or transfer, issues that are often discovered only during diligence or dispute. [Our workshops](https://whoownsthecode.com/workshops) cover how to structure these agreements **before the gaps become irreversible**.
{{< /faqitem >}}

{{< faqitem q="Should contracts address AI usage?" >}}
Yes. Modern agreements should clearly define permitted AI use, authorship expectations, ownership, and documentation requirements. These provisions are best developed with an experienced IP attorney who knows which questions to ask, rather than relying on AI-generated contract language that may omit or misallocate critical rights, often discovered only after a dispute arises.
{{< /faqitem >}}

## Contracts, Warranties & Insurance

{{< faqitem q="Can I sign a customer contract warranting that I own the code?" >}}
Nearly every software license contains a **warranty of title**: the licensor represents that it has good right, title, and interest in the software sufficient to grant the license. If part of your product is purely AI-generated, you cannot truthfully give that warranty for that part. Signing anyway does not make the problem go away; it converts an ownership gap into a misrepresentation and a breach of contract waiting to be discovered. Government contracts typically add an accuracy warranty on top of that.
{{< /faqitem >}}

{{< faqitem q="What about warranting accuracy or indemnifying my customers?" >}}
Sophisticated customers will not license software without **indemnification**: if they get sued for using your code, you defend them. They will also ask you to warrant that the deliverables are accurate and fit for purpose. With AI-generated code whose provenance you cannot trace, you are underwriting infringement and accuracy risk you cannot see. Many companies sign these clauses anyway because "everyone does it," which is exactly how the exposure stays hidden until a claim arrives.
{{< /faqitem >}}

{{< faqitem q="Will my AI vendor indemnify me if I get sued over its output?" >}}
Read the terms. Consumer and individual plans generally disclaim liability for what the model produces. Some enterprise and business tiers now offer limited copyright indemnities, usually conditioned on using the paid plan, leaving the vendor's safety filters on, not modifying the output, and other requirements. Even where it exists, vendor indemnity covers a lawsuit; it does not make the output yours, and it does not satisfy a customer's warranty of title. The [assessment](https://whoownsthecode.com/assessment) asks about your tool tier for this reason.
{{< /faqitem >}}

{{< faqitem q="Could prompting an AI tool violate my NDAs?" >}}
Yes. Most companies are party to far more confidentiality agreements than anyone can keep in their head, and pasting a counterparty's confidential information, or your own trade secrets, into an AI tool can breach those agreements and can jeopardize trade-secret status. Consumer tools may also use inputs for training. A written prompting policy that says what may and may not go into an AI tool is a basic control, and the [assessment](https://whoownsthecode.com/assessment) asks whether you have one.
{{< /faqitem >}}

{{< faqitem q="Does my liability insurance cover AI-related claims?" >}}
Maybe not. General liability, E&O, and cyber policies increasingly carry explicit AI exclusions, and they tend to sit deep in the exclusions section where no one reads them. Before you rely on coverage for an infringement, hallucination, or disclosure claim involving AI-generated code, read the exclusions and ask your broker directly.
{{< /faqitem >}}

{{< faqitem q="Can I use my code as collateral for a loan?" >}}
Lenders routinely take a security interest in all of a borrower's assets, including **general intangibles** such as copyrights and code, and the loan documents have you represent that you own them. If a material part of your codebase is unowned AI output, that representation is inaccurate, and when the lender finds out, you are in breach of your loan covenants.
{{< /faqitem >}}

## Patents, Disclosure & Other Law

{{< faqitem q="If copyright won't protect AI output, can I patent it instead?" >}}
Not if the AI did the inventing. In *Thaler v. Vidal*, the Federal Circuit held that an inventor under the Patent Act must be a natural person, and the Supreme Court declined to review that decision. USPTO guidance allows patents on AI-assisted inventions, but only where a human made a significant inventive contribution to each claim. Submitting an invention that an AI conceived, and naming a human as the inventor, risks invalidating the patent later. So for purely AI-generated work, copyright says no and patent says no. See the [Resources](https://whoownsthecode.com/resources) page.
{{< /faqitem >}}

{{< faqitem q="Can putting an invention into an AI prompt hurt my patent or trade-secret rights?" >}}
It can. You typically have no confidentiality agreement with the AI vendor, so describing an invention in a prompt may be treated as a disclosure outside your control. That can undermine trade-secret protection and, depending on the tool's terms and the jurisdiction, may start the clock on patent filing deadlines. If an idea might be patentable, talk to patent counsel before describing it to an AI tool.
{{< /faqitem >}}

{{< faqitem q="Do I have to disclose that I used AI?" >}}
Increasingly, yes. A growing body of law targets disclosure rather than prohibition: the EU AI Act's transparency obligations, California's AI Transparency Act, Utah's AI Policy Act, and a growing number of other state laws, including several in Idaho. Most of these focus on consumer-facing AI content and interactions rather than internal code generation, but the direction is clear. Beyond legal obligations, buyers, investors, and customers are asking the question directly, and a product that cannot carry the normal warranties may need to disclose why.
{{< /faqitem >}}

## Investment, Audits & Exit Strategy

{{< faqitem q="Why do investors ask “Who owns the code?”" >}}
Clear ownership is required to enforce rights, defend against competitors, and justify valuation. Without legally enforceable ownership, an investor is being asked to fund a business whose core asset may not be protectable, transferable, or owned at all.
{{< /faqitem >}}

{{< faqitem q="Does AI-generated code reduce valuation?" >}}
It can. Unowned or unenforceable assets weaken competitive barriers and increase diligence risk. Investors routinely reduce valuation or abandon transactions when a company cannot demonstrate clear ownership of its core technology.
{{< /faqitem >}}

{{< faqitem q="What must I disclose during due diligence?" >}}
AI usage, code provenance, and where demonstrable human authorship exists. Undisclosed or poorly documented AI involvement often surfaces during diligence, triggering valuation reductions, indemnities, escrow holdbacks, or transaction termination, each of which can carry significant monetary consequences. In the event of a dispute, these disclosures may be examined under oath and compared against actual prompt history and other contemporaneous records, including those compelled through discovery or subpoena.
{{< /faqitem >}}

{{< faqitem q="How do I prepare for an audit of AI-generated software?" >}}
Maintain prompts, revision history, commit logs, design documents, and evidence of human decision-making. Audit preparation is often where undocumented AI usage is first uncovered. Building defensible documentation practices before diligence begins is covered in depth in [our workshops](https://whoownsthecode.com/workshops).
{{< /faqitem >}}

{{< faqitem q="If customers are paying us, why does ownership still matter?" >}}
Revenue does not create ownership. Without enforceable intellectual property rights, you do not possess a lawful monopoly over your software, meaning competitors may legally copy it without consequence. Customer payments confer no exclusivity, no barrier to entry, and no defense against replication. First-mover advantage is temporary; only ownership creates durable control, defensible value, and an asset that can be enforced, licensed, or sold. Without it, revenue exists, but the company does not own what it is selling.
{{< /faqitem >}}

## Risk Management & Development Best Practices

{{< faqitem q="Isn't copyright irrelevant now that anyone can regenerate the code with AI?" >}}
No. Copyright still gives a software company four things nothing else does. A **lawful monopoly**: the right to stop others from copying and using your code, stronger in practice than patent protection for source code. **Statutory damages and attorney's fees**: available in copyright cases if you registered on time, and in almost no other body of law. **DMCA takedowns**: the ability to have infringing code removed from GitHub or any other platform without a lawyer or a courtroom. **International reach**: the same protection in the more than 180 countries of the Berne Convention. Walk away from copyright because "it's faster and cheaper to let the AI write it," and you walk away from every tool you would use to stop downstream theft and to monetize the asset.
{{< /faqitem >}}

{{< faqitem q="How do I actually protect the code my humans write?" >}}
Copyright exists the moment a human fixes the code in a tangible medium, but since 2019 you cannot file an infringement suit in the U.S. without a **registration** from the Copyright Office, and you only get statutory damages and attorney's fees if you registered before the infringement began or within three months of first publication. Registration costs about $65 per work. The practical rule: register human-authored code early, well before it ships, and keep the records (commit history, design documents, who wrote what) that prove a human authored it. A © notice is fine to include, but it is not registration and it confers nothing by itself.
{{< /faqitem >}}

{{< faqitem q="Can engineers still use AI safely?" >}}
Yes, when AI is used intentionally and with an understanding of ownership implications. AI should assist, not replace, human design, judgment, and authorship, particularly in critical code paths. Teams should adopt clear usage guidelines and maintain documentation showing meaningful human review and decision-making. When used this way, AI can accelerate development without undermining ownership or defensibility.
{{< /faqitem >}}

{{< faqitem q="Where is the boundary between AI assistance and authorship?" >}}
There is no bright-line rule. Authorship exists when a human exercises independent creative judgment by conceptualizing the solution, selecting among alternatives, and structuring or materially rewriting the code in a non-trivial way. Courts evaluate authorship qualitatively, based on creative contribution rather than the amount of AI involvement. This analysis is highly fact-specific.
{{< /faqitem >}}

{{< faqitem q="What risks arise if AI creates critical code paths?" >}}
Reliance on AI for critical functionality can result in code that is legally unowned or unenforceable, weakening your ability to exclude competitors or defend the software as a proprietary asset. This may increase exposure to infringement, open-source compliance, and diligence risk, often surfacing only during audits, litigation, or an attempted transaction.
{{< /faqitem >}}

{{< faqitem q="How should teams document AI usage?" >}}
Documentation is critical to establishing ownership, defensibility, and audit readiness. Teams should retain records of AI prompts, generated outputs, revisions, and the human decisions that shaped the final code. This provenance supports compliance, valuation, and enforcement, and should be maintained with the expectation that it may be discoverable in litigation or subject to subpoena, just like email, chat logs, or source control history.
{{< /faqitem >}}

---

*This FAQ reflects current U.S. copyright law and general international principles. It is provided for educational purposes and does not constitute legal advice.*
