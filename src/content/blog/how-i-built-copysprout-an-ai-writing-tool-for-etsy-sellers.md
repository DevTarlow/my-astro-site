---
title: How I Built CopySprout - An AI Writing Tool for Etsy Sellers
pubDate: 2026-08-08
draft: false
tags:
  - CopySprout
  - Etsy
  - AI
  - ProductLaunch
  - MossAIStudio
description: >-
  CopySprout is my subscription AI writing tool for Etsy sellers. Here is
  how I built it, why I went with a subscription, and what I learned
  shipping my first SaaS solo.
featuredimage: /images/copy-sprout-hero-section.png
---

A few weeks after I launched [Handmade Checker](/blog/handmade-checker-is-live-scan-etsy-listings-for-ai-generated-content-in-one-click), I kept coming back to the same thought. I had built a tool that tells you when a listing looks like AI. But the sellers behind real shops have the opposite problem. They make beautiful things. And writing is the hardest part of selling them.

Product descriptions. Shop announcements. Renewals. Social posts. Every word of it is a wall for someone who would rather be making stuff.

Most AI writing tools are built for marketers. They spit out hype. Words like "elevate" and "unleash." Etsy sellers don't need that. They need plain words that sound like them.

So I built [CopySprout](https://copysprout.app/).

<a href="https://copysprout.app/" target="_blank" rel="noopener noreferrer"><img src="/images/copy-sprout-logo-white.png" alt="CopySprout Logo" /></a>

### What CopySprout Is

CopySprout is a subscription AI writing tool for Etsy sellers. Sixteen tools for the everyday parts of running a shop. Product descriptions, renewals, announcements, and more. Every tool uses AI to write the way a real person talks.

![CopySprout Tools](/images/copy-sprout-tools.png)

Here's how it works:

1. **Pick a tool.** Product description, renewal, shop announcement, whatever you're working on.
2. **Answer a few questions.** What do you make, who is it for, what should it say. No marketing speak required.
3. **Get writing you can edit.** It comes back ready to paste or tweak.
4. **Try again if it's not right.** One click, a fresh take.

No jargon. No "content strategy." No tone sliders. Just writing you can use.

![CopySprout Review Response](/images/review-response.png)

### Why I Went With a Subscription

I've been shipping software since 2014. For a long time that meant one-time licenses and zip files. You paid once, you got the file, and that was that.

CopySprout works differently, and it's on purpose. Two reasons.

First, every creation costs me money. Each one is a call to an AI model, and I pay for every call. A one-time price would mean paying for those calls forever, off a single sale. That math falls apart fast, and the product would quietly die. A subscription is what keeps it running.

Second, a subscription is better for the life of the product. It means I can keep paying for the AI, keep fixing things, keep making the tools better. It only works if the tool keeps earning its place every month. If it stops being useful, you cancel. Fair.

So no free tier, no feature gating. Just a trial, then a simple choice:

- **7-day free trial** - 100 creations, card at checkout, cancels anytime
- **$4.99/month** - 500 creations a month
- **$49.99/year** - two months free

The pricing is honest because the product is honest. If you stop getting value, you cancel. Simple.

### How I Built It

CopySprout runs on one stack. [Astro](https://astro.build) and Tailwind for the app itself, Firebase for auth, database, and functions, and Stripe for payments. The AI generation runs on DeepSeek, with the prompts living server-side so the logic stays out of the browser.

### What I Learned

Building CopySprout solo taught me more than any project I've shipped since 2014:

- **Ship fast, skip the rest.** I cut every feature that wasn't core. The tools that shipped are the ones sellers actually need, not the ones that sounded impressive.
- **Plain language is a feature.** The hardest part wasn't the AI. It was keeping the product itself free of jargon. If the tool is supposed to write like a person, the tool should talk like one too.
- **Walk the whole path yourself.** I paid for my own product, went through checkout, signed up, hit quota. If there's friction in your own flow, your customers will feel it ten times worse.

### What's Next

Here's the honest part: It doesn't have customers yet. CopySprout is live, it's finished, and now comes the part I can't build my way through. Getting it in front of the sellers who need it. I'll keep writing about that as it happens.

If you sell on Etsy and you've ever stared at a blank description box, I built this for you.

[Try CopySprout →](https://copysprout.app)

---

*P.S. CopySprout is the second public product from [Moss AI Studio](https://mossaistudio.com) - visit my shop to check out more apps. The first was [Handmade Checker](/blog/handmade-checker-is-live-scan-etsy-listings-for-ai-generated-content-in-one-click).*
