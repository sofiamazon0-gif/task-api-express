# Reflexión EC3 F2 A11

Respuestas de referencia para revisar y expresar con tus propias palabras antes de entregar:

1. **¿Qué parte de la aplicación se reemplaza con dobles en `api.test.ts` y qué parte sigue siendo real?**  
   Los servicios de autenticación y tareas se sustituyen por dobles para controlar sus respuestas y evitar operaciones en MongoDB. Express, las rutas, los middleware, la validación HTTP, el manejador de errores y la verificación de JWT se ejecutan realmente.

2. **¿Por qué una suite aprobada no demuestra que MongoDB Atlas esté configurado correctamente?**  
   La suite no conecta a Atlas: simula los servicios que normalmente acceden a la base de datos. Para comprobar credenciales, red, persistencia y consultas reales hace falta una prueba manual contra Atlas.

3. **¿Qué diferencia existe entre OpenAPI y Swagger UI?**  
   OpenAPI es el contrato estructurado que describe rutas, datos y respuestas. Swagger UI es la interfaz que lee ese contrato y permite explorarlo y enviar solicitudes.

4. **¿Por qué `GET /api/auth/me` obtiene el id desde el token y no desde params o body?**  
   El middleware ya verificó el token y su identidad. Tomar el id de ahí evita que el cliente pueda solicitar la información de otra cuenta enviando un id distinto.

5. **¿Por qué `authRateLimiter` ya no se monta en todo `authRouter`?**  
   El límite protege los intentos de registro e inicio de sesión. `/me` requiere un token, no intenta autenticar credenciales, así que no debe consumir el límite de login.

6. **¿Qué diferencia hay entre un error 401 y uno 403 en el cliente?**  
   401 significa que falta una autenticación válida; 403 significa que la identidad fue aceptada, pero no tiene permiso para esa operación.

7. **¿Por qué Postman puede funcionar aunque el navegador informe CORS?**  
   CORS es una restricción que aplica el navegador para controlar qué páginas web pueden leer respuestas. Postman es un cliente HTTP y no aplica esa política del navegador.

8. **¿Qué riesgo conserva `sessionStorage` y por qué se usa solo como solución didáctica?**  
   El token se puede leer desde JavaScript de la página, por lo que un XSS podría robarlo. Se usa para demostrar Bearer en este ejercicio; una arquitectura de producción debería considerar cookies HttpOnly seguras y una estrategia de sesión adecuada.

9. **¿Qué contrato comparten `openapi.ts`, `types.ts` y las respuestas reales?**  
   Los tres describen la misma forma de los datos: OpenAPI para la documentación, los tipos para el cliente y las respuestas reales producidas por el backend. Si uno cambia sin actualizar los otros, el cliente y la documentación pueden dejar de coincidir con la API.

10. **¿Qué prueba agregarías primero antes de desplegar la actividad 12 y por qué?**  
    Agregaría una prueba de integración con una base de datos de prueba aislada para comprobar persistencia, índices y manejo de errores reales, porque los dobles de servicio no verifican el comportamiento de MongoDB.
