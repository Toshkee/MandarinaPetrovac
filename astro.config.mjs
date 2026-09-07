// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * The production origin, used for canonical URLs, hreflang links, og:image and the sitemap.
 * Preview builds keep it too, so a preview never competes with production in search; instead
 * they are excluded through robots.txt (see src/pages/robots.txt.ts). SITE_URL overrides it.
 */
const siteUrl = process.env.SITE_URL?.trim() || 'https://mandarinapt.me';

export default defineConfig({
  site: siteUrl,
  output: 'static',
  trailingSlash: 'always',
  compressHTML: true,
  build: {
    // One-page site: inlining the ~30 kB of CSS removes two render-blocking requests.
    inlineStylesheets: 'always',
  },
  i18n: {
    defaultLocale: 'me',
    locales: ['me', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  image: {
    responsiveStyles: true,
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'me',
        locales: { me: 'sr-Latn-ME', en: 'en' },
      },
    }),
  ],
});
