---
title: "Who Owns the Code? (AI Edition)"
subtitle: "Transcript of the Syringa Networks dinner presentation, Boise, August 2026. Richard Hundhausen and Bradlee Frazer."
date: 2026-09-12
url: /presentations/transcripts/syringa-networks-dinner/
---
*Lightly edited from the recording. Filler, false starts, and repeated phrases were trimmed and speech-to-text errors corrected. The wording is otherwise as spoken. Audience remarks that could not be recovered are marked [inaudible] or [crosstalk]. Back to [Presentations](/presentations/).*

### Introduction

**Host:** I'd like to introduce Brad and Richard. Brad is with Hawley Troxell. He runs their Internet practice group. And Richard is a software developer, architect, consultant. What company are you with now?

**Richard:** It's called Accentient.

**Host:** Accentient. So we're talking through that today. This conversation is really something that sits outside and on top of the technology decisions you guys make every day. This is going to take us more down into governance and how the business is structured to take advantage of AI, especially for those of you that are looking at developing code internally. And we have a lot of those conversations happening across the marketplace today.

So this is actually a precursor to what they're going to talk about tomorrow. If you're going to Interface tomorrow, please go see them, because you're going to want to have the conversations continue. We're really excited to set up the conversation around AI and how we run through the governance and how we protect IP. That's a big thing that's happening right now. I'm really, really excited to set up the speakers tonight, and hopefully you guys get a tremendous amount of new knowledge around how you're approaching things inside of your own organization today.

So with that being said, I'm going to turn it over to Richard.

### Part one: Richard Hundhausen

#### Who I am and why we do this talk

**Richard:** Thank you. Hey everyone, good evening. My name is Richard Hundhausen.

I've been a software developer my entire life, since before there were really personal computers. I was on the TRS-80s learning how to program. And then I kind of sold out to Microsoft in the '90s and the 2000s. And then I started getting into the process, and SDLC, and DevOps after that. And like everyone else, AI came out of nowhere and just changed everything.

So as a software developer, you have to adopt AI. You have to use agentic, because otherwise you're useless. I always tell people, you know, AI is not going to take your software development job, but the software developer who knows how to use AI will.

My relationship with Brad goes back, I think, about 15, 16 years ago. We used to run the Boise Code Camp here in town at Boise State, and Brad did a talk on "Who Owns the Code." This was 10, 15 years before AI, so it was all about contracts and work for hire, and if someone writes the code and the agreement's not set up a certain way, they still own the code even if we paid them for it.

Well, two years ago I said, hey, we should revisit that talk now that AI is everywhere, because people are having AI write the code, and that's not a human. So we've got the Who Owns the Code website. This is, I think, our seventh or eighth talk we've done to groups, podcasts, webinars, and it evolves every time. You know, we get a lot of questions that we think about as FAQs, and we put them on the website. There's an assessment on our website. You can go and you can see what kind of persona you are. We've identified 18 personas. Some are higher risk for inbound: copyright issues, theft issues, using someone else's code. Some are more risk outbound: if you're writing code and selling it to other people, or building a product and selling it, there might be more outbound risk depending on what persona you are.

#### Live demo: building Battleship with Claude

What I'm going to do is put the microphone down now and just show you, if you've not seen this before, what I'm talking about.

So, I want to create a product that's going to sell. Like all of us, right? Everyone wants to create a product that's going to sell. And I'm thinking about, you know, creating a Battleship web-based game based on the original board game. [crosstalk] Not that there are so many out there that it would get confused. How many people would buy this for $9.95 a month?

And I want it to be a good answer. So I'm going to go with Fable, the Mythos-level model, and just see what it thinks. This is your best assistant ever. You can ask your questions, you can ask for advice, you can have it do research. You can have it think low or high on the effort it puts into these responses. And you'll be surprised at what it comes back with. You know, it goes out there and you can do market research. It can identify the personas of who might be using your product. [reading the response] So we are still thinking about it. Oh, sorry, Hasbro, I guess. So, okay, yeah, great, $45 purchase. Okay, great.

> **Editor's note:** The demo intentionally sidesteps a separate issue the talk does not cover: BATTLESHIP is a trademarked Hasbro property, and shipping a commercial clone would raise trademark and trade-dress questions independent of the copyright analysis discussed tonight.

I do a lot of product management coaching, product ownership training, and part of what we want product owners to do is to not just start with this giant backlog of things to do, but: what's the vision? And what's our first goal to get to that vision? And then we can start thinking about what's in the backlog to get to that goal. I don't have time for all that. But let's just wave my hands and say that we've got a good vision here. We've got a good goal. We've identified our personas. And now we want to go and create this.

So, for the sake of time, I'm actually going to just pull it up. I already had it. "Write a prompt for Claude Code to build a no-dependency HTML/JavaScript game, player versus computer, faithful to the original board game." I'm going to use the Opus model, and I'm going to do a low effort so it doesn't take 15 minutes. It should only take two minutes, especially since I told it to take two minutes.

So in here, let me just close this down and do a new terminal. There's a lot of ways to get at your AI. I really like just running it in the command line interface inside Visual Studio Code. Anybody here use VS Code? This is not my normal room of software developers, but good. Thank you for the hand over here.

So I'm going to fire up Claude. I'm going to use the Opus model. I'm going to go with low effort. I'm using the Max plan, I spend $100 a month. I should have enough tokens for this evening. I don't think I've used them up today, but I don't think so.

<!-- REVIEW (pre-publish): Richard's "$100 a month" Max plan spend. Confirm Richard wants this in print. -->

I'm going to do a prompt. I'm just going to take this prompt and pass it over here to the desktop, because I'm so lazy. I got the idea, I want to be done with it. So I just put these two sentences together here. I say, "Hey Claude Fable." I always ask the higher models about these questions: the planning, the thinking, the designing. And then I'll hand it off to a lower-level, cheaper model to actually do the work.

So I've got the font kind of jacked up here so it's somewhat readable. But it's built a complete Battleship game, single file, all the bullets. This is basically a spec. So I can take this spec.

Now I'm going to just mention this, because years ago we had this approach with something called waterfall. I've heard of this term. Let's go and think about it, come up with these designs and the plans, and then the developer spends six months in a dark hole somewhere, sliding pieces under the doors. And then it gets released a year later, and then it's not what they wanted, or they missed the opportunity or whatever, because it took a year to get it out the door. So we want the agile, Scrum, sprints, shorter iterations, deliver what they want quicker. That's all good stuff.

Now with AI, the development cost, the time frame, is no longer the critical piece, so we can go back to specs up front, and we can afford to build it, rebuild it, re-rebuild it, all in an afternoon, assuming we've got the tokens and the patience. So having these sort of big documents up front, BDUF I used to call it, is just how it's done.

So I'm just going to paste this into Claude Code, 27 lines. I'm going to let it rip. I should have let it rip while I was talking to you about waterfall.

Okay. And it's always fun to see the words it's using: "shenanigans," you know, it's kind of fun. But anybody here using Claude these days? Just show of hands: Claude? Show of hands: something else you're using, GitHub Copilot, or just Copilot, or OpenAI? They kind of all just morphed together, doesn't it? Yeah, they're all using each other's models. Is there any one here you don't like, that you gave up on for a good reason?

**Audience:** Copilot.

**Richard:** What, Copilot? Like just straight up Copilot? Microsoft 365 Copilot, Windows Copilot, or Office Copilot? I think they just combined them all into one. Have you ever seen the graphic of all the different Copilot names? It's literally a wheel and there's probably 60 of them.

So, for the sake of time, this is going to crank out a really cool Battleship game. It's actually right here, from a little while ago. It's going to build me a JavaScript, styles, HTML. I can bring it up and I can run it. So, gosh, this is awesome. It sticks to the rules. I've got a carrier, battleship, cruiser. Let's just place those randomly, and let's start the game.

This did not exist before I just ran it. That's the best thing and the worst thing about gen AI: this came out of nowhere. No human wrote this. It pulled in code out of its large language model to do various little bits of it, and stitched them all together, ran its own tests, made sure that all the exit criteria, success criteria, were met, and then it's done. It took about two and a half minutes to build this. Now I can play, I can shoot their ships. By the way, I asked it to have sound.

This is amazing. I'm thinking easy five bucks a month for my subscription plan. I just want to get this up in the store. The money will come, and then I can start iterating. Okay, great.

I don't know what to do. Let me call Brad. Brad's my advisor on all things business, legal, and... Oh, here he is. Let me see, Brad. Here you go.

#### Audience question: differences between models

**Audience:** Quick question for you. You mentioned different models. Is anyone taking a look at the delta between, essentially, the deliverables when these different models are being utilized? I was kind of wondering. This is obviously a pretty straightforward, simplistic example, but what is, in fact, the difference between these different models? Are we seeing notably different outcomes based on requests and based on the deliverables that are being provided?

**Richard:** Definitely. They're constantly training these models. Right now, they're training for the next-gen models, which are after the ones that we think are magic today. So Fable is Anthropic's latest one, Fable 5. I don't know if you remember this, but they released it and then they pulled it back and said it's too powerful for mortals to use. They picked some friends to play with it and they didn't want the hackers to get it. Then they said, okay, wait, you can have it for free for seven days. I mean, ten days. You can have it until July 19. And now it's just part of the plan. So part of me thinks that they hide things. Maybe the subtext of your question is, is there really substance in there or is it just a lot of hype? But I will tell you, Fable is amazing. Does anybody here play with Fable? It's your best assistant, researcher, whatever, ever. And it built me this program. I'm going to make millions of dollars on it.

<!-- REVIEW (pre-publish): the Fable release riff (too powerful for mortals, free until July 19) reads garbled as transcribed. Consider a light [joking] marker. -->

**Brad:** You are? You are, Rich.

### Part two: Bradlee Frazer

#### Opening and disclaimer

**Brad:** Well, thank you, Rich, for that introduction. It's nice to be with you tonight.

As Rich said, I am an intellectual property attorney at Hawley Troxell. Just a couple of thoughts that way. So Rich and I have done this presentation, "Who Owns the Code in the AI World," a few times. So you're going to see some bits and pieces of other presentations in here. Part of the presentation is going to be the legal environment of AI. Part of it will be who owns the code. But they really do mesh, because if you're going to use AI, I tell my clients, this is great, but let's be aware of the legal environment.

This is really how I feel about AI. I want you to use AI, to consume AI, and to invest in AI. But because I'm a lawyer, I have to drop the legal disclaimer in an intentionally small font that you can't read.

Now, because this is a text-rich slide deck, not a lot of pictures, I would invite you to please reach out to me afterwards, and I'm happy to share the deck with you. So please feel free to reach out. If you want any information in here, much of which we probably won't have time to cover, please, please reach out. I'm happy to share the deck with you. And then the first thing you can do is increase the size of this slide and read the mouse-print disclaimer right there. But I really do feel that way about AI. I didn't used to feel that way, but I do now.

#### "AI is here to stay and we need to be first to market"

So I hear this every day, and probably you do too: "Brad, AI is here to stay, and we need to be first to market, and we need to do it faster and cheaper than ever before. AI is the only way to do all that." Has anybody ever heard that, or perhaps said that, in a meeting? Nobody's willing to admit that, yes?

Well, we know that's true, because my clients say that to me every day. And I hear each day a pitch for a new product that has literally been thought up and coded over the weekend. So Monday morning my phone will explode with people who have been up since Friday night on Claude coding something, the greatest thing since sliced bread, and they'll describe it to me, and I'll go, oh, that's great. It's kind of like Rich's Battleship game, except it has more bells and whistles than Rich's rudimentary Battleship game. I've had, I don't know, 25 calls like that literally in the last two weeks, people who have just used Claude to code something, the next great thing that's gonna be a billion-dollar exit. Bless their hearts, right? Bless their hearts.

What do I tell them? Do I shoot them down? No. You saw my first slide. I say, AI is great. Consume AI, use AI. I want you to use AI. But let's be aware of the legal environment. So as you are advising your clients, or as you are writing code to have that next great thing, because it's faster and cheaper and you have to be first to market to beat the competitors, this is the mindset. I understand that. But let's be aware of what that means legally.

#### The AI issue-spotting guide

So here is my, I'll call it my AI issue-spotting guide. If any of these resonate with you, you might be the person who has certain legal issues in an AI environment.

Do you use gen AI to output code or other content? You may or you may not.

Do you care if people use those gen AI outputs for free and without attribution? Some people don't. Some people genuinely do not care. They have an open-source mindset and they don't care if their outputs are used by third parties for free and without attribution. Now that's contrary, isn't it, to a capitalist mindset. Most software company clients I have want to make money. Most. And so this second one may resonate with some of you.

Do you ever sign contracts warranting the accuracy of your gen AI outputs? Don't know, but you may. I know that if you have the government as a client, your contracts will say that vendor warrants the accuracy of what I'm going to sell to the government. You have to. It's a federal regulation. It's a federal purchasing regulation.

Do you ever sign contracts warranting that you own your gen AI outputs? Sure you do. You have to. It's called a warranty of title. I know that all of you have signed a software license agreement, either as the licensee or the licensor, that says: "Licensor hereby represents and warrants that it has good right, title, and interest to the software licensed." Every software license says that. And it would be foolish for a licensee to license software without that provision in there. I wouldn't. Unless it's open-source code, and that's a different thing. Okay.

Do you ever sign contracts indemnifying the other party from claims arising out of your gen AI outputs? Do you? I don't know. You perhaps do. Where your customer will say, hey, I want to use your gen AI output. Good for you. You have a Battleship game and I want to license it. But I want you to defend me if I get sued for using your gen AI thing. That's called indemnification. Very common. Every software license has that. Every licensee wants the licensor to indemnify them if they get sued for using their thing. True? Well, I know it's true. Okay. So remember, we're asking this from your perspective. Do you ever sign a contract in which you agree to indemnify somebody? Probably. All right.

Do you ever sign NDAs? Sure you do. Please tell me you don't sign NDAs. Those are awful. Horrible. Don't ever sign a mutual NDA. And if you don't trust me, call me. We'll talk about it for free, and I'll tell you why. NDAs are the worst. They really are. And I will give you, for free, my NDA that only protects you, because you're my client and you're the only one I care about. I don't care about the other guy. I don't protect his confidential information, because I don't care. I just don't. But if you ever sign an NDA, think about that. I worked at Micron, and we had, I don't know, 300,000, 500,000 NDAs. Did I know the content of all those NDAs? No. And so as we're glibly entering prompts into our AI, do you know that you're not violating an NDA by that prompt? You have no idea.

Do you plan to have an exit where IP is of interest to the buyer? All of you probably want to grow your business and have an exit. During that exit, your buyer is going to ask, because I'm the guy that represents the buyer. I'm going to say, do you own the thing I'm buying? This is a software company. I'm paying you $10 million for this code base. Do you own it? If you don't give me the right answer, I'm going to walk out with my buyer client and his $10 million check.

Do you plan to seek a round where IP is of interest to the investors? Probably. Most private equity funds and VC still ask the question, hey, do you own the thing that I'm investing in? Sure they do. And why would they not want to invest in a company where the company doesn't own the assets? See how that doesn't make sense?

Will you ever need a loan that is securitized by company assets, including intangibles? I don't know. You might have to go and get a loan. And I don't know how many of you have ever taken out a loan, but the bank wants security. And they will always take a security interest in your assets that sit in your warehouse, your land, your cars, your bank account, but they will also take a security interest in what are called general intangibles. Yes? And general intangibles include copyrights and code. So if you're ever going to need a loan and you're ever going to securitize it with general intangibles, I think this speaks to you.

Would your business be harmed if consumers knew you were using gen AI? You all know that right now there are probably, I don't know, 30 laws on the books requiring you to disclose AI use. In particular, the EU AI Act just came online. It's a big one. The California law came online August 2nd, which I hope you know. If you put anything into a California resident and it falls within that statute, you have to disclose the use of AI. You think your business is going to be harmed if you have to disclose the use of gen AI? It's a fair question.

> **Editor's note:** The date is right. California's AI Transparency Act (SB 942) was originally set to take effect January 1, 2026, but AB 853 (2025) moved its operative date to August 2, 2026. August 2, 2026 is also the date most EU AI Act obligations began to apply, including the Article 50 transparency and disclosure duties; the Act's general-purpose AI model obligations applied a year earlier. Requirements and effective dates for state AI disclosure laws continue to change; verify current status before relying on any date given here.

Does your liability insurance coverage contain AI exclusions? I would invite you to go home and read your general liability insurance policy. Turn to page 37, where the exclusions always are. Look at section 39J and look for the exclusion about AI, because I know it's there. And ask yourself, do I want to be in the AI sandbox if I don't have liability insurance covering it?

Will you be buying or investing in any companies using AI to secure your loan, your investment? I don't know. Remember, this is an issue-spotting guide, right? None of these may pertain, but I bet some of them do.

Do you have rock-solid indemnity from your AI vendors? Rich, when you use Claude, if you get sued for using Claude, will Anthropic indemnify you?

**Richard:** No.

**Brad:** Did you hear what Rich said? Which is right. Anthropic will not, and no AI vendor indemnifies you if you get sued for using the AI. That's just contract law. And will you ever get sued for AI usage? For hallucinations? Failure to disclose? IP infringement?

> **Editor's note:** This is accurate for consumer plans like the one used in the demo, but overstated as a general rule. Microsoft (Customer Copyright Commitment), OpenAI (Copyright Shield), Google, and Anthropic all offer IP indemnification for outputs to paying API or enterprise customers, subject to significant conditions (e.g., no circumvention of safety systems, rights to the inputs, prescribed mitigations). Anthropic has indemnified commercial API customers since January 2024. Read the conditions carefully; they are easy to trip.

Okay, so that's a lot. Did any of those resonate with anybody? I hope. Some? Okay. So I have to hope that I covered at least some of your AI use cases here. And if I didn't, tell me why not. What is your AI use case such that none of those resonated with you? If there's somebody willing to say, I'm just curious. No? Okay, well, here we go.

#### It's all academic until you get sued

Because I'm a litigator, I always have to say: it's all academic until you get sued. And every one of those issue-spotting exercises is academic until you get sued. None of it means anything until you use a gen AI output and you get sued. It doesn't mean anything until you, sir, sell your business and six months later the buyer comes back and sues you for fraud and breach of contract because you misrepresented that you had title to the asset. It's academic, sir, until you get sued by the bank for violating your loan covenants. Yes? It's all academic until you get sued. So this is purely and only an academic exercise until you get sued in one or more of those fact patterns. Because that's what I do.

#### The clown slide

This is my clown slide, which we've just seen many, many times, but it well illustrates the dangers of using gen AI. So the clown on the left is my little Gemini or Meta clown output. And look at the prompt. I said, "Imagine a scary clown living in a sewer that captures children." My wife and I are huge Stephen King fans, and of course I had to use a Stephen King prompt. But look at the prompt. Did I say Stephen King? Did I say "Derry, Maine" anywhere in my prompt? What did I say? What did the AI spit out? Does that remind anybody of anything? Look at the clown on the right.

Now, hypothesize that to your situation, where you use gen AI to spit out an output and you productize it. It's your clown on the left because you used Claude. It goes out into the wild, and just like Stephen King will sue me, you will get sued for using the clown on the left. It can be code, it can be a picture, it can be a book, it can be a song. Suno, we all know Suno is getting sued. So think of my clown, the clown on the left, as your gen AI output. And if you're willing to assume the risk to be first to market, good for you. Isn't that really the issue? Are you willing to assume the risk of using AI to be first to market? Don't know. Do you have good insurance? Do you have good indemnity? I don't know. Do you have $100 million cash in the bank in case you get sued? Don't know, but I would at least ask those questions.

#### Recent legal developments and disclosure laws

This is too dense to even go through. I just wanted to highlight it in case anybody asks for the deck. There are some recent legal developments. There are no overarching laws forbidding the use of AI. All of the laws go to disclosure right now. So this is still the current law of the land in terms of your legal obligations relative to the use of gen AI.

I threw this slide in just because I thought it was interesting, because we're in Idaho. Idaho actually has quite a bit of AI legislation, believe it or not. Here it is. And all that goes to the issue of, look at all that, it goes to the issue of disclosure, mostly.

So remember my issue-spotting question: will you be concerned if consumers won't use your product? Has anybody seen any backlash against gen AI? Anybody seen anybody protesting against data centers? Anybody been on social media and seen people using the term "AI slop"? Has anybody seen that? I sure have. Is that backlash going to be enough to quell the AI industry? Probably not, because it's a trillion-dollar industry. And I get that. But nonetheless, are you willing for your product to be saddled with that gen AI nomenclature, which some consumers may find distasteful? Particularly if you can't make all the warranties and covenants the contract requires, yes? Like what? What are they? Warranties of accuracy. Warranties of non-infringement. You can't make those warranties. Does everybody understand why? Let's pause there.

Okay, that's a lot in 15 minutes. Any questions so far? Did I say you shouldn't use AI? Did I say that? Seriously, did I say don't use AI? What did I say? Seriously, sir, what did I say?

**Audience:** You said to be covered. Make sure that the AI that is generating what you're asking for has indemnified you for any impact.

**Brad:** That's exactly right. Because I don't want to be seen as an anti-AI curmudgeon, because I'm not. I want my clients to use AI responsibly and be aware of the legal environment.

#### Copyright law fundamentals

Okay, now we get to talk about my favorite subject, copyright law. Yay! Copyright law is so interesting. First of all, let's review some of the fundamentals. Because remember, what's today's topic? Who owns the code? All you've heard in the last 20 minutes is bad stuff about the legal environment of AI. That's it. That's all you've heard. Bad stuff, right? You're scared of using AI, and you probably should be. I mean, you should be a little bit cautious. But let's talk about copyright law.

Okay, software is inherently a copyright law construct. It just is. Software is a copyright thing. In fact, source code, not object code, but source code, is defined as a literary work in the statute. There's the statute. So when you're looking at source code, copyright law looks at it no differently than the novel "Jaws," the novel "It," the novel "All the Light We Cannot See." It's a literary work. Copyright law looks at source code as a literary work. And that's important, because now we can treat it as a copyright law construct.

> **Editor's note:** Clarification: the statute does not single out source code. 17 U.S.C. 101 defines 'literary works' broadly and separately defines a 'computer program', and courts have held that both source code and object code are protected as literary works (Apple Computer v. Franklin Computer, 3d Cir. 1983).

So in my view, the best way to monetize code is to use copyright law. Who in here has had Econ 101? Okay. What happens to the price of a commodity when the supply goes down? When the supply goes down, the price goes up. Conversely, when the supply goes up, what happens to the price? What happens if the supply goes to an infinite number? The price goes to zero. Yes, just Econ 101. If you have no mechanism to control the supply of your software asset, what does it do to the price of your software asset? It pushes it down. You can see that. So if Rich puts his software product out on the App Store, and he cannot control the dissemination and use of that product by third parties who want to steal and use it for free, the value of the asset will eventually go to zero. It's a zero-sum game at some point. Does that make sense? It's just Econ 101.

So copyright law is the mechanism software companies use to create value in their asset. How do real estate companies create value? They buy dirt. How do software companies create value? They create an asset and they use copyright law to protect it and monetize it with software licenses and copyright law. That's just the model. You all know that. You're IT experts. Okay.

#### How copyright law works in the real world

So here's how copyright law works in the real world.

First, copyright is not a verb. It's a noun. All of you own thousands and thousands of copyrights. If you take out your phone and scroll through your photo roll, you will see that those are all images you created as a human being, and you own copyrights in them. Copyright is a noun. When a human being, here's the test, when a human being commits a sufficiently creative idea into or onto a tangible medium, a copyright is created. You create copyrights all day long.

I talked to this lady, an influencer. I had this influencer client call me out of the blue three days ago. She's got 3 million followers on, I don't know, whatever it is, TikTok. And she said to me, "Oh, but we have no copyrights." Okay, let that sink in. Two minutes ago, you might have said, oh yeah, she's not filed any paper with the government, she's not put a circle-C on anything, right? She has no copyrights. That woman literally has tens of thousands of copyrights. How? Someone tell me how that woman has all these copyrights. You know the answer. How? Yes, sir.

<!-- REVIEW (pre-publish): influencer client anecdote (three days ago, 3 million followers) is a semi-identifiable recent client contact. Confirm Brad approves. -->

**Audience:** Her content?

**Brad:** Absolutely, her brilliance, sir, her content. She's a media company. Every TikTok, every Insta, every YouTube, every podcast: thousands of copyrights. You, sir, own thousands of copyrights. Your companies own thousands of copyrights. Now, whether you're protecting them and monetizing them correctly, I have no idea. I hope you are. And so we'll eventually bring this around full circle to, well, what if we're using AI? Because that's what we're talking about tonight, yes?

So, when you author a copyright, the copyright exists automatically. The owner is the human being who does the fixation. Automatic upon fixation. The human being who does the fixation owns the copyright. Okay.

Since 2019, to stop someone from stealing and using your code for free, you have to sue them for copyright infringement. To do that, you have to have a registered copyright. Is that the same, sir, as putting a circle-C on it? Say no. Just say no. It's not. Circle-C means nothing. Copyright registration is a legal process whereby you literally take the source code written by a human being, and you send it in to the Copyright Office with a check for, how much money, anybody know? Is it $5,000? It's $65. Why aren't you registering all of your copyrights? It's absurd. So you take the source code that a human wrote and you send it in to the Copyright Office with $65, and you get back a copyright registration certificate, and that permits you to now go sue people who are stealing your stuff. Without that, you cannot.

> **Editor's note:** A copyright notice has been optional for works published since March 1, 1989, but it is not meaningless: under 17 U.S.C. 401(d), a proper notice defeats an infringer's claim of innocent infringement in mitigation of damages.

> **Editor's note:** Registration as a prerequisite to suit for U.S. works predates 2019. The Supreme Court's 2019 Fourth Estate decision clarified that registration must actually issue (not merely be applied for) before filing an infringement suit.

And what's the consequence of that, sir? What's the value proposition of your software company if you cannot do this? You, sir. What's the value proposition of your software company if you can't do this? Does everybody see why? I'm serious. Does everybody see why? If not, tell me now, because I'm $600 an hour. So you might as well get some value out of this for free, yes? Okay.

<!-- REVIEW (pre-publish): Brad's "$600 an hour" rate. Confirm Brad wants this in print. -->

Once you have a registered copyright, now we can go monetize it by either having an enforceable license agreement, or by sending a cease-and-desist letter, or suing them if they're taking your stuff. That's how copyright law works in the real world, which is why I called it that. And then ultimately, hopefully, we don't get to litigation.

Just today I sent out a cease-and-desist letter to some guy who had a copyright infringement. We had gone through all these steps. I took the client through these steps. Do you own the copyright? Yes. Human being? Yes. Registered copyright? Yes. We just got it today. Cease-and-desist letter going out tomorrow. If he continues to infringe, we're going to sue him in federal court for copyright infringement. Boom, boom, boom. She's going to make money, my client. That's just how it works. Question?

<!-- REVIEW (pre-publish): active client matter described here (cease-and-desist going out tomorrow, client will make money). Confirm Brad approves publishing; consider generalizing the dates. -->

#### Audience question: copyright vs. patent, novelty

**Audience:** Is there a government check to make sure that the copyright is novel and not just a copy of something?

**Brad:** Yeah, it's a great question. So, patents protect functionality. Patents protect functionality. Copyright protects the expression of an idea in a tangible medium. Copyright does not care about functionality at all. Patent requires you to demonstrate that the compiled code, when run, is functional, new, and novel. That's the difference. Patent protects functionality. There's new, useful, non-obvious functionality when code is compiled and run. Copyright doesn't care about any of that. Copyright cares about the source code as a literary work, just like Stephen King's. Is what you're copyrighting identical to something else that's been copyrighted? Nothing happens. You have two independent copyrights, and we fight in court to see who registered their copyright first.

**Audience:** So it's first to file?

**Brad:** Yeah, as a practical matter. The first-to-file thing really is more of a patent construct. Let me give you an example. You and I, sir, decided to go on vacation together for some odd reason. And we're both standing in front of the Grand Canyon. Yes? What is your name, sir? Andy. Andy and I take out our phones at the exact same moment and snap this glorious picture of the Grand Canyon. Who owns the copyright in the photograph? Me or Andy? We took it at the exact same moment. Same subject, Grand Canyon. Andy, say it. Both do. We both do. It doesn't matter, Andy. Truly. Copyright law does not care.

> **Editor's note:** Clarification: independent creation is a complete defense to copyright infringement, and registration priority does not determine ownership between two independently created identical works. As the Grand Canyon example above illustrates, both authors own valid copyrights. 'First to file' is a patent concept, not a copyright one.

<!-- REVIEW (pre-publish): "Andy" is named and quoted from here onward. Confirm attendee consent or replace with "Audience member" throughout. -->

#### Who owns the copyright: work for hire and assignment

So who owns the copyright? This is important. Who owns the copyright? Outside of an AI construct, the author owns the copyright. Who is the author? The author is the human being, and there are two doctrines implicated.

One is called the work-for-hire doctrine. A horribly misunderstood copyright law thing. Nobody understands it. Let me tell you exactly what it is. The work-for-hire doctrine is works created by employees, employees, not independent contractors, during the course and scope of their employment. So if you, sir, have an employee who writes source code under the work-for-hire doctrine, the moment that human fixes it to a tangible medium, your company, as the employer, owns a copyright in that code. Done. Now. Own. Copyright. Now. Yes? Do you understand that? Okay.

> **Editor's note:** Clarification: the statute also treats certain specially commissioned works as made for hire when the parties sign a written agreement, but only within nine enumerated categories, and software as such is not one of them. For contractor-written code, a written assignment is the reliable tool, as stated.

The other option is called, when you don't have an employee writing code, you have them sign a document called a copyright assignment agreement. Why is that so important? The A students will know this. Why is that so important, to have the non-employees sign a copyright assignment? Very good, Andy. Andy is my A student. Because if you don't have the non-employee sign that, Andy, you won't own the code. So when I go to buy Andy's company for a million dollars, I'm going to say, Andy, do you own the code? And Andy's going to say, sure, all of my code was either written by employees under the work-for-hire doctrine, or all of my independent contractors signed an IP assignment agreement. Here you go, Brad. Here's all the copies. Does that all make sense? That's really important if you ever plan to sell your company. It's critical.

Okay. As Rich said a moment ago, payment does not matter. I heard 10 times last week, "But I paid for it. But I paid for it, but I paid for it." Nobody cares. Payment is irrelevant to who owns a copyright. Just irrelevant. So please don't drink the Kool-Aid of thinking that because you paid for it, you own it. I don't know how old you are, sir, but maybe you have a daughter that might get married. If you hire somebody to go and take photos at your daughter's wedding, and you pay them $10,000, they own the copyrights, unless you have them give them to you, because payment is irrelevant to copyright ownership. It doesn't matter. Okay.

And ownership of media is distinct from ownership of the copyright. This is also interesting and important. Copyright law has a provision that says if I take a picture and print it and give you the media, you own the media on which the image exists, but not the copyright. Isn't that interesting? So when you go to one of those art trunk shows and they have all these oil paintings and you buy one and take it home, you bought a frame and some oil and a piece of canvas. That's all. No copyright. Because media and copyright are completely different under copyright law. Why is that important? Because people get confused when they think, I have the media, therefore I own the copyright and I can do whatever I want with it. Not true. And in fact, if you do something in contravention, even though you have the media, if you do something in contravention of my client's rights, I'll still sue you for copyright infringement.

#### The monkey selfie

**Richard:** I take all my gear out in the jungle and I'm photographing these great monkeys. One of the monkeys steals my camera and takes a super cool selfie. That's mine, right? Because it's my camera and my gear. I was there. I supervised it.

**Brad:** The monkey case. Rich is right. Maybe you've heard of it, it's the monkey, it's the PETA monkey case. PETA sued on behalf of a monkey. PETA sued on behalf of a monkey to have the monkey declared the owner of the copyright. Go PETA. Good job. But copyright law doesn't allow nonhumans, and see how clever Rich is? You see how he's segueing into the next section here? Nonhumans can't own copyrights, like a monkey. It just doesn't work that way. So even though the monkey did the fixation, remember fixation, automatic upon fixation, you remember that, it's irrelevant because the monkey's not a human.

#### What the law says about AI authorship: Thaler v. Perlmutter

So now what does the law say about AI authorship? So far we've been assuming that the person writing the code, taking the picture, sculpting the clay, yes, writing the book, writing the screenplay, that's all copyrightable subject matter, 17 USC section 102, so far we've assumed that that's a human being. But this is not true with respect to AI. Because that's what the law says today.

The two seminal cases, well, the main seminal case, is Thaler v. Perlmutter. And that's the law of the land. The reason it's the law of the land is because the Supreme Court did a special procedural thing called denying cert. They denied certiorari, meaning that there was a decision by an appellate court below the Supreme Court. Thaler, who lost, took it up to the Supremes and said, hey, hear my case, hear my plea for AI authorship. The Supremes said no. So that's the law of the land. And Thaler v. Perlmutter holds specifically that an AI cannot be the author of a work.

> **Editor's note:** The Supreme Court denied certiorari in Thaler v. Perlmutter on March 2, 2026. A cert denial is not a merits ruling; it leaves the D.C. Circuit's human-authorship holding standing, and that reasoning is being followed broadly.

So, what are the downstream consequences of that legal truth? If an AI writes your source code, follow it through with me. This is why we did these preliminaries. AI writes your source code. Somebody's stealing it. You're pissed off. You want to sue them. Can you, sir, get a registered copyright? No, because a human didn't write it.

**Audience:** How much would a person have to modify it to have it not be written by an AI?

**Brad:** A lot. I don't mean to be coy. Here's the actual answer. Ready? You have to have a human being modify the AI output sufficiently such that the Copyright Office will find sufficient human authorship to grant you a copyright registration certificate. How much is that? Nobody knows. It's a case-by-case basis. And you know how we figure that out, my friend? We go to court.

So, you file your copyright registration application. You've got AI-generated source code, you lie on the registration application, say a human wrote it, you get your certificate, and you come sue me. I'm absolutely, in the defense of that lawsuit, going to say, hey, where's the human that wrote this code? Where's the human? I want to take that human's deposition. Because I'm going to go through the source code line by line. I'm going to get all the code repositories and all the GitHub prompts and all the prompts from ChatGPT and Claude, and I'm going to figure out who wrote that code. And then you'll have committed perjury, because you will have lied to the Copyright Office. Right? That's just the way it works. Okay.

> **Editor's note:** Clarification: the registration application's certification is not a sworn statement, so a false answer is not perjury in the technical sense. It is still serious: knowingly making a false representation of a material fact in an application is a federal offense under 17 U.S.C. 506(e), and under 17 U.S.C. 411(b) a registration obtained with knowingly inaccurate information can be invalidated in the infringement case.

#### The pending case: Allen v. Perlmutter

Look at the bottom there. See, in yellow. This is a really important case. It's called Allen v. Perlmutter. This is pending in Colorado, believe it or not. The most important case in all of AI and copyright law is pending right now next door in Colorado. We're waiting for a federal court judge to say, and this is what you all want to hear...

Allen entered iterative prompts again and again and again and again to create a picture. It wasn't just "ChatGPT, draw me a picture of a moose on a lake." It was, oh, it was Midjourney. He said to Midjourney, hey, Midjourney, draw me a picture of a moose on a lake, and Midjourney spat out an image. And he goes, hey, now change it, make the moose soft focus and put a moon up there. Prompt. Enter. He did like 5,000 iterative prompts to generate this image. But still, there was no overt human authorship. He did not put pen to paper. Does that make sense? He used prompts.

<!-- REVIEW (follow-up): Allen v. Perlmutter is pending. When the decision issues, add a follow-up editor's note on BOTH transcript pages regardless of which way it goes. -->

> **Editor's note:** The record in Allen v. Perlmutter reflects more than 624 iterative prompts, not 5,000. The case remains pending in the U.S. District Court for the District of Colorado as of publication, with cross-motions for summary judgment briefed in early 2026.

So Allen is asking a federal court judge to declare that those iterative prompts, you'll like this one, Allen is asking the court to declare that those iterative prompts rise to the level of human authorship. You see? And until a court holds that, it's not the law. And you may not own a copyright in gen AI outputs, meaning what? What does that do to your value proposition? Say it with me: it goes to zero. Because you don't own the asset. True.

Now, again, the whole point of this exercise is for you to agree you don't care. Remember that issue-spotting guide? If you got through all 20 of those and said none of those resonate with me, then good for you. You don't care about the fact there's no ownership in AI outputs. Yes, sir.

**Audience:** Yeah, I can't own the copyright. But no one owns it at that point? Could you post it to social media, and then own the copyright by publishing it, even if you didn't own the copyright before posting it?

**Brad:** No. No. It's a nice question, but no. I like the way you think. It's kind of clever, kind of sneaky. I'll just solve the problem by sticking it out there. Seriously, I'll just solve the problem by sticking it out on Facebook or on TikTok or something, and bada-bing, it's published, it's fixed. But no.

**Richard:** So I actually came up with an idea, which is, I'll have gen AI create 10,000 lines of code, and then I'll email it to one of these overseas shops and they'll just type it back in by hand, line by line. Human, you know. I pay them a check for $37.04 and I've got the code. And he threw a big bucket of ice-cold water on me when I dropped that out.

**Brad:** This is how people are thinking, just like you, sir. Just like Rich, right? So, taking the AI outputs and running them through a black box that spits out new code is not going to solve the original non-authorship problem. It just doesn't. Copyright law doesn't let you do that. Okay.

#### No patents in AI inventions: Thaler v. Vidal

Also, real quickly, you can't patent AI inventions. So if I say to an AI, invent a better mousetrap which has a stronger spring with a higher tensile strength based on current best metallurgical practices, I mean, we know Claude could do that. Claude would give me five good ways to invent a better mousetrap. We know that. If I were to submit one of those inventions as a patent, that would be fraud on the Patent Office, and the patent would later be invalidated because, read the case, it's Thaler v. Vidal. Yeah, Thaler v. Vidal. No patents in gen AI outputs.

> **Editor's note:** Thaler v. Vidal holds that an AI cannot be a named inventor. USPTO inventorship guidance (issued in February 2024 and revised in November 2025) treats AI-assisted inventions as patentable where a natural person contributed to the conception of the invention. Only output with no human inventive contribution is unpatentable.

So copyright, no. Patent, no. Holy cow, what are you going to do? Well, come to my Interface session tomorrow at noon, because part two is: what do you do with AI code? Because you don't really own it. But we have some solutions for you if you come to Interface tomorrow. Okay, let's keep going here.

#### Downstream consequences, and audience questions on patents

Okay, here are the downstream consequences of your volitional choice to use AI in your outputs. Remember, why are you doing it? You know why. Why are you doing it? Because it's first to market, faster and cheaper. Yes, sir?

**Audience:** What keeps the AI company, the people who own the actual AI that's being used, from filing a patent on everything it's found that way?

**Brad:** That case, Thaler v. Vidal. You can't. I mean, it doesn't matter who is prompting it. The outputs are not patentable subject matter. Whether it's OpenAI or Anthropic or Microsoft. Yeah.

**Audience:** How does that square with the sort of AGI thing that all the big AI labs are going for, models built on other models? If they couldn't get copyright on models built by other models, what's going on there?

**Brad:** I don't know. You've said it well. There are no copyrights on models built by models. I mean, yeah, I know it's a... I mean, no, there's no copyright. Yes, sir?

> **Editor's note:** Clarification: whether a trained model's weights are protectable by copyright, and who would own them, is unsettled. No U.S. court has decided it, and AI developers currently protect weights through trade secret law and contract rather than registered copyrights.

**Audience:** What about if you have an idea and it's original to you, but the AI has already thought of it? How do you get around patenting your idea?

**Brad:** Well, if you, sir, the human inventor, are the first to invent a new, useful, and non-obvious invention, and you do two things, you conceive of it and you reduce it to practice, that's the patent art, right? That's the term. Then you, sir, file a patent application. Then you, sir, are the first inventor to file a patent application. Yay! And the patent goes to you. And anybody who invents or files after you has no patent rights. That's the law today. First inventor to file gets the patent. Well, what if AI has already generated it? It doesn't matter. It doesn't matter. So if you go home this weekend and independently invent, using your brain and no AI tools, a better mousetrap, and you file a patent application on it, and at the exact same moment Claude is spitting out that same thing because Claude is eavesdropping on your communications, because we all know Claude does that, right? This is a joke. Then you, sir, will still get the patent.

**Audience:** But it's not novel. If it existed already with Claude, it's not novel.

**Brad:** Yes, very nice, sir. Did you hear Andy's question? If an AI already thought of it, it's no longer novel. An AI conception, Andy, would not be considered prior art by the Patent Office. Yeah, it's a good question, though. Okay.

> **Editor's note:** Clarification: prior art turns on public disclosure, not on who or what conceived the idea. Published AI-generated output can qualify as prior art. Output that exists only inside a model and was never publicly disclosed is not prior art because it was never disclosed, not because an AI produced it.

#### Consequences: warranties, due diligence, disclosure, the on-sale bar, contractors

The remaining consequences of AI usage here, because we're about out of time. You cannot warrant the accuracy of those AI outputs, right? We talked about this. You can't warrant it. So if somebody asks you to sign a contract that says, "I, Andy, hereby represent and warrant that my software outputs are accurate and will not hallucinate," Andy can't do that. And Andy won't get the business, and the business will go to human-authored code. Or Andy misrepresents the code.

If I sell my company or seek an investment round, I cannot assert or warrant during due diligence that I own the code, and I and my client will leave the room. I'll pick up my briefcase with great ceremony and walk out with my $20 million check, because you have nothing to sell me. You similarly cannot make any warranties of title. I think we beat that to death.

Real quick, we know that there are disclosure obligations coming. We talked about that. The EU AI Act has it. California law has it. Utah just put one on the books. Idaho has four, right? So if you're using AI, you probably have to disclose it somewhere. Be mindful of that.

<!-- REVIEW (pre-publish): "Idaho has four" AI laws. Verify the count against current Idaho code before publication. -->

This is interesting. I'll answer this one for Andy. Andy, because you're a patent guy. If you put an invention idea into a prompt, the moment you do that, you've started the one-year on-sale bar clock ticking, one year, because that's a public disclosure, because you have no NDA with the AI company. So if you go to Anthropic and enter in a prompt that later becomes an invention, a human-authored invention, you may lose the patent rights anyway, because you blew the one-year on-sale bar, because that disclosure to Claude starts the one-year clock ticking. How about that?

> **Editor's note:** The on-sale bar strictly concerns sales and offers for sale; the concern described here is a public disclosure under 35 U.S.C. 102(a)(1), subject to the inventor's one-year grace period in 102(b)(1). Whether entering a prompt into an AI service under its terms of use constitutes a public disclosure is an open question, not settled law. The conservative practice is to treat it as if it might.

Are your contractors using ChatGPT? Of course they are. Please make sure that you have a contract with your independent contractors that says we will use human authorship only. Had a lady say to me the other day, "But that will triple the cost." I said okay, and then I went through my list, remember, I went through my list, and said, I don't care, but do you care about selling your business at some point? We talked about that.

#### The last hypothetical

Here we go. Here we go. Here's the last hypothetical. Ready? You are the CEO of a software company. Hey, you are, actually. And you've just written a new software product, written entirely by Claude, because it's fast, it's cheap, you're first to market, you beat the competitors, you're ready to go. It's all compiled, just like Rich's Battleship game, ready to put up into the App Store or sell to your customers chomping at the bit for your new thing. All source code was prompted by employees or by independent contractors who have signed copyright assignments. Nobody cares, because the prompts, until Allen v. Perlmutter has decided, prompts do not rise to the level of human authorship. So nobody cares that the whole thing was prompted by humans. Nobody cares. It's not authorship. Do you care about the fact you do not own the code? Let's discuss. Next slide.

Just remember, I just put this in there as a reminder, this is how they work in the real world. Remember: authorship by a human, automatic upon fixation; ownership, work for hire or independent contractor assignment; registration, so that you can sue them and monetize that asset, because if you can't sue them to make them stop, the value goes to zero. True. How many cease-and-desist letters have I sent out that were ignored? How many? 50,000 in 40 years. So I've got to sue them, and I can, as long as I have all these prerequisites in place.

<!-- REVIEW (pre-publish): "50,000 cease-and-desist letters in 40 years" is obvious hyperbole in speech but reads as a factual claim in print. Consider a [laughter] marker or leave as is. -->

#### Wrap-up

There's my contact information. I'm happy to answer questions, but there's my info if you want to get a copy of the deck, and call me for a free initial consultation. Happy to do it.

Are there any questions? Do you feel beat up? Do you feel subjected to the whims of an aggressive courtroom lawyer? You may. That's not my goal. My goal is to just help you be a little bit more thoughtful about your use of generative AI in your companies, and in terms of the downstream consequences, both copyright law, contract law, patent law. I mean, you saw the list. Okay, are there any questions? Thank you.

---

*This page reflects current U.S. copyright law and general international principles. It is provided for educational purposes and does not constitute legal advice. Editorial notes were added after the event to clarify or correct points as spoken; the underlying remarks are unchanged.*
