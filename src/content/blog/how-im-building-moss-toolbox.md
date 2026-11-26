---
title: How I'm Building Moss Toolbox - AI Tools That Know Your Business
pubDate: 2026-08-21
draft: false
tags:
  - launches
description: >-
  Moss Toolbox is my set of AI tools for small businesses. Fill in your profile
  once, every tool starts from it, and credits are pay-as-you-go.
featuredimage: /images/moss-toolbox-ai-tools.png
---

Most of the tools I build start from a small annoyance that keeps coming up. For a while I gave each tool its own separate site, which works until you end up maintaining five logins, five payment setups, and five different domains.

So I put them into one home at [Moss Toolbox](https://mosstoolbox.com).

> Update, September 2026: the toolbox has changed since this was written. The free browser tools are retired, the monthly membership is gone, and the whole box is AI tools on pay-as-you-go credits. I updated the details below to match.

## What is in the toolbox

The main idea is simple: you shouldn't have to re-explain your business every time you open a new tool.

You fill in a business profile once with your name, what you sell, who buys it, how you write, your logo and colors, and the background details you always end up typing. Every tool after that loads your profile automatically and only asks for what is specific to the task.

Current tools in the box:

- **Review Response Generator:** paste a customer review and get three replies in your own tone, even when the review itself is rough.
- **Customer Reply Generator:** the same setup for regular customer messages.
- **Product Listing Writer:** pick a saved product and generate titles, a plain-spoken description, features, and platform tags.
- **AI Image Prompt Generator:** describe the shot you want and get a detailed prompt ready for Midjourney, Flux, or another image generator.
- **AI Image Studio:** generate an image from text and keep tweaking it in plain words until it looks right.

## Why it runs on credits

Like [CopySprout](/blog/how-i-built-copysprout-an-ai-writing-tool-for-etsy-sellers/), every run calls a paid model, so the toolbox uses pay-as-you-go credits instead of a subscription.

New accounts get 20 free credits with no card required so you can try the tools first. After that, credit packs never expire and there is nothing to cancel: $3 for 100 credits, $5 for 250, or $7 for 500. Most tools cost 1 credit per run, and AI Image Studio costs 5 credits per generated or edited image, with the price shown before you run anything.

## The parts that took the real work

Wiring up the AI prompts was the straightforward part. The harder work was everything around them:

- **Writing a plain headline:** I rewrote the homepage headline about eight times in one night trying to avoid sounding like a cheesy motivational ad, and ended up sticking to the rule of just saying plainly what the tool does and who it is for.
- **Filtering public text inputs:** If you let users type free text straight into a hosted LLM, people will try prompt injections or junk inputs. Every tool runs input limits, safety filters, and refusal guards, and a blocked or filtered run automatically skips or refunds the credit.
- **Setting up the shared plumbing:** Auth, billing, and credit balances took time upfront, but now adding a new tool is mostly building one page and one backend function instead of standing up a new app from scratch.

If you run a small shop and want to try it out, create an account, spend the 20 free credits, and see if any of the tools save you some time: [Try Moss Toolbox](https://mosstoolbox.com)
