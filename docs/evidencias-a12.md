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

## Seguridad de la evidencia
- [x] No se muestra MONGODB_URI.
- [x] No se muestra JWT_SECRET.
- [x] No se muestran contraseñas.
- [x] Los tokens están ocultos o truncados.

## Incidencias y solución
- Incidencia:
- Causa:
- Corrección:
- Nueva comprobación:
