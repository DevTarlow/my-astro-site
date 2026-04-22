import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://tarlow.space',
  base: '/',
  trailingSlash: 'always',
  integrations: [mdx(), sitemap()],
  // ADD THIS SECTION:
  build: {
    assets: '_assets' 
  }
});