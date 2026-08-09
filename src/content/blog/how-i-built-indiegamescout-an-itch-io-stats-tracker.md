---
title: How I Built IndieGameScout - An itch.io Stats Tracker
pubDate: 2026-08-09
draft: false
tags:
  - IndieGameScout
  - ItchIo
  - ProductLaunch
  - MossAIStudio
description: >-
  IndieGameScout is my desktop app that tracks itch.io stats over time -
  ratings, jam ranks, views, downloads, and earnings - on your own machine.
  Here is how I built it, why it's pay once instead of a subscription,
  and what shipping it taught me.
featuredimage: /images/indie-game-scout-wide-img.png
---

In the past during my free time, I used to make and play games on [itch.io](https://itch.io). It's one of the best places I know to put a game out there: no store approval, no gatekeeping. Upload, hit publish, and see what happens.

But there's one thing that's always bugged me. My game pages show me today's numbers. Views today. Downloads today. Maybe a rating. That's it. No history anywhere. I'd look at one of my games and think "is this doing better than last week?" and there was simply no answer.

It gets worse after a jam. You post your entry, watch the first-day spike, and then the story resets to zero. No chart, no trend, no way to know if what you're doing is actually working.

So I built a tool that watches the numbers.

### What IndieGameScout Is

IndieGameScout is a desktop app that tracks itch.io stats over time. It checks the numbers you care about, every day, on your own computer, and charts them so you can see the whole story instead of just today.

![IndieGameScout Screenshot](/images/indiegamescout--main-list.png)

Here's how it works:

1. **Watch any game.** Paste any itch.io game link - yours, a friend's, one that's doing well - and follow its rating, rating count, and price day by day. Wondered "did that update move the needle?" Now you can actually see it.
2. **Follow jams.** Add any jam's results page and watch the top 20 shuffle around as votes come in. Entered the jam yourself? Pin your entry and follow your climb up the list.
3. **Track every game you've made.** Connect your itch.io account in about ten seconds - a private link from your itch settings, no password, and you can remove it anytime - and it pulls in views, downloads, purchases, and earnings for everything you've published.

No accounts. No cloud. No subscription.

### Why a Desktop App, Why Pay Once

This is the part where I went the opposite way from [CopySprout](/blog/how-i-built-copysprout-an-ai-writing-tool-for-etsy-sellers/). CopySprout is a subscription, and I wrote about why: every creation costs me money, and a subscription is what keeps the product alive.

IndieGameScout is the other side of that coin. Once it's built, it costs me almost nothing to run. Your data lives in files on your own machine. There's no server to pay for, no database to keep alive. So you pay once and it's yours forever:

- **Pay once, keep it forever.** $12 minimum, pay-what-you-want if you want to support the work. No subscription, no renewal. It checks on its own every 12 hours, or whenever you hit Refresh.
- **It lives on your computer.** Your data, your files.
- **Your data is always yours.** Export your watch list to a file you can open in Excel, or back up your full history to a single file, whenever you want.

I've been shipping software since 2014, and for most of that time it meant one-time licenses and zip files. IndieGameScout is that kind of product on purpose. Some tools earn a subscription. This one earns a single sale, and then just works.

### How I Built It

IndieGameScout is an [Electron](https://www.electronjs.org) desktop app, which means one codebase that runs on Windows, macOS, and Linux. You just download and run it - no install, no setup.

For games and jams, it reads the public pages you tell it to watch, so you can track anything on itch.io without needing anything from the creator. For your own games, a private link from your itch.io settings unlocks the full picture: views, downloads, purchases, and earnings.

Updates install themselves. If I fix a bug or add a feature, your copy will ask you to update the next time it launches. You never have to download anything twice.

### What I Learned

- **The slope beats the snapshot.** This was the whole reason to build it. itch.io shows you today. IndieGameScout shows you the story. A number without a trend is almost no information, and it took building a tool to really feel that.
- **Names get taken.** I'd been calling it GameScout. Taken. IndieGameScout was born a few hours before launch, and honestly it's a better name - it says exactly what it is.
- **Local data is a feature.** People are tired of tools that keep your data on their servers. This app keeps everything in files on your own machine.

### What's Next

Here's the honest part: it just launched, and it does not have customers yet. IndieGameScout is live on itch.io, it's finished, and now comes the part I can't build my way through. Getting it in front of the game makers who need it. I'll keep writing about that as it happens, and there's a devlog on the page where I post updates along the way.

If you make games on itch.io and you've ever wondered whether your numbers are actually going up, I built this for you.

[Get IndieGameScout on itch.io →](https://tarlow.itch.io/indiegamescout-itchio-stats-tracker)

---

*P.S. IndieGameScout is the third public product from [Moss AI Studio](https://mossaistudio.com) - visit my shop to check out more apps. The first was [Handmade Checker](/blog/handmade-checker-is-live-scan-etsy-listings-for-ai-generated-content-in-one-click/), and the second was [CopySprout](/blog/how-i-built-copysprout-an-ai-writing-tool-for-etsy-sellers/).*
