**Plan de trabajo para mejorar Pregunton**

Fecha: 13 de octubre de 2026.

Referencia: [revisión del proyecto](./revision-pregunton.md).

Objetivo: hacer más fácil descubrir, usar y conservar preguntas; mantener la identidad de cartas de papel; añadir una cuenta opcional que permita sincronizar favoritos, colecciones y progreso.

Este documento registra el plan y su ejecución. Las casillas pendientes identifican validaciones o dependencias que todavía faltan. No se han realizado despliegues ni contratado servicios.


**Estado de ejecución — 14 de octubre de 2026**

Fases 0–5 implementadas y verificadas en el entorno local. Se conservaron los 1.086 IDs; se editaron 105 preguntas en 35 mazos, manteniendo intacta la adaptación atribuida de las 36 preguntas. Hay intensidad y etiquetas opcionales por pregunta; se mantienen los modos de descubrimiento por tono sin introducir un filtro que afirme una clasificación más precisa que los datos.

La fase 6 ya tiene un proyecto Supabase configurado en `.env.local`, además del código, modelo, migraciones con RLS, interfaz de acceso por correo y combinación de bibliotecas. La revisión del 14 de octubre confirmó que el servicio responde, Email está habilitado, las tablas privadas rechazan al cliente anónimo y `read_shared_deck` responde sin datos para un token inexistente. El 13 de octubre también se comprobó que `sync_library` rechaza al cliente anónimo. Esto no demuestra aún el aislamiento entre dos usuarios autenticados. P6.1 queda completada; P6.3, P6.4, P6.7 y P6.9 siguen pendientes de sus recorridos reales. No se ha confirmado en esta revisión la entrega del correo, el retorno del enlace, la configuración SMTP ni las URLs permitidas del dashboard.

La fase 7 pasó nuevamente build, lint, TypeScript, validación de contenido y las 14 pruebas el 14 de octubre, con Supabase configurado. La revisión de navegador del 13 de octubre incluyó axe en cinco pantallas a dos tamaños, sin infracciones en las reglas WCAG A/AA ejecutadas; también teclado, Escape con retorno de foco, movimiento reducido y texto ampliado al 200%. P7.2 sigue pendiente únicamente para recorridos de cuenta/sincronización/compartido público. P7.3 queda pendiente para una prueba manual con lector de pantalla; no se afirma una certificación completa de accesibilidad.

La extensión de la fase 8 permite escribir preguntas propias y abrirlas en colecciones locales. La publicación explícita, actualización, lectura anónima y revocación están implementadas con una segunda migración. Sus pruebas reales requieren Supabase y no se han marcado completadas. Las colecciones permanecen privadas hasta activar un enlace; los cambios locales no actualizan una selección pública automáticamente.

Se comprobó sin conexión, sobre un build de producción: navegación desde una URL de mazo, apertura de la carta solicitada, siguiente, favoritos y colección. La última ejecución terminó sin errores de consola. La selección offline usa fragmentos locales para evitar solicitudes de datos de Next; los enlaces públicos mantienen `?q=`. Se verificaron exportación PNG, exportación JSON e importación repetida sin duplicados. La URL OG por mazo respondió con PNG y la página SEO mantuvo 30 enlaces exactos y preguntas en HTML.

Comparación local de producción como invitado, con contextos nuevos de navegador: inicio/biblioteca pasaron de 167.266 a 172.816 bytes de JavaScript transferidos (+5.550; aproximadamente 3,3%); cartas, de 164.649 a 167.019 bytes (+2.370; aproximadamente 1,4%), con 8 solicitudes JS frente a 9. Son medidas de laboratorio con la cuenta sin configurar; no representan redes móviles ni el coste de descargar el SDK al activar Supabase.

No se ha realizado un despliegue desde esta sesión. La configuración actual usa `localhost`: antes de publicar hay que establecer el dominio final, sus redirecciones y las variables del hosting, configurar envío de correo para usuarios externos y generar un nuevo build. El bloque de implementación sigue sin commit; `.env.local` y `.env.example` están ignorados y no están versionados. Configuración y comprobaciones: [cuenta y sincronización](../docs/cuenta-y-sincronizacion.md).

**Forma de ejecución**

- Ejecutar una fase a la vez y entregar cambios revisables al terminarla.
- Revisar el estado actual antes de empezar: algunos hallazgos pueden haber sido resueltos desde la auditoría.
- Mantener el acceso como invitado y las preguntas públicas en HTML.
- Reutilizar componentes y datos del proyecto; añadir dependencias solo cuando la función las necesite.
- Para cambios importantes de UI, seguir visual-identity-director, cognitive-load-reducer, ui-component-craftsperson e interaction-polish-specialist. Cerrar con screenshot-design-reviewer y ux-polish-reviewer. Aplicar ux-page-builder, seo-content-architect y question-content-curator donde corresponda.
- Una tarea se marca completada solo con evidencia de sus criterios de aceptación. Si queda una dependencia externa, registrar exactamente qué falta.
- Al cerrar cada fase: actualizar este documento, describir cambios y comprobaciones, y anotar limitaciones.

**Secuencia y dependencias**

| Fase | Resultado | Dependencias |
| --- | --- | --- |
| 0 | Base actual comprobada e identificadores estables | Ninguna |
| 1 | Guardar, abrir y compartir sin perder la carta | 0 |
| 2 | Pantallas más claras y consistentes | 1 |
| 3 | Continuidad, búsqueda y colecciones locales | 0–2 |
| 4 | Contenido más variado y SEO mejor conectado | 0–2 |
| 5 | Mazos seleccionados disponibles sin conexión | 3 |
| 6 | Cuenta opcional y sincronización | 3 y 5 |
| 7 | Revisión integrada y preparación de entrega | 1–6 |
| 8 | Mazos propios y colecciones compartibles | Extensión posterior; requiere 6 y 7 |

Las fases 4 y 5 pueden intercambiarse si cambia la prioridad del producto. Los IDs estables de la fase 0 son obligatorios antes de editar contenido o migrar guardados. Se puede entregar valor al terminar cada fase sin esperar al login.

**Fase 0 — Preparar la base**

- [x] P0.1. Revisar instrucciones, rama, cambios existentes, rutas y funciones nuevas. Confirmar el estado de «Descargar imagen» y no duplicar trabajo ya realizado.
- [x] P0.2. Ejecutar lint, typecheck, validación de contenido y build. Registrar problemas previos por separado.
- [x] P0.3. Registrar capturas y comportamiento de inicio, biblioteca, carta, guardadas y una página SEO a 360 × 640, 390 × 844 y 1440 × 900.
- [x] P0.4. Mantener como IDs explícitos los identificadores actuales de preguntas. Hoy se generan por posición: reordenar preguntas puede hacer que un favorito o un enlace apunte a otro texto. Conservar todos los IDs existentes y asignar nuevos únicamente a contenido nuevo.
- [x] P0.5. Definir un formato versionado para favoritos, progreso y futuras colecciones, con migración desde `pregunton:favorites`. Centralizar lectura, escritura y notificaciones en una utilidad común.

Aceptación: comprobaciones iniciales registradas; IDs únicos y estables al reordenar o insertar contenido; favoritos antiguos conservados; almacenamiento ausente o inválido tratado sin romper la pantalla ni declarar un guardado exitoso que no ocurrió.

**Fase 1 — Corregir los recorridos principales**

- [x] P1.1. Crear un constructor común de enlaces a `/mazo/[slug]?q=[id]`.
- [x] P1.2. Usarlo para compartir desde el mazo y desde guardadas. El ID se toma de la carta visible, aunque se haya abierto otra mediante URL.
- [x] P1.3. Cambiar «Abrir mazo» de guardadas a «Abrir carta» y llevar a la pregunta exacta.
- [x] P1.4. Distinguir «Copiar pregunta» de compartir: copiar conserva el texto; compartir sin API nativa copia texto y enlace.
- [x] P1.5. Añadir mensajes accesibles de éxito y error, y «Deshacer» al quitar una guardada. La cancelación voluntaria de compartir no se presenta como error.
- [x] P1.6. Tratar fallos de localStorage y portapapeles. Mantener la región de feedback estable al cambiar de pregunta.

Aceptación: guardar la carta 2, abrirla y compartirla lleva a la carta 2; avanzar a la 3 cambia el enlace compartido; funciona con compartir nativo y con alternativa de copia; recargar conserva favoritos; quitar y deshacer restaura la misma carta. Verificar ID inexistente con una recuperación predecible.

Archivos principales: `QuestionDeckClient`, `SavedCardsClient`, `ShareButton`, `QuestionCard` y utilidades nuevas de enlaces/almacenamiento.

**Fase 2 — Pulir estética, estructura e interacción**

- [x] P2.1. Ajustar tokens de sombra, contraste, bordes y espaciado. Conservar crema, tinta oscura, Fraunces y acentos por contexto; reservar el relieve más fuerte para cartas reales.
- [x] P2.2. Compactar `/mazos`: una cabecera breve, modos y opciones de mazos. Eliminar introducciones redundantes.
- [x] P2.3. En inicio, mostrar «Elige el momento» antes de «Cómo funciona» y simplificar la explicación a una secuencia editorial.
- [x] P2.4. En cartas, destacar «Otra pregunta», guardar y compartir; ofrecer anterior, mezclar, copiar y descargar mediante «Más opciones» accesible. Conservar acceso sencillo a anterior sin depender de deslizar.
- [x] P2.5. Reemplazar «+N en Mesa» por una acción que revele los mazos restantes dentro del mismo contexto.
- [x] P2.6. Unificar microcopy, sustituir «mood» por «ánimo» y reducir etiquetas en mayúsculas que repiten títulos.
- [x] P2.7. Restringir el gesto a la carta, distinguir desplazamiento horizontal y vertical, y anunciar cambios de pregunta para tecnologías de asistencia.
- [x] P2.8. Compactar introducciones de páginas SEO y acercar las preguntas; conservar encabezados y contenido útil.

Aceptación: en 360 × 640, `/mazos` muestra al menos una opción accionable de mazo al cargar; el modo cartas muestra la pregunta y su acción principal sin solapamientos; textos largos caben sin truncamiento; el menú permite teclado, Escape y retorno de foco; blancos táctiles cómodos; contraste medido, foco visible y movimiento reducido. Revisar también ampliación de texto y desplazamiento normal.

**Fase 3 — Añadir utilidad personal sin cuenta**

- [x] P3.1. Recordar última carta e historial por mazo. Un ID explícito en la URL tiene prioridad sobre el progreso recordado.
- [x] P3.2. Barajar sin repetición durante una sesión, con historial para volver atrás y acción «Mezclar de nuevo» al completar el mazo. Definir comportamiento para mazos de una sola carta.
- [x] P3.3. Añadir búsqueda por nombre, categoría y contexto. Ignorar diferencias de mayúsculas y acentos; ofrecer limpiar búsqueda y un estado sin resultados.
- [x] P3.4. Crear, renombrar y eliminar colecciones locales; añadir y quitar cartas; permitir que una carta pertenezca a varias colecciones sin duplicarse dentro de cada una.
- [x] P3.5. Abrir una colección como mazo reutilizando la experiencia de cartas. Manejar colecciones vacías y referencias a preguntas retiradas.
- [x] P3.6. Mostrar «Guardadas en este dispositivo» y ofrecer exportar/importar una copia versionada. Validar los archivos antes de combinarlos.

Aceptación: recargar retoma el mazo; un enlace compartido sigue abriendo su carta exacta; una sesión barajada recorre cada carta una vez antes de reiniciar; búsqueda encuentra «parejas» y variantes sin acentos; colecciones sobreviven a recargas; importar dos veces la misma copia no crea duplicados ni borra elementos existentes.

**Fase 4 — Mejorar contenido y SEO**

- [x] P4.1. Revisar primero una muestra de mazos de amigos, parejas, viajes y profundidad. Introducir variedad de formulación sin convertir las cartas en instrucciones largas.
- [x] P4.2. Extender la revisión al catálogo por lotes, conservando IDs. Evitar reemplazos automáticos de todas las aperturas «¿Qué…?».
- [x] P4.3. Permitir intensidad y etiquetas por pregunta donde haya diferencias reales. Mantener las vistas de tono actuales y posponer filtros por carta hasta contar con datos revisados.
- [x] P4.4. Añadir «Abrir esta carta» a preguntas de las listas SEO, con enlace exacto.
- [x] P4.5. Revisar títulos, descripciones, canonical, Open Graph, enlaces internos y schema de las páginas públicas. Crear imágenes por mazo reutilizando la identidad existente.
- [x] P4.6. Aplicar `noindex` a guardadas y futuras superficies personales. Mantenerlas fuera del sitemap; el control de indexación no sustituye al control de acceso de cuentas.

Aceptación: preguntas breves, naturales al leerlas y adecuadas a su contexto; datos y referencias válidos; listas disponibles en HTML sin JavaScript; schema coincide con lo visible; enlaces internos y canonical correctos; la edición de texto no cambia qué carta abre un favorito anterior.

**Fase 5 — Preparar uso sin conexión**

- [x] P5.1. Diseñar una estrategia de service worker, recursos y almacenamiento para los mazos elegidos, considerando el comportamiento real de las rutas de Next.js. Probar la navegación en producción local.
- [x] P5.2. Añadir «Disponible sin conexión», progreso de descarga, confirmación y opción para retirar un mazo descargado.
- [x] P5.3. Asegurar lectura de preguntas, cambio de carta, favoritos y colecciones sin red. Encolar únicamente las operaciones que necesitarán sincronización cuando exista una cuenta.
- [x] P5.4. Versionar recursos y datos; tratar descargas incompletas, falta de espacio y actualizaciones. No anunciar disponibilidad hasta completar los recursos necesarios.
- [x] P5.5. Revisar manifest, iconos y apertura instalada. Evitar cachear respuestas privadas compartidas entre usuarios.

Aceptación: descargar un mazo con red, cerrar la aplicación, desactivar conexión y volver a abrirlo permite usar sus cartas; cambios locales persisten; mazos no descargados muestran una explicación útil; la actualización de una versión no elimina favoritos ni colecciones.

**Fase 6 — Implementar cuenta opcional y sincronización**

Esta fase requiere decisiones de infraestructura antes de conectar servicios: proveedor de autenticación y datos, proyecto destino, envío de correo, dominio y URLs de retorno. Se resolverán al comenzar esta fase, con una propuesta concreta. No se contratarán servicios ni se publicarán cambios como parte de este plan.

- [x] P6.1. Confirmar un proveedor y acceso por correo con código o enlace. Supabase y acceso mediante enlace están seleccionados y configurados; las dependencias están documentadas. La entrega y el retorno del correo se validan en P6.4; SMTP para usuarios externos sigue siendo una preparación de producción.
- [x] P6.2. Definir datos mínimos: usuario, favoritos, colecciones, miembros de colección y progreso. Usar IDs estables, revisiones y marcas de eliminación cuando sean necesarias.
- [ ] P6.3. Implementar reglas de acceso para que cada usuario lea y modifique solo sus datos privados. Verificarlas con dos usuarios distintos.
- [ ] P6.4. Añadir «Guarda tus cartas también en otros dispositivos» desde guardadas; resolver envío, verificación, expiración, error y cierre de sesión sin interrumpir el uso como invitado.
- [x] P6.5. Migrar datos de invitado de forma idempotente: combinar por ID, conservar contenido y evitar duplicados. Definir qué datos quedan locales después de sincronizar.
- [x] P6.6. Definir conflictos: las operaciones pendientes de guardar/quitar se reconcilian con revisiones; las eliminaciones no reaparecen al reconectar; ediciones concurrentes de colecciones tienen una política explícita y recuperable. Registrar fecha de actualización para el progreso.
- [ ] P6.7. Reintentar sincronización al recuperar red sin bloquear la carta. Mostrar «En este dispositivo», «Sincronizando», «Sincronizada» o error recuperable.
- [x] P6.8. Separar datos locales de invitado y de cada cuenta. Al cerrar sesión o cambiar de usuario, impedir que aparezcan datos privados de otra cuenta.
- [ ] P6.9. Añadir opciones de exportar y eliminar los datos de cuenta, y explicar de forma breve qué se almacena. Diseñar la recuperación cuando falle una operación.

Aceptación: el invitado sigue usando la aplicación; iniciar sesión conserva sus cartas; dos dispositivos sincronizan favoritos y colecciones; quitar una carta offline no la resucita después; repetir la importación de invitado no duplica datos; cambiar de cuenta no muestra la colección anterior; un usuario no puede consultar ni alterar los datos de otro mediante solicitudes directas.

**Fase 7 — Revisar y preparar entrega**

- [x] P7.1. Ejecutar lint, typecheck, validación de contenido y build sobre el estado final.
- [ ] P7.2. Verificar recorridos completos de descubrimiento, carta, guardado, colección, compartido, descarga, offline, login y sincronización. Usar pruebas automatizadas para lógica de IDs, migración, barajado y conflictos; comprobaciones reales para las interfaces de navegador y móvil.
- [ ] P7.3. Revisar pantallas móviles y escritorio, teclado, lector de pantalla, contraste, ampliación de texto, estados vacíos y errores.
- [x] P7.4. Confirmar que el contenido SEO sigue presente sin JavaScript y que páginas privadas no aparecen en sitemap ni entregan datos a otra sesión.
- [x] P7.5. Comparar carga, tamaño de recursos y fluidez con la base de la fase 0. Cargar exportación de imágenes y funciones secundarias solo cuando se necesiten.
- [x] P7.6. Preparar un resumen de cambios, pendientes y una versión revisable. Publicar únicamente si el usuario solicita un despliegue.

Aceptación: ningún defecto importante pendiente en los recorridos incluidos; sin pérdida de datos en migraciones; evidencia de revisión móvil y escritorio; limitaciones externas claramente documentadas.

**Fase 8 — Extensión posterior: mazos propios y compartibles**

- [x] P8.1. Permitir escribir preguntas propias con límites de longitud y vista previa de carta.
- [ ] P8.2. Crear una selección compartible, privada hasta que el usuario active el enlace.
- [ ] P8.3. Definir enlace de solo lectura, revocación y comportamiento al editar la selección. No incluir favoritos o colecciones privadas por accidente.
- [ ] P8.4. Permitir abrirla como mazo y guardarla, manteniendo la experiencia pública sin registro obligatorio.

Aceptación: solo la selección activada es accesible mediante el enlace; revocarlo corta ese acceso; el receptor usa el mazo sin cuenta. Esta extensión no bloquea las entregas anteriores.

**Siguiente bloque pendiente**

1. P6.4: comprobar recepción del correo, retorno a `/cuenta`, recarga con sesión, error/expiración y cierre de sesión. La configuración privada de redirecciones y SMTP no puede confirmarse con la clave pública.
2. P6.7/P7.2: con la misma cuenta en dos navegadores, comprobar favoritos, colecciones, progreso, importación de invitado repetida y cambios offline que se sincronizan al reconectar, incluidas eliminaciones.
3. P6.3/P6.9: con dos cuentas distintas, comprobar lectura/escritura directa sobre el UUID ajeno, cambio de cuenta sin mezcla de datos, exportación y borrado sin recuperar datos antiguos desde otro navegador.
4. P8.2–P8.4: activar una colección compartida, abrirla sin sesión, guardarla, actualizar su selección y revocar el enlace; comprobar que solo expone las preguntas publicadas.
5. P7.3: realizar la revisión manual con lector de pantalla. Las comprobaciones automáticas y de teclado anteriores ya están registradas.
6. Antes de publicar: configurar correo para usuarios externos, dominio, redirecciones y variables del hosting; generar el build con esos valores. Guardar el bloque revisado en un commit. El despliegue requiere una solicitud del usuario.

No es necesario repetir la configuración del proyecto ni las migraciones por el texto antiguo de este plan. La implementación local queda disponible; los puntos anteriores distinguen pruebas pendientes de preparación de publicación.
