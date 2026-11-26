---
title: The 2am Cron Job - Letting My AI Dream While I Sleep
pubDate: 2026-09-07
draft: false
tags:
  - agents
  - workflow
description: >-
  I set up a 2am cron job that lets Hermes Agent wander through my memory and
  recent work without a task list, then sends me a short morning summary.
featuredimage: /images/how-i-built-an-ai-that-dreams-for-me.jpg
---

Every night at 2am a cron job wakes up on my machine. It doesn't check email or run backups. I set it up to dream.

I wanted to see what an AI would come up with if I gave it a night shift with no task list and no optimization goal. The prompt basically says: here is everything you know about me and what I have been working on lately, take three minutes to wander through it and write down what stands out.

It is probably the weirdest tool I have built, and also the one I look forward to reading most in the morning.

## What it actually does

At 2am, a Hermes Agent session spins up, reads my memory files, checks my recent projects and conversations, and spends three minutes writing free-form notes without worrying about staying practical. It saves a three-to-four-page dream report locally, usually ending with a few concrete ties back to what I am building.

At 7am, a second cron job reads that report and sends me three short highlights (one or two sentences each) grounded in what I am working on that week.

## What shows up in the reports

The first morning I read one, I laughed out loud. It wrote about a workshop lit by screens at 2am with a clipboard hanging on the wall that held every line I had ever copied, calling it a tool that lives in the house instead of the storefront.

I had just finished building a GNOME clipboard history extension, so it knew about that, but the framing hit close. Out of everything I had built, that extension was the tool I opened every single day because I built it out of my own annoyance.

A lot of the reports circle around the same night crew: the YouTube watcher checking view counts at 9pm, the dream job at 2am, backups at 3:30am, and my check-in at 7am. On another night it wrote about a "garden of small judgments" (saved posts, rejected drafts, copy edits), which turned into a real idea I am working on: building a taste profile from edits I keep or throw out so first drafts land closer to my actual voice.

## The clipboard crash story

One week's dream report opened with the clipboard extension again, joking that I built a box one night and it nearly threw me out of the house.

That actually happened. I stayed up too late on that GNOME extension, misnamed a keybinding against its schema, crashed the shell, disabled all my extensions, and forced a logout before fixing it. The report took that mess and pointed out that my best product lane is local-first, one-time-price tools born out of my own daily friction rather than scanning forums for startup ideas.

## Looking back at the automation setup

What makes this setup funny to me is that I have been building automation tools since my BoosterBots days. Back then, the scripts and bots ran overnight for customers doing social and marketing work. Now that same automation mindset is pointed inward: one script watches store numbers, one runs backups, one writes dream notes, and one summarizes the morning for me.

One report even caught a real gap in the crew: the Moss Toolbox free-tier funnel went live on September 4, and I had no overnight job diffing signups, credit spends, and free-to-paid conversions. That went straight onto my to-do list.

## Why I keep it running

A dreaming cron job is obviously not a product I am trying to sell. In the middle of a week spent fixing bugs and wiring up dashboards, it is just the one piece of writing about my work that still surprises me and connects dots I hadn't noticed.

If you run a local assistant or agent, try giving it a loose overnight job with no specific deliverable and see what turns up in your morning summary.

*P.S. Hermes Agent runs the 2am dream job along with my morning check-ins and backups. The GNOME clipboard extension is staying a personal tool for now while I see if it makes sense to polish later.*
