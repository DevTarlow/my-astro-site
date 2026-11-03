# Tarlow.space

The code behind [tarlow.space](https://tarlow.space), my personal site and field journal.

I write about the tools I build, the agents I run on my own machine, and the slower work of paying attention. Most posts start as something that happened that week: a launch, a rebuild, a lesson that cost me a weekend. Some are project notes, some are release write-ups, and a few are just a thought I wanted to keep.

## What is here

- **[The journal](https://tarlow.space/blog/)** - essays and product notes on local-first software, agents, and building slowly.
- **[Work](https://tarlow.space/projects/)** - the projects, what they do, and where each one stands.
- **[About](https://tarlow.space/about/)** - the longer story, plus what I am working on now.

No accounts, no comments, no feed to refresh. If you want new posts, there is an [RSS feed](https://tarlow.space/rss.xml).

## How it is built

A static site, generated at build time and served as plain HTML. Fonts are self-hosted, so visiting costs no third-party requests. The one script that is not mine is Google Analytics, and it loads nothing until a visitor accepts it.

- **Astro 6** for the build and the content collections
- **Tailwind CSS 3** for styling and tokens
- **TypeScript** where it earns its keep
- **View Transitions** so moving between pages does not reload the sky

The site is dark-only by design. One palette, one night sky, and a star field that stops moving when your system asks it to.

## Running it locally

You need Node 24 or newer.

```sh
npm ci --legacy-peer-deps
npm run dev
```

The site runs at `localhost:4321`. `npm run build` writes the production site to `dist/`, and a push to `main` builds and deploys it to GitHub Pages.

## Layout

```
src/
  components/   navigation, cards, search, the sky
  content/      posts and project notes (Markdown)
  layouts/      the shared page shell
  lib/          dates, excerpts, tag helpers
  pages/        routes
  styles/       tokens, prose, layout
public/         fonts, images, favicon
```

Posts are Markdown files in `src/content/blog/`, and project notes are in `src/content/projects/`. Drafts are hidden in production and visible in development.

## The writing

The words and images are mine. The code is public because the site is built in the open and deployed from this repo.

Working notes for the agents that help me maintain it live in [AGENTS.md](AGENTS.md).
