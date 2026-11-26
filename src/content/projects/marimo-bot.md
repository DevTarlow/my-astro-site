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
  A local-first desktop agent that works inside a folder you choose, keeps
  project memory organized, and delegates writing and growth tasks to bots you
  configure. Under active development.
image: /images/marimo-bot-app.png
---

I have six projects going right now (CopySprout, Moss Toolbox, Pixel Juice Studio, Handmade Checker, IndieGameScout, and Background Swapper), and each one has its own voice, audience, and backlog. The part I wanted help with first was all the writing and growth work around them, because opening a generic chat window meant re-explaining the product, the buyer, and the tone every single time.

So I built Marimo Bot, a desktop app that works inside a folder you choose. Marimo is the main bot I talk to, and I keep specialized bots (Writer, Marketer, Researcher, Coder, Analyst, Personal assistant) with their own instructions, tools, memory, and models. The app doesn't bundle a model or require an account; I point it at DeepSeek, Google Gemini, OpenCode Go, OpenRouter, or a local `llama.cpp` server.

## The companion stays out of the way

The floating moss ball sits over my other windows with its own quick chat bar that shares one conversation with the main window, so anything I ask from the corner is waiting when I open the full app.

![The companion window with a short chat, the moss ball sitting above the message box](/images/marimo-bot-companion-ss.png)

Settings controls answer length, how many messages float above the ball, always-on-top behavior, and click-through mode so the companion never blocks whatever you are reading underneath. I use the main window for longer work and the floating ball for quick questions while I am coding.

## Spaces, memory, and handoffs

Each Space maps to a local folder. The app only reads and writes inside that folder, keeps chats tied to the project, and lists existing markdown files in the Documents drawer.

Memory has two layers: general facts about me follow me across Spaces, while project notes stay with the project. Clicking "Not quite" on a reply saves the correction for future chats, and since memory is plain markdown, I can inspect or edit it outside the app.

![A chat in the main window, with Marimo writing a new fact to memory while it answers](/images/marimo-bot-chat-screenshot.png)

One bot can delegate to another: `ask_agent` asks a helper inside the same thread, while `start_task` spawns a background conversation and posts the result back when done. Delegation depth is capped at one (helpers cannot spawn helpers, up to three per turn) so costs and logs stay predictable.

## The harness rebuild

I rebuilt the core runtime so every turn executes on a frozen, versioned spec over an append-only event log. If you edit a bot's rules while an approval card is waiting, that in-flight turn finishes on the spec it started with instead of mixing old and new rules mid-turn. The previous core had 23 invariants built from real bugs and 1,471 tests, which I am carrying into the new runtime.

## Approval-gated learning

Whenever a bot notices a useful fact, drafts a reusable `SKILL.md` procedure, or wants to tweak recall or tool-call limits, the suggestion waits in Learning with the exact quote and reason behind it until I approve.

If I reject a suggestion, it backs off for about six months and logs the refusal in Learning so I can clear it later. When memory hits its limit or a skill goes unused, it can suggest pruning, again waiting for my yes. Bots can never propose edits to their Role, Persona, or app rules, and `run_shell` is never proposed on its own.

## Where it is now

Marimo Bot is at `0.1.0` under active development and I use it daily. Right now only the Linux AppImage has been built and tested; Windows and macOS installers are written but not built yet, and there is no auto-updater or signed public binary yet.

The source is public on [GitHub](https://github.com/DevTarlow/marimo-bot) under Apache-2.0, the core architecture lives in `docs/harness-v2.md`, and [marimobot.com](https://marimobot.com/) covers the current feature set and rough edges honestly. Most agent tools take an afternoon of config before you can ask a simple question; I wanted one I can open in a folder, customize as I go, and trust to ask before making changes.
