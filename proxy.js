// Sends visitors of the bare domain to /ca/ or /en/ based on their browser language.
// Vercel runs this only for "/" (see "proxy" in vercel.json); every other request is a static file.

const SUPPORTED = ['en', 'ca'];
const FALLBACK = 'en';

export default function proxy(request) {
  const url = new URL(request.url);
  const lang = pickLanguage(request.headers.get('Accept-Language'));
  return new Response(null, {
    status: 302,
    headers: { Location: `/${lang}/${url.search}`, Vary: 'Accept-Language' },
  });
}

// "ca-ES,ca;q=0.9,en;q=0.8" -> the supported language with the highest weight, else the fallback.
export function pickLanguage(header) {
  if (!header) return FALLBACK;

  const ranked = header
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().toLowerCase().split(';');
      const q = params.find((p) => p.trim().startsWith('q='));
      return { lang: tag.split('-')[0], q: q ? parseFloat(q.split('=')[1]) : 1 };
    })
    .filter(({ lang, q }) => SUPPORTED.includes(lang) && q > 0)
    .sort((a, b) => b.q - a.q);

  return ranked.length ? ranked[0].lang : FALLBACK;
}
