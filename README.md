# Tarlow.space

Personal website and blog — built with intention.

A corner of the web built by [Tarlow](https://github.com/DevTarlow), a developer and creative builder sharing projects, local-first tools, and AI exploration.

## Built With

- **Astro 6** — static site generation
- **Tailwind CSS 3** — utility-first styling
- **TypeScript** — type safety

## Theme

Minimal Modern Hipster — Digital Paper (`#F9F9F8`) surfaces, Terracotta (`#C05746`) accents, Lora for headings, Inter for body text.

## Prerequisites

- **Node.js 22** or newer (the CI workflow uses Node 22)
- **npm** (a `package-lock.json` is committed, so use `npm ci` for reproducible installs)

## Commands

| Command | Action |
|---|---|
| `npm install` | Install dependencies (use `npm ci` in CI) |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview production build |
| `npm run check` | Type-check Astro files (astro check) |
| `npm run lint` | ESLint all files |
| `npm run lint:fix` | ESLint auto-fix |
| `npm run astro` | Run any astro CLI command |

## Project Structure

```
├── public/              Static assets (images, favicon, CNAME, _headers)
├── src/
│   ├── components/      Reusable components (Navbar, Sidebar, etc.)
│   ├── content/         Content collections (blog, projects)
│   ├── layouts/         Page layouts (BaseLayout)
│   ├── lib/             Content access helpers (posts.ts)
│   ├── pages/           Route pages
│   └── styles/          Global CSS
├── astro.config.mjs
├── tailwind.config.mjs
└── tsconfig.json
```

## Pages

| Route | Description |
|---|---|
| `/` | Home with latest blog posts |
| `/blog` | Paginated blog listing (5 per page) with search & recent posts |
| `/blog/:slug` | Individual blog post |
| `/blog/tags` | Tag cloud with post counts |
| `/blog/tags/:tag` | Posts filtered by tag |
| `/projects` | Project showcase by category (Launched / Development) |
| `/projects/:slug` | Project detail page |
| `/about` | About the author |
| Any unmatched route | Custom 404 page |
| `/rss.xml` | RSS feed via `@astrojs/rss` |

## Content

Blog posts and project pages are managed via Astro content collections as Markdown with frontmatter.

- **Blog**: `src/content/blog/`
- **Projects**: `src/content/projects/`

See [AGENTS.md](AGENTS.md) for the full content schemas and contribution conventions.

### Drafts & Production

Posts and projects with `draft: true` in frontmatter are **excluded** at build time (`npm run build`) but **visible** during development (`npm run dev`). Publishing is just flipping `draft` to `false` (or removing the field).

## Deployment

Pushing to `main` triggers the [GitHub Actions workflow](.github/workflows/deploy.yml), which builds the site and deploys it to **GitHub Pages** via `actions/deploy-pages`. The site is served from the `github-pages` deployment environment, not a branch.

- **Site URL**: https://tarlow.space (custom domain via `public/CNAME`)
- **Cache headers**: `public/_headers`

## External Services

- **Google Analytics** (G-H879GPJ4GM) — loaded in `BaseLayout`
- **Bluesky** — share buttons link to bsky.app intent URLs
- **Google Fonts** — Inter + Lora served via fonts.googleapis.com
