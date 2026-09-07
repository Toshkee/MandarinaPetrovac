// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * The production origin. Branch deployments on Cloudflare Pages use their own per-deploy
 * *.pages.dev address (CF_PAGES_URL) so canonical URLs, hreflang links and the sitemap point at
 * the preview being viewed rather than at production. SITE_URL overrides both when needed.
 */
const productionUrl = 'https://mandarinapt.me';
const branch = process.env.CF_PAGES_BRANCH?.trim();
const previewUrl = branch && branch !== 'main' ? process.env.CF_PAGES_URL?.trim() : undefined;
const siteUrl = process.env.SITE_URL?.trim() || previewUrl || productionUrl;

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
