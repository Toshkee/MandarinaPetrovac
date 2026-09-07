# Owner launch checklist

Nothing on this list appears on the public site until it is confirmed. Each item names the file
to update.

## Must confirm before launch

- [ ] **Full property name.** Instagram shows "Mandarina Apartments"; the logo and the Booking.com
      listing say "Mandarina Sunset Apartment". The site currently publishes "Mandarina Sunset
      Apartment" in metadata and structured data, and "Mandarina" as the wordmark.
      → `property.fullName` in `src/config/property.ts`.
- [ ] **Pool access.** The Instagram bio calls the pool private; a caption says it is in the
      complex. The site says only "pool in the complex" and never "private". If access is
      exclusive to this apartment, the wording can change. → `pool` texts in `src/i18n/*.ts`.
- [x] **Guest capacity, bedrooms, bathrooms, size.** Public Booking.com listing confirms 4 guests,
      1 bedroom, 1 bathroom, 44 m², one king bed and one sofa bed (verified 2026-09-07).
- [x] **Published distances.** Booking.com property description states 750 m to the beach and
      450 m to the nearest supermarket. These are published as approximate, not walking times.
- [ ] **Exact map pin.** The map link searches for Olive Residence in Petrovac. Replace it with the
      apartment's exact Google Maps share link once you are happy to publish it.
      → `property.links.map`.
- [x] **Production domain.** `mandarinapt.me` (Namecheap), configured in `astro.config.mjs`.
      Remaining step is in the Cloudflare dashboard: point the Namecheap nameservers at Cloudflare
      and add the domain to the Worker under Settings → Domains & Routes.

## Optional, hidden until supplied

- [x] **Airbnb listing URL.** Owner supplied `airbnb.com/rooms/1678841843244205215`; added without dates or tracking parameters to `property.links.airbnb`.
- [ ] **Contact e-mail and phone.** → `property.contact` (shows a Contact block in the footer).
- [x] **Wi-Fi, parking, check-in times and house rules.** Added from the public Booking.com
      listing and verified 2026-09-07.
- [ ] **Hero video.** A clean 6–12 s silent clip of the terrace, sea view or pool.
      → `property.heroVideo`, file in `public/video/`.
- [ ] **Full-resolution originals** of the interior photos (the supplied files are 1448×1086 px)
      and, if available, a higher-resolution pool photo (the supplied one is a 1320×2308 export).

## Already verified

- Booking.com share link `booking.com/Share-Wb31vGi` redirects to
  `booking.com/hotel/me/mandarina-sunset-apartment` (hotel id 16317578). The site links the clean
  listing URL without dates or tracking parameters.
- Amenities shown are the ones visible in the photographs: sea view (terrace and bedroom),
  terrace seating, air conditioning, fitted kitchen with hob and breakfast bar, washing machine,
  pool in the complex.
