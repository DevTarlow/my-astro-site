---
title: Hello, World. New Theme, New Vibe.
pubDate: 2026-05-08
description: 'I rebuilt my Astro blog theme in 2 days using Gemini and OpenCode. Here is how it went and what it cost.'
tags: [web-development]
featuredimage: /images/tarlow-old-site-preview.png
---

I wanted a site layout that stayed out of the way of the writing. I liked the space theme I was using before, but it felt a bit too busy when you were actually trying to read a post.

So I started building my own Astro theme from scratch and finished it in 2 days.

## Built with

- Astro 6
- Tailwind CSS 3
- TypeScript

## Theme

Minimal Modern Hipster: Digital Paper (`#F9F9F8`) surfaces, Terracotta (`#C05746`) accents, Lora for headings, and Inter for body text.

## How I built it

I talked through the idea with AI to narrow down the layout, put together a plan, and write the code. Here is the exact flow I used:

1. Asked [Gemini](https://gemini.google.com/app) (using a custom notebook with a system prompt tailored to how I build projects) to help refine the theme idea and a few design details.
2. Had Gemini turn that into a clear prompt for an agent in OpenCode.
3. Pasted the prompt into [OpenCode](https://opencode.ai/) desktop and worked through the codebase to build out the pages and styles.
4. Used OpenCode again to review the project against the codebase and catch anything I missed before shipping.
5. Pushed the site live to GitHub Pages.

The whole build from plan to live site cost $0.68 in credits on OpenCode's Go plan using DeepSeek V4 Flash. That plan is $5 for the 1st month and $10 after, with up to $60 of monthly usage under hourly, weekly, and monthly limits. After having to find an alternative to GitHub Copilot, having a setup where I can build all day without constantly hitting quota walls has been a relief.

## What is next

Next up are a few site tweaks, some new guides, and some downtime with my dog, Sunshine.

After that, I am jumping back into a couple of projects, including a big update for the [Sunshine Family Dashboard](/projects/sunshine-family-dashboard/) that rewrites a bunch of its features. I will post more on that once it is ready.
