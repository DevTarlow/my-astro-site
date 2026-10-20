---
title: Marimo Bot - A Desktop Agent That Grows With You
pubDate: 2026-10-19
draft: false
featured: true
category: Development
github: https://github.com/DevTarlow/marimo-bot
url: https://marimobot.com/
tags:
  - agents
  - desktop-app
  - electron
  - local-first
  - tool
description: >-
  A desktop agent that works in a folder you choose, keeps a memory that follows
  you, and hands the writing and growth work to bots you make. Under active
  development.
image: /images/marimo-bot-app.png
---

I keep six projects going. CopySprout, Moss Toolbox, Pixel Juice Studio, Handmade Checker, IndieGameScout and Background Swapper, and each one has its own voice, its own audience, and its own list of things still to do.

The work I want help with is the writing and growth around them. Launch posts, product copy, the reply to a review. And every new chat made me explain what each product is, who buys it, how it sounds, and which project we are talking about today.

A chat window can hold a conversation. It can't keep a project's files and voice in one place.

So I built Marimo Bot.

It's a desktop app that works in a folder I choose. Marimo is the bot I talk to by default. Writer, Marketer, Researcher, Coder, Analyst and Personal assistant are bots I make for work I repeat, each with its own instructions, tools, memory and model.

The app carries no chat model. I point it at DeepSeek, Google Gemini, OpenCode Go, OpenRouter, or a llama.cpp server on my machine. There's no Marimo account.

## The companion stays out of the way

The moss ball floats above my other windows with its own chat bar, and it shares one conversation with the window, so a question I ask from the corner is waiting for me when I open the app.

![The companion window with a short chat, the moss ball sitting above the message box](/images/marimo-companion.png)

Settings decides how long its answers run, how many messages float above it, whether it stays on top, and whether a click passes through it to the window behind. That last one sounds small. It isn't. A companion that sits on top of the thing you're reading is just in the way.

I use the window for real work and the ball for the small stuff. What's next on my list? What did I say I was going to post today? Ask it, keep typing, and the answer is there later.

## A folder, a memory, a handoff

A Space is a folder. The app can read and write the files in it and nowhere else, and the chats I start there stay with the project, so any markdown already in the folder shows up in the Documents drawer.

Memory has two layers: a fact about me follows me between Spaces, and a note about how a project is set up stays with that project. When an answer misses I press Not quite, and it keeps the correction for the next time it reads that chat. The memory file is plain markdown, so I can read it without the app.

One bot can hand work to another, so Marimo takes the request, Writer drafts, and Marketer checks the angle. `ask_agent` asks a helper a question in the same chat. `start_task` gives it its own conversation, returns right away, and posts the result back when it's done.

Depth is one by construction.

A helper can't start a helper, and three helpers per turn is the limit. That's on purpose. A bot that can fan out with no limit is a bill I can't predict and a log nobody can read.

## The harness rebuild

I reworked the core of the app this month. Every turn now runs on a frozen, versioned spec over an append-only event log, so nothing about a turn gets decided by something that can change halfway through it. If the bot's instructions changed while a card was waiting, that card doesn't resume on the new ones.

The old core had 23 invariants, each one from a real failure, and 1,471 tests, and I'm carrying those across instead of starting clean.

## Learning

The rebuild is also where I learned the most about recursive self improvement. The app has a place for it now, called Learning. A bot can ask me to remember a fact, ask for a tool or a connector it kept needing, or suggest a change to how it runs. Each request waits in Learning with the reason it gave and the part of the conversation it came from.

A memory suggestion shows the sentence it was drawn from, so I can check the fact before I keep it. A change to how it runs covers how memory is recalled, how much room a turn has before it is compacted, and how many tool calls a turn may spend. If I say no, it remembers that for about six months and stops asking, and the Learning card lists those refusals so I can clear them.

It looks after its own notes too. When memory passes the limit I set, it can suggest forgetting the oldest fact. When a skill has not been used in a while, it can suggest retiring it. Both wait for me.

A skill is a procedure the bot can pick up: a folder with a `SKILL.md` inside, a short note and the steps underneath. It sees the name and the note in every conversation and reads the steps only when a task matches, and the app keeps earlier versions so the old wording is still there when the new wording turns out worse.

The agent never proposes an edit to the Role, the Persona, or the app's own contract. Those are mine to write. It never grants itself a tool, and `run_shell` is never proposed at all. Nothing applies itself.

That's the part I care about most. I want an agent that shows me the change and waits for a yes, so I can hand it a folder and not worry about what it does when I look away.

## Where it is now

Marimo Bot is at 0.1.0, under active development, and I use it every day. I fix something, use it, and find the next thing.

Will it run on your machine? Only the Linux AppImage has been built and run. The Windows and macOS installers are written but not built. There is no automatic updater, no signed release, and no public download yet.

The source is public on [GitHub](https://github.com/DevTarlow/marimo-bot) under Apache-2.0, and the design for the rebuilt core is in `docs/harness-v2.md`. There's a site for it now at [marimobot.com](https://marimobot.com/), and it tells the truth about where things are: under active development, expect rough edges.

If you want to follow along, you don't have to wait for a download, because I'm in the repo most days and the commits show what I changed and why.

I'll announce it here when it's stable and ready for people to use. Until then it's a development project, and I'm sharing the journey.

## What I'm aiming for

Light, easy to use, and something that grows with you. I haven't found that tool yet, so I'm building it.

Most agent tools want a workstation, a config file, and an afternoon. I want one I can open, ask, and close. From there, it should learn how I work and ask before it does anything loud.

And I hope it helps a few people see that the tool you need is one you can build yourself.

What are you dreaming of building next? Start it today, even if it's small.
