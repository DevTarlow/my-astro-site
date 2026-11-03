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
  four built-in sounds, your own WAV or MP3, and a quiet-while-watching switch.
github: https://github.com/DevTarlow/dsh-response-chime
---

I send a prompt and then I walk away. That is the point of an agent. But I kept coming back to the tab to check, and the check was the thing that pulled me out of whatever I was doing.

So I built the chime.

Response Chime is a DeepSeek Harness plugin that plays a sound when a turn ends. Send the prompt, leave the room, and the chime calls you back when the answer is ready.

It rings for a normal answer, a long plan or goal run, a model that stops to ask a question, and a turn that finishes while you are reading another conversation.

## The settings panel

Click the speaker row above Settings at the foot of the left sidebar. The row shows On or Off in the wide sidebar, and becomes a round button in the narrow rail.

![The Response Chime audio settings panel](/images/dsh-response-chime-settings.png)

Four sounds are built in: Chime, Bell, Drop and Soft. Clicking one plays it, so you hear the change before you rely on it.

You can add a WAV or MP3 up to 5 MB and 30 seconds, and the file is decoded and kept in this browser, then played at the volume you set. Replace or remove it from the same panel.

Volume runs from silent to full. And every sound is normalized to the same level, so changing the sound does not change how loud it is. At 100% it sits about where a normal notification sits.

Turn on Only when this window is in the background and the chime stays quiet while you are looking at the page. It only plays when the page is hidden or another window has focus.

## Install

You need the DeepSeek Harness, in the browser or the desktop app.

1. Open Plugins in the left sidebar.
2. Press Install.
3. Paste this repository's address: `https://github.com/DevTarlow/dsh-response-chime`
4. Install it, then refresh the page.

The current version is 0.2.0. The plugin stays in your harness for every session until you remove it.

## Stays local

The four built-in sounds are generated in the browser, and a custom file stays in this browser's storage, so nothing is uploaded and your settings apply to every conversation in the app.

[Get Response Chime on GitHub →](https://github.com/DevTarlow/dsh-response-chime)
