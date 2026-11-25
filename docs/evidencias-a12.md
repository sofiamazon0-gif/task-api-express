# Evidencias EC3 F3 A12

## Identificación
- Nombre:
- Grupo:
- Repositorio:
- Commit desplegado: `e47e5df` (rama `ec3-a12-despliegue-liberacion`)
- Etiqueta: v1.0.0
- URL del frontend: https://task-api-express-sofiamazon0-client.onrender.com
- URL pública de la API: https://task-api-express-sofiamazon0-api.onrender.com

## Calidad local
- Resultado de `pnpm install --frozen-lockfile`: aprobado
- Resultado de `pnpm verify`: aprobado en entorno local
- Pruebas backend: aprobadas
- Pruebas cliente: 3 aprobadas
- Builds backend y cliente: aprobados

## Despliegue
- Estado de `/health`: HTTP 200, `up`, producción
- Estado de `/health/database`: HTTP 200, `connected`
- OpenAPI usa la URL pública: HTTP 200, URL correcta
- Frontend publicado: HTTP 200
- CORS desde el frontend: preflight HTTP 204, origen correcto
- Rutas protegidas sin token: `/api/tasks` y `/api/auth/me` devuelven HTTP 401
- Atlas Network Access: rangos Render Oregon activos (`74.220.48.0/24`, `74.220.56.0/24`)

## Aceptación ejecutada
- Registro, inicio de sesión, consulta de identidad y credenciales incorrectas: aprobados
- Token inválido y falta de token: HTTP 401
- Crear, consultar, buscar, actualizar y completar una tarea: aprobado
- Paginación y filtro por estado: aprobados
- Eliminación con rol `user`: HTTP 403
- `pnpm smoke:release`: aprobado con cuenta temporal de prueba
- Se dejó una cuenta temporal y una tarea completada en Atlas; no se guardaron sus credenciales en el repositorio ni en esta evidencia

## Seguridad de la evidencia
- [x] No se muestra MONGODB_URI.
- [x] No se muestra JWT_SECRET.
- [x] No se muestran contraseñas.
- [x] Los tokens están ocultos o truncados.

## Incidencias y solución
- Incidencia: Render no iniciaba y el smoke test rechazaba una base de datos conectada.
- Causa: Atlas no permitía las IP de salida de Render; además, el smoke test esperaba `up` en `/health/database` cuando el contrato correcto es `connected`.
- Corrección: se autorizaron en Atlas los dos rangos de salida de Render en Oregon y se alineó la comprobación del smoke test con el contrato real.
- Nueva comprobación: deploy Live, ambos endpoints de salud y smoke test correctos.
