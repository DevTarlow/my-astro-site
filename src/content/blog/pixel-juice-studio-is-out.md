---
title: Pixel Juice Studio Is Out - One File, and the Hit Your Sprites Were Missing
pubDate: 2026-10-06
description: Pixel Juice Studio is live. It is a single-file browser tool for game juice that exports clean PNG sprite sheets and animated GIFs offline.
tags: [pixel-juice-studio, pixel-art, gamedev, browser, local-first]
featuredimage: /images/pixel-juice-studio-banner.png
draft: false
---

You draw a sprite, drop it in your game, and when it lands a hit, nothing happens. It looks fine standing still, it just lacks impact.

That is why I built [Pixel Juice Studio](https://tarlow.itch.io/pixeljuice-studio), and it is live now. It is a browser tool for adding game juice like squash and stretch, hit flashes, outlines, glow, and pixel particles to your sprites.

## What it does

You import a sprite, dial in the effects until the hit feels right, and export a PNG sprite sheet or an animated GIF.

There are eighteen particle types and an emitter handle you can drag anywhere on the canvas (above the sprite's head, under its feet, or off to the side), and the same seed produces the exact same particle field every time you export.

![Pixel Juice Studio Particles](/images/pixel-juice-studio-particle-types.gif)

If you just want an impact spark, dust puff, or muzzle flash on its own, an effect project opens an empty canvas at the exact pixel size you pick with particles already running. Drag the emitter where the burst should land and export on transparency.

There are also twelve built-in presets. The default preset is called Plain with every effect turned off so your sprite starts untouched, and clicking Game Juice switches everything back on in one click.

## One file, nothing to install

![Pixel Juice Studio Application](/images/pixel-juice-studio-app.gif)

The studio ships as a single HTML file. You buy it, download it, double-click it, and it opens in Chrome, Edge, or Firefox with everything self-contained so it runs completely offline.

It remembers your settings, sprite library, and custom particle images between sessions. Very large sprites may need re-importing since browsers cap local storage for `file://` pages, and if that happens (or if hardware acceleration is off in your browser), the app tells you directly instead of leaving you staring at a blank canvas.

## What you see is what exports

The studio computes every frame from scratch using only the timestamp and your settings, so nothing drifts from earlier frames. Frame 37 comes out the exact same as frame 0, meaning loops really loop cleanly. It also draws the export rectangle on screen while you edit and warns you if shrinking the frame size would clip your particles.

It costs $12 once, with full commercial rights to any sprite sheets, GIFs, and presets you export. The paid file makes zero network requests and saves exports straight to your downloads folder.

## Try it on one sprite

If you have pixel art sitting in a folder, bring one sprite in, turn on squash and stretch, add a hit flash and outline, and layer in a few particles until the landing actually has some weight behind it.

It is out now on [itch.io](https://tarlow.itch.io/pixeljuice-studio).
