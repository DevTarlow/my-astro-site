---
title: Building My Own Agentic Dashboard - Lichen, and the Agent Living Inside It
pubDate: 2026-09-27
description: I built a dashboard that talked to Hermes Agent. This one grew out of Marimo Desktop, and it has its own agent built in. Here is what Lichen does for me.
tags: [marimo, ai-agents, dashboard, local-first, hermes-agent, deepseek, openrouter]
featuredimage: /images/Lichen-Agentic-Dashboard.png
draft: false
---

There is a page in Lichen called Today. It is the first thing I open in the morning.

It shows my focus for the day, the tasks that are actually mine today, and the notes I left for myself last night. Under that sit the numbers I care about: what my agents did overnight, what shipped, what is waiting on me. I read it the way I used to read email.

![Lichen Agentic Dashboard](/images/Lichen-Agentic-Dashboard.png)

## The Dashboard Before This One

I built a dashboard a few weeks back that talked to Hermes Agent. It pulled my tasks, my notes and my session history onto one page, and it had a dispatch button that turned a task into a real chat session with an agent. I wrote the whole thing up in [How My Dashboard Talks to My Agents - One Click From Task to Done](/blog/how-my-dashboard-talks-to-my-agents).

Then my stack shifted. Hermes Agent went behind me, Marimo Desktop took its place, and I told that story in [How My Stack Shifted Again - From Hermes Agent to a Harness of My Own](/blog/how-my-stack-shifted-again). The old dashboard was still pointed at a world that no longer existed. So I started again, this time from Marimo Desktop outward.

The new one is Lichen.

## What Lichen Is

Lichen is my agentic dashboard that runs locally in the web browser, and there is a Marimo agent living inside it. Not bolted on. Built in. The same harness that bridges gaps for me during the day now has a room in the house it can work from.

The modules are the parts of my week I kept losing track of. Today. Tasks. Notes. Prompts. Blog. Discord and Gateways. Social. Growth. Marimo.

## The Daily Pages

Today is the one I open. Tasks is the one I close things in which helps guide my agent Marimo.

Tasks holds everything with a project, a priority, a due date and any extra context I typed in. Click a task and it becomes work. Notes is the scratch pad that survives the day: a half-formed idea, a line I want to use, the reason I changed something. Prompts is where the instructions that repeat live. The ones I got tired of retyping. I used to keep those in a folder with names I could not remember. Now they have a screen.

None of this is complicated on purpose. That is the point.

## The Outside Pieces

Blog is the other half of my writing. Hoshi drafts, I edit, and the post ends up here. Having that queue in the same window as my tasks means I stop pretending writing is a separate job.

Discord and Gateways is where my agents and I meet in the middle. Messages come in from the outside through a gateway, and I read and answer them without opening a second app. Social is the same idea pointed outward, drafts and posts in one column.

Growth displays my current project sign-ups and sales, that's one worth checking.

Then Marimo the agent, one tab over from the work it is helping with. I can ask it something, hand it a task, or watch it run. Between the tabs, it gives me back a chunk of the day I used to lose to switching windows.

## The Models Underneath

DeepSeek runs the thinking. Direct through the API for the heavy work, and OpenRouter when I want to avoid peak times or pull in a model from somewhere else.

I keep the provider routing inside Lichen. Marimo asks for a model and Lichen decides which provider answers and hands back the result. I can swap the provider for a task without touching how the agent talks, and OpenRouter sits on the shelf until a day I need it.

## The Jobs That Run While I Sleep

Scheduling used to mean a cron line I would get wrong twice before it worked. Now I ask for it in the chat panel.

"Take the overnight list of things I forgot to do, send me a discord message every morning at 8am with how I can fit them into my current schedule."

Marimo sets the job up for me. It knows the modules in the house, so it can point the job at the right one and tell me what it set running. I get that back as a normal reply in the chat, same as anything else I ask for.

What comes back is waiting in the dashboard before I open it. The overnight numbers on Today, the posts Hoshi drafted, the cleanup I do not want to think about. A job that fails writes its error where I will see it in the Marimo tab.

None of that is run by me at the time it happens. I describe the job once, Marimo sets it up, and we move on.

## I Can Change It

This is the part the old dashboard never had. Lichen is mine from the shell inward. A page that annoys me gets rewritten. A module I stop using gets pulled out. Some of these started as one text box and a button before they earned a tab.

When something is wrong, I change it. I am the one holding the wrench.

## Why This Feels Like the Future

For a long time a system like this meant a subscription, someone else's roadmap, and a request form. That trade is over. You can build the thing you actually use, and change it the week your habits change.

I think that is where this goes. Everyone with a workflow they care about ends up with a small system of their own. Not because it is fashionable. Because we can build and fix almost anything now, and once you can, the store-bought version stops making sense.

If you have been waiting for someone to build the dashboard you want, start with one page. One thing it reads. Watch which tab you open first every morning, and grow it from there.

My wife started this way and now she also made her own dashboard that hooks into her Hermes Agent.

*Lichen is early days and currently under development.*

So am I :D

Good things take work, and my dashboard is a constant work in progress.

Keep growing and building.

~ Tarlow