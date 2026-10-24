import assert from 'node:assert/strict';
import { test } from 'node:test';
import { ctaKind, formatDate, formatPrice, launchOfferActive } from './launch.ts';

const nbsp = ' ';

test('each launch status has its call to action', () => {
  assert.equal(ctaKind('unreleased'), 'text');
  assert.equal(ctaKind('preorder'), 'preorder-badge');
  assert.equal(ctaKind('released'), 'download-badge');
});

test('the launch offer runs until the day before endsAt (UTC)', () => {
  const now = new Date('2026-11-20T12:00:00Z');
  assert.equal(launchOfferActive(null, now), false);
  assert.equal(launchOfferActive({ price: 69.99, endsAt: '2026-11-01' }, now), false, 'past');
  assert.equal(launchOfferActive({ price: 69.99, endsAt: '2026-12-31' }, now), true, 'future');
  assert.equal(launchOfferActive({ price: 69.99, endsAt: '2026-11-20' }, now), false, 'endsAt is today');
  assert.equal(launchOfferActive({ price: 69.99, endsAt: '2026-11-21' }, now), true, 'endsAt is tomorrow');
});

test('prices read as euros in English', () => {
  assert.equal(formatPrice('en', 0), '€0');
  assert.equal(formatPrice('en', 5.99), '€5.99');
  assert.equal(formatPrice('en', 39.99), '€39.99');
});

test('prices read as euros in German, with a no-break space before the sign', () => {
  assert.equal(formatPrice('de', 0), `0${nbsp}€`);
  assert.equal(formatPrice('de', 5.99), `5,99${nbsp}€`);
  assert.equal(formatPrice('de', 39.99), `39,99${nbsp}€`);
});

test('dates read as long dates in both languages', () => {
  assert.equal(formatDate('en', '2026-11-12'), '12 November 2026');
  assert.equal(formatDate('de', '2026-11-12'), '12. November 2026');
});
