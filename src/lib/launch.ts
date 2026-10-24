// The launch logic of the site: which call to action, whether the launch offer runs, and how
// prices and dates read in each language. Pure functions, tested in launch.test.ts.
import type { LaunchOffer, LaunchStatus } from '../data/launch.ts';

export type CtaKind = 'text' | 'preorder-badge' | 'download-badge';
export type PriceLang = 'en' | 'de';

const ctaKinds: Record<LaunchStatus, CtaKind> = {
  unreleased: 'text',
  preorder: 'preorder-badge',
  released: 'download-badge',
};

export const ctaKind = (status: LaunchStatus): CtaKind => ctaKinds[status];

// endsAt is exclusive: the offer runs until the day before, read in UTC.
export const launchOfferActive = (offer: LaunchOffer | null, now: Date): boolean =>
  offer !== null && Date.parse(`${offer.endsAt}T00:00:00Z`) > now.getTime();

// "€39.99" and "€0" in English, "39,99 €" (with a no-break space) in German.
export const formatPrice = (lang: PriceLang, value: number) =>
  new Intl.NumberFormat(lang === 'de' ? 'de-DE' : 'en-IE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: Number.isInteger(value) ? 0 : 2,
  }).format(value);

// "12 November 2026" / "12. November 2026".
export const formatDate = (lang: PriceLang, iso: string) =>
  new Intl.DateTimeFormat(lang === 'de' ? 'de-DE' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${iso}T00:00:00Z`));
