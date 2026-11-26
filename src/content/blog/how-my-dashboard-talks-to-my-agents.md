---
title: 'How My Dashboard Talks to My Agents - One Click From Task to Done'
pubDate: 2026-09-01
draft: false
tags:
  - agents
  - dashboards
  - workflow
description: >-
  I built a local dashboard to pull my tasks, notes, and product metrics into
  one screen, then wired it to my agents so any task launches a chat session in
  one click.
featuredimage: /images/hermes-custom-dashboard-tarlow.png
---

Right now I run most of my work through a small group of AI agents (plans/reviews, coding, research, and social), which I wrote about in [my workflow post](/blog/how-my-coding-workflow-changed/).

The annoying part was that my context was scattered everywhere. Tasks sat in one app, notes in another, product signups across separate databases, and agent sessions buried inside a desktop app. Every morning I spent the first hour just pulling information together that I already had.

So I built a local dashboard to put it all on one page, and then wired it directly to my agents.

## Why I built it

The main page opens straight to my day: a greeting, today's focus, my top tasks, and a row of daily counters for sessions started, messages sent, tasks finished, and commits made. Each counter shows yesterday's number next to it in grey so I can tell quickly if I am making progress or stalling out.

Because it runs on my own machine, it reads straight from the places I already work. It watches my repos for commits, reads my Hermes session history, tracks my task streak and scheduled automations, and pulls signup counts across CopySprout, Moss Toolbox, Handmade Checker, and GameScout so I don't have to log into four separate backends just to check the week's numbers.

## One-click task dispatch

The feature I use the most is the dispatch button on the tasks page.

Click it on any task and it opens a real chat session with my main agent, named after the task, with the project, priority, due date, and notes already attached. The agent starts working right away. If I click the same task again later, it resumes that existing session instead of starting from scratch, so all the context stays in one thread.

My first version waited for the agent to finish before returning, which meant long tasks sat spinning in the browser and anything over fifteen minutes got killed mid-run. Switching it to fire-and-forget fixed that: clicking dispatch starts the session in the background, shows up in the desktop app, and lets me keep moving or hand the task off to a specific agent if needed.

It is simple plumbing, but it saves me from copying task descriptions into chat boxes, re-explaining the background, and losing track of where a piece of work ended up.

## Everything in one place

The dashboard also holds daily check-ins, notes, project status, a waiting list for blocked tasks, searchable chat history across past conversations, and even a spot for my 2am agent dreams.

Under the hood it is just a FastAPI backend with a single-page frontend running locally on my machine and reading the files my agents already write. I didn't want anything complicated, just one tab where everything meets so I stop wasting my mornings re-collecting context.
