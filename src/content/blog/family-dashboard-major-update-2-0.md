---
title: Sunshine Family Dashboard Major Update v2.0
pubDate: 2026-06-27
description: Calendar, Weekly Planner, Recipe Hub, Stats & More.
tags: [family-dashboard, local-app, personal-project, web-development]
featuredimage: /images/sunshine-family-dashboard-dining-out-to-do-grocery-list.jpg
---

🎉 **Massive Update**: Sunshine Family Dashboard v2.0.0 is Live!

I’ve been working on a big overhaul for the dashboard, and v2.0.0 is finally ready!

This release is all about bringing more structure and insight to dashboard.

We now have a full Monthly Calendar with color-coded events, a dedicated Weekly Meal Planner that links directly to a brand-new Recipe Hub (which automatically grabs titles and images when you bookmark a link), and a Family Stats page with bar charts to track our dining, workouts, and to-dos over time.

There's also an Archive Page to dig up old notes or deleted items, and a revamped At-a-Glance Summary widget to check the weather, groceries, and expiring meal prep instantly.

Under the hood, things got a massive cleanup.

I completely refactored a monolithic 1,200-line actions file into 25 modular server action files, expanded the Prisma schema with 9 new models, and added full PWA support so you can install it right onto your phone like a native app.

Best of all, all the existing widgets you use daily still work exactly the same, and there are absolutely no new environment variables or extra setup steps required. Pull the latest image and enjoy the upgrade!

Check out the project on github: [Sunshine Family Dashboard Github](https://github.com/DevTarlow/Sunshine-Family-Dashboard/)