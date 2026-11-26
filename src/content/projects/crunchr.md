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

When you have an early game build running, every placeholder button and jump usually ends up with the same generic beep until you go digging for sound packs.

I built Crunchr to fill that gap in the browser. Pick from eighteen sounds across five groups (Clicks, Footsteps, Items, Movement, and Magic), tweak them with six sliders, and export as a WAV or MP3 with no uploads, no samples, and no account.

## Picking and shaping sounds

Movement covers jumps, landings, and hits; Magic covers zaps, shimmers, power-ups, and whooshes; and the rest cover everyday interactions like mechanical clicks, wooden buttons, cloth rustles, coins, squishes, and crunches. Clicking any sound chip plays it, and tapping the same chip again generates a fresh variation at the same slider settings.

Six sliders shape the sound (length, pitch, punch, body, roughness, and fade), updating the waveform live as you drag. A seventh Variation control only applies when exporting a batch of ten, shifting each copy slightly so a row of footsteps doesn't sound identical. Reset brings everything back to defaults.

## Exporting one sound or ten

You can save a lossless WAV (best for game engines) or a smaller MP3.

![Crunchr's Save panel with one sound and a ZIP of ten versions](/images/crunchr-ten-versions.png)

Single save exports the exact sound you just auditioned. Ten versions exports a ZIP with ten numbered takes that differ slightly from one another (the preview gap slider only controls playback on the page, not the exported files). Because the waveform, preview, and download all use the same seeded render, what you hear on screen is what lands in the file.

## Scope and offline behavior

Crunchr generates one sound effect at a time. It won't record audio, edit existing clips, or save project files; the exported WAVs and MP3s are the output. Once the page loads, it keeps working offline, remembers your last sound and slider positions in the browser, and every sound you export is yours to use commercially under the MIT-licensed project.

[Try Crunchr on itch.io](https://tarlow.itch.io/crunchr)
