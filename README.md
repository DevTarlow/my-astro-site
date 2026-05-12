# Tarlow.space

Personal website and blog — built with intention.

A corner of the web built by [Tarlow](https://github.com/DevTarlow), a developer and creative builder sharing projects, local-first tools, and AI exploration.

## Built With

- **Astro 6** — static site generation
- **Tailwind CSS 3** — utility-first styling
- **TypeScript** — type safety

## Theme

Minimal Modern Hipster — Digital Paper (`#F9F9F8`) surfaces, Terracotta (`#C05746`) accents, Playfair Display for headings, Inter for body text.

## Project Structure

```
├── public/              Static assets (images, favicon)
├── src/
│   ├── components/      Reusable components (Navbar, Sidebar, etc.)
│   ├── content/         Content collections (blog, projects)
│   ├── layouts/         Page layouts (BaseLayout)
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
| `/projects` | Project showcase by category (Launched / Development) |
| `/projects/:slug` | Project detail page |
| `/about` | About the author |
| Any unmatched route | Custom 404 page |

## Content

Blog posts and project pages are managed via Astro content collections as Markdown with frontmatter.

- **Blog**: `src/content/blog/`
- **Projects**: `src/content/projects/`

## Commands

| Command | Action |
|---|---|
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview build |
