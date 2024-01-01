import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import node from "@astrojs/node";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  prefetch: true,
  output: 'hybrid',
  site: 'https://example.com',
  integrations: [mdx(), sitemap(), react()],
  adapter: node({
    mode: 'middleware'
  }),
});