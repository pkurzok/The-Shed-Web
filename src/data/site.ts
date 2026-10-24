// Facts and helpers that do not depend on the language. The texts of a language are in
// en.ts (and later de.ts); the privacy policies are Markdown in src/pages/. The values to change on
// launch day are in launch.ts.
import { en } from './en';
import { launchDate, launchOffer, prices, status } from './launch.ts';

export const app = {
  // What og:site_name prints and what page titles end with.
  name: 'The Shed',
  author: 'Peter Kurzok',
  email: 'shed@peterkurzok.de',
  appStoreId: '6825513490',
  appStoreUrl: 'https://apps.apple.com/app/id6825513490',
  imprintUrl: 'https://apps.peterkurzok.de/imprint/',
  status,
  launchDate,
  launchOffer,
  prices,
};

export type Lang = 'en' | 'de';
export const langs: Lang[] = ['en'];

// The screenshot files are src/assets/images/screenshots/<lang>/<file>.png, imported from the app
// repository by scripts/import-assets.sh. The order is the order of the homepage: the hero shows
// the first, the four feature rows the next four, the Mac section the last.
export const screenshots = [
  { file: 'ipad-01-mute', device: 'ipad' },
  { file: 'ipad-02-loop', device: 'ipad' },
  { file: 'ipad-03-tempo', device: 'ipad' },
  { file: 'ipad-04-chords', device: 'ipad' },
  { file: 'ipad-05-stems', device: 'ipad' },
  { file: 'mac-01-practice', device: 'mac' },
] as const;
export type ScreenshotFile = (typeof screenshots)[number]['file'];

// A heading with one highlighted part: `highlight` must occur in `title`, it is set in amber.
export type Highlighted = { title: string; highlight: string };

export type Content = {
  // Title of the homepage.
  name: string;
  // Meta description of the homepage.
  description: string;
  skipLink: string;
  // Entries starting with "#" are sections of the homepage.
  nav: { label: string; href: string }[];
  navToggle: string;
  otherLanguage: { label: string; lang: Lang };
  // The call to action, by launch status (launch.ts). `short` is the form in the header.
  cta: {
    unreleased: { text: string; short: string };
    // {date} is launchDate.
    preorder: { text: string; short: string; badgeAlt: string };
    released: { text: string; short: string; badgeAlt: string };
  };
  hero: Highlighted & { eyebrow: string; subtitle: string; alt: string };
  facts: { value: string; label: string }[];
  // Shown with screenshots 2 to 5, in that order.
  rows: (Highlighted & { kicker: string; text: string; alt: string })[];
  mac: Highlighted & { kicker: string; text: string; alt: string };
  // `icon` is a key of src/components/Icon.astro.
  grid: { title: string; items: { icon: string; title: string; text: string }[] };
  privacyBand: { eyebrow: string; title: string; text: string; link: string };
  pricing: {
    title: string;
    // {n} is prices.freeSongsPerMonth.
    free: { name: string; features: string[] };
    // {n} is prices.trialDays.
    yearly: { name: string; per: string; trial: string; features: string[] };
    // {price} is the lifetime price.
    monthly: { name: string; per: string; once: string; features: string[] };
    // {date} is the last day of the launch offer; `regular` is read before the struck-through price.
    launch: { until: string; regular: string };
    note: string;
    renewal: string;
  };
  support: {
    title: string;
    description: string;
    // The address follows `intro`.
    intro: string;
    hint: string;
    faqTitle: string;
    // Answers are HTML.
    faq: { question: string; answer: string }[];
  };
  footer: { copyright: string; links: { label: string; href: string }[] };
  notFound: { title: string; text: string; home: string };
};

export const content: Record<Lang, Content> = { en } as Record<Lang, Content>;

// The address of a page in a language: English at the root, every other language in its folder.
export const localePath = (lang: Lang, path: string) => (lang === 'en' ? path : `/${lang}${path}`);

// The same page in another language: "/de/privacy/" read as German becomes "/privacy/" in English.
export const translatedPath = (path: string, from: Lang, to: Lang) =>
  localePath(to, from === 'en' ? path : path.slice(from.length + 1));

// What og:locale prints.
export const locales: Record<Lang, string> = { en: 'en_GB', de: 'de_DE' };

// The paths the sitemap lists.
export const pages = ['/'];

// "{n} songs" with n = 3: fills the placeholders of a text.
export const fill = (text: string, values: Record<string, string | number>) =>
  text.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
