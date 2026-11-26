---
title: Building My Own Agentic Dashboard - Lichen, and the Agent Living Inside It
pubDate: 2026-09-27
description: Lichen grew out of Marimo Desktop as a local browser dashboard with its own built-in agent. Here is how I use it to run my day.
tags: [agents, models, local-first, dashboards]
featuredimage: /images/Lichen-Agentic-Dashboard.png
draft: false
---

There is a page in Lichen called Today that has become the first thing I open every morning.

It shows my focus for the day, the tasks I actually need to get done, and any notes I left myself the night before, along with overnight agent stats, what shipped, and what is waiting on my approval. I basically read it the way I used to read email.

![Lichen Agentic Dashboard](/images/Lichen-Agentic-Dashboard.png)

## The dashboard before this one

A few weeks ago I built a dashboard wired to Hermes Agent that pulled my tasks, notes, and session history onto one page with a one-click dispatch button ([wrote about it here](/blog/how-my-dashboard-talks-to-my-agents/)).

Then my stack changed when I moved off Hermes Agent onto Marimo Desktop ([covered in this post](/blog/how-my-stack-shifted-again/)), so the old dashboard was pointing at tools I wasn't using anymore. Instead of patching it, I rebuilt from Marimo Desktop outward and called the new one Lichen.

## What Lichen is

Lichen is a local browser dashboard with a Marimo agent built straight into it. Rather than bolting chat onto the side, the agent shares the same modules I work in all day: Today, Tasks, Notes, Prompts, Blog, Discord and Gateways, Social, Growth, and the Marimo tab itself.

## The daily pages

Today is where I start, and Tasks is where I track and close work with projects, priorities, due dates, and context. Clicking a task dispatches it as work.

Notes is my scratchpad for half-formed ideas or quick reminders about why I changed something, and Prompts holds the instructions I got tired of digging out of random folders. Nothing fancy, just the pages I actually open.

## Content, gateways, and growth

The Blog tab holds Hoshi's drafts alongside my edit queue so writing sits right next to my tasks instead of feeling like a separate chore. Discord and Gateways lets me read and answer outside messages without opening extra apps, Social handles post drafts in one column, and Growth tracks signups and sales across my projects.

Having the Marimo tab one click away from all of that saves me a big chunk of time I used to lose bouncing between windows.

## Routing models underneath

DeepSeek handles the thinking: direct API for heavy jobs, and OpenRouter when I want to avoid peak-hour slowdowns or swap in another model. Because the provider routing lives inside Lichen, Marimo just asks for a model and Lichen routes it cleanly without changing how the agent runs.

## Jobs that run overnight

Setting up scheduled jobs used to mean writing cron expressions and getting them wrong twice before they ran properly. Now I just ask in chat:

> "Take the overnight list of things I forgot to do, send me a discord message every morning at 8am with how I can fit them into my current schedule."

Marimo knows the modules in Lichen, wires up the job, and replies with what it scheduled. In the morning the overnight numbers, draft posts, and cleanups are waiting for me, and if a job ever fails, the error shows up right in the Marimo tab.

## Changing it whenever I want

The biggest difference from off-the-shelf tools is that I own every piece of Lichen. If a page annoys me, I rewrite it. If a module stops being useful, I pull it out. Several tabs started out as a single text box and a button before earning a full page.

For a long time, getting a workflow like this meant paying for a SaaS subscription and waiting on someone else's roadmap. Being able to build and tweak your own tools changes that tradeoff completely. Even my wife built her own dashboard hooked into her Hermes Agent after seeing how well it worked.

If you have been waiting for someone else to build the exact dashboard you want, start with one page reading one thing you check every morning and grow it from there.

*Lichen is early days and still in development (and so am I :D).*
