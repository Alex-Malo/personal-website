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
  // The name is already in the header, so the page heading says what the page is; the tab title keeps the name.
  assert.match(pages.en, /<h1[^>]*>About Me<\/h1>/);
  assert.match(pages.ca, /<h1[^>]*>Sobre mi<\/h1>/);
  assert.match(pages.en, /<title>Alex Malo/);
  assert.match(pages.en, /class="tagline"[^>]*>Data scientist, increasingly focused on technical AI Safety research\./);
  assert.ok(pages.en.includes('Hi! I’m Alex, a data scientist based in Barcelona'));
  assert.ok(pages.ca.includes('Hola! Soc l’Alex'));
  // Links in each language point to that language's version where one exists.
  assert.ok(pages.en.includes('href="https://www.upc.edu/en"'));
  assert.ok(pages.ca.includes('href="https://www.upc.edu/ca"'));
  assert.ok(pages.en.includes('href="https://en.wikipedia.org/wiki/Pyrenees"'));
  assert.ok(pages.ca.includes('href="https://ca.wikipedia.org/wiki/Pirineus"'));
});

test('manifesto below the About text', () => {
  assert.match(pages.en, /<h2[^>]*>Why I care about AI Safety<\/h2>/);
  assert.match(pages.ca, /<h2[^>]*>Per què m’importa la seguretat de la IA<\/h2>/);
  for (const page of Object.values(pages)) {
    const section = page.match(/<section class="manifesto"[\s\S]*?<\/section>/)?.[0] ?? '';
    assert.ok(section, 'manifesto section exists');
    // Sources sit on the text's own words: no leftover brackets or doubled full stops.
    const words = section.replace(/<[^>]+>/g, '');
    assert.ok(!/\[|\]/.test(words), 'no bracketed sources');
    assert.ok(!/\.\.|\s\./.test(words), 'no stray full stops');
    assert.ok(count(section, '<a href=') >= 20, 'sources are linked');
  }
});

// The photo is optional: whichever state the repo is in, the page must match it.
const hasPhoto = ['jpg', 'jpeg', 'png', 'webp'].some((ext) => existsSync(new URL(`../src/assets/alex.${ext}`, import.meta.url)));

test('about photo matches the repo', () => {
  if (hasPhoto) {
    assert.match(pages.en, /class="about-photo"[\s\S]*?<img[^>]*alt="Alex Malo"/);
    // Visitors get resized WebP, never the original upload.
    const img = pages.en.match(/class="about-photo"[\s\S]*?<img[^>]*>/)[0];
    assert.match(img, /src="\/_astro\/[^"]+\.webp"/);
    assert.match(img, /srcset="[^"]*460w[^"]*920w/);
    assert.match(img, /width="920"/, 'fallback src is the 920px version, not the full-size original');
    assert.ok(!pages.en.includes('about--no-photo'));
  } else {
    assert.ok(!pages.en.includes('about-photo'));
    assert.ok(pages.en.includes('about--no-photo'));
  }
});

test('404 styled', () => {
  const page = read('404.html');
  assert.match(page, /<html[^>]*class="no-js"/);
  assert.ok(!page.includes('site-header'));
  assert.ok(page.includes('href="/en/"') && page.includes('href="/ca/"'));
  const styles = [...inlineStyles(page), ...[...page.matchAll(/href="\/(_astro\/[^"]+\.css)"/g)].map((m) => read(m[1]))].join('\n');
  assert.ok(styles.includes('Newsreader Variable'));
});

test('theme button hidden without JS', () => {
  // Minified CSS may merge selectors, e.g. ".no-js .theme-toggle,.theme-sun{display:none}".
  assert.match(css(), /\.no-js \.theme-toggle[^{]*\{\s*display:\s*none/);
});

test('sticky header never covers the focused element', () => {
  assert.match(css().replace(/\s/g, ''), /html\{[^}]*scroll-padding-top:/);
});

test('CSS and JS use the same phone breakpoint', () => {
  const flat = css().replace(/\s/g, '');
  assert.ok(!flat.includes('39.99rem'));
  // The minifier may rewrite the query as "(width>=40rem)".
  assert.match(flat, /notalland\((min-width:40rem|width>=40rem)\)/);
});

// Every image in src/ and public/, not just the About photo (blog images later too).
const images = (dir) =>
  existsSync(dir)
    ? readdirSync(dir, { recursive: true })
        .filter((f) => /\.(jpe?g|png|webp|avif|gif|tiff?)$/i.test(f))
        .map((f) => new URL(f.replaceAll('\\', '/'), dir))
    : [];

test('images carry no hidden metadata (location, camera)', async () => {
  const sharp = (await import('sharp')).default;
  const files = [...images(new URL('../src/', import.meta.url)), ...images(new URL('../public/', import.meta.url))];
  for (const file of files) {
    const meta = await sharp(file.pathname.replace(/^\/(\w:)/, '$1')).metadata();
    assert.ok(!meta.exif && !meta.xmp && !meta.iptc, `strip metadata from ${file.pathname} before committing: the repo is public`);
  }
});

const vercel = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'));

test('security headers ship with the site', () => {
  const all = vercel.headers.find((rule) => rule.source === '/(.*)');
  const headers = Object.fromEntries(all.headers.map(({ key, value }) => [key, value]));
  assert.equal(headers['X-Content-Type-Options'], 'nosniff');
  assert.equal(headers['X-Frame-Options'], 'DENY');
  assert.ok(headers['Referrer-Policy']);
  assert.match(headers['Content-Security-Policy'], /frame-ancestors 'none'/);
});

test('every page reserves text and data mining (EU opt-out from AI training)', () => {
  const all = vercel.headers.find((rule) => rule.source === '/(.*)');
  assert.ok(all.headers.some(({ key, value }) => key === 'tdm-reservation' && value === '1'));
});

// robots.txt as { agent (lowercase): [rules] }; agents listed together share the rules below them.
const robots = () => {
  const groups = {};
  let agents = [];
  let lastWasAgent = false;
  for (const line of read('robots.txt').split('\n')) {
    const [field, ...rest] = line.replace(/#.*/, '').split(':');
    const value = rest.join(':').trim();
    if (!value) continue;
    if (field.trim().toLowerCase() === 'user-agent') {
      agents = lastWasAgent ? [...agents, value.toLowerCase()] : [value.toLowerCase()];
      lastWasAgent = true;
    } else {
      for (const agent of agents) (groups[agent] ??= []).push(`${field.trim().toLowerCase()}: ${value}`);
      lastWasAgent = false;
    }
  }
  return groups;
};

test('robots.txt keeps AI training crawlers out', () => {
  const groups = robots();
  for (const bot of ['gptbot', 'claudebot', 'ccbot', 'google-extended', 'applebot-extended', 'meta-externalagent', 'bytespider']) {
    assert.deepEqual(groups[bot], ['disallow: /'], bot);
  }
  assert.ok(groups['*'].includes('content-signal: search=yes, ai-input=yes, ai-train=no'));
});

test('robots.txt lets search engines, AI search and AI assistants in', () => {
  const groups = robots();
  assert.ok(groups['*'].includes('allow: /') && !groups['*'].includes('disallow: /'));
  // Each of these must fall back to the "*" group, never a group of its own.
  for (const bot of ['googlebot', 'bingbot', 'oai-searchbot', 'chatgpt-user', 'claude-searchbot', 'claude-user', 'perplexitybot', 'perplexity-user']) {
    assert.equal(groups[bot], undefined, bot);
  }
});

test('the language redirect runs only for "/"', () => {
  assert.deepEqual(vercel.proxy.matcher, ['/']);
});

test('"/" redirects by browser language', async () => {
  const { default: proxy } = await import('../proxy.js');
  const go = (lang, path = '/') =>
    proxy(new Request(`https://alexmalo.cat${path}`, { headers: lang ? { 'Accept-Language': lang } : {} })).headers.get('Location');
  assert.equal(go('ca-ES,ca;q=0.9,en;q=0.8'), '/ca/');
  assert.equal(go('en-GB,en;q=0.9,ca;q=0.5'), '/en/');
  assert.equal(go('es-ES,es;q=0.9,ca;q=0.8'), '/ca/');
  assert.equal(go('es-ES,es;q=0.9'), '/en/');
  assert.equal(go(null), '/en/');
  assert.equal(go('ca', '/?ref=cv'), '/ca/?ref=cv');
});
