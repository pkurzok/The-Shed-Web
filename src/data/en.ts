// Every English text of the site. Terms follow docs/aso/glossary.md of the app repository;
// the source is store/metadata/en-US/ipados/description.txt.
import type { Content } from './site';

export const en: Content = {
  name: 'The Shed – mute your part, play with the band',
  description:
    'Learn the song before rehearsal. The Shed splits any song you own into stems, mutes your part and lets you play along with the rest of the band. For iPad and Mac, everything on your device.',
  skipLink: 'Skip to content',
  nav: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Support', href: '/support/' },
  ],
  navToggle: 'Menu',
  otherLanguage: { label: 'Deutsch', lang: 'de' },
  cta: {
    unreleased: { text: 'Coming soon to iPad and Mac', short: 'Coming soon' },
    preorder: { text: 'Arrives on {date}', short: 'Pre-order', badgeAlt: 'Pre-order on the App Store' },
    released: { text: 'iPad and Mac · free to start', short: 'Get the app', badgeAlt: 'Download on the App Store' },
  },
  hero: {
    eyebrow: 'On-Device · no account, no upload',
    title: 'Mute your part',
    highlight: 'part',
    subtitle: 'Play along with the band. Loop the tricky bit, slow it down, change the key.',
    alt: 'The Shed on iPad: a song split into six stems, the bass muted as your part',
  },
  facts: [
    { value: '4–6', label: 'stems; six with Pro “Best quality”' },
    { value: '50–120 %', label: 'tempo, same pitch' },
    { value: '±6', label: 'semitones up or down' },
    { value: '0 bytes', label: 'of your songs uploaded' },
  ],
  rows: [
    {
      kicker: 'Sections',
      title: 'Loop any section',
      highlight: 'section',
      text: 'Seconds after the import, The Shed knows the song’s sections, bars, tempo and key. Tap a section and it loops, bar-accurate, with a one-bar count-in.',
      alt: 'Practice screen with the second chorus looping',
    },
    {
      kicker: 'Tempo',
      title: 'Slow it down, change the key',
      highlight: 'change the key',
      text: 'Practice at 50 to 120 percent tempo without changing the pitch. Transpose up or down by six semitones to match your singer or your tuning.',
      alt: 'The first chorus looping at 85 percent tempo, one semitone down',
    },
    {
      kicker: 'Chords',
      title: 'Chords for every bar',
      highlight: 'every bar',
      text: 'The Shed recognizes the chords and shows them as a chord track and as a lead sheet: chord names, roman numerals or Nashville numbers, with guitar chord shapes. Correct an uncertain chord yourself.',
      alt: 'Lead sheet with the chords of every section and the guitar chord shapes of the song',
    },
    {
      kicker: 'Pro',
      title: 'Six stems, best quality',
      highlight: 'best quality',
      text: '“Best quality” is a slower, cleaner separation into six stems, with guitar and piano on their own. Each stem has mute, solo and its own level.',
      alt: 'Six stem lanes: drums, bass, guitar, piano, other and vocals',
    },
  ],
  mac: {
    kicker: 'Mac',
    title: 'On your Mac too',
    highlight: 'Mac',
    text: 'A native Mac app with menus, keyboard shortcuts and drag and drop. One Pro purchase covers your iPad and your Mac.',
    alt: 'The Shed on the Mac: setlist sidebar and practice screen',
  },
  grid: {
    title: 'Built for band practice',
    items: [
      { icon: 'music-note-list', title: 'Setlists', text: 'Keep your songs in setlists for rehearsals and gigs.' },
      { icon: 'stopwatch', title: 'One-bar count-in', text: 'Every loop brings you in on the beat.' },
      { icon: 'tag', title: 'Your section names', text: 'Name the sections the way your band calls them.' },
      {
        icon: 'hourglass-split',
        title: 'Separates in the background',
        text: 'Once started, stems keep separating while you do something else.',
      },
      {
        icon: 'layout-sidebar-inset',
        title: 'Music-stand mode',
        text: 'Fold the sidebar away and put your iPad on the music stand.',
      },
      { icon: 'shield-lock', title: 'No account', text: 'Open the app and start. No sign-up, no login.' },
    ],
  },
  privacyBand: {
    eyebrow: 'On-Device',
    title: 'Your songs stay yours',
    text: 'Analysis, stems and chords are computed on your iPad or Mac. No account, no upload, no tracking. The only download is the separation model, once.',
    link: 'Read the privacy policy',
  },
  pricing: {
    title: 'Free to start. Pro when the band needs it.',
    free: {
      name: 'Free',
      features: ['{n} songs a month, full-quality stems', 'One setlist', 'Loop, tempo, key and chords'],
    },
    yearly: {
      name: 'Pro · yearly',
      per: '/ year',
      trial: '{n} days free',
      features: ['Unlimited songs and setlists', '“Best quality”: six stems', 'iPad and Mac'],
    },
    monthly: {
      name: 'Pro · monthly or once',
      per: '/ month',
      once: 'or {price} once, no subscription',
      features: ['Everything in Pro', 'Monthly: cancel any time'],
    },
    launch: { until: 'Launch price until {date}', regular: 'Regular price' },
    note: 'Prices in euros, including German VAT. The App Store shows the price for your country.',
    renewal:
      'Subscriptions renew automatically unless cancelled at least 24 hours before the end of the current period. Payment is charged to your Apple Account. Manage or cancel your subscription in your App Store account settings.',
  },
  support: {
    title: 'Support',
    description: 'Help with The Shed: contact, and answers to common questions about importing, stems and The Shed Pro.',
    intro: 'Questions, a bug, an idea? Write to',
    hint: 'Please tell us your device and the version of The Shed. We usually answer within a few days.',
    faqTitle: 'Questions',
    faq: [
      {
        question: 'Why can’t I import songs from Apple Music?',
        answer:
          '<p>Songs from Apple Music are copy-protected; other apps cannot read them. Songs you own as files work: bought as a download, ripped from your CD, or recorded yourself.</p>',
      },
      {
        question: 'Which files can I import?',
        answer:
          '<p>Audio files such as MP3, AAC (M4A), WAV, AIFF, ALAC and FLAC, up to 15 minutes long. On the iPad, import them from the Files app; on the Mac, also by dragging them onto the window.</p>',
      },
      {
        question: 'What is the download on first use?',
        answer:
          '<p>The separation model, about 425 MB, downloaded once from Hugging Face. After that, stems are separated without an internet connection. The chord recognition is part of the app.</p>',
      },
      {
        question: 'How long does separating a song take?',
        answer:
          '<p>About a minute per song, depending on your device; “Best quality” takes several times as long. Once you have started it, it keeps running in the background.</p>',
      },
      {
        question: 'What does “Best quality” need?',
        answer:
          '<p>“Best quality” is part of The Shed Pro and separates a song into six stems, with guitar and piano on their own. It needs a device with at least 8 GB of memory and downloads a second model (about 701 MB) when you choose it. On other devices the option is shown as unavailable.</p>',
      },
      {
        question: 'Does Pro work on my iPad and my Mac?',
        answer: '<p>Yes. One purchase covers both, as long as you use the same Apple Account.</p>',
      },
      {
        question: 'How do I restore Pro on a new device?',
        answer:
          '<p>Sign in with the Apple Account you bought Pro with, open Settings in The Shed and choose Restore Purchases.</p>',
      },
      {
        question: 'How do I cancel my subscription?',
        answer:
          '<p>Subscriptions are managed by Apple: choose Manage Subscription in the settings of The Shed, or open <a href="https://apps.apple.com/account/subscriptions">your App Store subscriptions</a>. Pro stays active until the end of the paid period.</p>',
      },
      {
        question: 'Do my songs leave my device?',
        answer:
          '<p>No. Analysis, stems and chords are computed on your iPad or Mac, and there is no server that could receive your songs. Details are in the <a href="/privacy/">privacy policy</a>.</p>',
      },
      {
        question: 'Which devices does The Shed run on?',
        answer: '<p>iPad with iPadOS 27 or later, and Mac with macOS 27 or later.</p>',
      },
    ],
  },
  footer: {
    copyright: '© 2026 Peter Kurzok',
    links: [
      { label: 'Privacy', href: '/privacy/' },
      { label: 'Support', href: '/support/' },
      { label: 'Imprint', href: 'https://apps.peterkurzok.de/imprint/' },
      { label: 'Terms (Apple)', href: 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/' },
      { label: 'More apps', href: 'https://apps.peterkurzok.de' },
    ],
  },
  notFound: {
    title: 'Page not found',
    text: 'This page does not exist. Maybe it has moved, or the address has a typo.',
    home: 'To the homepage',
  },
};
