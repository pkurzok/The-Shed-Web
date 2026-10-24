// Verifies the URL contract of a deployed site.
// Usage: npm run check:live -- https://shed.peterkurzok.de
// Uses Node built-ins only; run it from the repository root, it compares the images with
// src/assets/images.
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const base = process.argv[2]?.replace(/\/$/, '');
if (!base) {
  console.log('Usage: npm run check:live -- <base-url>');
  process.exit(1);
}

const imageSource = 'src/assets/images';
const email = 'shed@peterkurzok.de';

let checks = 0;
let failures = 0;
const report = (ok, label, problem) => {
  checks += 1;
  if (ok) {
    console.log(`✓ ${label}`);
  } else {
    failures += 1;
    console.log(`✗ ${label}   ${problem}`);
  }
};

const get = (pathname) => fetch(base + pathname, { redirect: 'manual' });

try {
  await get('/');
} catch (error) {
  console.log(`✗ ${base} is not reachable: ${error.cause?.message ?? error.message}`);
  process.exit(1);
}

// Answers with `status`; `contentType`, `body` and `contains` are optional further expectations.
const expectStatus = async (status, pathname, { contentType, body, contains } = {}) => {
  const response = await get(pathname);
  const type = response.headers.get('content-type') ?? '';
  let problem;
  if (response.status !== status) {
    problem = `expected ${status}, got ${response.status}`;
  } else if (contentType && !type.startsWith(contentType)) {
    problem = `expected ${contentType}, got ${type}`;
  } else if (body && !Buffer.from(await response.arrayBuffer()).equals(body)) {
    problem = 'differs from the source file';
  } else if (contains && !(await response.text()).includes(contains)) {
    problem = `"${contains}" missing`;
  }
  const details = [contentType, body && 'identical bytes', contains && `contains "${contains}"`].filter(Boolean).join(', ');
  report(!problem, `${status} ${pathname}${details ? ` (${details})` : ''}`, problem);
};

// Redirects with `status` to `target`, a path on the site.
const expectRedirect = async (status, pathname, target) => {
  const response = await get(pathname);
  const location = response.headers.get('location');
  const resolved = location ? new URL(location, base).href : 'no location';
  const expected = new URL(target, base).href;
  let problem;
  if (response.status !== status) {
    problem = `expected ${status}, got ${response.status}`;
  } else if (resolved !== expected) {
    problem = `expected ${expected}, got ${resolved}`;
  }
  report(!problem, `${status} ${pathname} -> ${target}`, problem);
};

// Pages
for (const page of ['/', '/de/', '/support/', '/de/support/']) {
  await expectStatus(200, page, { contentType: 'text/html' });
}
await expectStatus(200, '/privacy/', { contentType: 'text/html', contains: email });
await expectStatus(200, '/de/privacy/', { contentType: 'text/html', contains: email });

// Technical files
await expectStatus(200, '/sitemap.xml', { contentType: 'application/xml' });
await expectStatus(200, '/robots.txt', { contains: 'Sitemap:' });

// Every image keeps its URL and its bytes
const images = (await readdir(imageSource, { recursive: true, withFileTypes: true }))
  .filter((entry) => entry.isFile() && /\.(png|jpg|svg)$/.test(entry.name))
  .map((entry) => path.relative(imageSource, path.join(entry.parentPath, entry.name)))
  .sort();
for (const image of images) {
  await expectStatus(200, `/images/${image}`, { body: await readFile(path.join(imageSource, image)) });
}

// Trailing-slash forms (Cloudflare Pages answers 308)
for (const page of ['/privacy', '/support', '/de', '/de/privacy', '/de/support']) {
  await expectRedirect(308, page, `${page}/`);
}

// The policy address of the app and the store listings
await expectRedirect(301, '/datenschutz', '/privacy/');
await expectRedirect(301, '/datenschutz/', '/privacy/');
await expectRedirect(301, '/de/datenschutz', '/de/privacy/');
await expectRedirect(301, '/de/datenschutz/', '/de/privacy/');

// Unknown paths. Cloudflare's edge may serve a cached answer; the query string asks the
// deployment itself.
await expectStatus(404, `/does-not-exist?fresh=${Date.now()}`, { contains: 'Page not found' });

if (failures > 0) {
  console.log(`${failures} of ${checks} checks failed.`);
  process.exit(1);
}
console.log(`All ${checks} checks passed.`);
