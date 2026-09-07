import type { APIRoute } from 'astro';

/**
 * Production is crawlable and advertises the sitemap. Preview deployments (any branch other than
 * main in Cloudflare Workers Builds) are closed to crawlers so they never surface in search.
 */
const branch = process.env.WORKERS_CI_BRANCH?.trim();
const isPreview = Boolean(branch) && branch !== 'main';

export const GET: APIRoute = ({ site }) => {
  if (isPreview) {
    return new Response('User-agent: *\nDisallow: /\n', {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  const lines = ['User-agent: *', 'Allow: /'];
  if (site) {
    lines.push('', `Sitemap: ${new URL('sitemap-index.xml', site).href}`);
  }
  return new Response(`${lines.join('\n')}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
