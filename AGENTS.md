# AGENTS.md

This file provides guidance to AI coding agents when working with this repository.

## Commands

| Command | Action |
|---|---|
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` (runs image optimization first) |
| `npm run preview` | Preview production build |
| `npm run images` | Regenerate responsive WebP variants + manifest in `public/images/_opt/` |
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
- **Projects** (`src/content/projects/`): Markdown files with same fields plus `category` (enum: `Launched` | `Development`), optional `image`, `github`, `url` (external link), `featured`, and `draft`.

Content access helpers are in [src/lib/posts.ts](src/lib/posts.ts):
- `getPublicBlog()` / `getPublicProjects()` - filter drafts in production but show them in dev
- `getPublishedBlog()` - always filters drafts (used for RSS)
- `getRelatedPosts(current, all, limit?)` - tag-overlap scoring with pubDate tie-break

Plain-text excerpt helper: [src/lib/excerpt.ts](src/lib/excerpt.ts) - `excerpt(body, max)` strips frontmatter, links, images, headings, lists, blockquotes, tables, and markdown from post bodies.

### Images

Images live in `public/images/` and are referenced by public URL (`/images/foo.png`) in frontmatter and markdown - that authoring convention does not change. Because Astro cannot optimize `/public` assets, [scripts/optimize-images.mjs](scripts/optimize-images.mjs) pre-generates WebP variants at 320/640/1280w and writes `public/images/_opt/manifest.json`. It runs automatically via `predev`/`prebuild` (or manually with `npm run images`) and is idempotent; `public/images/_opt/` is gitignored.

- [src/components/ContentImage.astro](src/components/ContentImage.astro) reads the manifest and emits `<picture><source type="image/webp" srcset=...><img ...></picture>` (falling back to a plain `<img>` with `sharp` dimensions if the manifest is missing). Pass `sizes`, `loading`, and `fetchpriority` per usage; the LCP avatar uses `loading="eager" fetchpriority="high"`.
- [plugins/rehype-optimize-images.mjs](plugins/rehype-optimize-images.mjs) does the same for markdown body images, and stamps `width`/`height`/`loading="lazy"` to prevent layout shift.
- `<picture>` uses `class="contents"` so the existing sizing classes on the `<img>` keep working.

### Routing

Pages use Astro file-based routing in [src/pages/](src/pages/):

| Route | File | Key Details |
|---|---|---|
| `/` | `index.astro` | Home with profile image + greeting, shows 5 latest posts |
| `/blog/` | `blog/index.astro` | Paginated listing (5/page) with a `BlogSearch` box above the list and a `Sidebar` at `lg+` |
| `/blog/page/[page]/` | `blog/page/[page].astro` | Pagination pages 2+ |
| `/blog/[...slug]/` | `blog/[...slug].astro` | Individual blog post via `getStaticPaths()` |
| `/blog/tags/` | `blog/tags/index.astro` | Tag cloud with post counts |
| `/blog/tags/[tag]/` | `blog/tags/[tag].astro` | Posts filtered by tag |
| `/projects/` | `projects/index.astro` | Showcase; the project with `featured: true` renders first, then the rest |
| `/projects/[...slug]/` | `projects/[...slug].astro` | Individual project detail |
| `/about/` | `about.astro` | About page |
| `404` | `404.astro` | Custom 404 |
| `/rss.xml` | `rss.xml.js` | RSS feed via `@astrojs/rss` |

### Components

Key components in [src/components/](src/components/):

- **BaseLayout** (`src/layouts/BaseLayout.astro`) - Root layout with `ClientRouter`, inline dark-mode bootstrap script (`localStorage` `theme`, falling back to `prefers-color-scheme`, applied before paint), a single delegated theme controller (`data-theme-toggle` / `data-theme-sun` / `data-theme-moon` / `data-theme-label`), Google Analytics (G-H879GPJ4GM), Inter font from Google Fonts, OG/Twitter meta (fallback image), Navbar, `#app-shell` wrapper (Navbar + slot + BackToTop), MobilePanel sibling, and BackToTop.
- **Navbar** - Header with "Tarlow" wordmark (links to `/`), centered inline nav links (Home, Blog, Projects, About, shown from `md`) with active-state highlighting (border-underline style), and a right cluster with the hamburger trigger (`data-menu-trigger`, `< md`, `aria-expanded` managed by MobilePanel) plus the theme toggle. No theme script of its own - BaseLayout owns theming.
- **Sidebar** - Blog sidebar shown at `lg+` on blog listing pages, sticky (`lg:sticky lg:top-8`) and tag cloud (top 8). Takes a `showRecent` prop: page 1 passes `showRecent={false}` (the main list already shows the newest posts) and renders an About card instead; pages 2+ show Recent Posts. No search - that lives in `BlogSearch`.
- **MobilePanel** - Slide-in mobile nav (`< md`) with nav links, theme toggle row, and Recent Posts. No search/posts data. Script is `data-astro-rerun` + delegated (via `window.__menuCleanup`) to survive View Transitions; manages `inert` on `#app-shell`/panel, focus trap + return, Escape, backdrop/close clicks, and auto-close on resize past `md`.
- **BlogSearch** - Search box rendered above the post list on `/blog` listing pages at all sizes (filters title, description, and tags client-side; results replace the list via `#default-content` / `#search-results`). The only component that inlines post metadata (`define:vars`). The script renders *before* `#default-content`/`#search-results`, so it defers binding to `DOMContentLoaded` when the document is still parsing - do not remove that guard or search breaks on direct loads/hard refreshes. `#search-results` is an `aria-live="polite"` region.
- **Pagination** - Prev/Next with page numbers, ellipsis for long ranges, configurable `basePath` (defaults to `/blog`). Links are 44px hit targets and the current page carries `aria-current="page"`; the `<nav>` is labelled "Pagination".
- **ContentImage** - Reads the build-time image manifest and emits responsive `<picture>`/WebP `srcset` markup. Accepts `src` (public path), `alt`, `class`, `sizes`, `loading`, and `fetchpriority`; falls back to a plain `<img>` with `sharp` dimensions when the manifest is absent.
- **ImageZoom** - Global click-to-zoom overlay for blog/project article images.
- **ProjectCard** - Responsive card with image, excerpt, tags, and GitHub link. Takes a `featured` prop that adds the "Featured" badge and a filled CTA; when the project has a `url` the CTA becomes an external "Visit" link.
- **RelatedPosts** - Renders tag-based related posts at the bottom of blog posts.
- **ShareButtons** - Bluesky + X share links (client-side intent URLs, no API calls).
- **BackToTop** - Fixed circular button that appears after scrolling 400px. When hidden it is `invisible`, `aria-hidden`, and `tabindex="-1"` so keyboard users cannot focus an invisible control.
- **CodeCopy** - Adds a "Copy" button to `.prose-custom pre` blocks.

### Design System

Tailwind theme tokens in [tailwind.config.mjs](tailwind.config.mjs):

- **Colors**: `paper` (light #F9F9F8 / dark #0D0D0D), `ink` (light #1A1A1A / dark #F5F5F5), `muted` (secondary text tier, light #6F6F6F / dark #A5A5A5), `terracotta` (theme-aware accent: light #A8483A / dark #E07A6A)
- **Dark mode**: `darkMode: 'class'`. `paper`, `ink`, `muted`, and `terracotta` are CSS variables defined in [src/styles/global.css](src/styles/global.css) and swapped by `html.dark`. Always use the semantic tokens (`text-ink`, `bg-paper`, `text-muted`, `text-terracotta`) - never hardcoded hex - or dark mode breaks. Semi-transparent token usage (e.g. `text-ink/60`, `bg-paper/90`) works via the RGB-variable `<alpha-value>` pattern.
- **Contrast**: the `terracotta` values are tuned so text and `bg-terracotta text-paper` fills clear WCAG AA in both themes. Use `text-muted` (not `text-ink/40` or `/50`) for secondary text - the low-opacity ink steps fail AA on paper.
- **Fonts**: `font-sans` -> Inter (body + headings), system sans fallback stack
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

- **Google Analytics** (G-H879GPJ4GM) - loaded in BaseLayout; the ~170KB library is injected after `load` + `requestIdleCallback` (config calls queue in `dataLayer`), so it stays off the critical path
- **Bluesky** - share buttons link to bsky.app intent URLs (no API calls)
- **Google Fonts** - Inter served via fonts.googleapis.com

## Style Conventions

- Use single dashes (-) instead of em dashes (--) in all content and code.
- Commit messages follow conventional style (`feat:`, `fix:`, `refactor:`, `chore:`, etc.) as seen in git history.
- Do not commit editor metadata: `.frontmatter/`, `.opencode/`, `.vscode/` settings other than the tracked `extensions.json`/`launch.json` are gitignored or untracked.

## Content Writing

Add a new blog post: create a `.md` file in `src/content/blog/` with the required frontmatter (`title`, `pubDate`, `description`, `tags`). Add `draft: true` to preview before publishing. Blog posts render with prose styling and tag links. For featured images, place them in `/public/images/` and reference as `/images/filename.png`.

Projects follow the same pattern in `src/content/projects/` with the additional `category` field (`Launched` or `Development`). Add `featured: true` to pin one project at the top of `/projects/`, and `url` for an external "Visit" link. Images need no import or build step - just drop the file in `public/images/` and reference `/images/filename.png`; the optimizer picks it up on the next `npm run dev` / `npm run build`.
