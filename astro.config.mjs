import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://DevTarlow.github.io',
  base: '/my-astro-site',
  trailingSlash: 'always',
  integrations: [mdx(), sitemap()],
});
