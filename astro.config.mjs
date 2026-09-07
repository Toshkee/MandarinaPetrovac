// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * SITE_URL can override the production origin. On Vercel, use the stable project
 * domain for canonical URLs, hreflang links and the sitemap, including previews.
 */
const productionDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
const siteUrl = process.env.SITE_URL?.trim() || (productionDomain ? `https://${productionDomain}` : undefined);

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
