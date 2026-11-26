---
title: Response Chime - A DeepSeek Harness Plugin
pubDate: 2026-11-02
draft: false
category: Launched
tags:
  - deepseek-harness
  - plugin
  - audio
  - tool
description: >-
  A DeepSeek Harness plugin that chimes when an agent finishes answering, with
  four built-in sounds, custom WAV/MP3 support, and a background-only switch.
github: https://github.com/DevTarlow/dsh-response-chime
---

The point of sending a long prompt to an agent is being able to walk away while it works, except I kept coming back to the tab to check whether it was done yet.

So I built Response Chime, a DeepSeek Harness plugin that plays a sound whenever a turn finishes. It rings for regular replies, long plan or goal runs, questions waiting on input, or turns finishing in a background conversation.

## Settings panel

Click the speaker row above Settings in the left sidebar (showing On/Off in the wide sidebar, or a round button in the collapsed rail).

![The Response Chime audio settings panel](/images/dsh-response-chime-settings.png)

There are four built-in sounds (Chime, Bell, Drop, and Soft) that preview when clicked, or you can upload your own WAV or MP3 up to 5 MB and 30 seconds. Volume runs from silent to 100%, with all sounds normalized to roughly a standard notification level so switching sounds doesn't jump in loudness. Turning on "Only when this window is in the background" keeps the chime silent while you are actively looking at the tab.

## Install

Requires the DeepSeek Harness (browser or desktop app):

1. Open **Plugins** in the left sidebar and click **Install**.
2. Paste `https://github.com/DevTarlow/dsh-response-chime`.
3. Install and refresh the page.

Current version is `0.2.0`. Built-in sounds are generated in the browser and custom audio stays in local browser storage, so nothing gets uploaded anywhere.

[Get Response Chime on GitHub](https://github.com/DevTarlow/dsh-response-chime)
