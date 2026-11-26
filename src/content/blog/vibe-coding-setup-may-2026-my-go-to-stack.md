---
title: 'Vibe Coding Setup May 2026 - My Go-To Stack for AI Development'
description: 'My May 2026 AI coding setup using Gemini, OpenCode, DeepSeek V4 Flash, and local LLMs to build apps without burning through my budget.'
pubDate: 2026-05-11
tags: [workflow, models]
featuredimage: /images/vibe-coding-setup-may-2026.png
---

Not long ago, learning to build full apps felt like a slog. I was deep in JavaScript and Python courses, typing out every single line by hand just to get small projects moving. There were plenty of frustrating nights and dead ends where I wondered if building full-stack apps solo was even realistic.

I had built and sold software before using no-code automation tools, so I knew there had to be a faster way to go from an idea to a working app.

With current AI coding tools, I spend much less time fighting boilerplate and more time deciding what the app should actually look like, what features belong in it, and how it should feel to use. Whether it is a local dashboard for my family like the [Sunshine Family Dashboard](/projects/sunshine-family-dashboard/) or [building an Astro site from scratch](/blog/hello-world-new-theme-new-vibe/), the bottleneck is mostly scoping the idea clearly instead of memorizing 15 frameworks.

## Why my stack keeps changing

I titled this post with the month because my setup keeps moving as model pricing and tools change.

Just last month I was using GitHub Copilot in VS Code for all my coding. Right before they made [pricing changes](https://github.blog/news-insights/company-news/changes-to-github-copilot-individual-plans/) to their individual plans, I saw things shifting and canceled my subscription.

For a little while I moved over to [RooCode](https://roocode.com/) using the [OpenRouter](https://openrouter.ai/) API with DeepSeek V3.2. It worked great, but when I added up what continuous daily use would cost over a full month, it was going to be too expensive for my budget.

Right around then, RooCode announced they were pausing development on their VS Code extension to focus on [RooMote](https://roomote.dev/), so I was back to looking for another setup. Someone in the RooCode Discord mentioned OpenCode and said they were having a great run with it.

## Moving to OpenCode Go and DeepSeek V4 Flash

I checked out the [OpenCode](https://opencode.ai/go?ref=GVKPC6ZTYN) Go plan and saw it was $5 for the first month and $10 after, with up to $60 of usage allotted per month. I figured I had nothing to lose and gave it a try.

The first few days I stuck with models I already knew like Qwen 3.6 Plus. It worked well, but at the pace I was coding, I was going to burn through my monthly usage limit early.

I was hesitant to switch models mid-project and risk breaking things, so I backed up the repo and tested DeepSeek V4 Flash. With reasoning set to high in OpenCode, it has been working really well for me. A lot of the time it gets a feature right in one shot and saves me both time and quota.

On full coding days I am usually working 6-10 hours and only using around $0.30 to $1.00 per day, which keeps me comfortably under the monthly cap.

## My core setup right now

- **[Gemini](https://gemini.google.com/app):** where I talk through rough ideas and narrow down the plan.
- **[OpenCode Go Plan](https://opencode.ai/go?ref=GVKPC6ZTYN)** (Desktop): where the agent reads the repo, plans changes, and writes the code.
- **[VS Code](https://code.visualstudio.com/):** where I review the files, make tweaks, and push things live.

## How the workflow runs

1. **Idea refinement:** I start with a rough concept and throw it into Gemini as a sounding board, asking what the app should look like and what features it actually needs.
2. **Planning:** Once the general direction makes sense, I ask Gemini to help scope the tech stack, modules, and build order so the project has a clean structure before any code gets written.
3. **Writing the master prompt:** I have Gemini turn that plan into a detailed prompt I can hand straight to my coding agent in OpenCode.
4. **Execution:** I paste the prompt into OpenCode's plan mode using DeepSeek V4 Flash on high reasoning. Once the agent maps out its plan and I check it over, I switch to build mode and let it write the changes while I monitor and test.

Splitting planning and execution like this lets me stay focused on the features and usability of what I am building instead of getting stuck in boilerplate. What are you working on building next?
