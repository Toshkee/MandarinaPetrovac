# Mandarina, Petrovac

Guest-facing website for Mandarina, an apartment above Petrovac, Montenegro. Static Astro site
in Montenegrin (Latin script, at `/`) and English (at `/en/`), with external booking on
Booking.com and Airbnb. There is no onsite booking form, database, CMS or analytics.

## Commands

```bash
npm install        # installs dependencies from package-lock.json
npm run dev        # dev server (Astro 7 runs it in the background: `npx astro dev status|logs|stop`)
npm run check      # astro check: TypeScript and component diagnostics
npm run build      # production build into dist/
npm run preview    # serves dist/ (prints the URL; another project may already hold port 4321)
```

Node 22.12 or newer is required (`engines` in package.json).

## Where things live

| Path | What it holds |
| --- | --- |
| `src/config/property.ts` | Verified facts: wordmark, full property name, town, Booking.com URL, Airbnb URL (`null` hides it), Instagram, map link, contact (`null` hides it), optional hero video. |
| `src/i18n/me.ts`, `src/i18n/en.ts` | Complete translations. Both files must satisfy the `Translations` interface in `src/i18n/types.ts`, so a missing string is a type error. |
| `src/content/media.ts` | Media manifest: every photo with localized alt text and captions, placement, and a focal point used when a frame crops the image. |
| `src/assets/photos/` | Source photographs (high-quality JPEG). Processed by Astro's image pipeline at build time. |
| `src/assets/brand/` | The owner's illustrated "Mandarina Sunset Apartment" roundel, used small in the booking section. |
| `src/styles/tokens.css` | Design tokens: palette, type scale, rhythm, motion. |
| `src/styles/global.css` | Reset, typography, buttons, photo frames, reveal behaviour, reduced-motion rules. |
| `src/layouts/Base.astro` | `<head>` metadata, fonts, hreflang, Open Graph, structured data, header, footer, booking bar. |
| `src/components/` | One component per section, each with scoped CSS. `HomePage.astro` composes the page for a locale. |
| `src/scripts/` | The only client-side JavaScript: menu, reveal, gallery lightbox, mobile booking bar, optional hero video. |
| `src/pages/` | `index.astro` (ME), `en/index.astro` (EN), `404.astro`, `robots.txt.ts`. |
| `OWNER-CHECKLIST.md` | Facts the owner must confirm before launch. Nothing unconfirmed is shown on the page. |

## Replacing or adding photographs

1. Put the file in `src/assets/photos/` (JPEG or PNG, the original resolution, correctly rotated).
2. In `src/content/media.ts`, import it and add or update the entry: `file`, `alt` and `caption`
   in both languages, `placement`, and a `focal` point (percentages) for cropped frames.
3. Reference the entry from the component that should show it, or add its id to `galleryOrder`.
4. Run `npm run build`. Astro generates AVIF, WebP and JPEG renditions at the widths declared on
   each `<Picture>`.

Frames (`.frame--4x3`, `.frame--4x5`, and so on in `global.css`) decide the crop; the image keeps
its focal point through `object-position`. Never stretch or mirror a photograph.

The supplied interior photos are 1448×1086 px. They look sharp at 1× on desktop but soft on
high-density screens at hero size. Exporting the originals from the phone at full resolution and
dropping them in with the same file names improves every rendition without code changes.

## Booking links

Reservations happen on external platforms only. `property.links.booking` points at the clean
Booking.com listing URL (`booking.com/hotel/me/mandarina-sunset-apartment.html`), verified on
2026-09-07 as the destination of the Instagram bio share link. `property.links.airbnb` points at
the owner-supplied listing (`airbnb.com/rooms/1678841843244205215`), without dates or tracking
parameters. Airbnb appears in the booking section and footer. All external links open in a new tab with `rel="noopener noreferrer"` and work without
JavaScript.

## Translations and routes

`me` is the default locale at `/` (HTML `lang="sr-Latn-ME"`); `en` is at `/en/`. Section anchors
are localized (`#apartman` / `#apartment`). Language switch links in the header and footer point to
the equivalent page. To add a language: add the code to `Locale`, provide a translations file, add
the page under `src/pages/<code>/`, and extend `locales`/`localePath` in `src/i18n/index.ts` and
the `i18n` block in `astro.config.mjs`.

## Domain, canonical URLs, sitemap

The production domain is not known yet, so nothing absolute is emitted. Set `SITE_URL` (see
`.env.example`) to enable: canonical links, hreflang alternates, `og:url` and `og:image`,
`sitemap-index.xml`, and the Sitemap line in `robots.txt`. Until then the site builds and works
without them.

## Optional hero video

Set `property.heroVideo` to `{ mp4: '/video/terrace-loop.mp4', width, height }` (and optionally
`webm`) and place the file in `public/video/`. Requirements: 6–12 s, silent, no text or
transitions, ideally under 2 MB. The component keeps the photograph as the poster, attaches the
video only after checking `prefers-reduced-motion` and the Save-Data / 2G hints, catches autoplay
rejection, pauses when offscreen or the tab is hidden, and offers a pause/play button. No footage
was supplied, so this path has been type-checked but not exercised in a browser.

## Motion and accessibility

Only three kinds of motion: a short hero entrance (CSS, under 600 ms), section reveals via
IntersectionObserver (skipped under reduced motion or without JavaScript), and hover/focus
feedback. The gallery lightbox is a native `<dialog>` with visible close/previous/next controls,
arrow keys, Escape, swipe, focus trapping and focus restoration. Touch targets are at least 44 px.
Everything remains readable and navigable with JavaScript disabled.

## Deployment

`npm run build` writes static files to `dist/`. Any static host or CDN works (Netlify, Cloudflare
Pages, Vercel, GitHub Pages, S3+CloudFront). Set `SITE_URL` in the host's build environment. Hashed
assets under `/_astro/` can be cached for a year; HTML should be served with a short cache. The
largest transfers are the photographs; the hero loads eagerly with `fetchpriority="high"`,
everything below the fold is lazy.
