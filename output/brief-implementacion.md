**Dirección de implementación**

Conservar papel crema, tinta oscura y Fraunces; sombras discretas en controles y relieve en cartas. Tonos cálidos, afectuosos o exploratorios según el mazo. Fondo menos presente, radios y espaciado compartidos. Movimiento corto, opcional y respetuoso de movimiento reducido. Evitar paneles de administración, contenedores flotantes repetidos y nuevos adornos.

Inicio: propósito y sacar una carta, luego momentos y explicación breve. Biblioteca: elegir un mazo, cabecera corta, búsqueda y modos, primera opción visible en móvil. Carta: lectura y otra pregunta, guardar/compartir como secundarias; copiar, descargar y mezclar bajo divulgación progresiva. Guardadas: abrir carta y organizar colecciones; copia de datos y cuenta bajo secciones secundarias. SEO: listas de preguntas en HTML, enlaces exactos, metadata y FAQ visible.

Reutilizar Paper, QuestionCard, FavoriteButton, ShareButton, DownloadQuestionButton y DeckThemeIcon. Refactorizar QuestionDeckClient/SavedCardsClient alrededor de almacenamiento común. Crear acciones accesibles con details/summary, biblioteca versionada, colecciones, cuenta y controles offline. Formularios semánticos con etiquetas, mensajes persistentes, estados vacíos/error/pendiente y acciones de recuperación. Preguntas sin truncar, acciones táctiles mínimas de 44px, foco visible, Escape y teclado. La página de cuenta será opcional y noindex.

Archivos: lib/library*, lib/questionLinks*, lib/deckSession*, data/decks*, components/QuestionDeckClient, SavedCardsClient, DeckDiscovery, QuestionCard, app/page, mazos, mis-cartas, rutas de colección/cuenta/offline, public/sw.js y esquema Supabase. Capturas y comprobaciones al terminar; primero identidad y datos, después interacción, utilidad, contenido y conectividad.
