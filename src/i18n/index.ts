import type { Locale, Localized, Translations } from './types';
import { me } from './me';
import { en } from './en';

export type { Locale, Localized, Translations };

export const translations: Record<Locale, Translations> = { me, en };
export const locales: Locale[] = ['me', 'en'];
export const defaultLocale: Locale = 'me';

/** Root path of each language version. */
export const localePath: Record<Locale, string> = { me: '/', en: '/en/' };

export function t(locale: Locale): Translations {
  return translations[locale];
}

export function pick(locale: Locale, value: Localized): string {
  return value[locale];
}
