---
title: How I'm Building Moss Toolbox - A Growing Suite of Useful Tools
pubDate: 2026-08-21
draft: true
tags:
  - MossToolbox
  - MossAIStudio
  - AI
  - ProductLaunch
description: >-
  Moss Toolbox is my growing set of free web tools and AI powered member tools
  under one membership. Here is what is in it, how I am building it, and the
  friction I hit along the way.
---

Most of my tools start the same way. A small problem that keeps showing up, and a fix that's too useful to leave as a bookmark.

For a while, each tool got its own little site. It works, but it scatters. One tool here, one tool there, separate logins, separate payments, and every new idea means another domain to look after.

So I built one place for them. [Moss Toolbox](https://mosstoolbox.com) is where my tools live now. Free ones that anyone can use, AI powered ones behind one simple membership. It's live, it's growing, and new tools are getting built and tested all the time.

### What's In the Toolbox

The free tools are ready the second you open the page. No account, no sign-up, nothing to install:

- **Etsy Fee Calculator** - enter a sale price and see what you actually keep after fees
- **Etsy Listing Checker** - checks title length, tags, and description against the rules that matter
- **Etsy Photo Size Checker** - makes sure your photos meet Etsy's size requirements before you upload
- **ChatGPT Prompts Library** - ready-to-use prompts you can search, copy, and paste
- **Instagram Captions Library** - captions by vibe, from short and funny to travel and aesthetic

The first three are for Etsy sellers, the corner of my work I know best.

The member tools run on AI and cost one credit per use:

- **AI Image Prompt Generator** - describe the picture you want, get a detailed prompt ready for Midjourney, Flux, or any image tool
- **AI Product Name Generator** - tell it what you're selling, get names that don't sound like everything else on the shelf
- **AI Caption Generator** - subject and vibe in, three captions out
- **AI Custom Prompt Generator** - describe the job, get a custom prompt for ChatGPT or any chatbot

One membership covers every tool, including the ones I haven't built yet.

### Free Tools, Member Tools

The split is about cost, not greed.

Free tools run entirely in the browser. They cost me almost nothing to serve, so they stay free with no account, forever. That part is easy.

Member tools call real AI models, and every call costs me money. That's the same math I wrote about with [CopySprout](/blog/how-i-built-copysprout-an-ai-writing-tool-for-etsy-sellers), so the toolbox runs on credits: one credit per run, 1,000 fresh credits a month, $9.99 a month or $99 a year, cancel anytime. Predictable for me, predictable for the people using it.

### The Hard Parts

Building the tools was the easy part. The friction showed up everywhere else.

- **The headline.** I rewrote the front page headline about eight times in one night. Clever versions, punchy versions, one about the daily grind that read like a motivational poster. They all sounded like ads. The one that stuck is the plain one: "The Toolbox. Free tools built to save you time." It tells the truth without promising a revolution. I also learned to keep the price out of the hero. A number up front makes people bounce before they know what the thing is.

- **Letting an AI tool loose on the internet.** Member tools take free text and feed it to a model. If you let people type anything, the model will happily help with anything. So every generator has limits: input caps, filters for jailbreak attempts, hate, and private info like card numbers, plus a refusal line baked into each prompt. A blocked input never spends a credit, and a filtered result refunds it. It's not the glamorous part of building AI tools, but it's the part that makes them safe to leave running.

- **The plumbing.** Each tool looks small, but behind them sits the same shared stack I use for all my products: Firebase for auth and data, Stripe for payments, one backend. A new tool is a page and a function, not a new app. That's the whole point. I can keep adding tools without rebuilding anything.

### What's Next

It's a work in progress on purpose. I'm building toward a proper suite of useful tools for business people, marketers, and everyday users who want an edge without installing another app or learning another dashboard.

If you need a small job done and don't want to sign up for anything, start with the free tools. If you want the AI ones, the membership is one simple choice.

[Try Moss Toolbox →](https://mosstoolbox.com)

---

*P.S. Moss Toolbox is part of [Moss AI Studio](https://mossaistudio.com) - my shop for local-first, privacy-respecting tools. I wrote about building [CopySprout](/blog/how-i-built-copysprout-an-ai-writing-tool-for-etsy-sellers) and [Handmade Checker](/blog/handmade-checker-is-live-scan-etsy-listings-for-ai-generated-content-in-one-click) here too.*
