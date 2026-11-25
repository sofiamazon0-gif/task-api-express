# Lista de liberación 1.0.0

## Calidad local
- [x] `pnpm install --frozen-lockfile` termina correctamente.
- [x] `pnpm verify` termina sin errores.
- [x] La API y el cliente funcionan en desarrollo; `/health` y el cliente Vite devuelven HTTP 200.

## Producción
- [x] Los nombres de servicios en `render.yaml` fueron personalizados.
- [x] Las variables sensibles se registraron en Render y no en Git.
- [x] Atlas permite los rangos de salida de Render Oregon, no `0.0.0.0/0`.
- [x] `PUBLIC_API_URL`, `VITE_API_URL` y `CORS_ORIGIN` coinciden por HTTPS.
- [x] `/health/database` informa MongoDB conectado.
- [x] Swagger usa la URL pública.
- [x] El frontend y los endpoints públicos de comprobación devuelven HTTP 200.
- [x] La API y el cliente usan el origen HTTPS configurado.

## Aceptación
- [x] Registro e inicio de sesión funcionan contra la API publicada.
- [x] Un usuario puede consultar, crear, buscar, editar y completar tareas.
- [x] Un usuario normal no puede eliminar tareas.
- [x] Un administrador puede eliminar tareas.
- [x] Ausencia de token produce `401` en `/api/tasks` y `/api/auth/me`.
- [x] Un token inválido produce `401`.
- [x] Un origen no permitido no recibe CORS (preflight verificado).
- [x] Registro e inicio de sesión verificados con una cuenta temporal de prueba.
- [x] CRUD, búsqueda, filtros y paginación verificados contra la API publicada.
- [x] Usuario normal recibe `403` al intentar eliminar.
- [x] `pnpm smoke:release` se ejecutó literalmente contra producción con credenciales temporales.
- [x] Confirmar eliminación `204` en producción con cuenta temporal de administrador.

## Liberación
- [x] Las evidencias están redactadas sin secretos.
- [x] `CHANGELOG.md` describe la versión.
- [x] El commit desplegado está publicado en la rama `ec3-a12-despliegue-liberacion`.
- [x] La rama está integrada en `main` mediante fast-forward.
- [x] La etiqueta `v1.0.0` se crea sobre el mismo commit confirmado como Live en Render.
