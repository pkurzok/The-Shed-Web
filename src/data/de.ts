// Alle deutschen Texte der Website. Begriffe nach docs/aso/glossary.md des App-Repos;
// Quelle ist store/metadata/de-DE/ipados/description.txt. Anrede du, wie die App.
import type { Content } from './site';

export const de: Content = {
  name: 'The Shed – dein Part stumm, die Band spielt weiter',
  description:
    'Kenn den Song, bevor die Probe anfängt. The Shed trennt jeden deiner Songs in Stems, schaltet deinen Part stumm, und du spielst mit dem Rest der Band. Für iPad und Mac, alles auf dem Gerät.',
  skipLink: 'Zum Inhalt springen',
  nav: [
    { label: 'Funktionen', href: '#features' },
    { label: 'Preise', href: '#pricing' },
    { label: 'Support', href: '/support/' },
  ],
  navToggle: 'Menü',
  otherLanguage: { label: 'English', lang: 'en' },
  cta: {
    unreleased: { text: 'Bald für iPad und Mac', short: 'Bald verfügbar' },
    preorder: { text: 'Erscheint am {date}', short: 'Vorbestellen', badgeAlt: 'Im App Store vorbestellen' },
    released: { text: 'iPad und Mac · gratis starten', short: 'Zur App', badgeAlt: 'Laden im App Store' },
  },
  hero: {
    eyebrow: 'On-Device · kein Konto, kein Upload',
    title: 'Dein Part stumm',
    highlight: 'Part',
    subtitle: 'Spiel mit der Band. Die schwere Stelle im Loop, langsamer, in einer anderen Tonart.',
    alt: 'The Shed auf dem iPad: ein Song in sechs Stems, der Bass als dein Part stumm geschaltet',
  },
  facts: [
    { value: '4–6', label: 'Stems; sechs mit Pro „Beste Qualität“' },
    { value: '50–120 %', label: 'Tempo, gleiche Tonhöhe' },
    { value: '±6', label: 'Halbtöne transponieren' },
    { value: '0 Byte', label: 'deiner Songs hochgeladen' },
  ],
  rows: [
    {
      kicker: 'Teile',
      title: 'Jeden Teil im Loop',
      highlight: 'im Loop',
      text: 'Wenige Sekunden nach dem Import kennt The Shed Teile, Takte, Tempo und Tonart des Songs. Tipp einen Teil an, und er läuft taktgenau im Loop, mit einem Takt Einzählen.',
      alt: 'Übe-Ansicht, der zweite Refrain läuft im Loop',
    },
    {
      kicker: 'Tempo',
      title: 'Langsamer üben, transponieren',
      highlight: 'transponieren',
      text: 'Üb mit 50 bis 120 Prozent Tempo, ohne dass sich die Tonhöhe ändert. Transponiere um bis zu sechs Halbtöne nach oben oder unten, passend zu deinem Sänger oder deiner Stimmung.',
      alt: 'Der erste Refrain im Loop, mit 85 Prozent Tempo und einen Halbton tiefer',
    },
    {
      kicker: 'Akkorde',
      title: 'Akkorde für jeden Takt',
      highlight: 'jeden Takt',
      text: 'The Shed erkennt die Akkorde und zeigt sie als Akkordspur und als Leadsheet: mit Akkordnamen, Stufen oder Nashville-Zahlen und Gitarrengriffen. Unsichere Akkorde korrigierst du selbst.',
      alt: 'Leadsheet mit den Akkorden aller Teile und den Gitarrengriffen des Songs',
    },
    {
      kicker: 'Pro',
      title: 'Sechs Stems, beste Qualität',
      highlight: 'beste Qualität',
      text: '„Beste Qualität“ ist eine langsamere, sauberere Trennung in sechs Stems, mit Gitarre und Klavier einzeln. Jede Spur hat Stumm, Solo und eigene Lautstärke.',
      alt: 'Sechs Spuren: Drums, Bass, Gitarre, Klavier, Rest und Gesang',
    },
  ],
  mac: {
    kicker: 'Mac',
    title: 'Auch auf dem Mac',
    highlight: 'Mac',
    text: 'Eine echte Mac-App mit Menüs, Tastenkürzeln und Drag & Drop. Ein Pro-Kauf gilt auf deinem iPad und deinem Mac.',
    alt: 'The Shed auf dem Mac: Setlist in der Seitenleiste und Übe-Ansicht',
  },
  grid: {
    title: 'Für die Band-Probe gemacht',
    items: [
      { icon: 'music-note-list', title: 'Setlists', text: 'Sortier deine Songs in Setlists für Probe und Gig.' },
      { icon: 'stopwatch', title: 'Ein Takt Einzählen', text: 'Jeder Loop bringt dich auf den Schlag rein.' },
      { icon: 'tag', title: 'Deine Teil-Namen', text: 'Benenn die Teile so, wie deine Band sie nennt.' },
      {
        icon: 'hourglass-split',
        title: 'Trennt im Hintergrund',
        text: 'Einmal gestartet, werden die Stems weiter berechnet, während du etwas anderes machst.',
      },
      {
        icon: 'layout-sidebar-inset',
        title: 'Notenständer-Modus',
        text: 'Blende die Seitenleiste aus und stell das iPad auf den Notenständer.',
      },
      { icon: 'shield-lock', title: 'Kein Konto', text: 'App öffnen und loslegen. Keine Registrierung, kein Login.' },
    ],
  },
  privacyBand: {
    eyebrow: 'On-Device',
    title: 'Deine Songs bleiben deine',
    text: 'Analyse, Stems und Akkorde entstehen auf deinem iPad oder Mac. Kein Konto, kein Upload, kein Tracking. Geladen wird nur einmal das Modell zur Instrumententrennung.',
    link: 'Zur Datenschutzerklärung',
  },
  pricing: {
    title: 'Gratis starten. Pro, wenn die Band es braucht.',
    free: {
      name: 'Gratis',
      features: ['{n} Songs im Monat, Stems in voller Qualität', 'Eine Setlist', 'Loop, Tempo, Tonart und Akkorde'],
    },
    yearly: {
      name: 'Pro · jährlich',
      per: '/ Jahr',
      trial: '{n} Tage gratis',
      features: ['Unbegrenzt Songs und Setlists', '„Beste Qualität“: sechs Stems', 'iPad und Mac'],
    },
    monthly: {
      name: 'Pro · monatlich oder einmalig',
      per: '/ Monat',
      once: 'oder einmalig {price}, ohne Abo',
      features: ['Alles aus Pro', 'Monatlich: jederzeit kündbar'],
    },
    launch: { until: 'Launch-Preis bis {date}', regular: 'Regulärer Preis' },
    note: 'Preise in Euro inklusive deutscher Mehrwertsteuer. Der App Store zeigt den Preis für dein Land.',
    renewal:
      'Abos verlängern sich automatisch, wenn du sie nicht mindestens 24 Stunden vor Ende des Zeitraums kündigst. Die Zahlung läuft über deinen Apple Account. Verwalten und kündigen kannst du in den Einstellungen deines App-Store-Kontos.',
  },
  support: {
    title: 'Support',
    description: 'Hilfe zu The Shed: Kontakt und Antworten auf häufige Fragen zu Import, Stems und The Shed Pro.',
    intro: 'Fragen, ein Fehler, eine Idee? Schreib an',
    hint: 'Nenn bitte dein Gerät und die Version von The Shed. Wir antworten meist innerhalb weniger Tage.',
    faqTitle: 'Fragen',
    faq: [
      {
        question: 'Warum kann ich keine Songs aus Apple Music importieren?',
        answer:
          '<p>Songs aus Apple Music sind kopiergeschützt; andere Apps können sie nicht lesen. Songs, die du als Datei besitzt, funktionieren: als Download gekauft, von deiner CD importiert oder selbst aufgenommen.</p>',
      },
      {
        question: 'Welche Dateien kann ich importieren?',
        answer:
          '<p>Audiodateien wie MP3, AAC (M4A), WAV, AIFF, ALAC und FLAC, bis 15 Minuten lang. Auf dem iPad importierst du sie aus der Dateien-App, auf dem Mac auch per Drag &amp; Drop ins Fenster.</p>',
      },
      {
        question: 'Was wird beim ersten Start geladen?',
        answer:
          '<p>Das Modell zur Instrumententrennung, etwa 425 MB, einmalig von Hugging Face. Danach werden Stems ohne Internetverbindung berechnet. Die Akkorderkennung steckt schon in der App.</p>',
      },
      {
        question: 'Wie lange dauert es, einen Song zu trennen?',
        answer:
          '<p>Etwa eine Minute pro Song, je nach Gerät; „Beste Qualität“ ein Vielfaches davon. Einmal gestartet, läuft die Trennung im Hintergrund weiter.</p>',
      },
      {
        question: 'Was braucht „Beste Qualität“?',
        answer:
          '<p>„Beste Qualität“ gehört zu The Shed Pro und trennt einen Song in sechs Stems, mit Gitarre und Klavier einzeln. Sie braucht ein Gerät mit mindestens 8 GB Arbeitsspeicher und lädt ein zweites Modell (etwa 701 MB), wenn du sie auswählst. Auf anderen Geräten ist die Option als nicht verfügbar markiert.</p>',
      },
      {
        question: 'Gilt Pro auf meinem iPad und meinem Mac?',
        answer: '<p>Ja. Ein Kauf gilt auf beiden, solange du denselben Apple Account verwendest.</p>',
      },
      {
        question: 'Wie stelle ich Pro auf einem neuen Gerät wieder her?',
        answer:
          '<p>Melde dich mit dem Apple Account an, mit dem du Pro gekauft hast, öffne in The Shed die Einstellungen und wähle „Käufe wiederherstellen“.</p>',
      },
      {
        question: 'Wie kündige ich mein Abo?',
        answer:
          '<p>Abos verwaltet Apple: Wähl in den Einstellungen von The Shed „Abo verwalten“ oder öffne <a href="https://apps.apple.com/account/subscriptions">deine Abos im App Store</a>. Pro bleibt bis zum Ende des bezahlten Zeitraums aktiv.</p>',
      },
      {
        question: 'Verlassen meine Songs das Gerät?',
        answer:
          '<p>Nein. Analyse, Stems und Akkorde entstehen auf deinem iPad oder Mac, und es gibt keinen Server, der deine Songs empfangen könnte. Details stehen in der <a href="/de/privacy/">Datenschutzerklärung</a>.</p>',
      },
      {
        question: 'Auf welchen Geräten läuft The Shed?',
        answer: '<p>Auf dem iPad ab iPadOS 27 und auf dem Mac ab macOS 27.</p>',
      },
    ],
  },
  footer: {
    copyright: '© 2026 Peter Kurzok',
    links: [
      { label: 'Datenschutz', href: '/privacy/' },
      { label: 'Support', href: '/support/' },
      { label: 'Impressum', href: 'https://apps.peterkurzok.de/imprint/' },
      { label: 'Nutzungsbedingungen (Apple)', href: 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/' },
      { label: 'Weitere Apps', href: 'https://apps.peterkurzok.de' },
    ],
  },
  notFound: {
    title: 'Seite nicht gefunden',
    text: 'Diese Seite gibt es nicht. Vielleicht ist sie umgezogen, oder die Adresse enthält einen Tippfehler.',
    home: 'Zur Startseite',
  },
};
