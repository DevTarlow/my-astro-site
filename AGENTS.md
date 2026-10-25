# AGENTS.md

This file provides guidance to AI coding agents when working with this repository.

## Commands

| Command | Action |
|---|---|
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` (runs image optimization first) |
| `npm run preview` | Preview production build |
| `npm run images` | Regenerate responsive WebP variants + manifest in `public/images/_opt/` |
| `npm run fonts` | Refresh the self-hosted Inter and Instrument Serif files in `public/fonts/` |
| `npm run og:image` | Regenerate the social card, Apple touch icon, and favicon fallbacks (`public/images/og-default.png`, `apple-touch-icon.png`, `public/favicon.png`, `public/favicon.ico`) |
| `npm run check` | Run astro check (type-check Astro files) |
| `npm run lint` | ESLint check all files |
| `npm run lint:fix` | ESLint auto-fix |
| `npm run astro` | Run any astro CLI command |

Use `npm ci --legacy-peer-deps` for reproducible installs (`.npmrc` sets `legacy-peer-deps=true`).

## Development Workflow

This repo is developed directly on `main`: history is linear, there are no feature branches or pull requests, and work lands as local commits that go out when the user says to push. The loop is **change -> verify -> commit locally -> report -> push only when asked**.

### The loop

1. **Change** the smallest set of files that does the job. Unrelated cleanup is its own commit, not a drive-by edit.
2. **Verify** before committing:
   - `npm run lint` and `npm run check` on every change. CI runs neither, so they never fail a deploy - a lint or type error is only caught here.
   - `npm run build` for anything touching content frontmatter, routing, config, or images. It finishes in a couple of seconds and is the only gate CI enforces, so a clean local build is what "it works" means.
   - `npm run dev` for visual changes: check `localhost:4321` at a narrow width (390) and a wide one (1440). The site is dark-only, so there is no light-mode pass to run.
3. **Commit** once the task is complete and verified. Do not commit half-finished work, and do not leave a finished task uncommitted.
4. **Report** what changed, which checks ran, and the commit subject or hash. Do not push.
5. **Push** only on an explicit instruction ("push", "ship it", "deploy"). `git push` on `main` deploys production.

### Commits

- Conventional Commits, matching the history: `feat`, `fix`, `refactor`, `perf`, `chore`, `content` (posts and project copy), `docs`. No scope is used.
- Subject: imperative mood, lowercase by convention, no trailing period, short enough to read at a glance. Example: `feat: add the Pixel Juice Studio project page`.
- Add a body when the "why" is not obvious - blank line after the subject, then a sentence or two. Recent commits do this and it makes `git log` worth reading.
- One logical change per commit. A new post, a component refactor, and a config bump are three commits even when they land in one session.
- Stage deliberately (`git add <paths>`) and check `git status` before committing. `dist/`, `public/images/_opt/`, `.astro/`, and editor or scratch files are gitignored and should never appear in a commit.
- Never rewrite pushed history: no `git push --force`, no amending a commit already on `origin/main`. `gh-pages` is a legacy branch - do not push to it.

### Pushing

- `git push` only after the user asks. This is the one step that is never automatic.
- Before pushing, `git status` should show a clean tree and `main` ahead of `origin/main`. A push with nothing to send, or a branch that needs a rebase first, means a step was skipped.
- A push to `main` runs `npm ci --legacy-peer-deps`, `npm run build`, then `actions/deploy-pages` to GitHub Pages. A failed build leaves the previous deployment live; fix forward rather than shipping around it.

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

Project listing helpers are in [src/lib/project-browse.ts](src/lib/project-browse.ts):
- `getProjects()` - newest first (used by `/projects/`)
- `toDisplay(projects)` / `groupByYear(rows)` - pre-format the dates and titles the projects page renders (`ProjectDisplay` carries `title`, `shortTitle`, `year`, `month`, `monthYear`, `href`, `category`)
- `categoryClass(category)` - shared `Launched` / `Development` pill styling

Observatory helpers:
- [src/lib/atlas.ts](src/lib/atlas.ts) - groups every public post into `agents`, `local-first`, `workflow`, or `launches` from its tags, assigns stable 1000x600 stage coordinates, and builds constellation lines plus the featured entry.
- [src/lib/reading.ts](src/lib/reading.ts) - rough reading time from a Markdown body at 220 words per minute.
- [src/lib/site.ts](src/lib/site.ts) - the featured entry slug, the editable `NOW` copy, and Portland coordinates shared by the home and About pages.
- [src/lib/tag-redirects.mjs](src/lib/tag-redirects.mjs) - retired tag aliases passed to Astro's redirects in `astro.config.mjs`.

Date helper: [src/lib/dates.ts](src/lib/dates.ts) - `dateParts(date)` returns `long` / `short` / `monthYear` / `month` / `year`.

**Always format frontmatter dates through `dateParts`.** `pubDate: 2026-09-27` is parsed by Zod into a Date at UTC midnight, so calling `toLocaleDateString()` without `timeZone: 'UTC'` renders the previous day for anyone west of UTC (a post dated the 27th displayed as September 26). `dateParts` pins every format to UTC so the displayed date always matches the frontmatter. This applies to every surface that shows a date, including the client-side `BlogSearch` results, which is why it receives a pre-formatted `date` string instead of a raw timestamp. `<time datetime>` uses `toISOString().slice(0, 10)` to stay a date-only value that agrees with the visible text. Anchors that only need ordering (`pubDate.getTime()`) are unaffected.

Plain-text excerpt helper: [src/lib/excerpt.ts](src/lib/excerpt.ts) - `plainText(body)` strips frontmatter, links, images, headings, lists, blockquotes, tables, and markdown from a post body; `excerpt(body, max)` is the same text truncated on a word boundary.

### Tags

Blog tags are a deliberately small, lowercase, hyphenated set. Prefer the established tags shown on `/blog/tags/` and keep it that way: no near-duplicates (`AI` vs `AI automation` vs `ai-development`), no case variants (tag URLs are case sensitive), and no new tag that only ever covers one post.

Retiring or renaming a tag means adding its old address to `folded` (a surviving tag covers the same ground) or `dropped` (no successor, so it points at the tag index) in [src/lib/tag-redirects.mjs](src/lib/tag-redirects.mjs). `astro.config.mjs` passes that map to `redirects`, and Astro emits a redirect page per entry, so old links keep working. Note that Astro treats two static routes differing only by case as a collision, so a lower-case alias cannot sit alongside the original spelling.

### Images

Images live in `public/images/` and are referenced by public URL (`/images/foo.png`) in frontmatter and markdown - that authoring convention does not change. Because Astro cannot optimize `/public` assets, [scripts/optimize-images.mjs](scripts/optimize-images.mjs) pre-generates WebP variants at 320/640/1280w and writes `public/images/_opt/manifest.json`. It runs automatically via `predev`/`prebuild` (or manually with `npm run images`) and is idempotent; `public/images/_opt/` is gitignored.

- [src/components/ContentImage.astro](src/components/ContentImage.astro) reads the manifest and emits `<picture><source type="image/webp" srcset=...><img ...></picture>` (falling back to a plain `<img>` with `sharp` dimensions if the manifest is missing). Pass `sizes`, `loading`, and `fetchpriority` per usage; the LCP avatar uses `loading="eager" fetchpriority="high"`.
- [plugins/rehype-optimize-images.mjs](plugins/rehype-optimize-images.mjs) does the same for markdown body images, and stamps `width`/`height`/`loading="lazy"` to prevent layout shift.
- `<picture>` uses `class="contents"` so the existing sizing classes on the `<img>` keep working.

**The file extension must match the bytes.** Two images shipped with the wrong extension (a 2.6MB JPEG named `.png`, a PNG named `.jpg`), which made the `og:image` content type disagree with the file. `scripts/optimize-images.mjs` skips `og-default.png` and `apple-touch-icon.png` because they are generated for unfurls and icons rather than page content. `scripts/make-og-image.mjs` (`npm run og:image`) rasterises the default share card with system DejaVu Serif and Lato, because librsvg cannot read the woff2 Inter or Instrument Serif the browser uses. It also generates the dark Apple touch icon, `favicon.png`, and a PNG-in-ICO `favicon.ico` from [public/favicon.svg](public/favicon.svg).

### Routing

Pages use Astro file-based routing in [src/pages/](src/pages/):

| Route | File | Key Details |
|---|---|---|
| `/` | `index.astro` | Observatory home: hero, constellation atlas of every entry, featured and recent journal, work in orbit, and the editable Now band |
| `/blog/` | `blog/index.astro` | Paginated listing (5/page) with the Observatory search panel and a sticky sidebar above 1024px |
| `/blog/page/[page]/` | `blog/page/[page].astro` | Pagination pages 2+ |
| `/blog/[...slug]/` | `blog/[...slug].astro` | Long-form entry with reading progress, tags, sharing, and nearby notes |
| `/blog/tags/` | `blog/tags/index.astro` | Tag index |
| `/blog/tags/[tag]/` | `blog/tags/[tag].astro` | Posts filtered by tag |
| `/projects/` | `projects/index.astro` | Featured project lead card, then the complete work index grouped by year |
| `/projects/[...slug]/` | `projects/[...slug].astro` | Project detail with a hero image, actions, and prose |
| `/about/` | `about.astro` | The long way back: chapters, a small practice, Now, and contact |
| `404` | `404.astro` | Custom 404 |
| `/rss.xml` | `rss.xml.js` | RSS feed via `@astrojs/rss` |
| `/search-index.json` | `search-index.json.ts` | Plain text of every post body, fetched by `BlogSearch` on first interaction (see below) |

### Components

Key components in [src/components/](src/components/):

- **BaseLayout** (`src/layouts/BaseLayout.astro`) - Root layout with `ClientRouter`, a dark-only `#app-shell`, self-hosted font preloads, consent-gated Google Analytics (G-H879GPJ4GM), OG/Twitter meta, JSON-LD, Navbar, slot, FooterColumns, BackToTop, and ConsentBanner. It also renders the global `Sky` (fixed canvas starfield, grain, shooting star) and `SiteScripts` outside the shell content. There is no theme script and no theme toggle. **Every page must render `<main id="main-content">`** or the skip link has nowhere to go; the post and project pages wrap their `<article>` in one. The `view` prop (`home` | `essay` | `about` | `page`) sets `body[data-view]`, which drives sky opacity and the article progress bar. Other props beyond title/description/image/ogType: `noindex` (drops the canonical and emits `robots noindex`, used by the 404), `publishedTime` + `articleTags` (emit `article:*` meta on `og:type=article` pages), `jsonLd` (one object or an array, serialised with `<` escaped), and `bodyClass`. Pages without their own `image` fall back to `/images/og-default.png`, a generated 1200x630 card; per-post images declare `og:image:width/height` from the build-time manifest.
- **Navbar** - Fixed header with the "Tarlow." wordmark and "field notes" suffix, centered Journal / Atlas / Work / About links with active-state highlighting, a Portland local-time/coordinate cluster, an RSS link, and the mobile index trigger (`data-menu-trigger`, shown at 1020px and below, with `aria-expanded` and `aria-haspopup="dialog"`). Atlas points at `/#atlas`. No theme control.
- **FooterColumns** (`src/components/footer/FooterColumns.astro`) - Site footer rendered on every page from BaseLayout. Wordmark, short blurb, Explore (Home, Journal, Work, About), Elsewhere (GitHub, Bluesky, X, Moss AI Studio, RSS, email), and a bottom row with copyright, "Made under the same sky", and the live Portland time.
- **Sidebar** - Journal sidebar shown above 1024px (`position: sticky` under the header). Takes a `showRecent` prop: page 1 passes `showRecent={false}` and renders an About card; pages 2+ show recent entries. Also renders the top eight tags with counts. No search - that lives in `BlogSearch`.
- **MobilePanel** - Full-screen mobile index dialog (`role="dialog"`, `aria-modal`, hidden until opened). Five serif nav links, a close control, coordinates, live time, and social links. Its `data-astro-rerun` script uses `window.__menuCleanup`, manages `inert` on `#app-shell`, traps focus, restores focus, closes on Escape or a nav link, locks body scroll, and auto-closes above 1020px. No theme toggle.
- **BlogSearch** - Search panel rendered above the post list on `/blog` pages at all sizes. Titles, descriptions and tags are inlined (`define:vars`); post bodies come from `/search-index.json`, fetched on first focus or input and cached per script instance. Results replace the list via `#default-content` / `#search-results` and reuse the `PostCard` shape (640w WebP thumbnail, date, tag line, heading link, description). If the body index fails to load, search falls back to the metadata and says so. The script renders *before* the results container, so it defers binding to `DOMContentLoaded` when the document is still parsing - do not remove that guard or search breaks on direct loads/hard refreshes. `#search-results` is an `aria-live="polite"` region.
- **PostCard** - The journal listing card used by the blog index, pagination pages and tag pages (the home page uses its own featured/journal markup). Renders the featured image as a decorative, non-tabbable link (`alt=""`, `aria-hidden`, `tabindex="-1"`), the date and tag line, the title as a heading containing the card's only tab stop, and the excerpt. `headingLevel` defaults to `h2`.
- **Pagination** - Prev/Next with page numbers, ellipsis for long ranges, configurable `basePath` (defaults to `/blog`). Links are 44px hit targets and the current page carries `aria-current="page"`; the `<nav>` is labelled "Pagination".
- **ContentImage** - Reads the build-time image manifest and emits responsive `<picture>`/WebP `srcset` markup. Accepts `src` (public path), `alt`, `class`, `sizes`, `loading`, and `fetchpriority`; falls back to a plain `<img>` with `sharp` dimensions when the manifest is absent.
- **ImageZoom** - Global click-to-zoom overlay for blog/project article images.
- **ProjectFeaturedCard** - Two-column lead card for a project with `featured: true`: screenshot/thumbnail, date and category pill, title, full description, tags, GitHub/Visit actions. Takes a single `ProjectDisplay` row; the title is the only navigation tab stop in the card.
- **ProjectIndexRow** - Compact row for everything not featured: 64x44 thumbnail (initial fallback), title, one-line description, category pill and month on desktop. On small screens the meta column drops and the description wraps. The whole row is a single link.
- **RelatedPosts** - Tag-based related notes under an article, with date, title, excerpt, and a compact row layout.
- **ShareButtons** - Bluesky and X share links plus a client-side copy-link button. Intent URLs only, no API calls.
- **BackToTop** - Fixed circular control that appears after scrolling 400px and uses the outlined brass treatment. When hidden it is `invisible`, `aria-hidden`, and `tabindex="-1"` so keyboard users cannot focus an invisible control. Hidden entirely below 900px so it never covers the mobile reading column or footer.
- **Sky** (`src/components/Sky.astro`) - Fixed decorative canvas starfield plus space wash, grain, and a shooting star. About 72-180 seeded stars depending on the viewport, light parallax, and a 15-28s shooting-star interval. Pauses when the document is hidden, renders a still frame under reduced motion, cancels its animation frame and listeners via `window.__skyCleanup`, and supports `?still=1` for deterministic review screenshots.
- **SiteScripts** (`src/components/SiteScripts.astro`) - One re-entrant inline script that updates the header's `is-scrolled` class, fills `[data-local-time]` with the America/Los_Angeles clock, and drives `#essay-progress-bar`. Installs its window listeners once and refreshes on `astro:page-load`.
- **ConstellationAtlas** (`src/components/ConstellationAtlas.astro`) - The home atlas. Renders filter controls, an SVG constellation map, star links with accessible labels, a live preview panel, an Atlas/Index toggle, and an all-entries index fallback. At 900px and below the map tools are hidden by CSS and the index becomes the atlas. Uses [src/lib/atlas.ts](src/lib/atlas.ts) for grouping and coordinates; its `data-astro-rerun` script updates the preview on hover/focus and keeps filters, index view, and line states in sync.
- **NowCard** (`src/components/NowCard.astro`) - Shared Now list for the home band, reading the editable `NOW` object in [src/lib/site.ts](src/lib/site.ts).
- **CodeCopy** - Adds a "Copy" button to `.prose-custom pre` blocks.

### Design System

The site is **dark-only**. There is no theme toggle, no light palette, and no `theme` key in `localStorage`; do not reintroduce one. The root is `<html class="dark">` with `color-scheme: dark`, and every surface is part of the same night sky.

**Tokens** live in [src/styles/observatory.css](src/styles/observatory.css) and [src/styles/global.css](src/styles/global.css):

- `--bg` / `#05070C`, `--bg-deep` / `#030409`, `--panel` / `#090C13`
- `--ink` / `#EFE8DB`, `--body` / `#D3CCBF`, `--muted` / `#8C94A3`, `--faint` / `#737C8C`
- `--brass` / `#CFAE7B`, `--brass-bright` / `#E7C796`
- `--line` and `--line-soft` for hairlines; group colors for Agents, Local-first, Workflow, and Launches
- `--pad` (responsive page gutter), `--max` (1440px), and `--head-h` (76px desktop / 66px mobile)

Tailwind exposes `paper`, `ink`, `muted`, and `brass` from `--color-*` in global.css. Use those semantic classes for legacy utility markup. The `darkMode: 'class'` config remains for compatibility, but no component may add light/dark variants. The site has one palette.

**Contrast**: `--muted` and `--faint` both clear WCAG AA for normal text on the night ground. `--faint` was lifted to `#737C8C` for the small metadata type; do not lower it again. Informative text should use `body`, `muted`, `ink`, or `brass`, not low-opacity ink. Reserve the faint tier for labels and metadata that remain readable.

**Fonts**: Inter (body, UI) and Instrument Serif (display and editorial italic) are self-hosted from `public/fonts/` and refreshed with `npm run fonts`. `font-sans` is Inter, `font-serif` is Instrument Serif. BaseLayout preloads Inter and both Instrument Serif cuts. Never add a Google Fonts request.

**Type and layout**: Instrument Serif is set large and tight (`letter-spacing` around -0.03em, line-height below 1) for h1/h2 and display; body copy is 16px/1.7 or 18px/1.82 in prose. The page shell maxes at 1440px with a responsive gutter; article prose caps at 68ch and centers. Fixed header, generous section bands, and true hairlines carry the observatory rhythm.

**Motion**: The star canvas, portrait orbits, hero reveal, and shooting star are restrained and optional. `prefers-reduced-motion: reduce` removes transitions and View Transitions globally, stops the sky animation, and reveals content. All new client scripts must either re-run safely under View Transitions or install listeners once and refresh against the new DOM.

**Prose**: [src/styles/prose.css](src/styles/prose.css) is custom, not Tailwind Typography. It covers headings, links, blockquotes, lists, inline code, pre blocks, tables, images, rules, and the `.code-copy-btn`. The drop cap is scoped to `.essay .prose-custom > p:first-of-type` so project notes do not inherit it. Code blocks are horizontally scrollable; tables are wrapped by the rehype table plugin.

**Atlas**: [src/lib/atlas.ts](src/lib/atlas.ts) is the semantic map. Post tags map to Agents, Local-first, Workflow, or Launches (in that priority), with stable 1000x600 coordinates and generated constellation lines. Keep coordinates within the stage and provide a fallback point for new entries. The mobile fallback is the word index; it is not a separate data source.

**Still mode**: Adding `?still=1` adds `html.still` and renders the sky without motion for deterministic screenshots. It is a review aid, not a user-facing theme.

### Drafts & Production

Blog posts and projects with `draft: true` in frontmatter are excluded at build time (`astro build`) but visible during `astro dev`. The check happens in `getPublicBlog()` / `getPublicProjects()`.

### Deployment

Pushing to `main` triggers [.github/workflows/deploy.yml](.github/workflows/deploy.yml): Node 24 (read from `.nvmrc`), `npm ci --legacy-peer-deps`, `npm run build`, then `actions/deploy-pages` to the `github-pages` environment. The `gh-pages` branch is a legacy artifact and should not be pushed to.

- Custom domain: `public/CNAME` (root-level `CNAME` was removed - do not re-add)
- Cache headers: `public/_headers` - **GitHub Pages ignores this file**, so the rules are not live and the file is served as a static blob. It is kept for a host that reads it (Netlify, Cloudflare Pages).
- Site URL: https://tarlow.space - defined in `astro.config.mjs` (used by sitemap, OG tags, RSS)

### External Services

- **Google Analytics** (G-H879GPJ4GM) - consent-gated. Nothing is loaded and no cookie is set until the visitor accepts: `ConsentBanner` renders on every page, a head script adds `consent-pending` to `<html>` when no choice is stored (global.css keys the banner off that class, so there is no flash), and the choice lives in `localStorage` under `analytics-consent`. Once granted, the ~170KB library is injected after `load` + `requestIdleCallback`, and `astro:page-load` sends the path for View Transition navigations.
- **Bluesky** - share buttons link to bsky.app intent URLs (no API calls)
- **Inter + Instrument Serif** - self-hosted from `public/fonts/` (Inter latin + latin-ext variable subsets plus Instrument Serif roman/italic, refreshed with `npm run fonts`). This replaced the Google Fonts stylesheet, which was render-blocking and needed two extra connections before first paint. Only the Inter subset a page needs is downloaded, thanks to `unicode-range` in [src/styles/global.css](src/styles/global.css).

## Style Conventions

- Use single dashes (-) instead of em dashes (--) in all content and code.
- Commit messages follow the conventions under [Development Workflow](#commits) - conventional type, imperative subject, body only when the "why" needs one.
- Do not commit editor metadata: `.frontmatter/`, `.opencode/`, `.vscode/` settings other than the tracked `extensions.json`/`launch.json` are gitignored or untracked.

## Content Writing

Add a new blog post: create a `.md` file in `src/content/blog/` with the required frontmatter (`title`, `pubDate`, `description`, `tags`). Prefer the established tags shown on `/blog/tags/` rather than inventing a new one. Add `draft: true` to preview before publishing. Blog posts render with prose styling and tag links. For featured images, place them in `/public/images/` and reference as `/images/filename.png`.

Projects follow the same pattern in `src/content/projects/` with the additional `category` field (`Launched` or `Development`). Add `featured: true` to give a project the full card at the top of `/projects/` (every featured project gets one, and the rest render as compact index rows), and `url` for an external "Visit" link. Images need no import or build step - just drop the file in `public/images/` and reference `/images/filename.png`; the optimizer picks it up on the next `npm run dev` / `npm run build`.
