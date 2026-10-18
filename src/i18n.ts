// All page text, per language. About text is a draft, to be rewritten by Alex.

export const languages = { en: 'English', ca: 'Català' } as const;
export type Lang = keyof typeof languages;

export const text = {
  en: {
    title: 'Alex Malo',
    description: 'Data scientist working towards technical AI Safety research.',
    tagline: 'Data scientist working towards technical AI Safety research.',
    about: [
      "I'm a data scientist based in Barcelona. I studied Industrial Engineering, then an MSc in Data Science, and I've spent the last year working in data science.",
      "I'm now moving into technical AI Safety research. I've completed BlueDot Impact's AGI Safety and Technical AI Safety courses, and I'm starting independent research.",
    ],
    ui: {
      mainNav: 'Main',
      menuOpen: 'Open menu',
      menuClose: 'Close menu',
      themeToDark: 'Switch to dark mode',
      themeToLight: 'Switch to light mode',
    },
  },
  ca: {
    title: 'Alex Malo',
    description: 'Científic de dades fent el pas cap a la recerca tècnica en seguretat de la IA.',
    tagline: 'Científic de dades fent el pas cap a la recerca tècnica en seguretat de la IA.',
    about: [
      'Soc científic de dades i visc a Barcelona. Vaig estudiar Enginyeria Industrial i després un màster en Ciència de Dades, i fa un any que treballo en ciència de dades.',
      "Ara estic fent el pas cap a la recerca tècnica en seguretat de la IA (AI Safety). He completat els cursos AGI Safety i Technical AI Safety de BlueDot Impact i estic començant a fer recerca independent.",
    ],
    ui: {
      mainNav: 'Principal',
      menuOpen: 'Obre el menú',
      menuClose: 'Tanca el menú',
      themeToDark: 'Canvia al mode fosc',
      themeToLight: 'Canvia al mode clar',
    },
  },
} satisfies Record<Lang, unknown>;

// Pages in the menu, in order. `path` is what comes after the language prefix. Add CV here when its page exists.
export const pages: { path: string; label: Record<Lang, string> }[] = [
  { path: '', label: { en: 'About', ca: 'Sobre mi' } },
];

export const links = [
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/alex-malo-3aa7122a7/' },
  { id: 'github', label: 'GitHub', href: 'https://github.com/Alex-Malo' },
  { id: 'email', label: 'Email', href: 'mailto:amaloportabella@gmail.com' },
] as const;
