---
title: Sunshine Family Dashboard Major Update v2.0
pubDate: 2026-06-27
description: Calendar, Weekly Planner, Recipe Hub, Stats, and PWA support in Sunshine Family Dashboard v2.0.0.
tags: [dashboards, web-development]
featuredimage: /images/sunshine-family-dashboard-dining-out-to-do-grocery-list.jpg
---

Sunshine Family Dashboard v2.0.0 is out.

I have been working on a pretty big overhaul of the dashboard, and this release adds more structure around the things my wife and I track every week.

On the feature side, v2.0.0 adds a full Monthly Calendar with color-coded events, a Weekly Meal Planner connected to a new Recipe Hub (which grabs titles and images automatically when you bookmark a recipe link), and a Family Stats page with bar charts for dining out, workouts, and to-dos over time. There is also an Archive Page for pulling up old notes or deleted items, plus an updated At-a-Glance Summary widget so you can check the weather, groceries, and expiring meal prep on one screen.

Under the hood, I cleaned up a lot of early code too. I split a single 1,200-line server actions file into 25 modular action files, added 9 new Prisma models to the schema, and wired up full PWA support so you can install the dashboard onto your phone like a regular app.

All of the existing daily widgets still work the same way, and there are no new environment variables or extra setup steps. Just pull the latest image and you are good to go.

Check out the repo on GitHub: [Sunshine Family Dashboard](https://github.com/DevTarlow/Sunshine-Family-Dashboard/)
