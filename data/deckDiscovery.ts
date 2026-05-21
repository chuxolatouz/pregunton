export type DiscoveryModeId = "momentos" | "intensidad" | "mesa";
export type DiscoveryAccent = "coral" | "marigold" | "moss" | "sky" | "lavender" | "ink";

export type DiscoveryMode = {
  id: DiscoveryModeId;
  label: string;
  heading: string;
  description: string;
};

export type DiscoveryGroup = {
  id: string;
  title: string;
  description: string;
  deckIds: string[];
  accent: DiscoveryAccent;
  cta: string;
  slug?: string;
  intensityLevel?: number;
};

export const discoveryModes: DiscoveryMode[] = [
  {
    id: "momentos",
    label: "Momentos",
    heading: "¿Qué está pasando ahora?",
    description: "Elige por la escena real: sofá, mesa, viaje, cita, grupo o ganas de reírse."
  },
  {
    id: "intensidad",
    label: "Intensidad",
    heading: "¿Qué tono quieres?",
    description: "Busca una conversación ligera, divertida, curiosa, profunda, íntima o completamente random."
  },
  {
    id: "mesa",
    label: "Mesa",
    heading: "Tu mesa de mazos",
    description: "Explora la colección completa en pequeñas pilas de cartas, como si las tuvieras sobre la mesa."
  }
];

export const momentGroups: DiscoveryGroup[] = [
  {
    id: "aburrido",
    title: "Estoy aburrido",
    description: "Cartas rápidas para mover una tarde quieta, un chat dormido o una noche sin plan.",
    deckIds: ["random", "absurdas", "reirse", "whatsapp", "noche-aburrida", "aburrido"],
    accent: "marigold",
    cta: "Sacar carta de este momento"
  },
  {
    id: "amigos",
    title: "Estoy con amigos",
    description: "Para historias, bromas internas, sobremesa y esa confianza que aparece en grupo.",
    deckIds: ["amigos", "mejores-amigos", "cena", "incomodas-sanas", "reirse"],
    accent: "lavender",
    cta: "Sacar carta de este momento"
  },
  {
    id: "pareja",
    title: "Estoy con mi pareja",
    description: "Preguntas cálidas para acercarse, recordar, planear y conversar sin sentirse interrogados.",
    deckIds: ["parejas", "reconectar", "primera-cita", "viaje-pareja", "profundas"],
    accent: "coral",
    cta: "Sacar carta de este momento"
  },
  {
    id: "viajando",
    title: "Estoy viajando",
    description: "Para carretera, esperas, playa, montaña y conversaciones que nacen mirando alrededor.",
    deckIds: ["viajar", "roadtrip", "playa", "montana", "viaje-amigos", "viaje-pareja"],
    accent: "sky",
    cta: "Sacar carta de este momento"
  },
  {
    id: "hielo",
    title: "Quiero romper el hielo",
    description: "Entradas seguras para gente nueva, primeras citas o grupos donde nadie sabe cómo empezar.",
    deckIds: ["romper-hielo", "conocer-alguien", "primera-cita", "casuales"],
    accent: "moss",
    cta: "Sacar carta de este momento"
  },
  {
    id: "profundo",
    title: "Quiero algo profundo",
    description: "Preguntas para bajar el ruido y hablar de recuerdos, valores, cambios e ideas importantes.",
    deckIds: ["profundas", "filosoficas", "journaling", "conocerte-ti-mismo", "reconectar"],
    accent: "ink",
    cta: "Sacar carta de este momento"
  },
  {
    id: "reirme",
    title: "Quiero reírme",
    description: "Mazos para anécdotas, ocurrencias y respuestas raras que alivian cualquier silencio.",
    deckIds: ["reirse", "absurdas", "random", "amigos"],
    accent: "marigold",
    cta: "Sacar carta de este momento"
  },
  {
    id: "random",
    title: "Quiero una carta random",
    description: "Cuando no quieres elegir: mezclamos cartas ligeras, raras, sociales y rápidas.",
    deckIds: ["random", "absurdas", "reirse", "charlar", "aburrido", "whatsapp"],
    accent: "coral",
    cta: "Sacar carta de este momento"
  }
];

export const toneGroups: DiscoveryGroup[] = [
  {
    id: "ligero",
    title: "Ligero",
    description: "Para abrir conversación sin presión, con preguntas fáciles de responder en voz alta.",
    deckIds: ["charlar", "romper-hielo", "conocer-alguien", "casuales"],
    accent: "moss",
    intensityLevel: 1,
    cta: "Sacar carta de este tono"
  },
  {
    id: "divertido",
    title: "Divertido",
    description: "Para reírse, improvisar y sacar historias que no necesitan ponerse profundas.",
    deckIds: ["reirse", "absurdas", "random", "aburrido"],
    accent: "marigold",
    intensityLevel: 2,
    cta: "Sacar carta de este tono"
  },
  {
    id: "curioso",
    title: "Curioso",
    description: "Para descubrir gustos, recuerdos y formas de ver el mundo sin sonar a entrevista.",
    deckIds: ["primera-cita", "conocer-alguien", "amigos", "viajar"],
    accent: "sky",
    intensityLevel: 3,
    cta: "Sacar carta de este tono"
  },
  {
    id: "profundo",
    title: "Profundo",
    description: "Para pensar con calma sobre identidad, valores, decisiones y etapas de vida.",
    deckIds: ["profundas", "filosoficas", "journaling", "conocerte-ti-mismo"],
    accent: "ink",
    intensityLevel: 4,
    cta: "Sacar carta de este tono"
  },
  {
    id: "intimo",
    title: "Íntimo",
    description: "Para vínculos cercanos: pareja, mejores amigos o alguien con quien ya hay confianza.",
    deckIds: ["parejas", "reconectar", "primera-cita", "mejores-amigos", "36-preguntas-enamorarse"],
    accent: "coral",
    intensityLevel: 5,
    cta: "Sacar carta de este tono"
  },
  {
    id: "picante-suave",
    title: "Picante suave",
    description: "Un toque coqueto o directo, sin presión ni preguntas incómodas de más.",
    deckIds: ["crush", "parejas", "primera-cita", "incomodas-sanas"],
    accent: "coral",
    intensityLevel: 4,
    cta: "Sacar carta de este tono"
  },
  {
    id: "random",
    title: "Random",
    description: "Para cuando la mejor dirección es no tener dirección.",
    deckIds: ["random", "absurdas", "whatsapp", "aburrido"],
    accent: "lavender",
    intensityLevel: 2,
    cta: "Sacar carta de este tono"
  }
];

export const deckCategoryGroups: DiscoveryGroup[] = [
  {
    id: "para-empezar",
    title: "Para empezar",
    description: "Mazos seguros para iniciar una charla sin hacerla rara.",
    deckIds: ["charlar", "romper-hielo", "conocer-alguien", "casuales", "primera-cita", "crush"],
    accent: "moss",
    cta: "Sacar carta de esta categoría",
    slug: "para-empezar"
  },
  {
    id: "para-reirse",
    title: "Para reírse",
    description: "Preguntas raras, rápidas y sociales para soltar la risa.",
    deckIds: ["random", "absurdas", "reirse", "aburrido", "whatsapp", "noche-aburrida"],
    accent: "marigold",
    cta: "Sacar carta de esta categoría",
    slug: "para-reirse"
  },
  {
    id: "para-conectar",
    title: "Para conectar",
    description: "Cartas para vínculos cercanos, conversaciones honestas y memoria compartida.",
    deckIds: ["profundas", "parejas", "reconectar", "mejores-amigos", "incomodas-sanas", "36-preguntas-enamorarse"],
    accent: "coral",
    cta: "Sacar carta de esta categoría",
    slug: "para-conectar"
  },
  {
    id: "para-viajar",
    title: "Para viajar",
    description: "Preguntas para carretera, playa, montaña y escapadas con buena conversación.",
    deckIds: ["viajar", "roadtrip", "playa", "montana", "viaje-pareja", "viaje-amigos"],
    accent: "sky",
    cta: "Sacar carta de esta categoría",
    slug: "para-viajar"
  },
  {
    id: "para-grupos",
    title: "Para grupos",
    description: "Mazos para amigos, familia, cenas, fiestas y equipos sin dinámicas incómodas.",
    deckIds: ["amigos", "cena", "familia", "hermanos", "fiestas", "team-building", "companeros-trabajo"],
    accent: "lavender",
    cta: "Sacar carta de esta categoría",
    slug: "para-grupos"
  },
  {
    id: "para-ti",
    title: "Para ti",
    description: "Preguntas para escribir, pensar, cerrar el día o tomar una decisión con más claridad.",
    deckIds: ["journaling", "conocerte-ti-mismo", "filosoficas", "antes-dormir", "tomar-decisiones"],
    accent: "ink",
    cta: "Sacar carta de esta categoría",
    slug: "para-ti"
  }
];
