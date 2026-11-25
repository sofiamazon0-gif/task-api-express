# Pruebas del CRUD persistente

Completa los resultados después de ejecutar la colección Postman contra Atlas.
No incluyas credenciales, URI, host completo ni capturas que los muestren.

## Entorno

- Rama: `feature/mongodb-atlas`
- Base: `task_api`
- Colección: `tasks`
- Resultado de `pnpm check`:
- Resultado de `pnpm build`:

## Recurso de prueba

- ID devuelto por POST:
- Título inicial:
- Título final:
- Estado final:
- Prioridad inicial y final:
- Persistencia después de reiniciar:

## Casos ejecutados

| Tipo | Método y ruta | Datos | Esperado | Obtenido | requestId | Resultado |
|---|---|---|---|---|---|---|
| Positiva | `POST /api/tasks` | Título válido | 201, estado `pending`, prioridad `medium` | | | |
| Positiva | `POST /api/tasks` | Prioridad `high` | 201, prioridad `high` | | | |
| Positiva | `GET /api/tasks` | No aplica | 200; incluye la tarea | | | |
| Positiva | `GET /api/tasks/:id` | ID creado | 200; mismo recurso | | | |
| Positiva | `PATCH /api/tasks/:id` | Solo `title` | 200; conserva `status` | | | |
| Positiva | `PATCH /api/tasks/:id` | Solo `status` | 200; conserva `title` | | | |
| Positiva | `PATCH /api/tasks/:id` | Solo `priority: low` | 200; actualiza prioridad | | | |
| Positiva | `PATCH /api/tasks/:id` | `title` y `status` | 200; actualiza campos enviados y `updatedAt` | | | |
| Regresión | `PATCH /api/tasks/:id/complete` | Sin cuerpo | 200; estado `completed` | | | |
| Regresión | `DELETE /api/tasks/:id` | ID creado | 204 sin cuerpo | | | |
| Regresión | `GET /api/tasks/:id` | ID eliminado | 404 `TASK_NOT_FOUND` | | | |
| Negativa | `PATCH /api/tasks/:id` | `{}` | 422 `VALIDATION_ERROR` | | | |
| Negativa | `PATCH /api/tasks/:id` | `status: archived` | 422 `VALIDATION_ERROR` | | | |
| Negativa | `PATCH /api/tasks/:id` | Título vacío o de más de 120 caracteres | 422 `VALIDATION_ERROR` | | | |
| Negativa | `PATCH /api/tasks/:id` | `owner: Ana` | 422; detalle identifica `owner` | | | |
| Negativa | `PATCH /api/tasks/:id` | Prioridad desconocida | 422; detalle identifica `priority` | | | |
| Negativa | `PATCH /api/tasks/507f1f77bcf86cd799439011` | ObjectId inexistente | 404 `TASK_NOT_FOUND` | | | |
| Negativa | `PATCH /api/tasks/:id` | JSON mal formado | 400 `INVALID_JSON` | | | |
| Negativa | `PATCH /api/tasks/:id` | Sin `application/json` | 415 `UNSUPPORTED_MEDIA_TYPE` | | | |
| Negativa | `PATCH /api/tasks/1` | ID numérico | 400 `INVALID_ID` | | | |

## Evidencias

1. `pnpm check` y `pnpm build` completados.
2. Documento en Atlas antes y después de la actualización parcial.
3. Respuesta 204 de DELETE sin cuerpo y documento ausente en Atlas.
4. Error de validación con `requestId`.
5. Consulta de la tarea actualizada después de reiniciar la API.
