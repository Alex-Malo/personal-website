// All page text, per language. Draft wording — to be rewritten by Alex.

export const languages = { en: 'English', ca: 'Català' } as const;
export type Lang = keyof typeof languages;

export const text = {
  en: {
    title: 'Alex Malo',
    description: 'Data scientist working towards technical AI Safety research.',
    tagline: 'Data scientist working towards technical AI Safety research.',
    aboutHeading: 'About',
    about: [
      "I'm a data scientist based in Barcelona. I studied Industrial Engineering, then an MSc in Data Science, and I've spent the last year working in data science.",
      "I'm now moving into technical AI Safety research. I've completed BlueDot Impact's AGI Safety and Technical AI Safety courses, and I'm starting independent research.",
    ],
    linksHeading: 'Find me',
  },
  ca: {
    title: 'Alex Malo',
    description: 'Científic de dades fent el pas cap a la recerca tècnica en seguretat de la IA.',
    tagline: 'Científic de dades fent el pas cap a la recerca tècnica en seguretat de la IA.',
    aboutHeading: 'Sobre mi',
    about: [
      'Soc científic de dades i visc a Barcelona. Vaig estudiar Enginyeria Industrial i després un màster en Ciència de Dades, i fa un any que treballo en ciència de dades.',
      "Ara estic fent el pas cap a la recerca tècnica en seguretat de la IA (AI Safety). He completat els cursos AGI Safety i Technical AI Safety de BlueDot Impact i estic començant a fer recerca independent.",
    ],
    linksHeading: 'On trobar-me',
  },
} satisfies Record<Lang, unknown>;

export const links = [{ label: 'GitHub', href: 'https://github.com/Alex-Malo' }];
