# AGENTS.md

This file provides guidance to AI coding agents when working with this repository.

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

Use `npm ci --legacy-peer-deps` for reproducible installs (`.npmrc` sets `legacy-peer-deps=true`).

## Architecture

This is a static site built with **Astro 6**, **Tailwind CSS 3**, and **TypeScript**. Content is published as flat HTML - no server runtime. The site uses **View Transitions** (`<ClientRouter />` in BaseLayout) so client-side scripts must be re-entrant: use inline scripts with `data-astro-rerun` or listen to `astro:page-load`, and guard against duplicate handler registration on `window`.

### Content Collections

All content lives in `src/content/` using Astro's content collections with Zod schemas (see [src/content.config.ts](src/content.config.ts)):

- **Blog** (`src/content/blog/`): Markdown files with `title`, `pubDate`, `description`, `tags`, optional `featuredimage` and `draft` flag.
- **Projects** (`src/content/projects/`): Markdown files with same fields plus `category` (enum: `Launched` | `Development`), optional `image`, `github`, `featured`, and `draft`.

Content access helpers are in [src/lib/posts.ts](src/lib/posts.ts):
- `getPublicBlog()` / `getPublicProjects()` - filter drafts in production but show them in dev
- `getPublishedBlog()` - always filters drafts (used for RSS)
- `getRelatedPosts(current, all, limit?)` - tag-overlap scoring with pubDate tie-break

Plain-text excerpt helper: [src/lib/excerpt.ts](src/lib/excerpt.ts) - `excerpt(body, max)` strips frontmatter, links, images, and markdown from post bodies.

### Routing

Pages use Astro file-based routing in [src/pages/](src/pages/):

| Route | File | Key Details |
|---|---|---|
| `/` | `index.astro` | Home with profile image + greeting, shows 5 latest posts |
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

- **BaseLayout** (`src/layouts/BaseLayout.astro`) - Root layout with `ClientRouter`, inline dark-mode bootstrap script (localStorage `theme`, applied before paint), Google Analytics (G-H879GPJ4GM), Inter/Lora fonts from Google Fonts, OG/Twitter meta, Navbar, MobilePanel, content slot, and BackToTop.
- **Navbar** - Desktop nav links (Home, Blog, Projects, About) with active-state highlighting (border-underline style); hamburger trigger (`data-menu-trigger`) for the mobile panel; dark mode toggle (sun/moon icons). Theme handler registered on `window.__navbarHandlers` to survive View Transition navigation.
- **Sidebar** - Blog listing sidebar with search form (client-side JS, filters by title/description), recent posts list, and tag cloud (top 8).
- **MobilePanel** - Slide-in mobile nav duplicating Sidebar functionality (search, recent posts, tag cloud) plus a dark mode toggle.
- **Pagination** - Prev/Next with page numbers, ellipsis for long ranges, configurable `basePath` (defaults to `/blog`).
- **ContentImage** - Astro `<Image>` component that reads image dimensions via `sharp` at build time. Source paths must be relative to `/public/`.
- **ImageZoom** - Global click-to-zoom overlay for blog/project article images.
- **ProjectCard** - Responsive card (1/2/4 columns) with image, excerpt, tags, and GitHub link.
- **RelatedPosts** - Renders tag-based related posts at the bottom of blog posts.
- **ShareButtons** - Bluesky + X share links (client-side intent URLs, no API calls).
- **BackToTop** - Fixed circular button that appears after scrolling 400px.
- **CodeCopy** - Adds a "Copy" button to `.prose-custom pre` blocks.

### Design System

Tailwind theme tokens in [tailwind.config.mjs](tailwind.config.mjs):

- **Colors**: `paper` (#F9F9F8), `ink` (#1A1A1A), `terracotta` (#C05746)
- **Dark mode**: `darkMode: 'class'`. `paper` and `ink` are CSS variables defined in [src/styles/global.css](src/styles/global.css) and swapped by `html.dark` (paper #0D0D0D, ink #F5F5F5). Always use the semantic tokens (`text-ink`, `bg-paper`, `text-terracotta`) - never hardcoded hex - or dark mode breaks. Semi-transparent token usage (e.g. `text-ink/60`, `bg-paper/90`) works via the RGB-variable `<alpha-value>` pattern.
- **Fonts**: `font-serif` -> Lora (headings), `font-sans` -> Inter (body)
- **Content prose**: Custom `.prose-custom` class in [src/styles/prose.css](src/styles/prose.css) - not Tailwind's typography plugin. Handles headings, links (terracotta underline), blockquotes, code, tables, images.
- **Motion**: `prefers-reduced-motion: reduce` disables all transitions and View Transitions (global.css).

### Drafts & Production

Blog posts and projects with `draft: true` in frontmatter are excluded at build time (`astro build`) but visible during `astro dev`. The check happens in `getPublicBlog()` / `getPublicProjects()`.

### Deployment

Pushing to `main` triggers [.github/workflows/deploy.yml](.github/workflows/deploy.yml): Node 22, `npm ci --legacy-peer-deps`, `npm run build`, then `actions/deploy-pages` to the `github-pages` environment. The `gh-pages` branch is a legacy artifact and should not be pushed to.

- Custom domain: `public/CNAME` (root-level `CNAME` was removed - do not re-add)
- Cache headers: `public/_headers`
- Site URL: https://tarlow.space - defined in `astro.config.mjs` (used by sitemap, OG tags, RSS)

### External Services

- **Google Analytics** (G-H879GPJ4GM) - loaded in BaseLayout head
- **Bluesky** - share buttons link to bsky.app intent URLs (no API calls)
- **Google Fonts** - Inter + Lora served via fonts.googleapis.com

## Style Conventions

- Use single dashes (-) instead of em dashes (--) in all content and code.
- Commit messages follow conventional style (`feat:`, `fix:`, `refactor:`, `chore:`, etc.) as seen in git history.
- Do not commit editor metadata: `.frontmatter/`, `.opencode/`, `.vscode/` settings other than the tracked `extensions.json`/`launch.json` are gitignored or untracked.

## Content Writing

Add a new blog post: create a `.md` file in `src/content/blog/` with the required frontmatter (`title`, `pubDate`, `description`, `tags`). Add `draft: true` to preview before publishing. Blog posts render with prose styling and tag links. For featured images, place them in `/public/images/` and reference as `/images/filename.png`.

Projects follow the same pattern in `src/content/projects/` with the additional `category` field (`Launched` or `Development`).
