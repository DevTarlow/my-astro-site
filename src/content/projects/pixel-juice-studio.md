---
title: Pixel Juice Studio - Browser Tool for Game Juice
pubDate: 2026-10-06
draft: false
category: Launched
url: https://tarlow.itch.io/pixeljuice-studio
tags:
  - pixel-art
  - gamedev
  - particles
  - browser
  - tool
description: >-
  A single HTML file that adds squash and stretch, hit flash, outline, glow, and
  pixel particles to your sprites, then exports a PNG sprite sheet or animated
  GIF. Twelve dollars, once.
image: /images/pixel-juice-studio-app.gif
---

When you drop a finished pixel sprite into a game and it lands a hit without any reaction, it feels flat.

Pixel Juice Studio is a single-file browser tool for adding that hit feel: import a sprite, dial in squash and stretch, hit flash, outline, glow, and pixel particles, then export a PNG sprite sheet or animated GIF.

There are eighteen particle types and an emitter handle you can drag anywhere on the canvas (above the sprite, under its feet, or off to the side), using the same random seed so exports match what you previewed.

![Pixel Juice Studio Particles](/images/pixel-juice-studio-particle-types.gif)

If you want standalone effects like sparks, dust puffs, or muzzle flashes, an effect project opens an empty transparent canvas at your chosen size with particles already running. Twelve presets are built in, starting on Plain (everything off) with a one-click Game Juice preset to bring effects in fast.

## One file, nothing to install

The app ships as a single HTML file that opens directly in Chrome, Edge, or Firefox on Windows, macOS, or Linux and works completely offline.

Settings, presets, sprite libraries, and custom particle images save locally in the browser. Because `file://` pages have tight browser storage limits, very large sprites may need re-importing on reopen, and the app warns you upfront if that happens or if hardware acceleration is disabled.

## Deterministic exports

Every frame renders from scratch from the timestamp and your slider settings, so frame 37 matches frame 0 and exported loops don't drift. An export rectangle shows exact bounds on screen and warns you if your frame size would clip particles.

PNG sprite sheets export as grids or horizontal/vertical strips up to 8x with crisp pixels, GIFs export with a global palette and accurate per-frame timing, and presets save as plain JSON you can commit to version control.

It is $12 once with full commercial rights to everything you export and zero network calls.

[Get Pixel Juice Studio on itch.io](https://tarlow.itch.io/pixeljuice-studio)

I wrote the longer launch post here: [Pixel Juice Studio Is Out](/blog/pixel-juice-studio-is-out/).
