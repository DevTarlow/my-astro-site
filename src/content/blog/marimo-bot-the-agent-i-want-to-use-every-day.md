---
title: Marimo Bot - The Agent I Want to Use Every Day
pubDate: 2026-10-19
draft: false
description: >-
  I rebuilt the core of Marimo Bot this month. Here is what changed, what the
  bot is allowed to improve on its own, and what still needs work before stable.
tags: [agents, local-first]
featuredimage: /images/marimo-bot-app.png
---

The first thing I want help with on my projects is all the writing around them: launch posts, product descriptions, and replies to reviews.

I have six projects going right now (CopySprout, Moss Toolbox, Pixel Juice Studio, Handmade Checker, IndieGameScout, and Background Swapper), and each one has its own voice, audience, and to-do list. Whenever I start a fresh chat with a regular assistant, I burn half my time re-explaining what the product is, who buys it, and how it should sound.

That is what I built Marimo Bot to fix. I wrote the longer backstory in [the case study](https://mossaistudio.com/projects/marimo-bot/), so here is the shorter version.

Marimo Bot is a desktop app that works inside a folder I choose. Marimo is the default bot I talk to, and I keep separate bots (Writer, Marketer, Researcher, Coder, Analyst, Personal assistant) with their own instructions, tools, memory, and model settings. The app doesn't bundle a model, so I point it at DeepSeek, Google Gemini, OpenCode Go, OpenRouter, or a local `llama.cpp` server on my machine with no account required.

## The rebuild

The first version worked for drafting and keeping chats organized, then I started a rebuild and realized the hard part was the core architecture rather than adding features. Checking my setup against what a reliable agent harness actually needs showed me I had too much complexity in the wrong places, so I stripped a bunch out and rebuilt around simpler rules.

Every turn now runs on a frozen, versioned spec over an append-only event log. If a bot's instructions get edited while an approval card is waiting, that in-flight turn doesn't switch rules mid-stream: it finishes with the spec it started on or stops cleanly. The old core had 23 invariants built out of real bugs and 1,471 tests, and I am carrying those forward instead of starting from zero.

## What self-improvement means here

I have wanted to try practical self-improvement in an agent for a while, and the rule I settled on is simple: the bot proposes, and I approve.

It can notice a fact about a project and ask to save it to memory, write down a repeatable workflow as a skill and show me the draft, or ask for a tool it needed. Every proposal waits in Learning with the reason and the conversation snippet it came from, and nothing gets saved without me accepting it.

Because memory feeds into every future conversation, a bad memory entry isn't a one-time mistake; it turns into a wrong assumption the bot carries forward everywhere. A bot can never change its own Role, Persona, or app rules, and it can never grant itself a tool (`run_shell` is never even proposed). If I reject a suggestion, it backs off for about six months and lists the refusals in Learning so I can clear them later. It can also suggest dropping the oldest fact when memory hits its cap, or retiring unused skills.

I care less about chasing a smarter model and more about the bot getting faster at my specific work, so the twentieth time I ask for a launch post takes far less explaining than the first.

## The companion window

The first thing people notice is the floating moss ball.

![The companion window with a short chat, the moss ball sitting above the message box](/images/marimo-bot-companion-ss.png)

It floats above my other windows with a quick chat bar that shares the same conversation as the main window, so a question I ask from the corner is waiting when I open the full app. Settings lets me control answer length, how many messages float above it, whether it stays on top, and whether clicks pass through it to the window behind (because an assistant that blocks whatever you are reading gets annoying fast).

## What I use it for

Most of my early usage was drafting blog and social posts with a Writer bot while Marimo kept the overall thread.

![A chat in the main window, with Marimo writing a new fact to memory while it answers](/images/marimo-bot-chat-screenshot.png)

I still proofread, edit, and put every piece together myself, though getting the rough busywork off my plate means drafts usually land closer to my voice than staring at a blank page.

## Where it is now

Marimo Bot is at `0.1.0` and under active development. I run it every day, hit rough edges, and fix them as I go.

Right now only the Linux AppImage has been built and tested; the Windows and macOS installers are written but not built yet, and there is no auto-updater, signed release, or public binary download yet. I am not putting a date on a stable release until I have run it long enough without losing data.

Until then, the source is public on [GitHub](https://github.com/DevTarlow/marimo-bot) under Apache-2.0, the core spec is in [docs/harness-v2.md](https://github.com/DevTarlow/marimo-bot/blob/main/docs/harness-v2.md), and the full feature list lives on the [project page](/projects/marimo-bot/).

If you are building your own agent, start with one repetitive weekly annoyance, give it a single folder to work in, and make sure it asks before changing anything.
