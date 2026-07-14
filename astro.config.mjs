// @ts-check

import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import { defineConfig, fontProviders } from 'astro/config'
import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap(), react()],
  fonts: [
    {
      featureSettings: "'smcp' 2",
      provider: fontProviders.local(),
      name: 'NotoSansSc',
      cssVariable: '--font-NotoSansSc',
      fallbacks: [],
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/NotoSansSC-Medium.woff2'],
            weight: 500,
            style: 'normal',
            display: 'swap',
          },
        ],
      },
    },
    {
      featureSettings: "'smcp' 2",
      provider: fontProviders.local(),
      name: 'UbuntuMono',
      cssVariable: '--font-UbuntuMono',
      fallbacks: [],
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/Ubuntu-Regular.woff2'],
            weight: 400,
            style: 'normal',
            display: 'swap',
          },
        ],
      },
    },
  ],
  vite: {
    css: {
      transformer: 'lightningcss',
    },
  },
  redirects: {
    '/': '/blog/',
  },
})
