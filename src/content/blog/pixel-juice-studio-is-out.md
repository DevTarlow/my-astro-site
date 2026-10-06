---
title: Pixel Juice Studio Is Out - One File, and the Hit Your Sprites Were Missing
pubDate: 2026-10-06
description: Pixel Juice Studio is live. It is a browser tool for game juice. One file, nothing to install, and the file you export is the file you were looking at.
tags: [pixel-juice-studio, pixel-art, gamedev, browser, local-first]
featuredimage: /images/pixel-juice-studio-banner.png
draft: false
---

You have drawn the sprite. It looks right. Then it lands, and nothing happens.

That's the whole reason I built [Pixel Juice Studio](https://tarlow.itch.io/pixeljuice-studio), and it's out now. It's a browser tool for game juice: the weight, the flash, the dust that tells your eye something landed.

## What It Does

You import a sprite. You dial in squash and stretch, a hit flash, an outline, a glow and pixel particles until it feels good. Then you export a PNG sprite sheet or an animated GIF.

The particles come in eighteen kinds, and an emitter you drag anywhere on the canvas. Above the sprite's head, under its feet, off the art entirely. Aim the spray with the same handle. Same seed, same field, every export.

![Pixel Juice Studio Particles](/images/pixel-juice-studio-particle-types.gif)

An impact spark. A dust puff. A muzzle flash. Those are effects on their own, so an effect project opens an empty canvas, pinned to the size you pick, with the particles already running and the emitter handle up. Drag it where the burst should land, then export. Every frame comes out at the size you asked for, on transparency.

There are twelve ready-made looks. The default is called Plain, and every effect in it starts off, so your sprite is the sprite you imported. Game Juice brings them all back in one click.

## One File, Nothing To Install

![Pixel Juice Studio Application](/images/pixel-juice-studio-app.gif)

The studio is a single HTML file. You buy it, you download it, you double click it, and it opens in Chrome, Edge or Firefox. Everything it needs lives in that one file, so it runs with the wifi off.

The studio remembers your work too. Your settings, your sprite library and any particle image you brought in are waiting next time you open the file. Very large sprites may need importing again, because a browser keeps only a small amount of storage for a page opened straight from a file. When that happens, the studio tells you, so you are not left wondering where your sprite went.

The other thing it tells you about is hardware acceleration. If your browser cannot use the graphics card, it says so, and you are never left staring at a blank canvas.

## The File You Export Is The File You Saw

The studio works out every frame from scratch. All it needs is the time and your settings. Nothing carries over from the frame before, so nothing drifts. Frame 37 comes out the same as frame 0, and a loop you export really does loop.

The studio draws the export rectangle on screen while you work. It starts wide enough for your effects to reach past the sprite, and it tells you when a narrower choice would clip them.

Twelve dollars, once. Sprite sheets, GIFs and presets you make are yours to use commercially. The paid file loads nothing but itself, so it phones home to nobody. Exports land in your downloads folder.

## Try It On One Sprite

If you have pixel art sitting in a folder, bring one sprite in and switch on squash and stretch. Play around with the different features and you will find all types of useful juice for your game.

It's out now, and live on itch.

Don't stop building.

~ Tarlow
