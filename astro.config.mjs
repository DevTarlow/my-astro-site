// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import wrapTables from './plugins/rehype-wrap-tables.mjs';
import optimizeImages from './plugins/rehype-optimize-images.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://tarlow.space',
  integrations: [sitemap()],
  markdown: {
    rehypePlugins: [wrapTables, optimizeImages],
  },
});