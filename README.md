# The Shed website

The source of <https://shed.peterkurzok.de>: the homepage, the privacy policy and the support page of
[The Shed](https://shed.peterkurzok.de), an iPad and Mac app for band practice, in English at `/` and in German at
`/de/`. It is an [Astro](https://astro.build) project that builds to static files; this repository is the only source
of the site. The app itself lives in a separate repository ("The Shed").

## Requirements

- Node 22.18 or later (`.nvmrc`)
- `npm ci` once after cloning

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Serves the site locally with live reload, by default at <http://localhost:4321/> |
| `npm test` | Runs the unit tests of the launch logic in `src/lib/` |
| `npm run build` | Type-checks the project and builds the site into `dist/` |
| `npm run check` | Tests, builds, then verifies `dist/`: expected files, images, links, no third-party requests, launch state |
| `npm run preview` | Serves the built `dist/` locally |
| `npm run check:live -- <base-url>` | Verifies a deployed site against the URL contract below |
| `scripts/import-assets.sh <app-repo>` | Copies screenshots and icon from the app repository (see Images) |

Run `npm run check` before pushing. It prints one line per check and fails when a link dangles, a published file is
missing or a page would load something from another host.

## Where content lives

| Content | File |
|---|---|
| Every text of the homepage, support page, navigation and footer | `src/data/en.ts`, `src/data/de.ts` |
| App facts, languages, screenshot list, sitemap pages, the `Content` type | `src/data/site.ts` |
| Launch status, launch date, prices, launch offer | `src/data/launch.ts` |
| Launch logic (call to action, offer, price and date format) and its tests | `src/lib/launch.ts`, `src/lib/launch.test.ts` |
| Privacy policy | `src/pages/privacy.md`, `src/pages/de/privacy.md` |
| Support page (contact first, then the questions) | `src/components/Support.astro`; questions in the language files |
| Redirects, response headers, `robots.txt` | `public/_redirects`, `public/_headers`, `public/robots.txt` |
| 404 page | `src/pages/404.astro` |
| Markup of a homepage section | `src/components/` (`Hero`, `Facts`, `FeatureRow`, `Mac`, `FeatureGrid`, `Privacy`, `Pricing`) |
| Page frame: `<head>`, header, footer | `src/layouts/Base.astro`, `src/components/Header.astro`, `Footer.astro` |
| Styles and colour tokens (design "Stage", tokens from the app's `Theme.swift`) | `src/styles/site.css` |
| Icons of the feature grid (Bootstrap Icons) | `src/components/Icon.astro` |

A question, a feature text or a footer link is one edit in each language file.

## Two languages

English is at `/`, German at `/de/`. The pages under `src/pages/de/` mirror the English ones, and every component
takes the language as a prop.

- All texts of a language are in `src/data/en.ts` or `src/data/de.ts`. Both satisfy the type `Content` in
  `src/data/site.ts`, so a new text needs a key in the type and an entry in both files; the build fails when one is
  missing.
- Terms follow `docs/aso/glossary.md` of the app repository; German uses "du", like the app.
- Each language shows its own screenshots, from `src/assets/images/screenshots/en/` and `…/de/`.
- Header and footer link to the same page in the other language, and each page names both versions for search
  engines (`hreflang`).
- A third language needs a content file, an entry in `langs` and `locales`, the mirrored pages, its screenshots in
  `import-assets.sh` and its `/datenschutz` redirect.

## Editing the privacy policy

The policy is `src/pages/privacy.md` and `src/pages/de/privacy.md`, plain Markdown. When the wording changes, change
both and update the "Last updated" and "Stand" lines at the top.

**The app (Settings, paywall) and every App Store locale link to `https://shed.peterkurzok.de/datenschutz`.**
`public/_redirects` sends it to the English policy, which links the German one at the top. That address must stay.
App Store Connect's support URL is `/support`, and App Review needs the contact address there.

The imprint is not part of this site: the footer and the policy link to <https://apps.peterkurzok.de/imprint/>.

## Images

Originals live in `src/assets/images/` and exist only there.

- They are published unchanged under `/images/…` by `src/pages/images/[...file].ts`.
- The pages show WebP variants (640, 1100, 1600 px) that Astro derives from the same originals at build time.
- `screenshots/<lang>/` holds the framed device shots (transparent PNG, 1600 px long edge): `ipad-01-mute`,
  `ipad-02-loop`, `ipad-03-tempo`, `ipad-04-chords`, `ipad-05-stems`, `mac-01-practice`. The list is in
  `src/data/site.ts`, in the order of the homepage; the alt texts are in the language files.
- `og/<lang>.png` is the captioned, opaque store screenshot used for link previews.
- `app-icon.png` (1024 × 1024) is the favicon, touch icon and header icon.
- `app-store-{download,preorder}-white.svg` are Apple's badges (US/UK artwork) for the launch states.

Screenshots, link-preview images and the icon come from the app repository:

```sh
scripts/import-assets.sh "$HOME/ws-privat/The Shed"
```

It reads `design/screenshots/raw/{ipad,mac}/{en,de}/`, `store/build/screenshots/ios/{en-US,de-DE}/…/01_mute-your-part.png`
(run `make screenshots` in the app repo first) and `design/app-icon/the-shed-icon.svg`, and writes only into this
repository. It uses `sips` and `qlmanage`, both part of macOS.

No file above 25 MiB may enter the build: Cloudflare Pages rejects it. `npm run check` fails for such a file.

## Prices and launch states

Prices are in `src/data/launch.ts`, in euros of the German App Store including VAT (`CONCEPT.md` §7 of the app):
€5.99 a month, €39.99 a year with 7 days free, €99.99 once. **Change them together with App Store Connect.** The
pricing section says that the App Store shows the price for the visitor's country.

`status` in `src/data/launch.ts` decides the call to action in the hero and the header:

| `status` | Hero | Header | Smart App Banner |
|---|---|---|---|
| `unreleased` | "Coming soon to iPad and Mac", no link | "Coming soon" | no |
| `preorder` | Pre-order badge, "Arrives on `launchDate`" | "Pre-order" | yes |
| `released` | Download badge, "iPad and Mac · free to start" | "Get the app" | yes |

`launchOffer` (`{ price, endsAt }`) shows the lifetime launch price with the regular price struck through and "until
<last day>". `endsAt` is the first day at the regular price (UTC). The site is static: the offer is decided at build
time and disappears only with the next build after `endsAt`.

## Deployment

The Cloudflare Pages project `the-shed-web` builds the site itself; there is nothing to upload.

- A push to `main` deploys to <https://shed.peterkurzok.de>.
- Any other branch gets a preview at `https://<branch>.the-shed-web.pages.dev`.
- A failed build shows up as the "Cloudflare Pages" check on the commit in GitHub; the log is in the Cloudflare
  dashboard. The live site keeps its last successful deployment.

Check a preview before merging, and production after:

```sh
npm run check:live -- https://<branch>.the-shed-web.pages.dev
npm run check:live -- https://shed.peterkurzok.de
```

Redirects, the trailing-slash redirects and the sitemap's content type are the work of Cloudflare Pages, so
`check:live` reports them as failures against `npm run preview`.

### Cloudflare setup (once, by hand)

1. Cloudflare dashboard › Workers & Pages › Create › Pages › Connect to Git › `pkurzok/The-Shed-Web`.
2. Project name `the-shed-web`; production branch `main`.
3. Build command `npm run build`; build output directory `dist`.
4. Environment variable `NODE_VERSION` = `22`, for production and preview.
5. Save and deploy, then Custom domains › add `shed.peterkurzok.de`. Cloudflare creates the CNAME record itself when
   `peterkurzok.de` is in the same account.

If Cloudflare adds a suffix to the project name (because `the-shed-web` is taken), the preview addresses use that name.

### Rollback

In the Cloudflare dashboard open the Pages project, go to Deployments and choose "Rollback" on an earlier deployment.
That takes effect at once and needs no commit. Follow up by reverting the offending commit on `main`, so that the next
push does not bring the problem back.

## Launch day

1. When pre-orders open: set `status` to `'preorder'` and `launchDate` to the release day (`'YYYY-MM-DD'`).
   On release: set `status` to `'released'`.
2. If the launch price runs: set `launchOffer` to `{ price: 69.99, endsAt: '<first day at the regular price>' }`,
   matching the price schedule in App Store Connect and `LaunchOffer.current` in the app.
3. `npm run check`, commit, push to `main`.
4. `npm run check:live -- https://shed.peterkurzok.de`.
5. Put a calendar reminder on `endsAt`: push once that day (any commit, or remove `launchOffer`), because the offer
   only disappears with a rebuild.

## URL contract

These addresses are linked from the app or from App Store Connect and must keep working. `npm run check:live` tests
every line.

| Address | Answer |
|---|---|
| `/`, `/de/`, `/privacy/`, `/de/privacy/`, `/support/`, `/de/support/` | 200 |
| `/privacy`, `/support`, `/de`, `/de/privacy`, `/de/support` (every address without a trailing slash) | 308 to the form with a trailing slash |
| `/datenschutz`, `/datenschutz/` | 301 to `/privacy/` (the app and every store locale link here) |
| `/de/datenschutz`, `/de/datenschutz/` | 301 to `/de/privacy/` |
| `/images/…` | 200, the bytes of `src/assets/images/…` |
| `/sitemap.xml`, `/robots.txt` | 200 |
| any other address | 404 with the 404 page |

No page loads anything from another host: fonts are self-hosted (`@fontsource-variable/archivo`), there is no CDN and
no analytics. `npm run check` fails on any `src`, `srcset` or CSS `url()` to another host and on any Google Fonts
reference.
