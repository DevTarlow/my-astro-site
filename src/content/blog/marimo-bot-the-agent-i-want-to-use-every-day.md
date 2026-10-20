---
title: Marimo Bot - The Agent I Want to Use Every Day
pubDate: 2026-10-19
draft: false
description: >-
  I rebuilt the core of Marimo Bot this month. Here is what changed, what the
  bot is allowed to improve, and what still has to happen before it's stable.
tags: [agents, local-first]
featuredimage: /images/marimo-bot-app.png
---

I want help with the writing around my projects. Launch posts, product descriptions, replies to reviews. That's the part I'd take off my plate first.

I have six projects going right now: CopySprout, Moss Toolbox, Pixel Juice Studio, Handmade Checker, IndieGameScout and Background Swapper, and they all have their own voice, their own audience, and their own list of things to do.

The problem is none of that carries over, so every new chat starts with me explaining what the product is, who buys it, how it should sound, and which project we're on. By the time the draft is any good, I've used up the time I wanted to spend on it.

That's what Marimo Bot is for. I wrote the long version of the problem in [the case study](https://mossaistudio.com/projects/marimo-bot/), so I'll keep this short.

It's a desktop app that works in a folder I choose. Marimo is the bot I talk to by default, and Writer, Marketer, Researcher, Coder, Analyst and Personal assistant are bots I make for work I repeat. Each one has its own instructions, tools, memory and model. The app carries no chat model, so I point it at DeepSeek, Google Gemini, OpenCode Go, OpenRouter, or a llama.cpp server on my machine. There's no account.

## The Rebuild

The first version worked: it wrote drafts, kept the chats, and ran the bots.

Then I started the rebuild, and the hard part turned out to be the architecture, not the features. I kept asking whether I was missing a piece a good agent harness needs, and most of the time the honest answer was that I had too much, not too little. So some of it stayed and some of it came out. And I'm still learning what matters, so I expect that to keep changing.

The new core is in now, and every turn runs on a frozen, versioned spec over an append-only event log, so nothing about a turn gets decided by something that can change halfway through it. If the bot's instructions change while an approval card is waiting, the card doesn't pick up the new rules. The turn started with one set of instructions, so it finishes with those, or it doesn't finish.

The old core had 23 invariants, each one from a real failure, and 1,471 tests. I'm carrying those across instead of starting clean.

## What Self Improvement Means Here

I've been thinking about recursive self improvement for a while. The rebuild is the first time I've had somewhere to actually try it.

The rule is simple. The bot proposes, and I approve. That's it.

It can notice a fact about a project and ask me to remember it. It can write down a way of working as a skill and show me what it's about to save. It can ask for a tool or a connector it kept needing, or suggest a change to how the bot runs. All of it waits in Learning, with the reason it gave and the part of the conversation it came from. Every one of those goes through me first.

Memory is the clearest example. After a conversation goes quiet, the app reads back what was said and proposes the facts worth keeping. A preference I mentioned once, a decision we settled on, how a project is set up. I see the line before it's written, and I accept it or I don't.

Why so careful? Because memory goes into every conversation after it. A wrong entry is not a wrong answer once. It's a wrong belief the bot carries into everything else.

A bot can't change its own Role, its own Persona, or the rules of the app, and it can never grant itself a tool. `run_shell` is never proposed, not once. If I say no, it remembers that for about six months and stops asking, and the Learning card lists the refusals so I can clear them. It also looks after its own notes: when memory is over the limit, it can suggest dropping the oldest fact, and when a skill hasn't been used in a while, it can suggest retiring it.

I don't need a smarter model, I need it to get quicker at my work. My projects, my tasks, my jobs, and the things it does for itself. The twentieth time I ask for a launch post, I want to explain less than I did the first time. That is what makes it feel like it's actually helping.

## The Companion

The first thing anyone notices is the moss ball.

![The companion window with a short chat, the moss ball sitting above the message box](/images/marimo-bot-companion-ss.png)

It floats above my other windows with its own chat bar, and it shares one conversation with the main window, so a question I ask from the corner is waiting for me when I open the app. How much should it show? Settings decides how long its answers run, how many messages float above it, whether it stays on top, and whether a click passes through it to the window behind.

That last one matters, because the companion is there when I want it and gone when I don't. A little assistant that sits over the thing you're reading is just in the way.

## What I Use It For

The first version was mostly blog work. A Writer bot drafted, Marimo kept the thread, and I edited. Social posts came next.

That's still the job, and I'm rebuilding the system around it so drafting isn't the only thing it's good at. But the busy part is what I want off my plate. I still proofread, edit, and put the final thing together.

What does the draft look like when it comes back? Closer to my voice than a blank page, most days.

## Where It Is Now

Marimo Bot is at 0.1.0 and still under active development. I use it every day: I fix something, use it, and find the next thing.

Only the Linux AppImage has been built and run. The Windows and macOS installers are written but not built. There is no automatic updater, no signed release, and no public download yet.

I'm not going to put a date on stable, because I would break it. When I call it stable, I mean I've used it for a while and haven't lost anything. That's the bar.

Until then I'm sharing the journey as I build it. The source is public on [GitHub](https://github.com/DevTarlow/marimo-bot) under Apache-2.0, the design for the new core is in [docs/harness-v2.md](https://github.com/DevTarlow/marimo-bot/blob/main/docs/harness-v2.md), and there's a [project page](/projects/marimo-bot/) with the full feature list.

What would you hand off first? If you're building your own agent, start with the task that annoys you every week, give it a folder to work in, and make it ask before it touches anything.

Until then, keep building.

~ Tarlow
