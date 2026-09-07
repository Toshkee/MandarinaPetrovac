export type Locale = 'me' | 'en';

export interface Localized {
  me: string;
  en: string;
}

export interface Translations {
  locale: Locale;
  /** BCP 47 tag for <html lang>, hreflang and Open Graph locale. */
  langTag: string;
  ogLocale: string;
  langName: string;
  /** Link to the same page in the other language. */
  switchTo: { label: string; lang: string; href: string };
  meta: { title: string; description: string; ogAlt: string };
  /** In-page anchor ids, localized so URLs read naturally in each language. */
  anchors: {
    apartment: string;
    interiors: string;
    pool: string;
    gallery: string;
    location: string;
    booking: string;
  };
  nav: {
    apartment: string;
    pool: string;
    gallery: string;
    location: string;
    booking: string;
    bookingShort: string;
    menu: string;
    close: string;
    skip: string;
    langSwitch: string;
    home: string;
  };
  hero: {
    place: string;
    title: string;
    titleAccent: string;
    text: string;
    ctaPrimary: string;
    ctaSecondary: string;
    caption: string;
  };
  facts: {
    heading: string;
    guests: string;
    bedroom: string;
    bathroom: string;
    size: string;
    wifi: string;
    parking: string;
  };
  intro: {
    title: string;
    body: string[];
    detailsHeading: string;
    details: string[];
  };
  interiors: { title: string; body: string };
  pool: { title: string; body: string; points: string[] };
  gallery: {
    title: string;
    body: string;
    lightbox: { dialogLabel: string; close: string; prev: string; next: string; of: string; open: string };
  };
  location: {
    title: string;
    body: string[];
    practicalHeading: string;
    practical: string[];
    mapCta: string;
    address: string;
  };
  reviews: {
    eyebrow: string;
    title: string;
    scoreLabel: string;
    countLabel: string;
    verifiedLabel: string;
    translatedLabel: string;
    sourceCta: string;
    items: { quote: string; name: string; country: string }[];
  };
  booking: {
    eyebrow: string;
    title: string;
    body: string;
    platformNote: string;
    practicalHeading: string;
    practical: string[];
    bookingCta: string;
    airbnbCta: string;
    instagramLead: string;
  };
  bookingBar: { label: string; cta: string };
  footer: { tagline: string; instagram: string; contactHeading: string; languages: string; externalNote: string };
  video: { play: string; pause: string };
  notFound: { title: string; body: string; back: string };
}
