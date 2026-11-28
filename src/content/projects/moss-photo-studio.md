---
title: Moss Photo Studio - Product Photography & Listing Web App
pubDate: 2026-11-27
draft: false
featured: true
category: Launched
url: https://mossphotostudio.com/
tags:
  - ai-tools
  - e-commerce
  - credits
  - pay-as-you-go
  - astro
  - tool
description: >-
  Turn one real product photo into a full listing image set, edit or generate
  scenes, and write marketplace titles, descriptions, and tags on pay-as-you-go
  credits.
image: /images/moss-photo-studio.png
---

Small sellers need clean main shots on white, lifestyle photos in real rooms, close-ups, scale references, and marketplace-ready listing copy. Booking a studio shoot for every item takes too much time and money, and dropping a phone shot into a generic AI image tool usually alters the product's shape, texture, or label text.

I built [Moss Photo Studio](https://mossphotostudio.com/) as a focused, pay-as-you-go web app around one job: turning a single real product photo into a complete listing set and shop copy without locking sellers into a monthly subscription.

I also started with a wider utility collection in [Moss Toolbox](/projects/moss-toolbox/), noticed that product photos were where sellers kept getting stuck, and rebuilt the whole thing around this workflow.

## Four tools, one credit balance

Every account starts with 10 free credits (no card required), and the studio shows the exact credit cost before anything runs:

- **Set Builder (AI Image Studio):** Upload one product photo up to 5 MB (a clean phone shot or a transparent PNG both work). The studio reads the photo for 0 credits, identifies the item, and plans a shot list of up to 8 frames (6 by default: main shot on white, in use, close-up detail, scale in hand, flat lay, and gift-ready). You can toggle shots off or edit directions before generating at 1 credit per frame, then download individual shots or a `.zip` in Original, Square 1:1 (`1600 x 1600`), or Portrait 4:5 (`1600 x 2000`).
- **AI Image Editor:** Open any photo or generated frame and change the scene, background, lighting, surface, or place the product on a studio model from visual templates or plain-English prompts (1 credit per image), with free adjustments and version history saved.
- **AI Image Generator:** Create up to 4 scenes at once from a plain description, a saved item, or a starter scene at 1 credit per image, and send any result straight into the editor.
- **Listing Writer:** Use the studio's product read (plus optional sizing, materials, scent, or care notes) to generate 3 titles, a description, key points, and tags for 1 credit, formatted for Etsy (140-character titles and 13 tags up to 20 characters), Shopify, eBay, Poshmark, Depop, Vinted, TikTok Shop, or your own site.

Amazon is intentionally left out of the Listing Writer because its title and bullet caps vary by category, though dedicated Amazon image presets and a listing-image guide are built in.

## Library, brand kit, and pay-as-you-go pricing

Inside the workspace there is a built-in library of 100 starter products across 19 categories, 50 studio people with 4 poses each, and 50 scenes so you can test ideas right away. Saving your own products, portraits, scenes, and collections is free, and an optional business profile stores your logo, tone, and up to 3 brand colors.

Because shops shoot in waves rather than on a fixed monthly schedule, credits are sold as one-time packs that never expire and never auto-renew:

- Starter pack: 25 credits for $12 (48 cents per credit)
- Studio pack: 100 credits for $39 (39 cents per credit)
- Catalog pack: 300 credits for $89 (30 cents per credit)

Reading a photo and planning a shot list cost 0 credits. Every image or listing generation costs 1 credit, outputs come out watermark-free (`1024 x 1024`, `1024 x 1536`, or `1536 x 1024` in PNG, JPEG, or WebP) with full commercial rights, and signed-out buyers can purchase a pack via Stripe and claim it when they create an account with the same email.

## Honest limits

Even with the studio built to preserve glazes, weave, labels, and proportions, AI images can still slip on tiny packaging print or tricky reflections. The app reminds users upfront to check finished frames before publishing and remake any shot from the same source photo if needed, and failed generations refund credits automatically.

It runs on Astro, Tailwind CSS, vanilla JS, Firebase (Auth, Firestore, Storage, Cloud Functions), and Stripe. You can try it at [mossphotostudio.com](https://mossphotostudio.com/) or read the personal launch story in [Moss Photo Studio Is Live](/blog/moss-photo-studio-is-live/).
