---
title: How I'm Building Moss Toolbox - AI Tools That Know Your Business
pubDate: 2026-08-21
draft: false
tags:
  - launches
description: >-
  Moss Toolbox is my growing set of AI tools for small businesses. Fill in your
  profile once, every tool starts from it, and the credits are pay-as-you-go.
  Here is what is in the box and how I am building it.
featuredimage: /images/moss-toolbox-ai-tools.png
---

Most of my tools start the same way. A small problem that keeps showing up, and a fix that's too useful to leave as a bookmark.

For a while, each tool got its own little site. It works, but it scatters. One tool here, one tool there, separate logins, separate payments, and every new idea means another domain to look after.

So I built one place for them. [Moss Toolbox](https://mosstoolbox.com) is where my tools live now. It's live, it's growing, and new tools are getting built and tested all the time.

> Update, September 2026: the toolbox has changed since this was written. The free browser tools are retired, the monthly membership is gone, and the whole box is AI tools on pay-as-you-go credits. I've updated the details below to match.

### What's In the Toolbox

The toolbox is built around one idea: you shouldn't have to explain your business every time you open a tool.

You fill in a business profile once. Your name, what you sell, who buys it, how you write, your logo and colours, and the answers you give again and again. Every tool after that starts from it and only asks for what's new.

The tools cover the jobs that eat a seller's time:

- **Review Response Generator** - paste a customer review and get three replies in your tone, calm and professional even when the review isn't
- **Customer Reply Generator** - the same thing for a message from a customer
- **Product Listing Writer** - pick a product you've saved and get titles, a description in your voice, the features, and the tags that fit the platform
- **AI Image Prompt Generator** - describe the picture you want, get a detailed prompt ready for Midjourney, Flux, or any image tool
- **AI Image Studio** - generate an image from a description, then keep editing it in plain words until it's right

That's the whole box right now. New tools land as I build them, and every credit works on all of them.

### Why It Runs on Credits

The AI tools call real models, and every call costs me money. That's the same math I wrote about with [CopySprout](/blog/how-i-built-copysprout-an-ai-writing-tool-for-etsy-sellers/), so the toolbox runs on credits.

The first version of that was a subscription. The current one is simpler. A new account starts with 20 free credits, no card needed, so you can try any tool before you pay. After that you buy a pack when you need one: $3 for 100 credits, $5 for 250, or $7 for 500. They never expire, and there's nothing to cancel.

Most tools cost one credit per run. The AI Image Studio costs five per image, whether you create one or change one, and every tool shows its price before it runs.

### The Hard Parts

Building the tools was the easy part. The friction showed up everywhere else.

- **The headline.** I rewrote the front page headline about eight times in one night. Clever versions, punchy versions, one about the daily grind that read like a motivational poster. They all sounded like ads. The one that stuck then was the plain one: "The Toolbox. Free tools built to save you time." The headline has changed since the free tools retired, but the rule held. Say what the thing does and who it's for.

- **Letting an AI tool loose on the internet.** The tools take free text and feed it to a model. If you let people type anything, the model will happily help with anything. So every generator has limits: input caps, filters for jailbreak attempts, hate, and private info like card numbers, plus a refusal line baked into each prompt. A blocked input never spends a credit, and a filtered result refunds it. It's not the glamorous part of building AI tools, but it's the part that makes them safe to leave running.

- **The plumbing.** A tool looks like a single page, but there's a lot behind it: accounts, payments, credits. Once that plumbing is in place, a new tool is mostly a page and a function, not a whole new app. I can keep adding tools without rebuilding anything.

### What's Next

It's a work in progress on purpose. I'm building toward a proper suite of tools for small businesses and the people who run them, without another app to install or another dashboard to learn.

If you need a small job done, make an account and spend the 20 free credits. If you want more, buy a pack when you need one.

[Try Moss Toolbox →](https://mosstoolbox.com)
