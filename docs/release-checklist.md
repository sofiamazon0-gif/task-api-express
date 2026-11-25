# Lista de liberación 1.0.0

## Calidad local
- [x] `pnpm install --frozen-lockfile` termina correctamente.
- [x] `pnpm verify` termina sin errores.
- [ ] La API y el cliente funcionan en desarrollo.

## Producción
- [ ] Los nombres de servicios en `render.yaml` fueron personalizados.
- [ ] Las variables sensibles se registraron en Render y no en Git.
- [ ] Atlas autoriza únicamente las direcciones de salida necesarias.
- [ ] `PUBLIC_API_URL`, `VITE_API_URL` y `CORS_ORIGIN` coinciden por HTTPS.
- [ ] `/health/database` informa estado `up`.
- [ ] Swagger usa la URL pública.

## Aceptación
- [ ] Registro e inicio de sesión funcionan en el sitio publicado.
- [ ] Un usuario puede consultar, crear, buscar, editar y completar tareas.
- [ ] Un usuario normal no puede eliminar tareas.
- [ ] Un administrador puede eliminar tareas.
- [ ] Ausencia o token inválido producen `401`.
- [ ] Un origen no permitido no recibe CORS.
- [ ] `pnpm smoke:release` termina correctamente.

## Liberación
- [ ] Las evidencias están redactadas sin secretos.
- [ ] `CHANGELOG.md` describe la versión.
- [ ] El commit final está en GitHub.
- [ ] La etiqueta `v1.0.0` fue enviada.
