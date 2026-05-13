export type QuestionIntensity =
  | "casual"
  | "fun"
  | "reflective"
  | "deep"
  | "romantic"
  | "spicy-soft"
  | "icebreaker";

export type Question = {
  id: string;
  text: string;
  category: string;
  deckId: string;
  intensity: QuestionIntensity;
  tags: string[];
  locale: "es" | "en";
  shareText?: string;
};

export type Deck = {
  id: string;
  title: string;
  description: string;
  category: string;
  tone: string;
  seoSlug: string;
  questions: Question[];
};

export type SeoPage = {
  slug: string;
  deckId: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  searchIntent: string;
  h1: string;
  intro: string;
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  h2: string;
  related: string[];
  faq?: Array<{ question: string; answer: string }>;
};

type DeckSeed = Omit<Deck, "questions"> & {
  intensity: QuestionIntensity;
  tags: string[];
  questions: string[];
};

const deckSeeds: DeckSeed[] = [
  {
    id: "charlar",
    title: "Preguntas para charlar",
    description: "Un mazo flexible para empezar conversaciones naturales sin quedarse en blanco.",
    category: "Charlar",
    tone: "cercano, curioso y fácil",
    seoSlug: "preguntas-para-charlar",
    intensity: "casual",
    tags: ["conversación", "inicio", "cotidiano"],
    questions: [
      "¿Qué tema podrías hablar durante horas sin cansarte?",
      "¿Qué pequeña cosa te alegró el día últimamente?",
      "¿Qué lugar de tu ciudad siempre recomiendas?",
      "¿Qué costumbre tuya dice mucho de cómo eres?",
      "¿Qué comida te lleva directo a un recuerdo?",
      "¿Qué plan simple nunca falla contigo?",
      "¿Qué cosa aprendiste tarde y ahora recomiendas?",
      "¿Qué momento cotidiano te parece subestimado?",
      "¿Qué conversación recuerdas con cariño?",
      "¿Qué canción pondrías para cambiar el ánimo de una tarde?",
      "¿Qué objeto llevas casi siempre contigo?",
      "¿Qué detalle te hace sentir bien recibido en un lugar?",
      "¿Qué idea cambió un poco tu forma de ver algo?",
      "¿Qué harías si tuvieras una tarde libre sin pendientes?",
      "¿Qué historia familiar te gusta escuchar una y otra vez?",
      "¿Qué habilidad te gustaría aprender por puro gusto?",
      "¿Qué cosa te da curiosidad de la gente?",
      "¿Qué recuerdo pequeño se te quedó grabado?",
      "¿Qué pregunta te gusta hacer para conocer a alguien?",
      "¿Qué plan improvisado terminó saliendo mejor de lo esperado?"
    ]
  },
  {
    id: "aburrido",
    title: "Preguntas para cuando estás aburrido",
    description: "Preguntas rápidas, random y divertidas para romper el silencio sin pensarlo demasiado.",
    category: "Aburrimiento",
    tone: "rápido, divertido y ligero",
    seoSlug: "preguntas-para-cuando-estas-aburrido",
    intensity: "fun",
    tags: ["random", "diversión", "rápido"],
    questions: [
      "¿Qué invento absurdo te gustaría que existiera?",
      "¿Qué harías si hoy todos hablaran en rimas?",
      "¿Qué objeto de tu casa tendría más chismes si hablara?",
      "¿Qué regla pondrías por un día en todo el mundo?",
      "¿Qué nombre le pondrías a una banda formada por tus amigos?",
      "¿Qué habilidad inútil te gustaría dominar?",
      "¿Qué comida sería más divertida si fuera gigante?",
      "¿Qué película cambiaría por completo si ocurriera en tu barrio?",
      "¿Qué animal sería el peor compañero de oficina?",
      "¿Qué harías si encontraras una puerta secreta en tu cuarto?",
      "¿Qué frase usarías como saludo oficial de tu casa?",
      "¿Qué cosa normal se vuelve rara si la miras demasiado?",
      "¿Qué premio inventarías para una tontería cotidiana?",
      "¿Qué combinación de sabores suena mal pero quizá funciona?",
      "¿Qué harías si te despertaras con una voz de narrador?",
      "¿Qué objeto llevarías a una competencia de cosas inútiles?",
      "¿Qué canción debería sonar cada vez que entras a un lugar?",
      "¿Qué harías si tuvieras que entretener a todos sin internet?",
      "¿Qué palabra común te parece graciosa sin razón?",
      "¿Qué plan random podría salvar una tarde aburrida?"
    ]
  },
  {
    id: "viajar",
    title: "Preguntas para viajar",
    description: "Para rutas, esperas, vuelos y escapadas con ganas de contar historias.",
    category: "Viajar",
    tone: "exploratorio, espontáneo y nostálgico",
    seoSlug: "preguntas-para-viajar",
    intensity: "reflective",
    tags: ["viaje", "recuerdos", "aventura"],
    questions: [
      "¿Qué lugar te sorprendió más de lo que esperabas?",
      "¿Qué viaje te gustaría repetir con más calma?",
      "¿Qué comida probarías aunque no sepas qué es?",
      "¿Qué recuerdo de viaje parece una escena de película?",
      "¿Qué ciudad te gustaría recorrer sin mapa?",
      "¿Qué objeto siempre debería ir en una maleta?",
      "¿Qué aprendiste de un lugar que visitaste?",
      "¿Qué paisaje te dejó más callado de lo normal?",
      "¿Qué viaje harías solo por la comida?",
      "¿Qué historia de viaje cuentas cada vez que puedes?",
      "¿Qué lugar cercano tienes pendiente conocer?",
      "¿Qué sonido te recuerda a estar de viaje?",
      "¿Qué harías en una escala larga sin plan?",
      "¿Qué tipo de viajero eres cuando algo sale mal?",
      "¿Qué souvenir sí guardarías toda la vida?",
      "¿Qué viaje te cambió el ritmo por unos días?",
      "¿Qué ruta improvisada salió mejor de lo esperado?",
      "¿Qué lugar te gustaría ver al amanecer?",
      "¿Qué persona sería gran compañera de viaje?",
      "¿Qué significa para ti volver a casa después de viajar?"
    ]
  },
  {
    id: "roadtrip",
    title: "Preguntas para roadtrip",
    description: "Preguntas para carretera, playlists largas y conversaciones entre paradas.",
    category: "Roadtrip",
    tone: "libre, curioso y de camino",
    seoSlug: "preguntas-para-roadtrip",
    intensity: "fun",
    tags: ["carretera", "viaje", "amigos"],
    questions: [
      "¿Qué canción no puede faltar en un viaje por carretera?",
      "¿Qué parada improvisada siempre vale la pena?",
      "¿Qué snack convierte cualquier ruta en un mejor plan?",
      "¿Qué paisaje te gustaría ver por la ventana ahora mismo?",
      "¿Qué historia contarías para mantener despierto al copiloto?",
      "¿Qué lugar elegirías si el destino se decidiera al azar?",
      "¿Qué señal de carretera te gustaría inventar?",
      "¿Qué harías si el viaje se alarga tres horas más?",
      "¿Qué recuerdo de carretera te da risa todavía?",
      "¿Qué regla pondrías para elegir música en el carro?",
      "¿Qué ciudad pequeña te gustaría descubrir sin buscar reseñas?",
      "¿Qué conversación pega mejor de noche en carretera?",
      "¿Qué llevarías en una maleta de emergencia divertida?",
      "¿Qué vista merece bajar la ventana?",
      "¿Qué harías si todos pudieran elegir una parada obligatoria?",
      "¿Qué ruta harías solo por decir que la hiciste?",
      "¿Qué palabra describe tu energía en los viajes largos?",
      "¿Qué personaje sería pésimo compañero de roadtrip?",
      "¿Qué momento hace que un viaje empiece de verdad?",
      "¿Qué historia inventarías sobre el próximo pueblo?"
    ]
  },
  {
    id: "amigos",
    title: "Preguntas para amigos",
    description: "Un mazo social para reírse, recordar y descubrir detalles nuevos entre amigos.",
    category: "Amigos",
    tone: "juguetón, casual y energético",
    seoSlug: "preguntas-para-amigos",
    intensity: "fun",
    tags: ["amigos", "grupo", "diversión"],
    questions: [
      "¿Qué anécdota nuestra merece contarse más seguido?",
      "¿Qué plan inventarías para este grupo con poco presupuesto?",
      "¿Qué amigo sería mejor guía turístico y por qué?",
      "¿Qué recuerdo juntos te da risa de inmediato?",
      "¿Qué tradición deberíamos empezar desde ahora?",
      "¿Qué canción representa mejor a este grupo?",
      "¿Qué habilidad secreta crees que tiene alguien aquí?",
      "¿Qué plan salió bien gracias a que nadie lo organizó demasiado?",
      "¿Qué comida pediríamos si todos tuviéramos que ponernos de acuerdo?",
      "¿Qué frase se volvió parte del grupo sin darnos cuenta?",
      "¿Qué lugar deberíamos visitar juntos al menos una vez?",
      "¿Qué amigo sería mejor en una misión absurda?",
      "¿Qué momento confirmó que esta amistad era buena idea?",
      "¿Qué haríamos si tuviéramos una tarde libre todos juntos?",
      "¿Qué película describe la energía de este grupo?",
      "¿Qué consejo de un amigo se te quedó dando vueltas?",
      "¿Qué foto del grupo cuenta una historia completa?",
      "¿Qué juego inventaríamos si nos quitaran los celulares?",
      "¿Qué cualidad admiras de tus amigos aunque no la digas mucho?",
      "¿Qué plan repetirías sin cambiar casi nada?"
    ]
  },
  {
    id: "parejas",
    title: "Preguntas para parejas",
    description: "Preguntas cálidas para conversar en pareja sin sentirse interrogados.",
    category: "Amor / Parejas",
    tone: "íntimo, suave y afectuoso",
    seoSlug: "preguntas-para-parejas",
    intensity: "romantic",
    tags: ["pareja", "amor", "cercanía"],
    questions: [
      "¿Qué momento nuestro te gusta recordar cuando necesitas calma?",
      "¿Qué detalle pequeño te hace sentir querido?",
      "¿Qué plan sencillo te gustaría repetir conmigo?",
      "¿Qué parte de nuestra rutina te da ternura?",
      "¿Qué recuerdo juntos te sorprendió por lo feliz que fue?",
      "¿Qué te gustaría que celebremos más seguido?",
      "¿Qué lugar se siente especial porque fuimos juntos?",
      "¿Qué gesto cotidiano vale mucho para ti?",
      "¿Qué sueño pequeño te gustaría compartir conmigo?",
      "¿Qué aprendiste de ti estando en esta relación?",
      "¿Qué momento de risa nuestro recuerdas primero?",
      "¿Qué canción podría guardar una parte de nuestra historia?",
      "¿Qué te gustaría que hagamos en una cita tranquila?",
      "¿Qué cosa mía te dio curiosidad al principio?",
      "¿Qué hábito bonito podríamos cuidar más?",
      "¿Qué conversación nuestra te hizo sentir más cerca?",
      "¿Qué foto nuestra te gusta aunque no sea perfecta?",
      "¿Qué aventura pequeña podríamos planear este mes?",
      "¿Qué parte de estar juntos se siente fácil?",
      "¿Qué palabra usarías para describir cómo quieres que se sienta nuestro próximo plan?"
    ]
  },
  {
    id: "primera-cita",
    title: "Preguntas para primera cita",
    description: "Preguntas para bajar la tensión, abrir curiosidad y evitar silencios raros.",
    category: "Citas",
    tone: "curioso, amable y sin presión",
    seoSlug: "preguntas-para-primera-cita",
    intensity: "icebreaker",
    tags: ["cita", "conocer", "romance"],
    questions: [
      "¿Qué plan simple te parece una buena primera cita?",
      "¿Qué lugar de la ciudad te gusta mostrarle a alguien nuevo?",
      "¿Qué comida dice bastante de tus gustos?",
      "¿Qué tema te da curiosidad cuando conoces a alguien?",
      "¿Qué haces cuando quieres tener un día tranquilo?",
      "¿Qué película o serie recomiendas sin pensarlo mucho?",
      "¿Qué detalle hace que una conversación fluya mejor?",
      "¿Qué tipo de música te acompaña últimamente?",
      "¿Qué viaje te gustaría hacer sin demasiada planeación?",
      "¿Qué cosa pequeña te parece atractiva en una persona?",
      "¿Qué actividad te saca rápido de la rutina?",
      "¿Qué lugar elegirías para hablar por horas?",
      "¿Qué habilidad te gustaría aprender por diversión?",
      "¿Qué recuerdo reciente te hizo sonreír?",
      "¿Qué plan nunca falla cuando quieres pasarla bien?",
      "¿Qué te da curiosidad de la forma en que otros viven?",
      "¿Qué sabor te recuerda a una época buena?",
      "¿Qué harías con un día libre inesperado?",
      "¿Qué conversación te hace sentir cómodo con alguien?",
      "¿Qué pregunta te gustaría que te hicieran más seguido?"
    ]
  },
  {
    id: "romper-hielo",
    title: "Preguntas para romper el hielo",
    description: "Ideas seguras y fáciles para iniciar conversación con gente nueva o grupos.",
    category: "Romper el hielo",
    tone: "seguro, amable y accesible",
    seoSlug: "preguntas-para-romper-el-hielo",
    intensity: "icebreaker",
    tags: ["icebreaker", "inicio", "grupo"],
    questions: [
      "¿Qué cosa simple suele ponerte de buen humor?",
      "¿Qué lugar recomendarías a alguien que llega por primera vez?",
      "¿Qué hobby te gustaría probar sin tomártelo muy en serio?",
      "¿Qué comida elegirías para una mesa compartida?",
      "¿Qué canción reconoces en los primeros segundos?",
      "¿Qué objeto cotidiano te parece muy útil?",
      "¿Qué plan tranquilo disfrutas más de lo que parece?",
      "¿Qué dato curioso aprendiste hace poco?",
      "¿Qué película podrías volver a ver sin problema?",
      "¿Qué tipo de clima te cambia el ánimo?",
      "¿Qué lugar te ayuda a despejar la cabeza?",
      "¿Qué bebida pedirías para empezar una buena charla?",
      "¿Qué cosa te gustaba de niño y todavía disfrutas?",
      "¿Qué app o herramienta te hace la vida más fácil?",
      "¿Qué tema ligero siempre abre conversación?",
      "¿Qué talento común te parece infravalorado?",
      "¿Qué plan harías si todos tuvieran solo una hora libre?",
      "¿Qué nombre le pondrías a una playlist para hoy?",
      "¿Qué pequeño lujo cotidiano disfrutas?",
      "¿Qué pregunta rompe el hielo sin poner a nadie incómodo?"
    ]
  },
  {
    id: "profundas",
    title: "Preguntas profundas",
    description: "Preguntas reflexivas para hablar de valores, recuerdos y cambios con calma.",
    category: "Introspección",
    tone: "calmo, respetuoso y reflexivo",
    seoSlug: "preguntas-profundas",
    intensity: "deep",
    tags: ["reflexión", "profundo", "valores"],
    questions: [
      "¿Qué experiencia te hizo cambiar una opinión importante?",
      "¿Qué versión de ti recuerdas con más ternura?",
      "¿Qué valor intentas cuidar incluso cuando cuesta?",
      "¿Qué decisión pequeña terminó cambiando mucho?",
      "¿Qué te ayuda a volver a ti cuando todo se acelera?",
      "¿Qué aprendizaje te gustaría no olvidar?",
      "¿Qué significa para ti vivir con calma?",
      "¿Qué miedo se volvió más pequeño con el tiempo?",
      "¿Qué conversación te dejó pensando varios días?",
      "¿Qué parte de tu vida estás aprendiendo a aceptar?",
      "¿Qué recuerdo te recuerda quién eres?",
      "¿Qué tipo de persona quieres ser en los días difíciles?",
      "¿Qué te ha enseñado una pérdida o una despedida?",
      "¿Qué sueño cambió de forma pero no desapareció?",
      "¿Qué cosa estás soltando poco a poco?",
      "¿Qué te hace sentir profundamente agradecido?",
      "¿Qué pregunta te acompaña en esta etapa de tu vida?",
      "¿Qué te gustaría entender mejor de ti?",
      "¿Qué acto de bondad recuerdas con claridad?",
      "¿Qué parte del futuro te da curiosidad en vez de miedo?"
    ]
  },
  {
    id: "random",
    title: "Preguntas random",
    description: "Un mazo impredecible para sacar conversación de la nada.",
    category: "Preguntas random",
    tone: "sorpresivo, rápido y juguetón",
    seoSlug: "preguntas-random",
    intensity: "fun",
    tags: ["aleatorio", "raro", "rápido"],
    questions: [
      "¿Qué objeto sería más dramático si tuviera diario personal?",
      "¿Qué color tendría tu semana si fuera un cartel?",
      "¿Qué celebridad sería buena vecina y por qué?",
      "¿Qué sonido debería tener un botón de buena suerte?",
      "¿Qué plato inventarías para un restaurante imaginario?",
      "¿Qué cosa cotidiana merece una ceremonia oficial?",
      "¿Qué superpoder pequeño usarías todos los días?",
      "¿Qué anuncio absurdo pondrías en una estación de tren?",
      "¿Qué palabra usarías para describir una siesta perfecta?",
      "¿Qué harías si tuvieras una hora invisible al día?",
      "¿Qué objeto llevarías a una isla solo para confundirte menos?",
      "¿Qué combinación de dos animales sería pésima mascota?",
      "¿Qué lugar normal sería increíble con música épica?",
      "¿Qué recuerdo parece inventado aunque sí pasó?",
      "¿Qué invento resolvería un problema muy específico tuyo?",
      "¿Qué harías si tu sombra pudiera darte consejos?",
      "¿Qué personaje ficticio organizaría una fiesta terrible?",
      "¿Qué frase pondrías en una taza que nadie compraría?",
      "¿Qué talento raro debería enseñarse en la escuela?",
      "¿Qué pregunta random te gustaría responder sin contexto?"
    ]
  }
];

function buildQuestions(seed: DeckSeed): Question[] {
  return seed.questions.map((text, index) => ({
    id: `${seed.id}-${String(index + 1).padStart(2, "0")}`,
    text,
    category: seed.category,
    deckId: seed.id,
    intensity: seed.intensity,
    tags: seed.tags,
    locale: "es",
    shareText: `${text} — Pregunton`
  }));
}

export const decks: Deck[] = deckSeeds.map((seed) => ({
  id: seed.id,
  title: seed.title,
  description: seed.description,
  category: seed.category,
  tone: seed.tone,
  seoSlug: seed.seoSlug,
  questions: buildQuestions(seed)
}));

export const seoPages: SeoPage[] = [
  {
    slug: "preguntas-para-charlar",
    deckId: "charlar",
    primaryKeyword: "preguntas para charlar",
    secondaryKeywords: ["preguntas para conversar", "preguntas interesantes", "preguntas para conocer a alguien"],
    searchIntent: "Encontrar preguntas generales para empezar o sostener una conversación natural.",
    h1: "Preguntas para charlar sin quedarte en blanco",
    intro: "Un mazo simple para abrir conversación con amigos, pareja, familia o alguien que recién estás conociendo.",
    title: "Preguntas para charlar: ideas para conversar sin quedarte en blanco",
    description: "Encuentra preguntas para charlar con amigos, pareja, familia o personas nuevas. Usa el modo cartas y empieza una conversación natural en segundos.",
    ogTitle: "Preguntas para charlar que sí se sienten naturales",
    ogDescription: "Elige una pregunta, léela en voz alta y deja que la conversación haga lo suyo.",
    h2: "Ideas para empezar una buena conversación",
    related: ["preguntas-para-amigos", "preguntas-para-romper-el-hielo", "preguntas-profundas"],
    faq: [
      {
        question: "¿Cómo usar estas preguntas para charlar?",
        answer: "Elige una pregunta que se sienta cómoda, léela en voz alta y deja espacio para que la otra persona responda con calma."
      },
      {
        question: "¿Sirven para hablar con gente nueva?",
        answer: "Sí. Empieza por preguntas casuales y pasa a las más reflexivas solo si la conversación ya se siente natural."
      }
    ]
  },
  {
    slug: "preguntas-para-cuando-estas-aburrido",
    deckId: "aburrido",
    primaryKeyword: "preguntas para cuando estás aburrido",
    secondaryKeywords: ["preguntas random", "preguntas divertidas", "preguntas para pasar el rato"],
    searchIntent: "Encontrar preguntas rápidas para entretenerse y abrir una charla ligera.",
    h1: "Preguntas para cuando estás aburrido",
    intro: "Preguntas rápidas, raras y fáciles para mover una tarde quieta sin complicarse.",
    title: "Preguntas para cuando estás aburrido: ideas random, divertidas y profundas",
    description: "Preguntas divertidas, random y profundas para cuando estás aburrido solo, con amigos, en pareja o durante un viaje.",
    ogTitle: "Preguntas para matar el aburrimiento",
    ogDescription: "Un mazo rápido para sacar una pregunta random y ver a dónde llega la charla.",
    h2: "Preguntas random para pasar el rato",
    related: ["preguntas-random", "preguntas-para-amigos", "preguntas-para-charlar"]
  },
  {
    slug: "preguntas-para-viajar",
    deckId: "viajar",
    primaryKeyword: "preguntas para viajar",
    secondaryKeywords: ["preguntas para viaje", "preguntas para conversar viajando", "preguntas para carretera"],
    searchIntent: "Encontrar preguntas para conversar durante viajes, esperas y escapadas.",
    h1: "Preguntas para viajar y conversar en el camino",
    intro: "Para cuando el paisaje cambia, la ruta se alarga o aparece una historia que vale la pena contar.",
    title: "Preguntas para viajar: ideas para conversar durante el viaje",
    description: "Preguntas para rutas, esperas, vuelos y escapadas: recuerdos, planes, historias y conversaciones espontáneas.",
    ogTitle: "Preguntas para viajar con mejores conversaciones",
    ogDescription: "Historias, recuerdos y planes para compartir mientras el camino avanza.",
    h2: "Preguntas para viajes, rutas y escapadas",
    related: ["preguntas-para-roadtrip", "preguntas-para-amigos", "preguntas-para-parejas"]
  },
  {
    slug: "preguntas-para-amigos",
    deckId: "amigos",
    primaryKeyword: "preguntas para amigos",
    secondaryKeywords: ["preguntas divertidas para amigos", "preguntas interesantes para amigos", "preguntas random para amigos"],
    searchIntent: "Encontrar preguntas divertidas y sociales para grupos de amigos.",
    h1: "Preguntas para amigos: divertidas, raras y buenas para charlar",
    intro: "Un mazo para reírse, recordar cosas juntos y descubrir detalles nuevos sin ponerse solemnes.",
    title: "Preguntas para amigos: ideas divertidas para conversar",
    description: "Una colección de preguntas para amigos que mezclan humor, recuerdos, historias y conversaciones inesperadas.",
    ogTitle: "Preguntas para amigos y conversaciones con más chispa",
    ogDescription: "Saca una pregunta para el grupo y deja que aparezcan las anécdotas.",
    h2: "Preguntas divertidas para amigos",
    related: ["preguntas-random", "preguntas-para-cuando-estas-aburrido", "preguntas-profundas"]
  },
  {
    slug: "preguntas-para-parejas",
    deckId: "parejas",
    primaryKeyword: "preguntas para parejas",
    secondaryKeywords: ["preguntas románticas", "preguntas para conocer mejor a tu pareja", "preguntas para pareja"],
    searchIntent: "Encontrar preguntas cálidas para conversar en pareja y conocerse mejor.",
    h1: "Preguntas para parejas para hablar con calma y cariño",
    intro: "Preguntas suaves para abrir momentos cercanos sin que la conversación se sienta como entrevista.",
    title: "Preguntas para parejas: íntimas, lindas y fáciles de responder",
    description: "Preguntas para conversar en pareja, conocerse mejor y abrir momentos cercanos sin sentirse interrogados.",
    ogTitle: "Preguntas para parejas con calma y cariño",
    ogDescription: "Un mazo íntimo, cálido y seguro para hablar de lo que acerca.",
    h2: "Preguntas lindas para conversar en pareja",
    related: ["preguntas-para-primera-cita", "preguntas-profundas", "preguntas-para-viajar"]
  },
  {
    slug: "preguntas-para-primera-cita",
    deckId: "primera-cita",
    primaryKeyword: "preguntas para una cita",
    secondaryKeywords: ["preguntas para primera cita", "preguntas para conocer a alguien", "preguntas para una cita romántica"],
    searchIntent: "Reducir silencios incómodos y ayudar a conocer a alguien en una cita.",
    h1: "Preguntas para una primera cita sin silencios incómodos",
    intro: "Ideas simples y curiosas para que una cita fluya sin presión.",
    title: "Preguntas para una cita: ideas naturales para conocerse",
    description: "Preguntas simples y curiosas para una cita, pensadas para conversar sin presión y conocerse mejor.",
    ogTitle: "Preguntas para una cita que no se sienten raras",
    ogDescription: "Para bajar la tensión, abrir curiosidad y dejar que la conversación respire.",
    h2: "Preguntas para conocerse en una cita",
    related: ["preguntas-para-parejas", "preguntas-para-romper-el-hielo", "preguntas-para-charlar"]
  },
  {
    slug: "preguntas-para-romper-el-hielo",
    deckId: "romper-hielo",
    primaryKeyword: "preguntas para romper el hielo",
    secondaryKeywords: ["icebreaker questions", "preguntas para conocer gente", "preguntas para iniciar conversación"],
    searchIntent: "Encontrar preguntas seguras para empezar una conversación con gente nueva.",
    h1: "Preguntas para romper el hielo sin hacerlo raro",
    intro: "Preguntas fáciles para abrir conversación cuando todavía nadie sabe muy bien qué decir.",
    title: "Preguntas para romper el hielo: fáciles y naturales",
    description: "Ideas para iniciar conversaciones con gente nueva, grupos o momentos donde nadie sabe muy bien qué decir.",
    ogTitle: "Preguntas para romper el hielo con naturalidad",
    ogDescription: "Mazos suaves para empezar sin incomodar a nadie.",
    h2: "Preguntas seguras para iniciar conversación",
    related: ["preguntas-para-charlar", "preguntas-para-primera-cita", "preguntas-para-amigos"]
  },
  {
    slug: "preguntas-profundas",
    deckId: "profundas",
    primaryKeyword: "preguntas profundas",
    secondaryKeywords: ["preguntas profundas para conversar", "preguntas reflexivas", "preguntas interesantes profundas"],
    searchIntent: "Encontrar preguntas reflexivas para conversaciones significativas y calmadas.",
    h1: "Preguntas profundas para conversar con calma",
    intro: "Preguntas para hablar de recuerdos, cambios y valores sin forzar vulnerabilidad.",
    title: "Preguntas profundas: ideas para conversaciones significativas",
    description: "Preguntas reflexivas para hablar de recuerdos, decisiones, valores y cosas que importan sin forzar vulnerabilidad.",
    ogTitle: "Preguntas profundas para conversar sin presión",
    ogDescription: "Un mazo calmado para abrir conversaciones que importan.",
    h2: "Preguntas reflexivas para hablar con calma",
    related: ["preguntas-para-parejas", "preguntas-para-amigos", "preguntas-para-charlar"]
  },
  {
    slug: "preguntas-random",
    deckId: "random",
    primaryKeyword: "preguntas random",
    secondaryKeywords: ["preguntas aleatorias", "preguntas raras", "preguntas divertidas random"],
    searchIntent: "Encontrar preguntas aleatorias para divertirse y abrir conversación de forma rápida.",
    h1: "Preguntas random para sacar una conversación de la nada",
    intro: "Un mazo impredecible para reírse, improvisar y dejar que aparezca una respuesta rara.",
    title: "Preguntas random: aleatorias, raras y divertidas",
    description: "Saca preguntas random para reírte, pasar el rato o empezar una charla cuando no sabes qué preguntar.",
    ogTitle: "Preguntas random para cualquier momento",
    ogDescription: "Una carta rápida, una pregunta rara y una conversación que no estaba planeada.",
    h2: "Preguntas aleatorias y divertidas",
    related: ["preguntas-para-cuando-estas-aburrido", "preguntas-para-amigos", "preguntas-para-charlar"]
  },
  {
    slug: "preguntas-para-roadtrip",
    deckId: "roadtrip",
    primaryKeyword: "preguntas para roadtrip",
    secondaryKeywords: ["road trip questions", "preguntas para carretera", "preguntas para viaje en carro"],
    searchIntent: "Encontrar preguntas para viajes largos en carro y conversaciones de carretera.",
    h1: "Preguntas para roadtrip y conversaciones de carretera",
    intro: "Para playlists largas, copilotos despiertos y paradas que no estaban en el mapa.",
    title: "Preguntas para roadtrip: ideas para hablar en el camino",
    description: "Preguntas para viajes en carro, rutas largas y conversaciones espontáneas mientras el paisaje cambia.",
    ogTitle: "Preguntas para roadtrip con mejores historias",
    ogDescription: "Un mazo para carretera, ventanas abiertas y conversaciones entre paradas.",
    h2: "Preguntas para viajes en carro",
    related: ["preguntas-para-viajar", "preguntas-para-amigos", "preguntas-para-parejas"]
  }
];

export function getDeckById(id: string) {
  return decks.find((deck) => deck.id === id);
}

export function getDeckBySlug(slug: string) {
  return decks.find((deck) => deck.seoSlug === slug);
}

export function getSeoPage(slug: string) {
  return seoPages.find((page) => page.slug === slug);
}

export function getSeoPageByDeckId(deckId: string) {
  return seoPages.find((page) => page.deckId === deckId);
}
