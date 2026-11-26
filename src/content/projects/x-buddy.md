---
title: XBuddy - Chrome Extension
pubDate: 2026-11-03
draft: false
category: Development
tags:
  - chrome-extension
  - local-ai
  - keyword-filter
  - privacy-first
  - tool
description: >-
  A Chrome extension for X that highlights keywords, hides noise, filters by
  follower and engagement counts, and drafts replies with a local model on
  your own machine.
github: https://github.com/DevTarlow/xbuddy
---

Most days the X feed is a firehose, and the posts I actually want to find get buried under everything else.

XBuddy is a Chrome extension I built to put some rules around that feed: positive keywords glow in a color you pick, negative keywords hide posts you never want to see, and feed rules filter by follower count or engagement numbers. When you open a reply, you pick a tone and a model on your own machine drafts a response into the composer so you can edit it before posting.

## What it does

Keyword glow highlights matching posts as you scroll (and updates posts already visible on the page), while negative keywords hide matching posts completely when enabled.

Feed rules filter on followers, following, comments, likes, and reposts using fewer than, more than, or between thresholds, up to 20 rules total (with hide rules taking priority over highlights). A master toggle pauses everything without wiping your config, each list supports search and five-item pagination, and highlighting a word or hashtag on X lets you right-click straight into either list.

![Feed Rules in the XBuddy popup](/images/x-buddy-feed-rules.png)

Magic Reply includes six tones (Generic, Agree, Connect, Disagree, Funny, and Informative), each with an editable prompt and a reply-length slider to keep drafts short, let them run longer, or leave length up to the model.

![The XBuddy popup with positive and negative keyword lists](/images/x-buddy-popup.png)

## Runs locally

Magic Reply connects to any OpenAI-compatible local server on `localhost` or `127.0.0.1` (`llama.cpp`, LM Studio, Ollama) with configurable URL, model, temperature, max tokens, and timeout in Settings.

![The reply tone and length settings](/images/x-buddy-reply-settings.png)

There are no accounts and no tracking. Posts and keywords go straight to your local model, and any local API key stays in Chrome's local storage.

## Where it is now

XBuddy is under active development and not on the Chrome Web Store yet, so you load it unpacked from GitHub. It works well, though X shifts DOM selectors occasionally so I fix them when they break.

## Install

Requires Chrome 111+ and a local OpenAI-compatible server:

1. Clone the repository.
2. Open `chrome://extensions`, turn on Developer mode, and click Load unpacked on the cloned folder.
3. Open `https://x.com`.

By default, Magic Reply points at `http://localhost:8080`, which you can change in Settings. I built it to help me grow on itch and keep my feed focused once I shift back to marketing, while I finish getting my core repos into shape.

I wrote about retiring SkyBuddy for XBuddy in [A Few Repos at a Time](/blog/a-few-repos-at-a-time/), and the old [SkyBuddy project page](/projects/skybuddy/) stays up as an archive.

[Get XBuddy on GitHub](https://github.com/DevTarlow/xbuddy)
