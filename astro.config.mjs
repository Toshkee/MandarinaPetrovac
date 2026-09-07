// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * SITE_URL is the production origin (set it in the Cloudflare Pages build variables once
 * the domain is connected). Preview deployments fall back to CF_PAGES_URL, the per-deploy
 * *.pages.dev address, so canonical URLs, hreflang links and the sitemap stay correct there.
 */
const siteUrl = process.env.SITE_URL?.trim() || process.env.CF_PAGES_URL?.trim() || undefined;

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
