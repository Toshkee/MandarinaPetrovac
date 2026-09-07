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
    streetAddress: string;
    postalCode: string;
  };
  links: {
    /**
     * Verified on 2026-09-07: the bio share link https://www.booking.com/Share-Wb31vGi
     * redirects to booking.com/hotel/me/mandarina-sunset-apartment (hotel id 16317578).
     * The clean listing URL is used so no dates or tracking parameters are baked in.
     */
    booking: string;
    /** Owner-supplied listing URL; null hides Airbnb links. */
    airbnb: string | null;
    instagram: string;
    instagramHandle: string;
    /** Public map search for the residence; replace with an exact pin if the owner supplies one. */
    map: string;
  };
  contact: {
    email: string | null;
    phone: string | null;
  };
  details: {
    guests: number;
    bedrooms: number;
    bathrooms: number;
    sizeSquareMeters: number;
    floor: number;
    beds: { king: number; sofaBed: number };
    freeWifi: boolean;
    freePrivateParking: boolean;
    elevator: boolean;
    beachMeters: number;
    supermarketMeters: number;
    checkIn: string;
    checkOut: string;
  };
  reviews: {
    bookingScore: number;
    count: number;
    verifiedAt: string;
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
    streetAddress: 'Olive Residence, Apartment A14, floor 3',
    postalCode: '85300',
  },
  links: {
    booking: 'https://www.booking.com/hotel/me/mandarina-sunset-apartment.html',
    airbnb: 'https://www.airbnb.com/rooms/1678841843244205215',
    instagram: 'https://www.instagram.com/mandarina_petrovac/',
    instagramHandle: 'mandarina_petrovac',
    map: 'https://www.google.com/maps/search/?api=1&query=Olive%20Residence%20Petrovac%20Montenegro',
  },
  contact: {
    email: null,
    phone: null,
  },
  details: {
    guests: 4,
    bedrooms: 1,
    bathrooms: 1,
    sizeSquareMeters: 44,
    floor: 3,
    beds: { king: 1, sofaBed: 1 },
    freeWifi: true,
    freePrivateParking: true,
    elevator: true,
    beachMeters: 750,
    supermarketMeters: 450,
    checkIn: '14:00–22:00',
    checkOut: '08:00–11:00',
  },
  reviews: {
    bookingScore: 9.9,
    count: 7,
    verifiedAt: '2026-09-07',
  },
  heroVideo: null,
};

/**
 * Amenities confirmed from the supplied photographs and the public Booking.com
 * listing on 2026-09-07. They feed the structured data.
 */
export const confirmedAmenities: Localized[] = [
  { me: 'Pogled na more', en: 'Sea view' },
  { me: 'Terasa', en: 'Terrace' },
  { me: 'Klima uređaj', en: 'Air conditioning' },
  { me: 'Opremljena kuhinja', en: 'Kitchen' },
  { me: 'Veš mašina', en: 'Washing machine' },
  { me: 'Bazen u sklopu kompleksa', en: 'Pool in the complex' },
  { me: 'Besplatan Wi-Fi', en: 'Free Wi-Fi' },
  { me: 'Besplatan privatni parking', en: 'Free private parking' },
  { me: 'Lift', en: 'Lift' },
];
