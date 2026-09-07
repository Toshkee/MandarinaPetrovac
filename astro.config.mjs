// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * The production domain is not known yet. Set SITE_URL (for example in .env or in the
 * CI environment) to enable canonical URLs, hreflang links and the sitemap.
 * Never hard-code a placeholder domain here.
 */
const siteUrl = process.env.SITE_URL?.trim() || undefined;

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
  integrations: siteUrl
    ? [
        sitemap({
          i18n: {
            defaultLocale: 'me',
            locales: { me: 'sr-Latn-ME', en: 'en' },
          },
        }),
      ]
    : [],
});
