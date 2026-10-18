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

test('header nav', () => {
  assert.match(pages.en, /<a[^>]*href="\/en\/"[^>]*aria-current="page"[^>]*>About<\/a>/);
  assert.ok(!pages.en.includes('>CV<'));
  assert.match(pages.ca, /aria-current="page"[^>]*>Sobre mi<\/a>/);
});

test('social links', () => {
  const hrefs = [
    'https://www.linkedin.com/in/alex-malo-3aa7122a7/',
    'https://github.com/Alex-Malo',
    'mailto:amaloportabella@gmail.com',
  ];
  for (const page of Object.values(pages)) {
    for (const href of hrefs) assert.ok(count(page, `href="${href}"`) >= 2, href);
  }
});

test('language switch keeps path', () => {
  assert.match(pages.en, /<a[^>]*href="\/ca\/"[^>]*hreflang="ca"/);
  assert.match(pages.ca, /<a[^>]*href="\/en\/"[^>]*hreflang="en"/);
});

test('footer', () => {
  for (const page of Object.values(pages)) assert.ok(page.includes('© 2026 Alex Malo'));
});

const menuPanel = (page) => page.match(/<div[^>]*id="site-menu"[\s\S]*?<!-- \/site-menu -->/)?.[0] ?? '';

test('menu button', () => {
  assert.match(pages.en, /<button[^>]*aria-controls="site-menu"[^>]*aria-expanded="false"[^>]*aria-label="Open menu"/);
  assert.match(pages.ca, /<button[^>]*aria-controls="site-menu"[^>]*aria-expanded="false"[^>]*aria-label="Obre el menú"/);
});

test('menu panel', () => {
  const panel = menuPanel(pages.en);
  assert.ok(panel, 'panel with id="site-menu" exists');
  assert.match(panel, /href="\/en\/"[^>]*>About</);
  assert.match(panel, /href="\/ca\/"[^>]*hreflang="ca"/);
  assert.ok(panel.includes('mailto:amaloportabella@gmail.com'));
  assert.ok(panel.includes('https://github.com/Alex-Malo'));
  assert.ok(panel.includes('https://www.linkedin.com/in/alex-malo-3aa7122a7/'));
  assert.ok(menuPanel(pages.ca).includes('aria-label="Tanca el menú"'));
});

test('no-js fallback', () => {
  assert.match(pages.en, /<html[^>]*class="no-js"/);
});

test('early theme script', () => {
  for (const page of Object.values(pages)) {
    const head = page.slice(0, page.indexOf('</head>'));
    const script = head.search(/<script>[^<]*localStorage[^<]*data-theme[^<]*<\/script>|<script>[^<]*data-theme[^<]*localStorage[^<]*<\/script>/);
    const firstStyle = head.search(/<link rel="stylesheet"|<style/);
    assert.ok(script >= 0, 'inline theme script in head');
    assert.ok(firstStyle === -1 || script < firstStyle, 'theme script runs before styles');
  }
});

test('toggle button', () => {
  assert.ok(count(pages.en, 'data-theme-toggle') >= 2);
  assert.match(pages.en, /data-theme-toggle[^>]*aria-label="Switch to dark mode"|aria-label="Switch to dark mode"[^>]*data-theme-toggle/);
  assert.ok(pages.ca.includes('Canvia al mode fosc'));
});

test('about content', () => {
  assert.match(pages.en, /<h1[^>]*>Alex Malo<\/h1>/);
  assert.match(pages.en, /class="tagline"[^>]*>Data scientist working towards technical AI Safety research\./);
  assert.ok(pages.en.includes("I'm a data scientist based in Barcelona.") || pages.en.includes('I&#39;m a data scientist based in Barcelona.'));
  assert.ok(pages.ca.includes('Ara estic fent el pas'));
});

test('no photo yet', () => {
  assert.ok(!pages.en.includes('about-photo'));
  assert.ok(pages.en.includes('about--no-photo'));
});
