# Historial de cambios

## [1.0.0] - 2026-11-24

### Agregado
- Cliente React con registro, inicio y cierre de sesión.
- CRUD, filtros, búsqueda, ordenamiento y paginación.
- Configuración reproducible mediante `render.yaml`.
- Prueba de humo para una liberación sin mostrar credenciales.

### Conservado
- TypeScript estricto, módulos ECMAScript y resolución NodeNext.
- Mongoose 8.24.4 y MongoDB Atlas.
- JWT, roles, Helmet, CORS y límites de solicitudes.

### Seguridad
- Secretos mediante variables de entorno.
- CORS restringido al origen HTTPS de producción.
- Proxy confiable configurado con un número explícito de saltos.
