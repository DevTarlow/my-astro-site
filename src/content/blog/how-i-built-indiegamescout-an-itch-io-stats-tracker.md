---
title: How I Built IndieGameScout - An itch.io Stats Tracker
pubDate: 2026-08-09
draft: false
tags:
  - launches
description: >-
  IndieGameScout is a desktop app that tracks itch.io stats over time
  (ratings, jam ranks, views, downloads, and earnings) on your own machine,
  with a one-time price.
featuredimage: /images/indie-game-scout-wide-img.png
---

In my free time I used to make and play games on [itch.io](https://itch.io). It is still one of the best places to put a game out without store gatekeeping: upload your build, hit publish, and see how people react.

The one thing that always bugged me was the lack of history. Your dashboard shows today's views, today's downloads, and a current rating, but if you wanted to know whether an update actually helped compared to last week, there was no chart or trend line to look at. It is even more noticeable after a game jam, when the first-day spike fades and you have no clean record of how rankings shifted as votes came in.

So I built a desktop app to track the numbers locally.

## What IndieGameScout does

IndieGameScout checks the itch.io pages you care about every day on your own computer and turns them into a history you can actually read.

![IndieGameScout Screenshot](/images/indiegamescout--main-list.png)

Here is how it works:

1. **Watch any game:** Paste any itch.io game URL (yours, a friend's, or a game doing well) and track its rating, rating count, and price day by day.
2. **Follow jams:** Add a jam's results page to watch the top 20 shuffle as votes roll in, or pin your own entry to follow its rank.
3. **Track your own published games:** Paste a private link from your itch.io settings (no password needed, and you can revoke it anytime) to pull views, downloads, purchases, and earnings over time.

Everything stays on your machine with no cloud account and no subscription.

## Why a desktop app, and why pay once

Unlike [CopySprout](/blog/how-i-built-copysprout-an-ai-writing-tool-for-etsy-sellers/), which runs on a subscription because every AI generation costs me money per call, IndieGameScout has no ongoing server or database cost once you download it. All of your stats live in files on your own drive.

So you pay once and keep it:

- $12 minimum (pay-what-you-want if you want to support the work), no renewals. It checks on its own every 12 hours or whenever you hit Refresh.
- Export your watch list to a spreadsheet-friendly file or back up your entire history into a single file whenever you want.

I have been shipping software since 2014, and for a tool that runs locally on your own disk, a one-time license just makes more sense.

## How I built it

IndieGameScout is an [Electron](https://www.electronjs.org) desktop app, so one codebase covers Windows, macOS, and Linux. For public games and jams, it reads the public pages you add to your watch list without needing anything from the creator. For your own games, that private settings link pulls in your creator stats locally.

Updates also handle themselves: when I fix a bug or add something, the app prompts you to update on the next launch so you don't have to keep re-downloading installers.

## What I learned

- **Trends beat snapshots:** Seeing one day's numbers tells you very little compared to watching the curve after an update or a jam.
- **Check names early:** I originally called it GameScout, found out it was already taken right before launch, and switched to IndieGameScout (which fits better anyway).
- **Local files still matter:** People are tired of handing over logins and stats to yet another hosted SaaS when a local file does the job cleanly.

## What is next

Just like CopySprout, IndieGameScout is live on itch.io and does not have customers yet. Now the work is getting it in front of indie devs who actually care about tracking their itch.io numbers, and posting updates in the devlog along the way.

If you publish games on itch.io and want to see whether your stats are actually trending up, check it out here: [Get IndieGameScout on itch.io](https://tarlow.itch.io/indiegamescout-itchio-stats-tracker)

*P.S. IndieGameScout is the third public product from [Moss AI Studio](https://mossaistudio.com), after [Handmade Checker](/blog/handmade-checker-is-live-scan-etsy-listings-for-ai-generated-content-in-one-click/) and [CopySprout](/blog/how-i-built-copysprout-an-ai-writing-tool-for-etsy-sellers/).*
