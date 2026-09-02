---
title: 'How My Dashboard Talks to My Agents - One Click From Task to Done'
pubDate: 2026-09-01
draft: true
tags:
  - ai-agents
  - hermes-agent
  - productivity
  - dashboard
description: >-
  I built a dashboard that pulls my whole day into one place. Then I wired it
  to my AI agents so a task can go from a checkbox to a working chat session
  with one click. Here is how it works and why I built it.
---

I run my work through a small team of AI agents now. One handles my plans and reviews, one turns plans into shipped code, one does research, one handles social. I wrote about [how I got here](/blog/how-my-coding-workflow-changed) a couple weeks back.

The catch: my work lived in too many places. Tasks in one app, notes in another, signups for my products scattered across a few databases, chat sessions buried in a desktop app. Every morning I spent the first hour re-gathering context I already had, just spread out. So I built a dashboard to pull it all into one place. Then I went one step further and wired it straight to my agents.

### Why I Built It

The dashboard is a single page that opens to my day. Greeting, my focus for today, my top tasks, and a row of numbers that tell me how the day is going: sessions started, messages sent, tasks done, commits made. Each number also shows yesterday's figure in grey, so I can see at a glance whether I'm moving or stalling.

It reads from the same places I work. It watches my repos and counts commits. It reads my Hermes session history and shows how much I actually got done. It pulls signup counts from my products (CopySprout, Moss Toolbox, Handmade Checker, GameScout) so I don't have to log into four backends to know how the week is going. It tracks my task streak, my goals, even my scheduled automations and their last run status. Everything in one tab instead of a dozen bookmarks.

That part alone was worth building. But the piece I keep coming back to is the dispatch button.

### The One-Click Dispatch

On the tasks page, every task has a button. Click it and that task becomes a real chat session with my main agent, named after the task, with the details attached: project, priority, due date, any extra context I typed in. The agent starts working immediately. If I click it again later, it continues the same session instead of starting a fresh one, so the work stays in one thread with its full history.

The first version waited for the agent to finish before it let go. That meant long tasks would sit spinning in the browser, and anything running over fifteen minutes got killed mid-flight. I changed it to fire-and-forget: the click launches the agent in the background and the dashboard moves on. The work happens in its own session, visible in the desktop app, and I can hand a task to a specific agent from there if it needs one.

It sounds like plumbing, because it is. But it's the plumbing I get the most use out of. A thought goes in as a checkbox, and a finished piece of work comes out the other end with its own home. No copying task text into a chat, no re-explaining what the task is, no hunting for where that work ended up.

### Everything in One Place

The dashboard also remembers the stuff I'd normally lose. Daily check-ins keep a streak going. Notes, projects, and a waiting list for things I'm blocked on. It reads my working memory and lets me search across all my past conversations. There's even a spot for my dreams, which has become a fun morning habit.

None of it is complicated on purpose. It's a FastAPI app with a single-page frontend, running on my own machine, reading the data my agents already produce. The point was never to build something impressive. The point was to stop re-collecting context every morning and have one place where everything shows up.

These tools are at their best when they connect to each other. My agents already know how I work. Now my to-do list knows how to reach them.
