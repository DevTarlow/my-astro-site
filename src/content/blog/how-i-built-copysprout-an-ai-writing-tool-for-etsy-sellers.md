---
title: How I Built CopySprout - An AI Writing Tool for Etsy Sellers
pubDate: 2026-08-08
draft: false
tags:
  - launches
  - etsy
description: >-
  CopySprout is my subscription AI writing tool for Etsy sellers. Here is how I
  built it, why it uses a subscription, and what shipping my first solo SaaS
  taught me.
featuredimage: /images/copy-sprout-hero-section.png
---

A few weeks after launching [Handmade Checker](/blog/handmade-checker-is-live-scan-etsy-listings-for-ai-generated-content-in-one-click/), I noticed the other side of the Etsy problem. Handmade Checker helps shoppers spot fake AI listings, while real sellers who actually make things by hand have the opposite headache: writing all the product descriptions, shop announcements, renewals, and social posts takes forever when they would rather be making their products.

Most AI writing tools are aimed at marketers and spit out stiff ad copy full of buzzwords like "unleash" and "supercharge." Etsy sellers don't need that. They just need plain words that sound like a real shop owner.

So I built [CopySprout](https://copysprout.app/).

[![CopySprout Logo](/images/copy-sprout-logo-white.png)](https://copysprout.app/)

## What CopySprout does

CopySprout is a subscription AI writing tool built specifically for Etsy sellers, with sixteen focused tools for everyday shop tasks like product descriptions, renewals, announcements, and review replies.

![CopySprout Tools](/images/copy-sprout-tools.png)

Here is how it works:

1. Pick a tool (product description, renewal, announcement, or review reply).
2. Answer a few plain questions about what you make, who buys it, and what you want to mention.
3. Get a draft you can paste straight in or edit, or click once to try another take.

No marketing jargon and no complicated prompt engineering.

![CopySprout Review Response](/images/review-response.png)

## Why I went with a subscription

I have been shipping software since 2014, and for most of that time I sold one-time licenses and zip files. CopySprout uses a subscription for two practical reasons.

First, every generation calls a hosted AI model and costs me money per request. If I charged a single one-time fee, heavy users would cost more than the sale within a few months and the product wouldn't stay sustainable.

Second, a subscription keeps the incentives honest: I have to keep paying for the API, fixing bugs, and improving the tools every month, and if you stop getting value out of it, you cancel.

Instead of a limited free tier, there is a trial and two straightforward plans:

- 7-day free trial: 100 creations, card at checkout, cancel anytime
- $4.99/month: 500 creations a month
- $49.99/year: two months free

## How I built it

CopySprout runs on Astro and Tailwind for the frontend, Firebase for auth, database, and cloud functions, and Stripe for billing. The AI generation calls DeepSeek from the server so prompts and keys stay out of the browser.

## What I learned shipping it

Building CopySprout solo taught me three things right away:

- **Ship the core tools first:** I cut extra features that sounded nice on paper and shipped only the tools sellers actually use week to week.
- **Keep the UI as plain as the output:** The hardest part was keeping marketing language out of the app itself. If the tool is supposed to write like a real person, the interface should talk like one too.
- **Test the full payment flow yourself:** I paid for my own subscription, went through checkout, signed up, and hit the quota limits myself. Any friction you feel as the developer will be ten times worse for a real customer.

## What is next

To be upfront about where things stand: CopySprout is live and finished, and it does not have paying customers yet. Now comes the part I can't code my way through, which is getting it in front of the Etsy sellers who actually need it.

If you run an Etsy shop and hate staring at a blank description box, give it a look: [Try CopySprout](https://copysprout.app)

*P.S. CopySprout is the second public product from [Moss AI Studio](https://mossaistudio.com). The first was [Handmade Checker](/blog/handmade-checker-is-live-scan-etsy-listings-for-ai-generated-content-in-one-click/).*
