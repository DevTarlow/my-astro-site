---
title: Blog Wiz MD
pubDate: 2026-05-18T00:00:00.000Z
draft: false
category: Development
tags:
  - nextjs
  - typescript
  - react
  - markdown
  - tool
  - local-first
  - editor
description: >-
  Blog Wiz MD is a minimal, self-hosted markdown editor I built for my Astro
  blog that works with blog posts, project posts, and has note taking.
image: /images/blog-wiz-md-screenshot.png
---
I wanted a place where I could easily edit markdown files for my blog posts and projects without having to dive through code and folders to draft up a post.

This is what led me to create the app.

**Blog Wiz MD** is a minimal, self-hosted markdown editor I built for my Astro blog that works with blog posts, project posts, and has note taking. Keeping everything for drafting and publishing in one place.

![blog-wiz-md-screenshot](/images/blog-wiz-md-screenshot.png)

## Features:

**Notes mode** — local SQLite-backed documents
- Create, delete, and organize documents into folders
- Drag-and-drop documents between folders
- Pin/unpin notes
- Search Notes
- CodeMirror 6 editor with syntax highlighting, line numbers, and line wrapping
- Live markdown preview with split-pane view (resizable)
- Auto-save
- Word count and estimated reading time

**Blog mode** — edit Astro blog posts directly on the filesystem
- Browse, create, edit, and delete `.md` / `.mdoc` / `.mdx` files
- Frontmatter editor: title, pubDate, draft toggle, description, tags, heroImage
- Auto-generated slugs for new posts

**Images mode** — manage blog images
- Browse images from a configured directory
- Upload via file picker or drag-and-drop (max 10MB)
- Rename, delete images
- Copy markdown embed codes (`![alt](/images/...)`)
- Drag images directly from the browser into the post editor

**General**
- Light/dark theme (system preference detection + manual toggle)
- Table of Contents sidebar (auto-parsed from headings, click to scroll)
- Editor-to-preview scroll sync
- Collapsible sidebar

## Tech Stack

| Layer | |
|---|---|
| Framework | Next.js 16 (App Router, React 19) |
| Language | TypeScript 5 (strict) |
| Editor | CodeMirror 6 |
| Styling | Tailwind CSS 3, `tailwind-merge` / `clsx` |
| Database | SQLite via `better-sqlite3` + Drizzle ORM |
| Markdown | `react-markdown`, `remark-gfm`, `gray-matter` |
| Icons | Lucide React |
| Testing | Vitest, Testing Library |

## Recent Updates:

- 5/18/2026 | Initial 1.0.0 alpha project under development.

## Get the Project

> Project Under Development - Check back soon!
