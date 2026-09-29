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
  interface, keeps a library of them, and lets you decide how much of the photo
  shows through the page, the panels, and the sidebar.
image: /images/background-swapper-screenshot.png
github: https://github.com/DevTarlow/dsh-background-swapper
---

I spend most of my working day inside the DeepSeek Harness, and after a few months it stopped feeling like somewhere I had chosen to sit down. It was a dark rectangle with my work in the middle of it.

**Background Swapper** is a plugin I wrote to put one of my own photos behind the interface.

**Swap Background** sits just above Settings in the left sidebar. Click it and a small panel opens with the photo you are on, an upload box, the sliders, and a library of everything you have saved.

To add a photo, drop an image on the dashed box or press **Choose file**, type a name, and press **Save**. It becomes your background straight away. Every photo you keep is listed in **Recent**, newest first, six to a page, and clicking a thumbnail switches to it. A pencil renames an entry, a bin deletes one, and **Remove all photos** empties the library.

The sliders are the part I use most. **Background opacity** controls how solid the page behind everything is, so lowering it lets the photo fill the open space. **Element opacity** does the same for the cards, text boxes, and menus sitting over that page, and **Sidebar opacity** gives the left column a control of its own, so the navigation can stay readable while the panels go glassy. **Tint** runs from darken 100% to lighten 100% for when text is fighting a bright photo, and **Blur** softens the photo by up to 24 pixels.

**Wallpaper**, **Glass**, and **Solid** are presets, and each one sets all three sliders at once. Tint and blur stay where you left them, so trying a preset never undoes a photo you already tuned. If you land on a balance you like, **Save current** keeps it under a name you choose, and your looks sit in the row beside the shipped ones, up to six of them.

![The Background panel, with the preset row, the three opacity sliders, tint and blur, and the photo library](/images/background-swapper-settings.png)

The harness again, this time with a space photo and the blur turned up.

![A blurred space photo behind the interface](/images/background-swapper-blurred-space.png)

**Turn off** hides the photo and puts everything back the way it was without deleting anything. Press Escape or click outside the panel to close it.

Your photos are saved in the harness's own data folder, in a `background-swapper` folder, so the same library and the same look show up in every browser you open and in the desktop app, as long as they are all pointed at the same harness. Copy that folder to back it up, or delete it to start over - the plugin builds it again the next time it loads.

## Features

- Photo library with names, newest first, six to a page
- Rename, delete, and remove all photos
- Wallpaper, Glass, and Solid presets
- Save your own looks, up to six
- Separate sliders for the page, the panels, and the sidebar
- Darken or lighten the photo, and blur it up to 24 pixels
- Most image files work, including animated GIFs
- Anything bigger than 2560 pixels on its longest side is scaled down before it is saved
- A few optional settings for the page size, the upload limit, and where photos are kept
- Works in the browser and in the desktop app
- Nothing extra to install

## How It's Built

Background Swapper is three small files. There is nothing to compile, and it uses only what the harness already gives it, so there is nothing to install alongside it.

The photo sits behind the whole page rather than being written into the harness itself. The sliders fade the page, the panels over it, and the sidebar one at a time, so none of the harness's own parts are changed. Uninstalling puts the interface back exactly as it was, and your photos stay on disk.

## Recent Updates:

- 9/27/2026 | [GitHub](https://github.com/DevTarlow/dsh-background-swapper/releases/tag/v0.2.0) v0.2.0 - Presets, saved looks, and separate sliders for the page, the panels, and the sidebar.
- 9/26/2026 | [GitHub](https://github.com/DevTarlow/dsh-background-swapper/releases/tag/v0.1.0) v0.1.0 - First release, with the photo library, tint, and blur.

## Get the Project

Background Swapper is free and open source under the MIT license.

1. Open the Harness and click **Plugins** in the left sidebar.
2. Press **Install** and paste the GitHub link, or the folder path if you have already downloaded it.
3. Install it, then refresh the page.

The plugin stays in your harness for every session until you remove it from the same Plugins screen. Your photos stay on disk either way, so uninstalling leaves the library where it is.

*You need the DeepSeek Harness, in the browser or the desktop app, and nothing else.*

<a href="https://github.com/DevTarlow/dsh-background-swapper" class="project-link" target="_blank" rel="noopener noreferrer">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
  View on GitHub
</a>
