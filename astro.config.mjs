// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import wrapTables from './plugins/rehype-wrap-tables.mjs';
import optimizeImages from './plugins/rehype-optimize-images.mjs';
import { tagRedirects } from './src/lib/tag-redirects.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://tarlow.space',
  integrations: [sitemap()],
  // Retired tag addresses (the taxonomy went from 53 tags to 10). Astro emits a
  // small redirect page for each one so old links still land somewhere useful.
  redirects: tagRedirects,
  // The site is tiny and static, so hovering a link can fetch the next page
  // before the click. Hover rather than viewport, to avoid prefetching every
  // link on a listing page.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  markdown: {
    rehypePlugins: [wrapTables, optimizeImages],
  },
});