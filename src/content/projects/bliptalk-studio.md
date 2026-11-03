---
title: BlipTalk Studio - Retro Dialogue Sound Generator
pubDate: 2026-09-26
draft: false
category: Launched
tags:
  - audio
  - gamedev
  - browser
  - tool
  - chiptune
description: >-
  Free browser tool that turns a typed line into 8-bit, Animalese, or robotic
  dialogue blips, then exports a WAV or a five-blip pack for your game.
image: /images/bliptalk-studio-banner.png
github: https://github.com/DevTarlow/bliptalk-studio
url: https://tarlow.itch.io/bliptalk-studio
---

A character in a game needs a voice. Recording one is a whole afternoon with a microphone, a quiet room, and a take you will probably redo, and for a text box that types out one letter at a time, that is more than the job needs.

BlipTalk Studio is the smaller version. Type a line, pick a voice, press play, and the line types itself out with a blip per character. Then export the whole line as a WAV, or a pack of single blips your game code can trigger.

And it runs in the browser, it is free, and the text you type never leaves your machine.

## Three voices

**8-Bit Chiptune** is the NES and Game Boy sound. One short pitched tone per character, the thing you hear under every RPG text box.

**Animalese** is fast chatter that copies the rhythm of speech. Each letter gets a short syllable, so the voice sounds like it is talking without saying words.

**Retro Noise / Robotic** is buzzy and metallic, like a voice through a broken speaker. Robots, computers, villains, station announcements.

None of them are text-to-speech. You will not get a sentence you can understand. You get the sound a game plays while the sentence types.

## What you can change

Five presets do the first pass: Cozy Animal, Sarcastic Robot, 8-Bit Hero, Dark Wizard and Fairy Whispers. Load one and adjust from there.

The controls are base pitch, speed, pitch variation, volume, envelope decay, formant or crush, and waveform. Every slider has a number box beside it, so you can type 180 ms instead of dragging to it.

Punctuation intonation is the one worth turning on, because a question mark rises 150 Hz, an exclamation rises 100 Hz, and a full stop or comma falls with a longer pause after each. So a line of dialogue starts to sound like it is being said instead of typed.

Animalese ignores envelope decay, because its blips follow the speed setting. 8-Bit Chiptune ignores formant, since there is no vowel to shape.

## What you get

Export WAV File saves the whole line as a mono WAV. It drops into Unity, Godot, GameMaker, RPG Maker, or anything else that reads a WAV.

![BlipTalk Studio with a line in the dialogue preview, the voice controls, and the export buttons](/images/bliptalk-studio-playback.png)

Then there is the Blip Pack. It is the better fit when your game types the sentence out.

Export Blip Pack saves five single-character blips, and the pitched voices give you a five-note scale while Animalese gives you the five vowels, so you can trigger them as the text types out and the voice follows the sentence instead of running on its own. There is a ZIP option if you would rather have all five in one download.

## Good to know

The sounds you make are yours, including in commercial games. No credit needed.

Your last line is kept for the tab, so a refresh does not lose it. Voice settings and your own presets stay in this browser, and you can export them to a file and import them somewhere else.

![BlipTalk Studio's three voice tabs and the dialogue preview](/images/bliptalk-studio-interface.png)

The app is React, Vite, Tailwind and the Web Audio API, and all the sound is synthesized at runtime from oscillators, formant filters and noise, with no samples and no model involved.

[Play BlipTalk Studio on itch.io →](https://tarlow.itch.io/bliptalk-studio)
