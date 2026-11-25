# Lista de liberación 1.0.0

## Calidad local
- [x] `pnpm install --frozen-lockfile` termina correctamente.
- [x] `pnpm verify` termina sin errores.
- [ ] La API y el cliente funcionan en desarrollo.

## Producción
- [x] Los nombres de servicios en `render.yaml` fueron personalizados.
- [x] Las variables sensibles se registraron en Render y no en Git.
- [x] Atlas permite los rangos de salida de Render Oregon, no `0.0.0.0/0`.
- [x] `PUBLIC_API_URL`, `VITE_API_URL` y `CORS_ORIGIN` coinciden por HTTPS.
- [x] `/health/database` informa MongoDB conectado.
- [x] Swagger usa la URL pública.
- [x] El frontend y los endpoints públicos de comprobación devuelven HTTP 200.

## Aceptación
- [ ] Registro e inicio de sesión funcionan en el sitio publicado.
- [ ] Un usuario puede consultar, crear, buscar, editar y completar tareas.
- [ ] Un usuario normal no puede eliminar tareas.
- [ ] Un administrador puede eliminar tareas.
- [x] Ausencia de token produce `401` en `/api/tasks` y `/api/auth/me`.
- [ ] Un token inválido produce `401`.
- [x] Un origen no permitido no recibe CORS (preflight verificado).
- [ ] Registro e inicio de sesión verificados con una cuenta de prueba.
- [ ] CRUD, búsqueda, filtros y paginación verificados desde el frontend.
- [ ] Usuario normal no puede eliminar y administrador sí puede.
- [ ] `pnpm smoke:release` termina correctamente con credenciales de prueba.

## Liberación
- [ ] Las evidencias están redactadas sin secretos.
- [ ] `CHANGELOG.md` describe la versión.
- [x] El commit desplegado está publicado en la rama `ec3-a12-despliegue-liberacion`.
- [ ] La rama está integrada en `main`.
- [ ] La etiqueta `v1.0.0` fue creada y enviada después de la aceptación final.
