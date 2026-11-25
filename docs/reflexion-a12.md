# Reflexión EC3 F3 A12

1. **Build, deploy y release:** El build transforma el código en artefactos ejecutables o estáticos. El deploy coloca esos artefactos en la infraestructura. El release identifica una versión que pasó los criterios y puede ser instalada o referenciada.
2. **PUBLIC_API_URL pública y JWT_SECRET privado:** PUBLIC_API_URL solo describe dónde se encuentra la API y se incluye en documentación y bundles. JWT_SECRET permite firmar y verificar tokens, por eso debe permanecer fuera de Git y del navegador.
3. **Riesgo de `trust proxy = true`:** Confiar en todos los saltos permite que un cliente falsifique encabezados reenviados y distorsione IP, protocolos o límites de solicitudes. Se usa el número real de proxies de la topología.
4. **El botón oculto no sustituye la autorización:** Ocultar Eliminar mejora la interfaz, pero no impide solicitudes manuales. Express debe conservar `requireRole('admin')` y devolver 403 al usuario normal.
5. **Por qué cambia VITE_API_URL al reconstruir:** Vite incorpora las variables VITE al bundle durante el build. Cambiar la variable sin construir vuelve a entregar JavaScript con la URL anterior.
6. **Qué verifica `/health/database`:** Comprueba que Mongoose está conectado y que el servidor de MongoDB responde al comando ping. `/health` solo demuestra que el proceso HTTP responde.
7. **Alcance de las pruebas simuladas y comprobaciones con Atlas:** Las pruebas con dobles verifican contratos, rutas y respuestas sin infraestructura. Atlas debe validar autenticación, red, persistencia, filtros y autorización real.
8. **Por qué 204 requiere tratamiento especial:** 204 indica éxito, pero no incluye cuerpo. El cliente no debe ejecutar `JSON.parse` ni esperar un objeto en esa respuesta.
9. **Cómo comprobar que la etiqueta coincide con el código desplegado:** Se compara el commit mostrado por Render/GitHub con `git rev-parse v1.0.0^{}`, se verifica `/health` y se despliega exactamente ese commit.
10. **Evidencias que se omiten o redactan:** Se excluyen URI completas, contraseñas, JWT_SECRET, access tokens completos y datos personales innecesarios. Las capturas deben ocultar paneles de secretos y encabezados sensibles.
