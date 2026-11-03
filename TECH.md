# Technical notes

How the site is put together, for anyone who clones the repo. What the site is
and what lives on it is in [README.md](README.md).

## Requirements

- Node 24 or newer (`.nvmrc` is the source of truth; CI reads it)
- npm, with the committed `package-lock.json`. `.npmrc` sets `legacy-peer-deps`,
  so use `npm ci --legacy-peer-deps` for reproducible installs

## Commands

| Command | Action |
|---|---|
| `npm run dev` | Dev server at `localhost:4321` |
| `npm run build` | Production build to `./dist/` |
| `npm run preview` | Preview the production build |
| `npm run check` | Type-check the Astro files |
| `npm run lint` | ESLint every file |
| `npm run lint:fix` | ESLint with autofix |
| `npm run images` | Regenerate the responsive WebP variants |
| `npm run fonts` | Refresh the self-hosted Inter and Instrument Serif files |
| `npm run og:image` | Regenerate the social card, touch icon, and favicon fallbacks |

`predev` and `prebuild` run `scripts/optimize-images.mjs` first, so the image
variants are always current.

## Stack

- Astro 6 with content collections and the sitemap integration
- Tailwind CSS 3 for utility styling, plus custom CSS for the tokens and prose
- TypeScript for the content and helper layers
- View Transitions for client-side navigation, so the star field and page chrome
  survive a route change
- Prefetch on hover, so a link is usually ready before the click

## Layout

```
public/            static assets: fonts, images, favicon, CNAME, _headers, robots.txt
scripts/           image optimization, font refresh, social card generation
plugins/           rehype plugins for tables and markdown images
src/
  components/      chrome, cards, search, sky, article utilities
  content/         Markdown collections: blog posts and project notes
  layouts/         BaseLayout, which every page renders through
  lib/             dates, excerpts, reading time, tag redirects, site copy
  pages/           routes
  styles/          tokens, Field Journal layout, prose
```

## Routes

| Route | Page |
|---|---|
| `/` | Home: hero, latest note, recent entries, selected work, threads, Now |
| `/blog/` | Paginated journal with live full-text search |
| `/blog/page/:page/` | Journal pages 2 and up |
| `/blog/:slug/` | A single entry, with reading progress, tags, and related notes |
| `/blog/tags/` | Tag index |
| `/blog/tags/:tag/` | Entries filtered by tag |
| `/projects/` | Featured project, then the full work index by year |
| `/projects/:slug/` | Project detail |
| `/about/` | The longer story |
| `/rss.xml` | RSS feed |
| `/search-index.json` | Plain-text post bodies, fetched by search on first interaction |
| anything else | Custom 404 |

## Content

Posts and project notes are Markdown files. The schemas live in
[src/content.config.ts](src/content.config.ts):

- `src/content/blog/`: `title`, `pubDate`, `description`, `tags`, optional
  `featuredimage`, optional `draft`
- `src/content/projects/`: the same fields plus optional `image`, `github`,
  `url`, `featured`, and a `category` of `Launched` or `Development`

`draft: true` hides a piece from production builds and shows it in development.
Tag URLs are case sensitive and deliberately few; retired tag addresses redirect
through [src/lib/tag-redirects.mjs](src/lib/tag-redirects.mjs).

Images sit in `public/images/` and are referenced by public path, such as
`/images/foo.png`. The prebuild step writes WebP variants and a manifest to
`public/images/_opt/`, which is not committed.

## Theme

Dark only, no toggle. Ground `#05070C`, ink `#EFE8DB`, brass `#CFAE7B`, with
Inter for reading and Instrument Serif for display. The tokens are in
[src/styles/observatory.css](src/styles/observatory.css) and
[src/styles/field-journal.css](src/styles/field-journal.css).

## Deployment

A push to `main` runs [.github/workflows/deploy.yml](.github/workflows/deploy.yml):
`npm ci --legacy-peer-deps`, `npm run build`, then `actions/deploy-pages` to
GitHub Pages. A failed build leaves the previous deployment live.

- Custom domain: `public/CNAME`
- `public/_headers` is kept for hosts that read it; GitHub Pages serves it as a
  static file and applies no rules

## External services

- Google Analytics, consent-gated. Nothing loads and no cookie is set until a
  visitor accepts.
- Bluesky and X share buttons use plain intent URLs. No API calls.
- Fonts are self-hosted, so there is no third-party font request.

## Conventions

The working rules for this repo, including commit style, tag policy, and the
component notes, are in [AGENTS.md](AGENTS.md).
