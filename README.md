# alexmalo.cat

Personal website of Alex Malo, in English and Catalan. Built with [Astro](https://astro.build), hosted on Cloudflare Workers.

- `src/i18n.ts` — all page text, per language
- `src/pages/en/`, `src/pages/ca/` — pages for each language
- `worker/index.js` — sends visitors of `/` to `/en/` or `/ca/` based on their browser language
- `ROADMAP.md`, `PLANNING.md` — plan and decisions

## Commands

| Command           | What it does                                          |
|-------------------|-------------------------------------------------------|
| `npm install`     | Install dependencies                                  |
| `npm run dev`     | Local dev server at http://localhost:4321             |
| `npm run build`   | Build the site into `dist/`                           |
| `npm run preview` | Build and run it locally the way Cloudflare runs it   |

Pushing to `main` deploys automatically through Cloudflare.
