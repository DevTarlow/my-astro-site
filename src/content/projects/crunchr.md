---
title: Crunchr - Game Sound Effects in the Browser
pubDate: 2026-10-21
draft: false
category: Launched
tags:
  - audio
  - gamedev
  - browser
  - tool
  - sound-design
description: >-
  Eighteen game sounds you shape with six sliders in the browser, then download
  as a WAV, an MP3, or a ZIP of ten takes.
image: /images/crunchr-ui.png
github: https://github.com/DevTarlow/crunchr
url: https://tarlow.itch.io/crunchr
---

An early build of a game works. Every button still sounds like the default beep.

Crunchr is the small tool I made for that gap. Pick a click, a footstep, a jump, a coin or a spell zap, shape it in the browser with the six sliders, and download the result as a WAV or an MP3. Eighteen sounds in five groups: clicks, footsteps, items, movement and magic.

Everything is generated in the browser. No samples, no uploads, no account.

## Pick a sound

The groups are Clicks, Footsteps, Items, Movement and Magic. Movement has a jump, a landing and a hit. Magic has a zap, a shimmer, a power-up and a whoosh. And the rest cover the everyday parts of a game: a mechanical click, a wooden button, a cloth rustle, a coin, a squish, a crunch.

Picking a sound plays it. Tap the same chip again and you get a new take with the same sliders, which is how I find a footstep that does not sound like the one before it.

## Shape it

Six sliders do the work: length, pitch, punch, body, roughness and fade. Each one updates the wave while you drag, so you hear the change as you make it.

Variation is the seventh control, and it only affects the batch of ten. It changes each copy a little. So a row of footsteps has some life in it. At 0% the sliders stay where they are, and every sound still changes a little.

Reset puts the sliders back to the preset defaults.

## One sound, or ten

Save gives you WAV or MP3. WAV is lossless and the one to use in a game. MP3 is smaller and plays anywhere, with a small delay at the start.

![Crunchr's Save panel with one sound and a ZIP of ten versions](/images/crunchr-ten-versions.png)

One sound is exactly what you hear. Ten versions is a ZIP with ten numbered files and small differences between them. Then the numbered row plays each take on its own, and the gap between them is a preview setting only, so the ZIP always has ten separate files.

The wave, the audition and the exported file all come from the same seeded render, so what you hear on the page is what you download.

## What it does not do

It does one sound at a time.

And it will not record, edit or clean up audio you already have. There is no project file. The WAVs and MP3s are what you keep.

## Offline and yours

The app runs in the browser, and once the page is open it keeps working with the wifi off. Your last sound and slider positions stay in that browser. The sounds you make are yours, including in games you sell.

The code is MIT licensed. [Try Crunchr on itch.io →](https://tarlow.itch.io/crunchr)
