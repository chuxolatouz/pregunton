**Revisión y propuesta para Pregunton — 13 de octubre de 2026**

Pregunton tiene una identidad reconocible y una base adecuada para su propósito. Recomiendo iterar sobre el diseño actual y resolver primero los recorridos de descubrimiento, guardado y compartido. Una cuenta opcional aportaría valor cuando permita conservar y sincronizar una colección personal.

Dictamen: aprobación parcial. La estética está bien encaminada; los enlaces a cartas y el descubrimiento móvil necesitan mejoras antes de considerar la experiencia pulida.

**Alcance y evidencia**

Se revisaron código, datos locales y pantallas de inicio, biblioteca, modos Momentos/Intensidad/Mesa, cartas, guardadas y una página SEO. Se capturaron pantallas a 1440 × 900, 390 × 844 y 360 × 640. Se comprobó el recorrido siguiente → guardar → Mis cartas → abrir mazo y la carga directa de una pregunta mediante `?q=random-02`.

Los comandos `lint`, `typecheck` y `validate:content` pasaron durante la revisión. La validación de datos identifica 36 mazos. El inventario contiene 1.086 preguntas y 20 páginas SEO. No se ejecutó un build de producción ni una auditoría completa con lector de pantalla. La ventana de compartir del sistema y la descarga de imágenes no se probaron de extremo a extremo. Durante la revisión aparecieron cambios concurrentes que incorporan «Descargar imagen»; se tuvieron en cuenta en las últimas capturas.

La revisión siguió las skills screenshot-design-reviewer, ux-polish-reviewer, playwright, vercel:verification, seo-content-architect y question-content-curator. No se implementaron las propuestas.

**Lo que funciona**

- El papel cálido, Fraunces y los símbolos de mazos construyen una identidad propia. La carta es reconocible y legible.
- El inicio permite empezar con una acción clara: «Sacar una carta».
- El modo cartas elimina la navegación general y conserva pregunta, navegación y guardado.
- Guardar funciona y persiste al navegar. La carga directa con `?q=` también funciona.
- Los controles tienen nombres accesibles, los favoritos usan `aria-pressed`, hay foco visible y reglas para movimiento reducido.
- La página de parejas entrega preguntas en el HTML del servidor. Se comprobaron canonical y etiquetas Open Graph en esa respuesta. Los componentes incluyen listas, enlaces relacionados y FAQ visible con schema correspondiente.

**Hallazgos importantes**

1. Abrir una guardada pierde la pregunta seleccionada. Se guardó `random-02`, pero «Abrir mazo» mostró `random-01`. El enlace de [SavedCardsClient.tsx](/Users/MacBook/Develop/Pregunton/components/SavedCardsClient.tsx:172) debe incluir `?q=${question.id}`. Cambiar el texto a «Abrir carta» describiría mejor el resultado.
2. Compartir no construye el enlace de la pregunta actual. [QuestionDeckClient.tsx](/Users/MacBook/Develop/Pregunton/components/QuestionDeckClient.tsx:168) usa `window.location.href`, que no cambia al avanzar; incluso puede conservar el ID de una pregunta anterior. Las guardadas comparten solo la URL del mazo. Propuesta: una función común que genere `/mazo/[slug]?q=[id]`, utilizada en ambas superficies. Si no hay compartir nativo, copiar pregunta y enlace, con confirmación accesible.
3. La biblioteca posterga demasiado el contenido en móvil. A 360 × 640, la primera pantalla muestra título, explicación, otro título y pestañas; ningún mazo. Reducir la cabecera a «Elige un mazo», una línea de contexto y los modos. Mantener la información SEO útil en el HTML sin repetir introducciones.
4. La carta tiene muchas acciones juntas. Seis iconos, descarga y pistas compiten cerca del pulgar. Propuesta: «Otra pregunta» como acción amplia, corazón y compartir visibles; anterior, mezclar, copiar y descargar dentro de «Más opciones». Mantener alternativas accesibles a los gestos y probar textos largos en móviles pequeños.
5. En guardadas, copiar y quitar carecen de confirmación equivalente a la del mazo. Añadir una región de estado persistente y «Deshacer» tras quitar. Capturar errores de escritura en localStorage: actualmente la escritura puede fallar sin ofrecer una recuperación útil.

**Pulido estético**

- Conservar fondo crema, tinta oscura y acentos por contexto. Bajar el contraste de la cuadrícula y la cantidad de sombras en botones, etiquetas y contenedores; reservar el relieve más fuerte para las cartas.
- Evitar que todas las secciones parezcan objetos flotantes. «Cómo funciona» puede ser una secuencia editorial sin tres superficies de papel independientes. En SEO, compactar «Cómo usar este mazo» y acercar la lista de preguntas al comienzo.
- En el inicio, ubicar «Elige el momento» antes de «Cómo funciona». La explicación puede ocupar una sola línea después del primer uso.
- Sustituir «mood» por «ánimo» en la carta del inicio. Unificar «Sacar carta», «Sacar una carta» y «Sacar pregunta» según la acción; reducir etiquetas en mayúsculas donde repiten el encabezado.
- Aumentar contraste de textos secundarios pequeños. Revisar especialmente estilos `text-ink/42` y `text-ink/48`; la inspección visual no constituye una certificación de contraste.
- Mantener Momento/Intensidad/Mesa, pero facilitar el acceso a mazos ocultos en móvil. El texto «+3 en Mesa» debería convertirse en «Ver los 6 mazos», que revele opciones sin obligar a cambiar de contexto.

**Funcionalidades propuestas, en orden**

| Prioridad | Función | Comportamiento y valor |
| --- | --- | --- |
| 1 | Enlaces exactos y feedback | Guardar, abrir, copiar y compartir mantienen la misma carta y confirman el resultado. |
| 1 | Continuar y mezclar sin repetir | Recordar la última carta por mazo. Barajar una secuencia completa, permitir volver atrás y ofrecer «Mezclar de nuevo» al agotarla. |
| 2 | Búsqueda de mazos | Buscar por nombre o contexto entre los 36 mazos. Mostrar todos antes de filtrar y un estado vacío útil. |
| 2 | Colecciones personales | Organizar cartas en «Para el viaje», «Para una cena» o «Con mi pareja» y abrir la colección como mazo. Empezar con almacenamiento local. |
| 2 | Uso sin conexión | Guardar mazos elegidos para trayectos o lugares sin cobertura. Existe manifest, pero no se encontró una implementación de service worker. |
| 3 | Cuenta opcional | Sincronizar favoritos, colecciones y progreso entre dispositivos. |
| 4 | Mazo propio compartible | Añadir preguntas personales y compartir una selección. Para un enlace persistente hará falta almacenamiento en servidor. |

Para el modo sin conexión, un service worker y una estrategia de caché permiten servir recursos previamente guardados; el manifest por sí solo no resuelve ese recorrido. [Documentación de MDN](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers).

**Login con una razón clara**

Recomiendo introducirlo desde «Mis cartas» con el beneficio explícito: «Guarda tus cartas también en otros dispositivos». El usuario puede seguir sacando, guardando y compartiendo cartas como invitado.

El flujo sería: guardar localmente → elegir sincronizar → entrar con correo → combinar cartas locales con las de la cuenta → regresar a la misma colección. La combinación debe conservar ambas listas sin duplicar ni borrar cartas por defecto. Mostrar si una colección está «En este dispositivo», «Sincronizada» o pendiente de sincronización.

Para una primera implementación, acceso por código de correo o enlace es una opción sencilla para el usuario. Supabase Auth soporta ambos métodos; es un candidato para evaluar junto al almacenamiento de colecciones, no una dependencia instalada en esta revisión. [Documentación oficial](https://supabase.com/docs/guides/auth/auth-email-passwordless).

Esto amplía la arquitectura actual: habrá autenticación, persistencia en servidor y sincronización. El modelo inicial puede limitarse a usuarios, favoritos, colecciones, cartas de colección y progreso por mazo. Las colecciones serían privadas por defecto; compartirlas sería una acción explícita. La interfaz de cuenta puede ser una hoja pequeña con correo, estado de sincronización y cierre de sesión.

**Contenido, SEO y accesibilidad**

1.083 de las 1.086 preguntas empiezan con «¿Qué…?». Son mayormente abiertas y cortas, pero el patrón casi único reduce la variedad. Probar formatos como «Cuéntame una ocasión en la que…», «Si pudiéramos…» o «¿Cómo sería…», revisando tono e intensidad por carta. Actualmente intensidad y etiquetas se heredan del mazo entero: un filtro real por pregunta requiere datos más precisos.

Mantener las listas SEO renderizadas en servidor. Añadir «Abrir esta carta» a cada pregunta puede conectar descubrimiento y experiencia usando el enlace exacto. Crear imágenes Open Graph por mazo daría una identidad más específica a los enlaces compartidos. Para `mis-cartas` y futuras páginas privadas de cuenta, recomendar `noindex`; ahora `/mis-cartas` es indexable y el servidor muestra la misma colección vacía para cualquier visitante.

Usar una región viva para anunciar la pregunta al cambiar, además de la región de feedback existente. Revisar el gesto de deslizar: actualmente compara solo el desplazamiento horizontal y escucha toda la sección; conviene restringirlo a la carta y comprobar que el movimiento horizontal domina al vertical.

**Secuencia recomendada**

Primera entrega: enlaces exactos, feedback consistente, biblioteca compacta y jerarquía de controles. Segunda: continuar, barajado sin repetición, búsqueda y colecciones locales. Tercera: cuenta opcional y sincronización. El resultado esperado es una experiencia más fácil de usar y una razón concreta para volver y crear una cuenta.

Capturas: [inicio móvil](/Users/MacBook/Develop/Pregunton/output/playwright/review-home-mobile.png), [biblioteca móvil](/Users/MacBook/Develop/Pregunton/output/playwright/review-discovery-mobile.png), [carta en móvil pequeño](/Users/MacBook/Develop/Pregunton/output/playwright/review-long-question-mobile.png), [biblioteca escritorio](/Users/MacBook/Develop/Pregunton/output/playwright/review-table-desktop.png), [SEO móvil](/Users/MacBook/Develop/Pregunton/output/playwright/review-seo-mobile.png).
