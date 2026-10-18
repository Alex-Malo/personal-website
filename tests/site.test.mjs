// Checks the built site in dist/. Run with `npm test` (builds first).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';

const dist = new URL('../dist/', import.meta.url);
const read = (path) => readFileSync(new URL(path, dist), 'utf8');
const assets = () => (existsSync(new URL('_astro/', dist)) ? readdirSync(new URL('_astro/', dist)) : []);
const pages = { en: read('en/index.html'), ca: read('ca/index.html') };
// Astro inlines small stylesheets into the page, so collect both kinds.
const inlineStyles = (html) => [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]);
const css = () =>
  [
    ...inlineStyles(pages.en),
    ...assets()
      .filter((f) => f.endsWith('.css'))
      .map((f) => read(`_astro/${f}`)),
  ].join('\n');
const count = (haystack, needle) => haystack.split(needle).length - 1;

test('builds both languages', () => {
  assert.match(pages.en, /<html[^>]*lang="en"/);
  assert.match(pages.ca, /<html[^>]*lang="ca"/);
});

test('no third-party font requests', () => {
  for (const source of [pages.en, pages.ca, css()]) {
    assert.ok(!source.includes('fonts.googleapis'));
    assert.ok(!source.includes('fonts.gstatic'));
  }
});

test('ships Newsreader', () => {
  assert.ok(css().includes('Newsreader Variable'));
  assert.ok(assets().some((f) => f.endsWith('.woff2')));
});

test('defines tokens', () => {
  const flat = css().replace(/\s/g, '').toLowerCase();
  assert.ok(flat.includes('--paper:#fdf9ef'));
  assert.ok(flat.includes('--link:#2c4a7c'));
});
