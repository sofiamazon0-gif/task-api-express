# Pruebas de modelado y persistencia

Completa los resultados después de ejecutar las solicitudes contra tu instancia
de MongoDB Atlas. No incluyas hosts, usuarios, URI, contraseñas ni capturas que
los muestren.

## Entorno

- Rama actual: `feature/mongodb-atlas` (confirma la rama antes de entregar).
- Base: `task_api`
- Colección: `tasks`
- Resultado de `pnpm check`:
- Resultado de `pnpm build`:

## Documento comprobado

- ID devuelto por la API:
- Campos observados en Atlas: `_id`, `title`, `description` (cuando se envía), `status`, `createdAt`, `updatedAt`.
- Resultado después de reiniciar la API:

## Casos ejecutados

| Tipo | Método y ruta | Datos | Esperado | Obtenido | requestId | Resultado |
|---|---|---|---|---|---|---|
| Persistencia | `POST /api/tasks` | Título y descripción válidos | 201; ID de texto y datos guardados | | | |
| Persistencia | `POST /api/tasks` | Solo título | 201; descripción omitida | | | |
| Persistencia | `GET /api/tasks` | No aplica | 200; lista de MongoDB | | | |
| Persistencia | `GET /api/tasks/:id` | ID devuelto por POST | 200; mismo recurso | | | |
| Persistencia | Reiniciar y repetir GET | ID creado | 200; tarea conservada | | | |
| Regresión | `PATCH /api/tasks/:id/complete` | ID creado | 200; estado `completed` y `updatedAt` actualizado | | | |
| Regresión | `DELETE /api/tasks/:id` | ID creado | 204 | | | |
| Regresión | `GET /api/tasks/:id` | ID eliminado | 404 `TASK_NOT_FOUND` | | | |
| Negativa | `GET /api/tasks/1` | No aplica | 400 `INVALID_ID` | | | |
| Negativa | `GET /api/tasks/507f1f77bcf86cd799439011` | ObjectId válido no almacenado | 404 `TASK_NOT_FOUND` | | | |
| Negativa | `POST /api/tasks` | Título vacío o de más de 120 caracteres | 422 `VALIDATION_ERROR` | | | |
| Negativa | `POST /api/tasks` | `description` no es texto o supera 300 caracteres | 422 `VALIDATION_ERROR`, campo `description` | | | |
| Negativa | `POST /api/tasks` | `Content-Type: text/plain` | 415 `UNSUPPORTED_MEDIA_TYPE` | | | |
| Infraestructura | Arranque con configuración de conexión inválida | Solo en entorno local | API no escucha; mensaje seguro | | No aplica | |

## Evidencias

Registra o adjunta evidencia local de:

1. `pnpm check` y `pnpm build` completados.
2. POST y documento visible en Atlas sin credenciales.
3. Consulta del mismo documento después de reiniciar la API.
4. Un error de formato, uno de validación y uno de negocio con su `requestId`.
5. Pruebas positivas y negativas del campo opcional `description`.
