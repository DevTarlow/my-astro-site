# Tarlow.space

Personal website and field journal, built with intention.

A quiet record of building, attention, and a look in the past. Local-first software, agents, and the work of staying present, made by [Tarlow](https://github.com/DevTarlow).

## Built With

- **Astro 6** - static site generation
- **Tailwind CSS 3** - utility styling and tokens
- **TypeScript** - type safety
- **View Transitions** - client-side navigation without a SPA framework

## Theme

**Observatory** - a dark-only night sky. Deep ground (`#05070C`), warm bone type (`#EFE8DB`), brass accents (`#CFAE7B`), Instrument Serif for display and Inter for reading. A fixed star canvas, a constellation atlas of entries, and a warm editorial layout.

## Prerequisites

- **Node.js 24** or newer (`.nvmrc` is the deployment source of truth)
- **npm** (a `package-lock.json` is committed, so use `npm ci --legacy-peer-deps` for reproducible installs)

## Commands

| Command | Action |
|---|---|
| `npm install` | Install dependencies (use `npm ci --legacy-peer-deps` in CI) |
| `npm run dev` | Start the dev server at `localhost:4321` |
| `npm run build` | Build the production site to `./dist/` |
| `npm run preview` | Preview the production build |
| `npm run check` | Type-check Astro files |
| `npm run lint` | ESLint all files |
| `npm run lint:fix` | ESLint auto-fix |
| `npm run images` | Regenerate responsive WebP variants |
| `npm run fonts` | Refresh the self-hosted Inter and Instrument Serif files |
| `npm run og:image` | Regenerate the social card, touch icon, and favicon fallbacks |
| `npm run astro` | Run any Astro CLI command |

## Project Structure

```
public/                 Static assets (fonts, images, favicon, CNAME)
src/
  components/           Observatory chrome, atlas, search, cards, and utilities
  content/              Content collections (blog, projects)
  layouts/              BaseLayout
  lib/                  Content, atlas, reading time, and site helpers
  pages/                Routes
  styles/               Tokens, Observatory layout, and prose
astro.config.mjs
tailwind.config.mjs
tsconfig.json
```

## Pages

| Route | Description |
|---|---|
| `/` | Observatory home: hero, constellation atlas of every entry, featured journal, work in orbit, and the current Now |
| `/blog` | Paginated journal with full-text search, tags, and reading sidebar |
| `/blog/page/:page` | Journal pages 2+ |
| `/blog/:slug` | Long-form entry with reading progress, related notes, and sharing |
| `/blog/tags` | Tag index |
| `/blog/tags/:tag` | Entries filtered by tag |
| `/projects` | Featured project and the full work index grouped by year |
| `/projects/:slug` | Project detail |
| `/about` | A look in the past: chapters, practice, Now, and contact |
| Any unmatched route | Custom 404 |
| `/rss.xml` | RSS feed via `@astrojs/rss` |
| `/search-index.json` | Plain-text post bodies fetched by search on first interaction |

## Content

Blog posts and projects are Markdown files in Astro content collections.

- **Blog**: `src/content/blog/`
- **Projects**: `src/content/projects/`

See [AGENTS.md](AGENTS.md) for schemas, tag rules, and contribution conventions.

### Drafts

Posts and projects with `draft: true` are excluded from production builds but visible in development. Publishing is removing the flag.

## Deployment

Pushing to `main` triggers the [GitHub Actions workflow](.github/workflows/deploy.yml), which builds the site and deploys it to **GitHub Pages** via `actions/deploy-pages`.

- **Site URL**: https://tarlow.space (custom domain via `public/CNAME`)
- **Cache headers**: `public/_headers` (kept for hosts that read it; GitHub Pages ignores it)

## External Services

- **Google Analytics** (`G-H879GPJ4GM`) - consent-gated; nothing loads until the visitor allows analytics.
- **Bluesky** - share buttons use bsky.app intent URLs; no API calls.
- **Fonts** - Inter and Instrument Serif are self-hosted in `public/fonts/`; no Google Fonts request at runtime.
