# Evidencias EC3 F3 A12

## Identificación
- Nombre:
- Grupo:
- Repositorio:
- Commit desplegado:
- Etiqueta: v1.0.0
- URL del frontend:
- URL pública de la API:

## Calidad local
- Resultado de `pnpm install --frozen-lockfile`: aprobado
- Resultado de `pnpm verify`: aprobado en entorno local
- Pruebas backend: aprobadas
- Pruebas cliente: 3 aprobadas
- Builds backend y cliente: aprobados

## Despliegue
- Estado de `/health`: pendiente hasta crear el servicio Render
- Estado de `/health/database`: pendiente hasta desplegar y conectar Atlas
- OpenAPI usa la URL pública: pendiente hasta definir `PUBLIC_API_URL`
- Atlas restringido a IP de salida: pendiente hasta configurar Network Access

## Seguridad de la evidencia
- [ ] No se muestra MONGODB_URI.
- [ ] No se muestra JWT_SECRET.
- [ ] No se muestran contraseñas.
- [ ] Los tokens están ocultos o truncados.

## Incidencias y solución
- Incidencia:
- Causa:
- Corrección:
- Nueva comprobación:
