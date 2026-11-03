---
title: X Buddy - Chrome Extension
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
  A Chrome extension for X that glows keywords, hides what you do not want,
  filters by follower and engagement counts, and drafts replies with a model on
  your own machine.
---

X is a feed I want to use on purpose. Most days it is a firehose, and the posts I came for are somewhere in it.

X Buddy is a Chrome extension that gives the feed rules, with keywords you care about glowing in a color you pick, keywords you never want to see hiding the post, and feed rules that hide or highlight posts by the author's follower count or by the comments, likes and reposts on the post.

Then there are the replies. Open a reply, pick a tone, and a model on your own machine writes a draft into the composer. You edit it before you post.

## What it does

Keyword glow takes positive keywords and a color. Matching posts stand out as you scroll, and posts already on the page update too.

Negative keywords hide matching posts completely. Negative filtering starts on, and an empty list hides nothing. The toggle turns the whole list off.

Feed rules work on counts: followers, following, comments, likes and reposts. Each rule is fewer than, more than, or between two numbers, and it either hides or highlights. You can keep up to 20. A hide rule wins over a highlight rule.

![Feed Rules in the X Buddy popup](/images/x-buddy-feed-rules.png)

And a master toggle pauses everything without losing your settings. Each list has search, five-item pages and a Clear All button. Select a word or hashtag on X, right-click, and it adds to either list, which is the part I use most when I am watching a topic for a while.

Magic Reply has six tones: Generic, Agree, Connect, Disagree, Funny and Informative. Each tone has its own prompt you can edit. A reply length slider keeps drafts short, lets them run longer, or hands the length to the model.

![The X Buddy popup with positive and negative keyword lists](/images/x-buddy-popup.png)

## Local, not a service

Point Magic Reply at any OpenAI-compatible server on localhost or 127.0.0.1. llama.cpp, LM Studio and Ollama all work. Choose the model, temperature, max tokens and timeout in Settings.

![The reply tone and length settings](/images/x-buddy-reply-settings.png)

There are no accounts and no tracking. Keywords and posts go to the model on your machine. If your server needs an API key, it stays in Chrome's local storage.

## Where it is now

X Buddy is under active development. But it is not on the Chrome Web Store, and the repository is not public yet, so there is nothing to install from this page.

It works, and it is rough in places, and X changes its site a lot, so a selector breaks now and then and I fix it.

I built it to help me grow on itch and keep my feed aimed at what I want to see. I will use it actively when I switch gears to marketing. Right now I am working on getting a solid foundation set back up after years away.

I wrote about the switch from SkyBuddy in [A Few Repos at a Time](/blog/a-few-repos-at-a-time/). The old extension is on its [project page](/projects/skybuddy/), kept as the archive.
