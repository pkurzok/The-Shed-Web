// The values to change on launch day (README, "Launch day"). No imports, so that the tests and
// scripts/check-dist.mjs can read this file without a build step.

export type LaunchStatus = 'unreleased' | 'preorder' | 'released';

// unreleased: no App Store link, "Coming soon". preorder: pre-order badge and launchDate.
// released: download badge.
export const status: LaunchStatus = 'unreleased';

// 'YYYY-MM-DD', shown as "Arrives on …" while status is 'preorder'.
export const launchDate: string | null = null;

// Euro prices of the German App Store, incl. VAT. Change them together with App Store Connect.
export const prices = {
  monthly: 5.99,
  yearly: 39.99,
  lifetime: 99.99,
  trialDays: 7,
  freeSongsPerMonth: 3,
};

export type LaunchOffer = { price: number; endsAt: string };

// The lifetime launch price. endsAt is 'YYYY-MM-DD', the first day at the regular price (UTC).
// The site is static: the offer disappears only with the next build after endsAt.
export const launchOffer: LaunchOffer | null = null;
