---
title: Background Swapper - DeepSeek Harness Plugin
pubDate: 2026-09-29
draft: false
category: Launched
tags:
  - deepseek-harness
  - plugin
  - theme
  - background
  - tool
description: >-
  A DeepSeek Harness plugin that puts one of your own photos behind the
  interface, keeps a local library of them, and lets you dial in opacity,
  tint, and blur across the page, panels, and sidebar.
image: /images/background-swapper-screenshot.png
github: https://github.com/DevTarlow/dsh-background-swapper
---

I spend most of my workday inside the DeepSeek Harness, and after a few months staring at the same dark rectangle started getting old.

So I wrote Background Swapper to put one of my own photos behind the interface.

Click "Swap Background" right above Settings in the left sidebar to open the panel with your active photo, an upload box, the sliders, and your saved library.

To add a photo, drop an image onto the dashed box or click "Choose file", give it a name, and hit Save. Every photo you keep shows up under Recent (newest first, six per page), where you can switch backgrounds in one click, rename entries, delete individual photos, or clear the library.

The sliders are the part I tweak the most. Background opacity controls how solid the main page is so your photo shows through behind the text. Element opacity controls the cards, text boxes, and menus, while Sidebar opacity keeps the left navigation readable even when the main panels are glassy. Tint runs from 100% darken to 100% lighten when text fights a bright photo, and Blur softens the image by up to 24 pixels.

There are three presets (Wallpaper, Glass, and Solid) that set all three opacity sliders together while leaving your tint and blur alone. Once you dial in a balance you like, Save current stores up to six custom looks right next to the built-in presets.

![The Background panel, with the preset row, the three opacity sliders, tint and blur, and the photo library](/images/background-swapper-settings.png)

Here is the same interface with a space photo and higher blur:

![A blurred space photo behind the interface](/images/background-swapper-blurred-space.png)

Clicking "Turn off" hides the background and restores the default look without deleting your saved photos or presets. Press Escape or click outside the panel to close it.

Everything gets stored locally in the harness data directory inside a `background-swapper` folder, so your library and looks appear in any browser or desktop window pointed at the same harness. Copy that folder to back it up, or delete it to start fresh.

## Features

- Local photo library with custom names, sorted newest first (six per page)
- Rename, delete, and bulk-clear controls
- Wallpaper, Glass, and Solid presets plus up to six saved custom looks
- Separate opacity sliders for page background, UI panels, and sidebar
- Darken/lighten tint slider and up to 24px blur
- Supports most image formats including animated GIFs (images over 2560px on the longest side scale down on save)
- Optional settings for page size, upload limits, and storage location
- Works in both browser and desktop app with nothing extra to install

## How it is built

Background Swapper is three small files with no build step, using only what the harness already provides. The photo sits behind the page while the sliders fade the existing layers over top, so none of the core harness files get modified and uninstalling leaves everything clean while keeping your photos on disk.

## Recent updates

- 9/27/2026 | [GitHub](https://github.com/DevTarlow/dsh-background-swapper/releases/tag/v0.2.0) v0.2.0 - Presets, saved looks, and separate sliders for the page, panels, and sidebar.
- 9/26/2026 | [GitHub](https://github.com/DevTarlow/dsh-background-swapper/releases/tag/v0.1.0) v0.1.0 - Initial release with photo library, tint, and blur.

## Get the project

Background Swapper is free and open source under the MIT license. You only need the DeepSeek Harness (browser or desktop app).

1. Open the Harness and click **Plugins** in the left sidebar.
2. Click **Install** and paste the GitHub URL (or a local folder path if you cloned it).
3. Install it and refresh the page.

<a href="https://github.com/DevTarlow/dsh-background-swapper" class="project-link" target="_blank" rel="noopener noreferrer">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
  View on GitHub
</a>
