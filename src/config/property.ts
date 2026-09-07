/**
 * Verified property facts and external destinations.
 * Everything on the public site is derived from this file and the translations;
 * nothing here should be guessed. Unknown values stay `null` and are listed in
 * OWNER-CHECKLIST.md instead of appearing on the page.
 */
import type { Localized } from '../i18n/types';

export interface HeroVideo {
  /** MP4 (H.264) served from /public, e.g. '/video/terrace-loop.mp4'. Keep it 6–12 s and silent. */
  mp4: string;
  /** Optional WebM alternative. The browser picks one source; both are never downloaded. */
  webm?: string;
  width: number;
  height: number;
}

export interface Property {
  /** Primary wordmark used in the header, footer and titles. */
  wordmark: string;
  /**
   * Full published property name, used in structured data and social metadata.
   * The Instagram display name is "Mandarina Apartments"; the logo and the Booking.com
   * listing use "Mandarina Sunset Apartment". Confirm with the owner before launch.
   */
  fullName: string;
  location: {
    town: string;
    country: Localized;
    countryCode: string;
  };
  links: {
    /**
     * Verified on 2026-09-07: the bio share link https://www.booking.com/Share-Wb31vGi
     * redirects to booking.com/hotel/me/mandarina-sunset-apartment (hotel id 16317578).
     * The clean listing URL is used so no dates or tracking parameters are baked in.
     */
    booking: string;
    /** Hidden on the site until a listing URL is supplied. */
    airbnb: string | null;
    instagram: string;
    instagramHandle: string;
    /** General map destination for the town. Replace with the exact pin once confirmed. */
    map: string;
  };
  contact: {
    email: string | null;
    phone: string | null;
  };
  /** Optional silent hero loop. `null` keeps the photographic hero. */
  heroVideo: HeroVideo | null;
}

export const property: Property = {
  wordmark: 'Mandarina',
  fullName: 'Mandarina Sunset Apartment',
  location: {
    town: 'Petrovac',
    country: { me: 'Crna Gora', en: 'Montenegro' },
    countryCode: 'ME',
  },
  links: {
    booking: 'https://www.booking.com/hotel/me/mandarina-sunset-apartment.html',
    airbnb: null,
    instagram: 'https://www.instagram.com/mandarina_petrovac/',
    instagramHandle: 'mandarina_petrovac',
    map: 'https://www.google.com/maps/search/?api=1&query=Petrovac%2C%20Montenegro',
  },
  contact: {
    email: null,
    phone: null,
  },
  heroVideo: null,
};

/**
 * Amenities confirmed from the supplied photographs. They feed the structured data
 * (schema.org LocationFeatureSpecification) and must stay in sync with the
 * `intro.details` translations.
 */
export const confirmedAmenities: Localized[] = [
  { me: 'Pogled na more', en: 'Sea view' },
  { me: 'Terasa', en: 'Terrace' },
  { me: 'Klima uređaj', en: 'Air conditioning' },
  { me: 'Opremljena kuhinja', en: 'Kitchen' },
  { me: 'Veš mašina', en: 'Washing machine' },
  { me: 'Bazen u sklopu kompleksa', en: 'Pool in the complex' },
];
