**Activar la cuenta opcional**

La aplicación funciona como invitado sin estas variables. El enlace para crear una cuenta aparece cuando se configura Supabase; no simula un login si falta el servicio.

1. Crear o elegir el proyecto Supabase. En SQL Editor, ejecutar una sola vez y en orden `supabase/migrations/001_library.sql` y luego `002_shared_decks.sql` en su editor SQL o mediante migraciones. La tabla aplica RLS por `auth.uid()`; `sync_library` usa los permisos del usuario y combina datos dentro de una transacción.
2. Crear o editar `.env.local` tomando `.env.example` como referencia y configurar `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` y el dominio en `NEXT_PUBLIC_SITE_URL`. La URL y la clave publishable se encuentran en Connect o Settings > API Keys. Usar la clave `sb_publishable_...`; la aplicación no necesita `service_role`, una clave secreta ni la contraseña de la base de datos.
3. Habilitar Email en Authentication. Configurar Site URL y permitir `http://localhost:3000/cuenta` y la URL `/cuenta` del dominio de producción como redirecciones. Mantener la plantilla Magic Link con el vínculo `{{ .ConfirmationURL }}`. El código actual usa enlace de acceso y no una pantalla de código OTP. El correo incluido de Supabase solo envía a direcciones de miembros del equipo y tiene límites bajos. Para probar con otros correos y para producción, configurar SMTP propio en Authentication: remitente, host, puerto, usuario y contraseña del proveedor.
4. Detener el servidor anterior y ejecutar `npm run dev` en el puerto 3000. Si se utiliza `npm run start`, recompilar antes con `npm run build`, ya que las variables NEXT_PUBLIC se incorporan al bundle. Probar el correo y el enlace de acceso real. La entrada no requiere contraseña.
5. Crear dos usuarios de prueba. Cada uno debe ver únicamente su propia fila: intentar select/update del UUID del otro mediante los clientes autenticados debe devolver cero filas o rechazar la escritura. Un cliente sin sesión no debe poder consultar la tabla ni ejecutar la función.
6. Con una cuenta, probar en dos navegadores: guardar/quitar, editar colección, desconectar, cambiar una carta, reconectar y sincronizar. Las eliminaciones tienen registros persistentes para no reaparecer con datos antiguos.

El invitado conserva una biblioteca separada. «Añadir mis cartas de invitado» combina bibliotecas sin borrar la fuente y puede repetirse. Cerrar sesión vuelve a la biblioteca del invitado. Cada cuenta tiene almacenamiento local por UUID. Exportar desde Mis cartas produce una copia del usuario activo. «Eliminar datos» crea una revisión de borrado que descarta datos anteriores, incluso al volver a conectar otro dispositivo; no elimina el correo de autenticación.

Resolución de conflictos: mayor revisión gana; el dispositivo resuelve empates. Cada edición local supera las revisiones conocidas. El reloj local decide entre cambios realmente concurrentes; un dispositivo con reloj muy desajustado puede ganar la comparación. El usuario puede exportar una copia antes de combinar. La cola local persiste y se envía al volver online, abrir la app, recuperar foco o pulsar sincronizar. El estado solo indica «Sincronizada» tras una respuesta correcta del servidor.

Estado comprobado el 14 de octubre de 2026: `.env.local` contiene la configuración y Next la carga; Supabase responde, Email está habilitado, las tablas privadas rechazan consultas anónimas y la función de lectura compartida responde para un token inexistente. `.env.local` y `.env.example` están ignorados por Git. No es necesario repetir las migraciones por esta revisión. Quedan por validar el acceso por correo y sus redirecciones, la sincronización en dos navegadores, el aislamiento con dos usuarios reales y la publicación/revocación de enlaces. La clave pública no permite inspeccionar la configuración privada de SMTP ni las URLs permitidas. La URL del sitio sigue siendo local; antes de publicar deben configurarse el dominio y las variables del hosting. No se ha desplegado desde esta sesión.

Fuentes: [acceso por correo](https://supabase.com/docs/guides/auth/auth-email-passwordless), [RLS](https://supabase.com/docs/guides/database/postgres/row-level-security).

Las colecciones compartidas son instantáneas publicadas de forma explícita. El receptor consulta únicamente esa selección mediante un token UUID. «Actualizar selección» reemplaza la instantánea; «Revocar enlace» elimina su acceso. Probar enlace anónimo, revocación y acceso de otro usuario a la tabla antes de activar en producción.


**Valores para la primera prueba local**

```dotenv
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://TU_PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_TU_CLAVE
```

En Authentication > URL Configuration: Site URL `http://localhost:3000`; Redirect URLs `http://localhost:3000/cuenta`. Usar ese mismo origen al abrir la aplicación. Para producción, establecer el dominio real y añadir su ruta exacta `/cuenta` como redirección permitida. Las variables también deberán configurarse en el hosting y generar una nueva versión.

Para continuar con Codex después de configurar: indicar que las dos migraciones terminaron correctamente y que `.env.local` está preparado. No hace falta compartir la contraseña de la base de datos ni credenciales SMTP en el chat. La prueba real por correo requiere que el usuario abra el enlace recibido en el navegador de la aplicación.

Documentación verificada: [claves](https://supabase.com/docs/guides/getting-started/api-keys), [redirecciones](https://supabase.com/docs/guides/auth/redirect-urls), [plantillas](https://supabase.com/docs/guides/auth/auth-email-templates), [SMTP](https://supabase.com/docs/guides/auth/auth-smtp).
