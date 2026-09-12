---
title: "Best Practices for Protecting Your Code in the Age of AI"
subtitle: "Transcript of the Interface Boise conference session, August 2026. Bradlee Frazer."
date: 2026-09-12
url: /presentations/transcripts/interface-boise/
---
*Lightly edited from a noisy recording. Filler and false starts were trimmed and speech-to-text errors corrected; where the transcription was garbled but the meaning was clear from context, the sentence was restored to the nearest sensible reading. Audience questions were mostly off-mic and are paraphrased. Passages that could not be recovered are marked [inaudible]. Back to [Presentations](/presentations/).*

### Opening

**Brad:** My name is Brad Frazer. Hopefully you'll get some good instruction today on the notion of best practices for protecting your code in the age of AI.

It has been my experience that there is an assumption that you own the code that you create. And today we're going to talk about that, whether that's the law or whether that's a myth. And if there are additional things that you may wish to do if you write code, either as an independent code writer or as a software company. Maybe your company doesn't actually write code for a living, but you may have a few code writers.

#### The disclosure slide

So this is half joke and half true. As you know, more and more laws are coming online requiring you to do just this. Now, I'm not exempt from that law because of the nature of this presentation, but please note that there are laws coming online almost every day that require your company to disclose the use of AI. In California, you just had a law come online. The EU AI Act came online two years ago, but this notification version came online a week or two ago. And more and more of these laws are coming online every day. So again, half joke and half true. Because this deck doesn't contain any AI, this is technically superfluous, I guess. But I still put it in there as an example of what the disclosure requirement is going to require.

<!-- REVIEW (pre-publish): the California law that "just came online" is most likely the AI Transparency Act (SB 942), whose operative date AB 853 (2025) moved from January 1, 2026 to August 2, 2026. Confirm with Brad before tightening or annotating. -->

But really, there really is no AI in this deck. The legal consequence of that is that I actually own this deck. And we'll talk about that. If an AI had spun out this deck, that would not be true. And my friend Andy, sitting right here, could take his phone and take pictures of every single slide in the deck, take them out, put them on LinkedIn, put his name on them, and I would have no recourse. Now extrapolate from that analogy to code, because that's legally true, and that's what we're going to talk about together today.

#### The Who Owns the Code prerequisite

Now if this were a college class, I would say that the course prerequisite is the class "Who Owns the Code" with my good friend Rich Hundhausen, who's right there. Stand up, Rich. Rich and I have a presentation called "Who Owns the Code?" We did it last night for a group of technologists. We've done it several times. And we have the website stood up that has a risk assessment. It's free. It's confidential. But it's fun, because it identifies which of the 18 AI personas is your company. Rich developed it. It's a very nice little tool. So if any of you choose to direct your browser to whoownsthecode and take the assessment, you might find it interesting and kind of fun.

### Code is a copyright construct

So because I'm an intellectual property lawyer, and I'm a copyright lawyer at heart, there's a lot of copyright law stuff in today's discussion. Because that's how you own the code.

Code, as you can see here, is inherently a copyright law construct, meaning that when you author source code, copyright law treats that no differently than if you were writing a novel. No different. So if you spend your weekend writing a novel, and you spend your next weekend writing source code in whatever your favorite programming language is, copyright law treats them the same. They are considered to be a literary work. Functionality of that code, when it's compiled and run, doesn't matter to copyright law. Functionality of code when it's compiled and run is a patent law construct. Not copyright. Copyright law looks at the source code as words on paper, like a literary work, no different than a novel, no different than "Jaws" or "It" or "All the Light We Cannot See." It's all the same.

And that's important because, remember, what are our goals together today? First, we want to understand that you don't own code written by AI, which is true, but we also want to give you tools to try to protect the code that AI does write. Hopefully, this will be our objective together today. So we want to understand how best to protect, and thus be able to monetize, code.

It is our assumption together today that software companies should make money. Yes? There are a few NGOs and other charitable organizations who do not wish to make money, but in general, we believe that software companies are capitalistic and wish to make money. And they do that by selling, or more accurately licensing, their code. That's how you do it in software companies. They license their code. You're all partners, you're used to thousands of software licenses, I'd bet. And some of them are royalty-free. That's the open-source model, where you're not going to make money. They still use copyright law to cause people to sign these things called software licenses, even though they're royalty-free. In exchange for that, you don't get sued for copyright infringement.

### How copyright law works in the real world

So let's take just a few minutes together and talk about how copyright law works in the real world.

Copyright is a noun, not a verb. You don't copyright things. You create copyrights.

And by the way, because there's a lot of text here and there's very few pictures, please know that any of you may reach out and I'll send you, for free, a copy of this deck. So you can take notes, take pictures if you wish. So I'm granting you, you don't technically need this, but I'm granting you a copyright license, an express copyright license, to take photos or images of my deck. But I'll even do better than that. I will send you a copy of this for free. So take notes, and know that you're going to get a copy, and I'll be happy to answer your questions.

#### Copyright is a noun

Copyright is a noun, not a verb. What does that mean? That means we don't copyright something. So when a client calls and says, "I need to copyright this thing," I'll give them one of those for free. Just one. And when they do it again, I'll remind them quite clearly: we don't copyright things.

What that means is this. Here's the actual legal expression of why copyright is a noun, right? A copyright, which is a personal property right, springs into existence whenever a sufficiently creative idea is reduced into or onto a tangible medium. And the copyright is automatic upon fixation. Automatic upon fixation.

What does that mean in English? It means, sir, that whenever you take a photo with your phone, you have created a copyright. It means that whenever you, sir, put a TikTok up, you do a funny dance and capture it on video and post that TikTok, you, sir, have created a copyright. It means that literally, sir, whenever you write a Christmas card to your pen pal, you own a copyright in the content of that Christmas card. You, sir, and all of us, are creating copyrights all day long, every day. They're created every time you send a text. Copyright, copyright, copyright. Copyrights are nouns. They are created when an idea is reduced to a tangible medium.

So, by extension, what happens when you write source code? What legally is happening? You know the answer, I just told you. What happens legally when you write source code? And because you're all shy, I'll just tell you the answer. You own a copyright in that source code. Because it's no different than any other literary work, right? No different than the photo, no different than the novel.

#### Authorship and fixation

So, authorship is an important concept in copyright law. The author, as a general rule, is the human who reduces it to a tangible medium. So when you write source code, without more, you're the author. Because you're a human. You take an idea and reduce it to a tangible medium. Okay? Fixation means tangible medium.

Pop quiz. Do I have a copyright in the words coming out of my mouth today? Do I have a copyright in this presentation and the words coming out of my mouth? You know everything you need to know to answer that. Do I have a copyright in the words? Why not, sir? A student right there. I can see, sir, you are my A student. And he's right. It's because it's not tangible.

But what if you, sir, in the orange shirt, what if he, underneath his desk, had a recorder operating that's recording the words coming out of my mouth? How does that change my thought? Has a copyright now been created? Yes. Because a tangible recording has been made on a tangible medium. That's called fixation. But who, A student, who owns that copyright? Guy in the orange shirt. How about that? It's not remarkable. The power of copyright is to know that all you have to do is reduce a creative idea to a tangible medium and you own a copyright, without more.

> **Editor's note:** Clarification: under 17 U.S.C. 101, a work is 'fixed' only when the fixation is made by or under the authority of the author. An unauthorized recording of a speaker's extemporaneous remarks does not vest copyright in the recorder over the spoken content. The hypothetical works as an illustration of fixation, but the recorder would not acquire the rights described here.

And moreover, I don't know if I have a slide on this, but moreover, at the moment of fixation, you have what are called certain exclusive rights under the federal statute. It's all automatic, all automatically free. So if the gentleman in the orange shirt has his recording of my presentation, and my A student takes that recording and sends it to somebody else in an email, without more, that's copyright infringement. Because Mr. Orange Shirt owns the copyright, he did the fixation. My A student, however, violated his exclusive rights under 17 U.S.C. Section 106 by emailing the recording. Well, there's more to it than that. But isn't that an interesting construct? That's actually how it works.

Now, the idea must be sufficiently creative, right? Are the words coming out of my mouth sufficiently creative to earn copyright protection? I don't know. If you ask me, I think they are. And there's a very famous U.S. Supreme Court case that defines what we mean by creativity.

#### Registration

Also, let me talk a little bit about registration of copyright. Mr. Orange Shirt could not sue my A student for copyright infringement, even though he has violated his 106 rights, until Mr. Orange Shirt has done something very important. He has to go out and send in a copy of the sound recording to the Copyright Office, for $65, to register his copyright.

So, let's review the model for monetization of the copyright. Human being reduces an idea to a tangible medium. Check. Human being automatically has the 106 rights. Right. Someone infringes the copyright. Right. Mr. Orange Shirt has to get a copyright registration, $65, and then Mr. Orange Shirt goes and sues the A student for copyright infringement. The A student pays him money, and the copyright has thus been monetized. Does that make sense? That's how you monetize a copyright in the real world. What are those steps? There they are. Authorship, fixation, creativity, registration. Yes, go ahead.

#### Audience questions on registration

**Audience:** Are copyright registrations public?

**Brad:** The question was, are copyright registrations public? Yes, they are. But the Copyright Office interface is very bad. So even if you armed me with your name, the name of the work, the date of creation, and I've done this many, many times, I would have a hard time finding the copyright registration. And even then, sir, the registration certificate, the thing Mr. Orange Shirt needs, is a physical piece of paper. That physical piece of paper you get from the Copyright Office is not online. And also what is not online is what's called the deposit copy. When you register a copyright, you have to send in a copy of the thing that's being registered. That's not available online. Now you can get all of those things when you sue somebody, but not before. Interesting, right? Yes, sir, A student. Someone shout out A student's question for me.

> **Editor's note:** Registration records are searchable in the Copyright Office's online public catalog; the certificate itself and the deposit copy are not posted online, as stated.

**Audience:** Does it have to be registered before you can sue, or can you sue and then register?

**Brad:** This is a sharp group. Seriously, that's a very good question. Here's the actual rule on that. Since 2019, you have to have a registration certificate in hand to sue somebody. But if you didn't register, you can register the day before you file a lawsuit. We did it this week. I literally did that this week. We literally got a registration certificate this morning, so we're going to sue this guy. Literally. So as long as you have it in hand before you file a lawsuit, you're good.

> **Editor's note:** Registration as a prerequisite to suit for U.S. works predates 2019. The Supreme Court's 2019 Fourth Estate decision clarified that registration must actually issue (not merely be applied for) before filing an infringement suit. Getting a certificate on short notice, as described here, requires the Copyright Office's special handling service for an additional fee; standard processing takes months.

<!-- REVIEW (pre-publish): same active client matter referenced on the Syringa page (registration certificate this morning, suing this guy). Confirm Brad approves publication on BOTH pages and keep the treatment consistent. -->

But, A student, if it has been more than three months since the date of first publication of the work, and publication means giving somebody a copy, it doesn't mean having a publisher, it means giving somebody a copy, then when you file that lawsuit, you cannot get a thing called statutory damages or attorney's fees. That's huge. That's huge. That means you have to bankroll the litigation, and even if you win, the other side doesn't have to pay your fees.

> **Editor's note:** The precise rule (17 U.S.C. 412): statutory damages and attorney's fees are unavailable for infringement that begins before registration, unless the work was registered within three months of first publication. Registration before the infringement begins, or within that three-month grace window, preserves them. The takeaway stated here (register immediately) is the right practice.

So what's the takeaway, team? When should you register your copyright? A student says register your copyright immediately, before it's published. Very good, sir. What's your name? I like you. What's your name? Matt. Matt? I like Matt. So as Matt has taught us, as soon as the work is fixed in a tangible medium, you should register your copyright. Well before publication. Because then you don't have that problem. Does that make sense? And so what is our goal here with this whole algorithm we just spat out? The goal is: monetize your copyright. This is how you do it. Yes sir. Orange shirt, go.

<!-- REVIEW (pre-publish): attendees "Matt" and "Andy" are named and praised throughout. Confirm consent or replace with "Audience member". -->

**Audience:** Question about whether the deck, rather than the spoken words, would be the registered work.

**Brad:** Another excellent question. He said, in my hypothetical, I'm the one issuing forth the words. Very technically, there is no literal copy of the words coming out of my mouth, but I do have the deck. Yes. So what I would do is, when I found out that Orange Shirt and A student Matt have infringed my copyright, as they have in the deck, the words are in the deck, I would then go quick and get a registered copyright in the deck and sue them both for copyright infringement. What is Orange Shirt and Matt's defense going to be? Come on. Think about the words. What's the defense going to be? What? Go ahead. What's the defense? No. The defense is the words on paper are very different than in the recording, because Brad just made stuff up as he goes. Right? Brad's not reading the script. So the copyright is bad. Your copy is probably what? I don't know, 70% the same? You see how that works? Next question. Go ahead.

**Audience:** Do you have to have a copyright notice on the work?

**Brad:** The question was, do you have to have a notification on the work that it's claiming copyright? The answer is no. The circle-C is irrelevant to this whole construct, this discussion. Should you put a circle-C on there? Sure. But you don't have to. Good question.

> **Editor's note:** A copyright notice has been optional for works published since March 1, 1989, but it is not meaningless: under 17 U.S.C. 401(d), a proper notice defeats an infringer's claim of innocent infringement in mitigation of damages.

We're going to move along. I know we started a little late. These are great questions. You're going to get a copy of the deck and access to me for free. Why not? Knock yourselves out. If we don't get through everything and you've got to run into another session, run into the session and get the deck from me and then we'll hop on the phone.

We get copyright registrations timely, and then we enforce and monetize our lawful monopoly. That is the rubric, the algorithm for monetization of copyrights. Is this limited to code? No. If you're a novelist, all the same. If you're a photographer, all the same. If you're a sculptor, all the same. If you're an artist, all the same. So if you want to monetize your creative outputs, whether you're a novelist or a coder, principally you use copyright law. This is how you do it. This is the model. Okay, questions? Okay, let's move ahead.

### Does a software company need copyright law?

Does the software company need copyright law?

I hear every day, and you've heard this every day, you've probably said it yourselves: because of AI, we're going to go to market faster and cheaper than all of our competitors, so we're going to use AI. Has anyone heard that as the rationale for AI usage? First to market, faster, cheaper? I hear it every day. And that's fine.

And so just this week, Rich and I were in an impassioned debate with this gentleman from Scotland who argued that a software company does not need copyright. That copyright is now irrelevant and it has nothing to do with the value proposition of software. He makes pretty good arguments for it. We're going to debate, yeah? Okay.

Here's my argument in favor of why, even in the age of AI, software companies need copyright.

#### Lawful monopoly

Copyright creates a lawful monopoly better than patent law does. Which is true. So if you, as a software company, want to stop someone from stealing and using your code for free, let's make sure we understand that. That's the consequence of not doing everything I just said. If Mr. Orange Shirt does not register the copyright in the sound recording, anybody may steal and use it for free with legal impunity. Same thing with software. So a software company puts out a code base; anyone may steal the source code and use it for free with legal impunity and without attribution. I know all the coders are going to go, that doesn't matter, nobody looks at source code anymore, just tell Claude to write the code. Copyright today still creates a better lawful monopoly in source code than does any other kind of law, including patent law.

#### Statutory damages

Next, in copyright law you get statutory or actual damages. But you only get statutory damages if you register the copyright timely. Remember we talked about this? No other body of law has statutory damages. Not patent law, not trademark law, not contract law, unless you have a liquidated damages clause, but nobody does because they're hard to enforce. So why would you throw out the ability to get statutory damages? Because you say, oh, we're a software company, I don't need statutory damages. That's nonsensical from a legal and business perspective.

> **Editor's note:** Trademark law does provide statutory damages for counterfeiting (15 U.S.C. 1117(c)) and cybersquatting (15 U.S.C. 1117(d)). The broader point stands: copyright's statutory damages regime is unusually plaintiff-friendly for ordinary infringement.

#### Attorney's fees

Next, in copyright law it is much easier to get attorney's fees than in trademark law. Trademark law has a standard called "must be an exceptional case." Copyright law doesn't have that. Copyright law just says the judge, in his or her discretion, can award fees. But that's huge. You know how much it costs to do a copyright infringement lawsuit? $250,000, $500,000, right? So you want to be able to get that back from the other party if you win.

#### The DMCA

Copyright law has this very powerful thing called the Digital Millennium Copyright Act. No other country has it. The DMCA allows you, without a lawyer and without going to court, to send in what the kids these days call a copyright strike to GitHub, or to Facebook, or to SourceForge, or to TikTok. And if you do it correctly, and you send it in correctly, they have to take down the infringing content from the internet. You don't have to go to court to get an injunction. You don't have to send a cease-and-desist letter. You just send a copyright strike under 17 U.S.C. Section 512(c)(3), for the lawyers in the room, but it's just called a copyright strike. So ask Claude. Say, hey Claude, prepare for me a properly formatted DMCA copyright strike to send in on these facts. Claude spits out the thing. You email it in, and the thing comes down off the internet. You win. Yay. Now that's really not the end of the story, but that's enough for today. You get that with copyright law. You get that as a software company. Why would you say, ah, we don't need the DMCA? We don't need that, we'll just have Claude write all the code. We don't need statutory damages. Yeah. We don't need DMCA power. It's irrational from a business standpoint. Okay.

> **Editor's note:** The DMCA is U.S. law, but notice-and-takedown regimes are not uniquely American; the EU's Digital Services Act and other national laws provide analogous mechanisms. The practical point, that a properly formatted Section 512 notice removes infringing content without litigation, is accurate for U.S.-facing platforms.

#### The Berne Convention

There's this thing called the Berne Convention, meaning copyright law, exactly everything we just talked about, with a few exceptions, applies to all 137 member countries of the Berne Convention. Why would you walk away from that? "Ah, I don't care if some guy in Belarus copies my code. I don't care." That makes no sense to me. Belarus is a member of the Berne Convention. Let's go hire a Belarusian law firm to sue the guy. See what I mean? Why would you walk away from that monetization opportunity in Belarus because you've literally, incorrectly, concluded that copyright is not important to you because you're a software company? Why, Matt? Because it's fast. Cheap and fast.

> **Editor's note:** The Berne Convention has 181 member countries as of publication.

So you see where we're headed here? You see the trade-off? The trade-off is cheap and fast versus having no ability to stop downstream theft of your product, and consequently no ability to monetize it downstream. See? And hey, I'm not saying don't do it. I'm saying, if you do not care about having ample legal means to stop someone from stealing your stuff for free, then go leave your car unlocked. I don't care. Leave your car unlocked and put the keys on the dashboard. I don't care. But what I know is that when you come to me later and say, hey man, this guy stole my car, I'm going to have a hard time, because you basically gave it away. See my point? I should be pretty clear. I've never been accused of being subtle.

### Does the absence of copyright affect the value proposition?

So does the absence of copyright affect us? Here, this is a good question. We could actually end on this, but we won't, unless anybody has to go. Does the absence of copyright affect a software company's value proposition? Let that just sit with you. Does the absence of copyright affect a software company's value proposition?

So you are selling your software company. I'm the guy, me, I'm the guy representing the buyer in the deal, me. So I go into the negotiations, and what's the very first question I'm going to ask the CIO, the CEO of the software company? What am I going to ask, given what you know about me today? Andy, what am I going to ask? Do you know? Did you hear what Andy said? Andy's kind of a genius. I know a little bit about him. He's kind of a genius. So take his word for it. He's right. The first question I'm going to ask is: do you own your code?

Again, we're doing a deal. I signed a letter of intent to buy. I'm going to use Matt again. I'm going to buy Matt's software company. So we signed a letter of intent, very commonly done. Non-binding letter of intent. We do them all the time. I'm going to buy Matt's software company for $10 million, subject to the completion of satisfactory due diligence. That's how deals are done. All the time. So when you sell your software company, that's what happens. You sign a non-binding letter of intent, and it will say, quote, Brad will buy Matt's software company for $10 million, subject to the completion of satisfactory due diligence. Now we start due diligence.

So I fly out to Matt's headquarters with my briefcase, and I ask him, just like Andy said, "So Matt, do you own the code that I'm paying you $10 million for?" And see, now, because you've sat through this, you know how to answer that. If you say, "Well, Claude wrote it, because we wanted to be fast and first to market," the answer is what? "I don't own my code." What am I going to do, representing the buyer in that deal? Think hard. Am I going to pay $10 million for code the seller does not own? Seriously, will I pay? No. And I've actually done this. I'm going to pick up my briefcase with dramatic flourish, and my $10 million check, and walk out of the deal. Why would I pay $10 million for something the seller doesn't own? Yes, go ahead.

#### Audience question: the model vs. the service

**Audience:** I guess my question is, where Claude is a service that's actually being delivered, whether you're using a model versus the service, and you have your own solution that goes to the model. What does that mean?

**Brad:** Yeah, that's another great question. I may have a slide on that. Let's see here. Well, very good. Let's move down to the second bullet point right there. It's almost like I asked you to ask that question right now, because it's a perfect segue. Well done, sir.

So here's the answer. When you go through my rubric and you use Claude to write the code, you're going to have to go through several steps before you get to the point where it's truly monetizable, right? You're going to have to have a copyright in it, you're going to have to register the copyright, or you're going to have to go to court. In every one of those steps, someone's going to ask you: who wrote the code? You have to tell the Copyright Office, when you send in a copyright registration application, you have to tell them under penalty of perjury, who wrote the code? You're going to say, well, a human wrote it, but Claude was the model. The Copyright Office is going to kick that. They're going to say, that's not sufficient human authorship.

Look at number two. Without human authorship, there's no copyright. Period. That's just the law today. Why? Because of a federal case called Thaler v. Perlmutter. That's the law of the land. For the lawyers in the room, the U.S. Supreme Court denied certiorari on that case. That's the law of the land. It says AI cannot be the author of the copyright. Authorship is critical to copyright. We've talked about that.

> **Editor's note:** Accurate for wholly AI-generated material. Per the Copyright Office's January 2025 report on copyrightability, human-authored contributions, human modifications of AI output, and a human's creative selection, coordination, and arrangement of AI-generated material can be protected, assessed case by case. That distinction underlies the 'selection, coordination, and arrangement' strategy on the closing slide.

> **Editor's note:** The Supreme Court denied certiorari in Thaler v. Perlmutter on March 2, 2026. A cert denial is not a merits ruling; it leaves the D.C. Circuit's human-authorship holding standing, and that reasoning is being followed broadly.

So the wheels will come off that bus at some point, either when I buy your company, or when you go and litigate it, because I'll just say, Claude was the author, not a human. And you'll say, but I prompted it. Don't care. Nobody cares. But it's just a model. Don't care. Nobody cares. I will prove that Claude is the author, and thus your copyright will be denied, and your case will be dismissed. Now, I'm being glib, because I'm a litigation guy, but if you can actually prove that Claude wasn't the author, in the face of Thaler v. Perlmutter and 15 different pronouncements from the Copyright Office, and the Vidal case, and all of the cases, good for you. But just based on your very thin hypothesis, I think you would lose that case asserting a human copyright in that thing. Okay.

#### Thaler v. Perlmutter and Allen v. Perlmutter

So let's go through. Without a human author, there's no copyright. That's true. That's the law today. We're waiting for a decision from Colorado called Allen v. Perlmutter. Every day, all the copyright lawyers are watching Allen v. Perlmutter, because if Allen v. Perlmutter says what I think it's going to say, then the door is shut. The coffin has been nailed. No copyright in AI.

Very technically, Thaler v. Perlmutter says an AI cannot be an author. That's what it holds. Okay. Allen v. Perlmutter is a different fact pattern. Allen, the plaintiff, who's suing Shira Perlmutter, she happens to be the head of the Copyright Office, because he tried to register a copyright in this picture. It's a very nice picture. He wanted to go sue somebody for copyright infringement, because he knows he has to have a registered copyright. So he sent it in with 65 bucks, and they denied him, because they said it was AI art under Thaler v. Perlmutter. He wrote back and said, no, no. This was the creation of several thousand creative, iterative prompts. It's clever, right? But a prompt is not the same thing as human authorship. It's just not, under the copyright law. So we're waiting to see what the federal court judge in Colorado is going to say.

<!-- REVIEW (pre-publish): Shira Perlmutter's status as Register of Copyrights has been contested in litigation since her removal in May 2025. Verify her position as of the talk before publishing this line; the case caption is unaffected. -->

> **Editor's note:** The record in Allen v. Perlmutter reflects more than 624 iterative prompts. The case remains pending in the U.S. District Court for the District of Colorado as of publication, with cross-motions for summary judgment briefed in early 2026.

Going on the record right now: the federal court judge in Colorado is going to affirm Perlmutter. The Copyright Office will win. Creative iterative prompts are not sufficient to rise to the level of authorship under the relevant copyright laws. That's my impression. I think that's right. So the nail will be in the coffin, and in those cases, Allen v. Perlmutter and Thaler v. Perlmutter, anybody who claims a copyright in AI output will lose. Okay.

<!-- REVIEW (follow-up): Brad predicts the Allen v. Perlmutter outcome here. When the decision issues, add a follow-up editor's note on BOTH transcript pages regardless of which way it goes. -->

#### Open source is not copyright-free

I think you guys all know this. With all this mentioned, open source does not mean copyright-free. Every bit of open source code still has a copyright, because a human wrote it. I mean, call the Free Software Foundation and ask them if the code licensed under GPL 3.0 is without copyright. And they'll scream and yell and say, oh no, no, of course we still have copyright. Open source just means you're using a contract to control how it's used. That's the difference, right? It's an important construct, because actually we're going to talk a little bit about that.

### Do you care? The issue-spotting questions, revisited

So your whole new product is Claude code. You probably have one waiting to launch. Maybe you're going to code one up this weekend. I don't know. Rich and I just came up with one 20 minutes ago. Do you care, given what you've just learned, do you care that your whole new product is going to be written by Claude Code? Well, let's find out. Ready?

Do you use gen AI to output code? Yes, because you're going to have Claude write your code base.

Do you care if people use those gen AI outputs without attribution? You see it right now. The wheels will come off the bus. How can the CFO of your company get on board with a product launch where you have no means of monetizing the code? And I know what you want to say. You want to go, "But everybody does it. Everybody monetizes the code. Nobody seems to care." Yeah, but, trust me, the wheels are going to come off that bus at some point, when, as Matt knows, you go to sell your company. Or when you try to sue someone for copyright infringement. Let's continue with this funny guy here.

Do you ever sign contracts to warranty the accuracy of your gen AI outputs? If you don't, I'm shocked. Every software contract I've ever read or written or negotiated says something like this.

We know you do, because every software contract I've ever done has a provision just like this. It says: "Licensor," let's say that's your software company, Matt, "hereby represents and warrants that the outputs and the deliverables that we're delivering to you will be delivered in accordance with good and workmanlike standards and will be sufficient under applicable law." Okay, that's called a warranty of accuracy. With gen AI, you can't do that. Why? You won't know the answer, because you don't know how the model was trained. You have no idea. You don't look at every line of Claude code and have it vetted, because that defeats the whole purpose, right? So you cannot contractually warrant the accuracy of that Claude code. And what happens if you sign a contract that has that provision in it? You've committed breach of contract, just waiting to be sued.

Do you ever sign contracts warranting that you own the code? This is called a warranty of title. "Licensor hereby represents that it has good right, title, and interest in the code being licensed, sufficient to grant the rights hereby." How many times have you seen that in a software license? A million? You've already looked at it. With AI, you can't make that warranty. Why? Because you don't own it. You don't have a copyright in it.

Do you ever sign contracts indemnifying the other party for claims arising out of your gen AI? Anybody who licenses your code is going to make you offer what's called indemnification. And what indemnification is, is that if your customer gets sued because they use your code, you'll hire the lawyers to take care of it. That's indemnification. No sophisticated licensee will license software without indemnification. Are you willing to give indemnification to a licensee who is going to use your Claude code? I don't think your CFO or CEO would get on board with that.

#### The clown slide

Here is a very graphic, visual example. And I like what I said about AI content. The thing on the left is in fact AI content. I prompted Gemini or Meta to spit out the image on the left. Look at my prompt: "Imagine a scary clown living in a sewer that captures children." Did I say Stephen King? Did I say "It"? Did I say Bill Skarsgard? Did I say any of that in the prompt? And look what it spat out. That's because they've all been trained on "It." We know that. There are at least five layers of copyright protection in the image on the right, not excluding Bill Skarsgard's right of publicity. When you put out the image on the left as part of your Halloween festival and employee party or something, Bill Skarsgard is going to see this. The studio is going to see this. The movie is going to see this. The makeup artist is going to see this. The photographer is going to see this. Why would you assume that risk?

#### Loans securitized by IP

Okay, let's see. This is interesting. Look at the second-to-last one. Will you ever need a loan securitized by IP assets? Every loan deal I've done has the bank say, "Borrower," that's you, "is granting a security interest to the bank in all of your assets." And if you're a software company, that will include IP assets. Those are called intangibles. Can you give that warranty if you don't own them? No. What happens if you sign the loan docs anyway and get your $10 million loan? You're in breach of contract. When the bank catches you, they will sue you for breach of contract for violating the loan covenants. That's bad.

#### It's all academic until you get sued

We've got to jump in here. It's all academic, and this is true, it's all academic until you get sued. None of this matters until you get sued or have to sue somebody. Well, nobody's going to do that. I understand everybody's going to continue to Claude-code because it's fast and cheap. I get it. Can you use humans? Sure, but that's too expensive. So nobody's going to use human coders. You see the tension here, with what we just talked about for the last 35 minutes, and the realities.

What are you going to do to imbue your company with ownership of that code, so that you can sue them, you can register the copyright, you can monetize it, you can sell your company? What are you going to do? You can decide that the fact of who owns the code does not matter. No, that's not a rational business position. Let's see how you would say that: "Oh, no, copyright doesn't matter to the software company." I just beat you up for the last 35 minutes arguing that copyright does matter. Do we have any holdouts who still maintain copyright doesn't matter to the software company? Be brave. Be brave. You still argue that copyright doesn't matter to the software company, despite this? Well, we can discuss that offline, but I appreciate you for being brave. That's awesome.

### What to do: the summary slide and close

Here we go. You may just want to take a picture of this slide, or I can send you a copy of it. This is kind of like the summary of everything we're talking about here. Let's just go through it very quickly. What do you do to own your code? Use human authorship as much as possible. Remember that copyright is a qualitative, not a quantitative, exercise. Contract law is still a good tool to use. Remember something called selection, coordination, and arrangement. I advise you to try to use patent law when you can.

Well, there's my contact information. We're out of time. Reach out for a copy of the deck or for a free consultation. Thanks everybody for being here today. Reach out with the questions you have to continue our discussion. All right, have a good afternoon.

---

*This page reflects current U.S. copyright law and general international principles. It is provided for educational purposes and does not constitute legal advice. Editorial notes were added after the event to clarify or correct points as spoken; the underlying remarks are unchanged.*
