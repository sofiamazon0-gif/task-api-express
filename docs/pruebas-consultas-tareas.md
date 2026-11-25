# Pruebas de consultas de tareas

Completa los resultados con solicitudes ejecutadas contra tu instancia Atlas.
No incluyas URI, credenciales ni el host completo.

## Entorno

- Rama actual: `feature/mongodb-atlas`
- Base: `task_api`
- Colección: `tasks`
- Resultado de `pnpm check`:
- Resultado de `pnpm build`:

## Datos preparados

Prepara un conjunto de tareas con títulos variados y estados `pending` y
`completed`. No borres documentos de otras personas para ajustar los totales.

- Total consultado:
- Total `pending`:
- Total `completed`:

## Casos ejecutados

| Tipo | Método y ruta | Esperado | Obtenido | requestId | Resultado |
|---|---|---:|---|---|---|
| Positiva | `GET /api/tasks` | 200, `data` y `meta` | | | |
| Positiva | `GET /api/tasks?page=1&limit=2` | 200, máximo dos elementos | | | |
| Positiva | `GET /api/tasks?page=2&limit=2` | 200, página distinta | | | |
| Positiva | `GET /api/tasks?status=completed` | 200, solo tareas completadas | | | |
| Positiva | `GET /api/tasks?search=api` | 200, coincidencias parciales | | | |
| Positiva | `GET /api/tasks?sortBy=title&order=asc` | 200, orden alfabético | | | |
| Positiva | `GET /api/tasks?status=pending&search=entrega&page=1&limit=2&sortBy=title&order=asc` | 200, consulta combinada | | | |
| Positiva | `GET /api/tasks?createdFrom=2026-01-01&createdTo=2026-12-31` | 200, fechas dentro del rango | | | |
| Positiva | `GET /api/tasks?createdFrom=2026-01-01&status=pending&search=api&page=1&limit=2&sortBy=title&order=asc` | 200, filtros combinados con fechas | | | |
| Positiva | `GET /api/tasks?page=100&limit=2` | 200, `data` vacío y `meta` coherente si excede el total | | | |
| Negativa | `GET /api/tasks?page=0` | 422 `QUERY_VALIDATION_ERROR` | | | |
| Negativa | `GET /api/tasks?page=abc` | 422 `QUERY_VALIDATION_ERROR` | | | |
| Negativa | `GET /api/tasks?page=1&page=2` | 422, parámetro repetido | | | |
| Negativa | `GET /api/tasks?limit=51` | 422 `QUERY_VALIDATION_ERROR` | | | |
| Negativa | `GET /api/tasks?status=archived` | 422 `QUERY_VALIDATION_ERROR` | | | |
| Negativa | `GET /api/tasks?search=` | 422 `QUERY_VALIDATION_ERROR` | | | |
| Negativa | `GET /api/tasks?search=<61 caracteres>` | 422 `QUERY_VALIDATION_ERROR` | | | |
| Negativa | `GET /api/tasks?sortBy=priority` | 422 `QUERY_VALIDATION_ERROR` | | | |
| Negativa | `GET /api/tasks?order=sideways` | 422 `QUERY_VALIDATION_ERROR` | | | |
| Negativa | `GET /api/tasks?owner=ana` | 422, detalle identifica `owner` | | | |
| Negativa | `GET /api/tasks?createdFrom=no-es-fecha` | 422, detalle identifica fecha | | | |
| Negativa | `GET /api/tasks?createdFrom=2026-12-31&createdTo=2026-01-01` | 422, rango invertido | | | |
| Regresión | CRUD de A7, incluida ruta `/complete` | 201, 200, 200, 200 y 204 | | | |

## Evidencias

1. Compilación correcta con `pnpm check` y `pnpm build`.
2. Dos páginas sin documentos repetidos.
3. Búsqueda literal de caracteres especiales y búsqueda combinada con estado.
4. Orden ascendente y descendente.
5. Error 422 con `details` y `requestId`.
6. Regresión del CRUD persistente.
7. Consulta del mismo recurso después de reiniciar la API.
