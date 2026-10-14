# Pregunton

Cartas para conversar, con mazos públicos en español, favoritos, colecciones personales y preguntas propias. El contenido público se renderiza en HTML; las funciones personales funcionan localmente sin una cuenta.

```sh
npm install
npm run dev
```

Comprobaciones:

```sh
npm run test
npm run validate:content
npm run lint
npm run typecheck
npm run build
npm run start
```

El modo sin conexión debe comprobarse con `build` y `start`. En un mazo, abrir «Más opciones» → «Guardar mazo sin conexión». Después usar «Mazos sin conexión» desde Mis cartas. Los recursos públicos se guardan mediante service worker; favoritos y colecciones se conservan en el dispositivo. El navegador puede retirar almacenamiento por falta de espacio: conviene exportar una copia de las cartas importantes.

Las preguntas tienen IDs explícitos: conservarlos al editar o reordenar contenido. Añadir IDs nuevos para preguntas nuevas. La biblioteca local tiene versión y conserva el antiguo `pregunton:favorites` como copia de recuperación.

La cuenta opcional usa Supabase. Sin configuración no aparece una invitación a entrar ni se simula sincronización. Preparar `.env.local` a partir de `.env.example` y seguir [la configuración de cuenta](docs/cuenta-y-sincronizacion.md). Ejecutar las dos migraciones incluidas antes de activar la integración. La aplicación usa la clave pública y políticas por usuario; no necesita service-role en el navegador.

Las colecciones son privadas. Compartir por enlace publica una selección explícita, actualizable y revocable. La configuración del servicio y las pruebas con cuentas reales deben completarse en el proyecto elegido antes de publicar.

[Plan y estado del trabajo](output/plan-trabajo-pregunton.md).
