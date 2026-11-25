# Evidencias EC3 F1 A9

Completa este documento con resultados obtenidos en tu entorno. No incluyas
contraseñas, hashes, tokens completos, URI ni secretos.

## Datos generales

- Nombre:
- Grupo:
- Repositorio y rama:
- Commit final:

## Entorno verificado

- `node --version`:
- `pnpm --version`:
- `pnpm check`: aprobado / no aprobado
- `pnpm build`: aprobado / no aprobado
- `GET /health/database`: código y estado (pendiente de ejecutar contra Atlas)

## Registro

- Solicitud utilizada, con contraseña reemplazada por `<OCULTA>`:
- Código HTTP:
- Respuesta sin datos sensibles:
- Confirmación de que no aparece `passwordHash`:
- Confirmación de que `confirmPassword` no se persiste:

## Inicio de sesión

- Solicitud, con contraseña reemplazada por `<OCULTA>`:
- Código HTTP:
- Campos recibidos; reemplaza el token por `<TOKEN_OCULTO>`:
- Claims observados sin copiar el token:

## Pruebas negativas

| Caso | Código esperado | Código obtenido | `error.code` | Resultado |
|---|---:|---:|---|---|
| Correo repetido | 409 | | | |
| Contraseña corta | 422 | | | |
| Confirmación diferente | 422 | | | |
| Campo `role` | 422 | | | |
| Credenciales incorrectas | 401 | | | |
| Content-Type incorrecto | 415 | | | |
| JSON inválido | 400 | | | |

## Regresión de tareas

- Crear:
- Listar con paginación y filtros, sin token:
- Actualizar:
- Completar:
- Eliminar:

## Seguridad observada

- ¿La colección guarda `password` o solo `passwordHash`?
- ¿Alguna respuesta expone `passwordHash`, URI, secreto o stack trace?
- ¿El cliente puede asignarse `admin`?
- ¿La confirmación se mantiene fuera del modelo y la respuesta?

## Conclusión

Describe qué comprobaste y qué quedará pendiente para A10. La conexión Atlas
debe marcarse pendiente hasta ejecutarla realmente.
