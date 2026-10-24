// Verifies the build output in dist/ against the URL contract of the site.
// Run through `npm run check`; uses Node built-ins only.
import { existsSync } from 'node:fs';
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const dist = 'dist';
const imageSource = 'src/assets/images';
const sizeLimit = 25 * 1024 * 1024; // Cloudflare Pages rejects larger files.
const site = 'https://shed.peterkurzok.de';

// Outbound links the pages may carry; everything they load comes from the site itself.
const outboundHosts = ['apps.apple.com', 'www.apple.com', 'apps.peterkurzok.de', 'huggingface.co', 'www.cloudflare.com'];

// The lists of src/data/site.ts and the launch status of src/data/launch.ts, read from the source
// so that this script needs no build step.
const siteData = await readFile('src/data/site.ts', 'utf8');
const launchData = await readFile('src/data/launch.ts', 'utf8');
const list = (name) =>
  [...(siteData.match(new RegExp(`export const ${name}[^=]*= \\[([^\\]]*)\\]`))?.[1] ?? '').matchAll(/'([^']+)'/g)].map(
    ([, entry]) => entry,
  );
const langs = list('langs');
const screenshotFiles = [...siteData.matchAll(/\{ file: '([^']+)', device: '[^']+' \}/g)].map(([, file]) => `${file}.png`);
const status = launchData.match(/export const status: LaunchStatus = '([a-z]+)'/)?.[1];

const homeOf = (lang) => (lang === 'en' ? 'index.html' : `${lang}/index.html`);
const badgeFor = { unreleased: null, preorder: 'app-store-preorder-white.svg', released: 'app-store-download-white.svg' };
const badges = Object.values(badgeFor).filter(Boolean);

const expectedFiles = [
  ...langs.map(homeOf),
  '404.html',
  'images/app-icon.png',
  ...badges.map((file) => `images/${file}`),
  ...langs.map((lang) => `images/og/${lang}.png`),
  ...langs.flatMap((lang) => screenshotFiles.map((file) => `images/screenshots/${lang}/${file}`)),
];

let failures = 0;
const pass = (message) => console.log(`✓ ${message}`);
const fail = (message) => {
  failures += 1;
  console.log(`✗ ${message}`);
};
const check = (ok, message, problem = '') => (ok ? pass(message) : fail(`${message}   ${problem}`.trimEnd()));

const walk = async (directory) => {
  const entries = await readdir(directory, { recursive: true, withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => path.relative(directory, path.join(entry.parentPath, entry.name)));
};

if (!existsSync(dist)) {
  console.log(`✗ ${dist}/ does not exist; run the build first`);
  process.exit(1);
}

const files = await walk(dist);
const read = (file) => readFile(path.join(dist, file), 'utf8');

// Expected files
check(langs.length > 0 && screenshotFiles.length === 6, 'site.ts names the languages and six screenshots', `langs: ${langs}, screenshots: ${screenshotFiles}`);
check(status in badgeFor, `launch.ts has a known status ("${status}")`, 'not found');
const missing = expectedFiles.filter((file) => !files.includes(file));
check(missing.length === 0, `${expectedFiles.length} expected files are in ${dist}/`, `missing: ${missing.join(', ')}`);

// Images are published unchanged
const changed = [];
for (const file of files.filter((file) => file.startsWith('images/'))) {
  const source = path.join(imageSource, file.slice('images/'.length));
  if (!existsSync(source) || !(await readFile(source)).equals(await readFile(path.join(dist, file)))) changed.push(file);
}
check(changed.length === 0, `every file under ${dist}/images/ is identical to its source`, changed.join(', '));

// No request to a third-party host: src/srcset never leave the site, href only for the outbound
// links (and the site's own absolute URLs), no CSS url() to another host, no Google Fonts anywhere.
const htmlFiles = files.filter((file) => file.endsWith('.html'));
const html = new Map(await Promise.all(htmlFiles.map(async (file) => [file, await read(file)])));
const cssFiles = files.filter((file) => file.endsWith('.css'));
const css = await Promise.all(cssFiles.map(read));
const foreign = [];
const isForeign = (url) => /^(https?:)?\/\//i.test(url) && !url.startsWith(site);
for (const [file, page] of html) {
  for (const [, tag, attributes] of page.matchAll(/<([a-z]+)\b([^>]*)>/gi)) {
    for (const [, attribute, value] of attributes.matchAll(/\s(src|srcset|href)="([^"]*)"/g)) {
      const urls = attribute === 'srcset' ? value.split(',').map((entry) => entry.trim().split(/\s+/)[0]) : [value];
      for (const url of urls.filter(isForeign)) {
        // A link the visitor follows is fine; anything the browser loads by itself is not.
        if (tag === 'a' && attribute === 'href' && outboundHosts.includes(new URL(url, site).hostname)) continue;
        foreign.push(`${file}: <${tag} ${attribute}="${url}">`);
      }
    }
  }
}
for (const [index, text] of [...html.values(), ...css].entries()) {
  for (const [, url] of text.matchAll(/url\(\s*['"]?([^'")]+)/g)) {
    if (isForeign(url)) foreign.push(`${[...html.keys(), ...cssFiles][index]}: url(${url})`);
  }
}
check(foreign.length === 0, 'no page loads anything from another host', foreign.join('; '));
const textFiles = files.filter((file) => /\.(html|xml|txt|css|js|mjs)$/.test(file));
const googled = [];
for (const file of textFiles) {
  if (/fonts\.(googleapis|gstatic)\.com/.test(await read(file))) googled.push(file);
}
check(googled.length === 0, `no Google Fonts reference in ${textFiles.length} text files`, `found in ${googled.join(', ')}`);

// File size
const sizes = await Promise.all(files.map(async (file) => (await stat(path.join(dist, file))).size));
const largest = Math.max(...sizes);
check(
  largest <= sizeLimit,
  `no file above 25 MiB (largest: ${(largest / 1024 / 1024).toFixed(1)} MiB)`,
  files[sizes.indexOf(largest)],
);

// Homepage, once per language: the call to action matches the launch status
for (const lang of langs) {
  const file = homeOf(lang);
  const page = html.get(file) ?? '';
  check(page.includes(`<html lang="${lang}"`), `${file} is marked as "${lang}"`, 'the lang attribute differs');
  const wanted = badgeFor[status];
  const shown = badges.filter((badge) => page.includes(`/images/${badge}`));
  check(
    wanted ? shown.length === 1 && shown[0] === wanted : shown.length === 0,
    `${file} shows ${wanted ? wanted : 'no badge'} for status "${status}"`,
    `found: ${shown.join(', ') || 'none'}`,
  );
  check(
    page.includes('<meta name="apple-itunes-app"') === (status !== 'unreleased'),
    `${file} has the Smart App Banner tag only once the app is in the store`,
    'it is wrong for this status',
  );
  const ids = ['hero', 'features', 'mac', 'more', 'privacy', 'pricing'];
  const absent = ids.filter((id) => !page.includes(`id="${id}"`));
  check(absent.length === 0, `${file} has its ${ids.length} sections`, `missing: ${absent.join(', ')}`);
  const shots = [...page.matchAll(/data-shot="([^"]+)"/g)].map(([, shot]) => shot);
  const wantedShots = screenshotFiles.map((shot) => `${lang}/${shot.replace('.png', '')}`);
  check(
    shots.join() === wantedShots.join(),
    `${file} shows the ${wantedShots.length} screenshots of its language in order`,
    `found ${shots.join(', ') || 'none'}`,
  );
}

// 404 page
const notFound = html.get('404.html') ?? '';
check(
  notFound.includes('<meta name="robots" content="noindex"') && !notFound.includes('rel="canonical"'),
  '404.html is noindex and has no canonical URL',
  'one of the two is wrong',
);

if (failures > 0) {
  console.log(`${failures} ${failures === 1 ? 'check' : 'checks'} failed.`);
  process.exit(1);
}
console.log('All checks passed.');
