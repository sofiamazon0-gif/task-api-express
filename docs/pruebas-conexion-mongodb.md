# Pruebas de conexión con MongoDB Atlas

Esta evidencia corresponde a EC2 F1 A1, antes de migrar las tareas desde
memoria. Para los resultados actuales de persistencia y para las rutas con
ObjectId, consulta [pruebas-persistencia-mongodb.md](./pruebas-persistencia-mongodb.md).

Completa los campos de resultado después de ejecutar las pruebas en tu entorno.
No pegues la URI, la contraseña, capturas que las muestren ni los detalles
originales de un error de conexión.

## Entorno verificado

- Rama: `feature/mongodb-atlas` (o la rama indicada por el docente)
- Comando de tipos: `pnpm check`
- Comando de compilación: `pnpm build`
- Resultado de arranque: conexión establecida sin mostrar credenciales
- `git check-ignore .env`: completar
- `git ls-files .env`: no debe mostrar archivos

## Casos ejecutados

| Tipo | Método y ruta | Datos | Esperado | Obtenido | requestId | Resultado |
|---|---|---|---|---|---|---|
| Positiva | GET `/health` | No aplica | 200, `status: ok` | | | |
| Positiva | GET `/health/database` | No aplica | 200, `database.status: connected` | | | |
| Regresión | GET `/api/tasks` | No aplica | 200 | | | |
| Regresión | POST `/api/tasks` | Título válido | 201 | | | |
| Regresión | GET `/api/tasks/:id` | ID devuelto por POST | 200, misma tarea | | | |
| Regresión | PATCH `/api/tasks/:id/complete` | ID creado | 200, estado `completed` | | | |
| Regresión | DELETE `/api/tasks/:id` | ID creado | 204 | | | |
| Regresión | GET `/api/tasks/:id` | ID eliminado | 404, `TASK_NOT_FOUND` | | | |
| Negativa | GET `/api/tasks/abc` | No aplica | 400, `INVALID_ID` | | | |
| Negativa | GET `/api/tasks/999` | No aplica | 404, `TASK_NOT_FOUND` | | | |
| Negativa | POST `/api/tasks` | Texto sin formato JSON | 415, `UNSUPPORTED_MEDIA_TYPE` | | | |
| Negativa | POST `/api/tasks` | `{"title":""}` | 422, `VALIDATION_ERROR` | | | |
| Negativa | GET `/ruta-inexistente` | No aplica | 404, `ROUTE_NOT_FOUND` | | | |
| Infraestructura | Reiniciar con URI temporalmente inválida | Solo en entorno local y restaurar inmediatamente | La API no escucha; mensaje seguro | | No aplica | |
| Cierre | Ctrl+C o SIGTERM | No aplica | HTTP y MongoDB se cierran sin error no controlado | | No aplica | |

## Evidencias

1. Captura del despliegue disponible, sin usuarios ni credenciales.
2. Captura de GET `/health/database`.
3. Capturas de una prueba correcta, una validación y una regla del negocio.
4. Evidencia de `pnpm check` y `pnpm build`.
5. Resultado de `git check-ignore .env` y confirmación de que `git ls-files .env` no imprime nada.
