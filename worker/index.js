// Sends visitors of the bare domain to /ca/ or /en/ based on their browser language.
// Every other request is served straight from the static files by Cloudflare.

const SUPPORTED = ['en', 'ca'];
const FALLBACK = 'en';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/') {
      const lang = pickLanguage(request.headers.get('Accept-Language'));
      return new Response(null, {
        status: 302,
        headers: { Location: `/${lang}/${url.search}`, Vary: 'Accept-Language' },
      });
    }

    return env.ASSETS.fetch(request);
  },
};

// "ca-ES,ca;q=0.9,en;q=0.8" -> the supported language with the highest weight, else the fallback.
function pickLanguage(header) {
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
