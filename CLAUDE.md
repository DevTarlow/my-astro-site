# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

| Command | Action |
|---|---|
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview production build |
| `npm run check` | Run astro check (type-check Astro files) |
| `npm run lint` | ESLint check all files |
| `npm run lint:fix` | ESLint auto-fix |
| `npm run astro` | Run any astro CLI command |

## Architecture

This is a static site built with **Astro 6**, **Tailwind CSS 3**, and **TypeScript**. Content is published as flat HTML — no server runtime.

### Content Collections

All content lives in `src/content/` using Astro's content collections with Zod schemas:

- **Blog** (`src/content/blog/`): Markdown files with `title`, `pubDate`, `description`, `tags`, optional `featuredimage` and `draft` flag.
- **Projects** (`src/content/projects/`): Markdown files with same fields plus `category` (enum: `Launched` | `Development`), optional `image`, `github`, and `featured` flag.

Content access helpers are in [src/lib/posts.ts](src/lib/posts.ts):
- `getPublicBlog()` / `getPublicProjects()` — filter drafts in production but show them in dev
- `getPublishedBlog()` — always filters drafts (used for RSS)

### Routing

Pages use Astro file-based routing in [src/pages/](src/pages/):

| Route | File | Key Details |
|---|---|---|
| `/` | `index.astro` | Home, shows 3 latest posts |
| `/blog/` | `blog/index.astro` | Paginated listing (5/page) with sidebar search |
| `/blog/page/[page]/` | `blog/page/[page].astro` | Pagination pages 2+ |
| `/blog/[...slug]/` | `blog/[...slug].astro` | Individual blog post via `getStaticPaths()` |
| `/blog/tags/` | `blog/tags/index.astro` | Tag cloud with post counts |
| `/blog/tags/[tag]/` | `blog/tags/[tag].astro` | Posts filtered by tag |
| `/projects/` | `projects/index.astro` | Showcase grouped by category (Launched / Development) |
| `/projects/[...slug]/` | `projects/[...slug].astro` | Individual project detail |
| `/about/` | `about.astro` | About page |
| `404` | `404.astro` | Custom 404 |
| `/rss.xml` | `rss.xml.js` | RSS feed via `@astrojs/rss` |

### Components

Key components in [src/components/](src/components/):

- **BaseLayout** (`src/layouts/BaseLayout.astro`) — Root layout with OG meta, Google Analytics (G-H879GPJ4GM), Inter/Lora fonts from Google Fonts, Navbar, Bluesky overlay, and mobile panel slot.
- **Navbar** — Desktop nav links (Home, Blog, Projects, About) with active-state highlighting; hamburger trigger for mobile panel; Bluesky butterfly trigger.
- **Sidebar** — Blog listing sidebar with search form (client-side JS, filters by title/description), recent posts list, and tag cloud (top 8).
- **MobilePanel** — Slide-in mobile nav duplicating Sidebar functionality with its own search.
- **Pagination** — Prev/Next with page numbers, ellipsis for long ranges, configurable `basePath` (defaults to `/blog`).
- **BlueskyOverlay** — Modal that fetches and renders @itstarlow.bsky.social feed from the public Bluesky API.
- **ContentImage** — Astro `<Image>` component that reads image dimensions via `sharp` at build time. Source paths must be relative to `/public/`.
- **ImageZoom** — Global click-to-zoom overlay for blog/project article images.
- **ProjectCard** — Responsive card (1/2/4 columns) with image, excerpt, tags, and GitHub link.

### Design System

Tailwind theme tokens in [tailwind.config.mjs](tailwind.config.mjs):

- **Colors**: `paper` (#F9F9F8), `ink` (#1A1A1A), `terracotta` (#C05746)
- **Fonts**: `font-serif` → Lora (headings), `font-sans` → Inter (body)
- **Content prose**: Custom `.prose-custom` class in [src/styles/prose.css](src/styles/prose.css) — not Tailwind's typography plugin. Handles headings, links (terracotta underline), blockquotes, code, tables, images.

### Drafts & Production

Blog posts and projects with `draft: true` in frontmatter are excluded at build time (`astro build`) but visible during `astro dev`. The check happens in `getPublicBlog()` / `getPublicProjects()`.

### External Services

- **Google Analytics** (G-H879GPJ4GM) — loaded in BaseLayout head
- **Bluesky API** — client-side fetch to `public.api.bsky.app` for author feed
- **Google Fonts** — Inter + Lora served via fonts.googleapis.com
- **Site URL**: https://tarlow.space — defined in `astro.config.mjs` (used by sitemap, OG tags, RSS)

## Content Writing

Add a new blog post: create a `.md` file in `src/content/blog/` with the required frontmatter (`title`, `pubDate`, `description`, `tags`). Add `draft: true` to preview before publishing. Blog posts render with prose styling and tag links. For featured images, place them in `/public/images/` and reference as `/images/filename.png`.

Projects follow the same pattern in `src/content/projects/` with the additional `category` field (`Launched` or `Development`).
