---
title: How My Stack Shifted Again - From Hermes Agent to a Harness of My Own
pubDate: 2026-09-17
description: Moving to the DeepSeek Harness for coding projects, DeepSeek v4.1 Flash through the direct API, and my own Marimo Desktop harness for everything else.
tags: [agents, models]
featuredimage: /images/marimo-desktop-screenshot.png
---

I moved my stack again.

Back in May I was coding inside VS Code with OpenChamber and steering every line. By August I had moved to Hermes Agent and stopped opening the editor altogether. Now I am running the DeepSeek Harness for coding projects and using my own Marimo Desktop app to handle the rest.

## What changed

OpenCode and the third-party harnesses are behind me now. For a long time my setup was a pile of separate tools that didn't talk to each other, and I spent more time and money than I want to admit patching the gaps between them.

Hermes Agent was the first setup that held my context and projects together in one place, which I wrote about in [how my coding workflow changed](/blog/how-my-coding-workflow-changed/). Marimo Desktop takes that a step further as a harness I built myself. It isn't meant for heavy coding (that is what the DeepSeek Harness is for); it handles my daily assistant tasks with my own tools, skills, memory, and agent profiles.

My first agent inside it is Hoshi, my blogging and social assistant, which I trained on my past posts so drafts start closer to how I talk. I still proofread, edit, and put the final post together myself, and whenever something in the workflow bugs me, I can fix it directly because I own the codebase.

## The two-model setup

Underneath it all I run DeepSeek v4.1 Flash through the direct API. The cost is low enough that I don't hesitate to hand off long debugging runs or multi-step features without watching a usage meter all day.

During peak hours I sometimes switch to OpenRouter and fall back to the older DeepSeek v4 Flash 0731 for smaller tasks that don't need as much reasoning. That keeps costs low and avoids slowdowns while saving DeepSeek v4.1 Flash for the heavier jobs.

## Tradeoffs with a more autonomous model

DeepSeek v4.1 Flash works much more autonomously than earlier models, which is both good and bad.

When I hand it a clear refactor or a batch of straightforward fixes, not stopping to ask questions is great. When I am working on something exploratory where I want to steer the shape of the feature, I still have to step in and guide it carefully. Like any tool, it comes down to picking the right jobs for it.

## Why this setup feels lighter

The two biggest improvements are cost and having fewer moving parts to babysit. Running one coding harness, one assistant harness I built myself, and a cheap direct API means less time gluing tools together and more time shipping.

If you are juggling a messy stack right now, try stripping it back to the smallest setup that gets your work done and adding pieces only when you actually feel the gap. Anthropic's [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) post is a good read on keeping agent setups simple before scaling them up.

Things move fast in this space, so we will see what changes next month, though for now I am happy staying right here... I think :D

*P.S. Marimo Desktop is my own agentic harness and still early in development. DeepSeek v4.1 Flash on the direct API is my daily driver, with DeepSeek v4 Flash 0731 on OpenRouter as my peak-hour fallback.*
