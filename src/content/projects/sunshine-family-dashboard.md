---
title: 'Sunshine Family Dashboard'
description: 'A simple private, self-hosted digital dashboard to keep your family organized and your data/lifestyle off the internet.'
image: '/images/sunshine-family-dashboard-screenshot.jpg'
github: 'https://github.com/DevTarlow/sunshine-family-dashboard'
tags: ['self-hosted', 'homelab', 'local-first', 'dashboard', 'nextjs', 'react', 'prisma', 'typescript']
featured: true
---

![Screenshot](/images/sunshine-family-dashboard-screenshot.jpg)

The **Sunshine Family Dashboard** is a lightweight, local-first web app designed to be a simple but effective home dashboard.

Packaged in a single Docker container and built with Next.js and SQLite, it allows your family to manage weekly dinner menus, shared grocery lists, daily to-dos, keep track of fitness days, track eating out costs, and take sticky notes.

It also features a live local weather widget and a rotating carousel of your favorite family photos.

The dashboard uses your local LLM to generate unique recipe ideas, custom toast alerts, and generate a vibe of the day. All AI data is processed through your local LLM which can be setup in settings.

Built with privacy in mind, Family Dashboard requires no cloud databases or subscriptions and it runs entirely on your own local network, ensuring your family's data stays fast, secure, and 100% yours.

This is something my wife and I use daily, so I figured some of you may too. Give it a try!


![Screenshot](/images/sunshine-family-dashboard-dinners-fitness.jpg)

One of my favorite features of the dashboard is the **Weekly Dinners** section. You can keep track of what's for dinner so the whole family knows what's for dinner! You can also drag to re-arrange dinner days or leave comments.

Get a little boost of inspiration with the **Weekly Fitness** tracker where you can easily log the days you did your workout, get achievements, and inspire the other members in the family.

![Screenshot](/images/sunshine-family-dashboard-dining-out-to-do-grocery-list.jpg)

The **Dining Out** section let's you track the total amount you are spending on eating out each month. You can also see how much each family member is spending, this helps keep everyone accountable and shed some light on how much you are spending each month eating out.

Need to keep track of things to do? Use the **To-Do List** to log your tasks and simply remove them when you are done to get a fun message.

The **Grocery List** section is there to help you remember those items you needed to pick up on your next shopping trip. Simply add items to the list and copy them over to your favorite on the go app. I like to use Google Keep for my shopping notes on the go *(easy to check off and copy my whole list over)*

![Screenshot](/images/sunshine-family-dashboard-screenshot-notes-meal-prep.jpg)

Have something you want the whole family to know? Add it to the **Shared Notes** panel for everyone to see.

The **Meal Prep Fridge** panel is another favorite of mine. Here is where you can log what you just prepped and put into the fridge. It will fetch a related emoji, log the date, and name of the item you prepped. Great for seeing what's in the fridge without having to walk over.

Similar to the shared notes panel but offering more options for links I added the **Shared Links** panel. This is where you can share important web links with the whole family.

Lot's of the features can but adjusted and setup through the settings panel which is accessed on the top navigation by clicking the cog wheel icon.

## Features

- Local Member login / profile with per‑member theme and background
- Utilizes your local LLM server via LM Stuido/Ollama/etc.
- Real‑time presence & activity feed
- Weather widget *(OpenWeatherMap API)*
- Vibe‑of‑the‑Day AI message
- Per Member Profile showing stats and favorite photos
- Live Camera Snapshot *(auto refreshes cam image)*
- Photo carousel with favorites, gallery, and upload
- Weekly dinner planner with AI suggestion and comments
- Fitness tracker *(weekly log)*
- Dining‑out expense tracker *(monthly w/total user amounts)*
- To-do list
- Grocery list *(copy to other platforms)*
- Notes with comment threads
- Meal‑prep fridge *(AI generated emoji)*
- Shared links board
- Achievements system
- Unread badges for new items/comments
- Adjustable Auto‑refresh timer
- Dark/light mode per member

## Tech Stack

I built this project from the ground up using modern tools and AI, allowing me to focus on features rather than fixing bugs.

**Speed & Architecture**: The foundation is **Next.js 15**, giving the app blazing-fast performance whether it's loaded initially or when interacting with data.

**Reliability First**: Everything is wrapped in **TypeScript**. This means I catch mistakes before they reach the user, making the whole experience incredibly stable and predictable.

**Design Flow**: I use **Tailwind CSS** for styling—it lets me build beautiful, fully responsive designs with unmatched speed, from concept to finished product.

**Data Handling**: Our back-end logic is managed by **Prisma**, a powerful ORM that makes talking to the database (SQLite) feel safe and simple, all while keeping our code perfectly typed.

**Effortless Access**: Forget passwords! I implemented a smooth, cookie-based member session system designed for instant, hassle-free user onboarding.

**Local AI Integration**: To keep your data private and ensure maximum speed, I integrated local Large Language Models (LLMs). This means the AI processing runs directly within your environment, keeping your information secure, offline-capable, and giving you a truly autonomous experience without relying on external cloud APIs/storage.

## Get the Project

Sunshine Family Dashboard is open-source and free to use. Download it from GitHub and run it on your own server.

<a href="https://github.com/DevTarlow/sunshine-family-dashboard" class="project-link" target="_blank" rel="noopener noreferrer">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
  View on GitHub
</a>
