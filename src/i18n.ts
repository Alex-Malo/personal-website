// All page text, per language. About paragraphs are HTML (for links); only trusted text goes here.

export const languages = { en: 'English', ca: 'Català' } as const;
export type Lang = keyof typeof languages;

export const text = {
  en: {
    title: 'Alex Malo',
    description: 'Data scientist, increasingly focused on technical AI Safety research.',
    tagline: 'Data scientist, increasingly focused on technical AI Safety research.',
    about: [
      `Hi! I’m Alex, a data scientist based in Barcelona, increasingly focused on technical AI Safety research. After completing BlueDot’s <a href="https://bluedot.org/courses/technical-ai-safety">Technical AI Safety course</a>, I’m now building my first independent research projects. I am most drawn to evaluations and interpretability, because I believe that before we can safely roll out highly capable models, we need reliable evidence of what they can really do and why they do it. Therefore, as an <a href="https://www.effectivealtruism.org/what-is-effective-altruism">effective altruist</a>, I am keen to work on building robust ways to measure capabilities and behaviour, to help make sure the future of AI is safe from existential risks.`,
      `For the past year I have worked as a data scientist at a small tech consultancy, where I have led the modelling for a range of Machine Learning projects. I am currently building a demand-forecasting system for a large multinational food manufacturer, predicting monthly demand for hundreds of products across several countries. I have owned it end to end: from raw warehouse data to validated, versioned datasets, through a modelling and experimentation framework, to forecasts the client now receives every month. Much of the work went into making results trustworthy: reproducible experiments, strong baselines, and forecasts frozen before the outcomes were known and scored against the client’s own planning system.`,
      `Before beginning my career, I did an industrial engineering undergrad at the <a href="https://www.upc.edu/en">Universitat Politècnica de Catalunya</a> (UPC) and an <a href="https://bse.eu/masters-degrees/data-science/data-science-methodology">MSc in Data Science</a> at the Barcelona School of Economics (graduated 2025), where I built my Machine Learning foundations and my AI Safety journey began through an AI Ethics course. During that time I also taught algebra and basic Python to UPC bachelor’s students, preparing course materials and teaching 3-6 hours a week.`,
      `I’m also involved with <a href="https://esf-cat.org/en/about-us/mission-vision-values/">Enginyeria Sense Fronteres</a>, a local organisation where I am part of a team that supports rural communities in Paraguay to achieve food sovereignty and ensure access to water. Among other actions, we are designing manuals that help communities build their own rainwater collection and storage systems from locally available materials, and have agency over them.`,
      `Outside work, I mostly like being in nature, often in the <a href="https://en.wikipedia.org/wiki/Pyrenees">Pyrenees</a>. I enjoy any kind of mountain sport (hiking, climbing, alpinism, ski touring, cycling). I also love taking care of my house plants, although I certainly don’t have the skills to do that for a living. Alongside all this, I’m always happy to have an inspiring conversation, so if any of this resonates, or you’d like to talk about evaluations, interpretability or the mountains, I’d love to hear from you.`,
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
    description: 'Científic de dades amb gran interès per la seguretat de la IA.',
    tagline: 'Científic de dades amb gran interès per la seguretat de la IA.',
    about: [
      `Hola! Soc l’Alex, científic de dades, visc a Barcelona i estic desenvolupant el meu interès per la seguretat de la IA (AI Safety). Després de completar el <a href="https://bluedot.org/courses/technical-ai-safety">curs Technical AI Safety</a> de BlueDot, ara estic construint els meus primers projectes de recerca independents. El que més m’atrau és l’avaluació i la interpretabilitat dels models, perquè crec que, abans de poder desplegar amb seguretat models molt capaços, necessitem proves fiables del que realment poden fer i de per què ho fan. Per això, com a <a href="https://www.effectivealtruism.org/what-is-effective-altruism">effective altruist</a>, vull treballar en mètodes robustos per mesurar-ne les capacitats i el comportament, per ajudar a garantir que el futur de la IA no desencadeni riscos existencials.`,
      `Durant l’últim any he treballat com a científic de dades en una petita consultora tecnològica, on he liderat la modelització de diversos projectes de machine learning. Actualment estic construint un sistema de previsió de la demanda per a una gran multinacional de l’alimentació, que prediu la demanda mensual de centenars de productes en diversos països. N’he estat responsable de principi a fi: des de les dades en brut del warehouse fins a conjunts de dades validats i versionats, passant per un marc de modelització i experimentació, fins a les previsions que el client rep ara cada mes. Bona part de la feina ha consistit a fer que els resultats siguin fiables: experiments reproduïbles, models de referència sòlids i previsions congelades abans de conèixer els resultats reals i comparades amb el sistema de planificació del mateix client.`,
      `Abans de començar la meva carrera professional, vaig estudiar el grau d’Enginyeria Industrial a la <a href="https://www.upc.edu/ca">Universitat Politècnica de Catalunya</a> (UPC) i un <a href="https://bse.eu/masters-degrees/data-science/data-science-methodology">màster en Ciència de Dades</a> a la Barcelona School of Economics (promoció del 2025), on vaig consolidar les meves bases en machine learning i on va començar el meu camí en la seguretat de la IA, gràcies a una assignatura d’ètica de la IA. Durant aquella etapa també vaig donar classes d’àlgebra i de Python bàsic a estudiants de grau de la UPC: preparava el material dels cursos i donava entre 3 i 6 hores de classe a la setmana.`,
      `També col·laboro amb <a href="https://esf-cat.org/qui-som/misio-visio-valors/">Enginyeria Sense Fronteres</a>, una organització local on formo part d’un equip que dona suport a comunitats rurals del Paraguai per a aconseguir sobirania alimentària i garantir l’accés a l’aigua. Entre altres accions, estem dissenyant manuals que ajuden les comunitats a construir els seus propis sistemes de captació i emmagatzematge d’aigua de pluja amb materials disponibles al seu entorn, i a gestionar-los de manera autònoma.`,
      `Fora de la feina, el que més m’agrada és estar a la natura, sovint als <a href="https://ca.wikipedia.org/wiki/Pirineus">Pirineus</a>. Gaudeixo de qualsevol esport de muntanya (excursionisme, escalada, alpinisme, esquí de muntanya, ciclisme). També m’encanta cuidar les meves plantes, tot i que clarament no seria capaç de guanyar-me la vida amb això. A banda de tot això, sempre estic obert a una bona conversa, així que si alguna cosa del que has llegit t’interessa, o vols parlar d’avaluacions, d’interpretabilitat o de muntanya, no dubtis en escriure’m.`,
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
