# Reflexión sobre MongoDB Atlas

Respuestas de referencia basadas en esta API. Reescríbelas con tus propias
palabras y agrega tus observaciones de las pruebas que realmente ejecutaste.

1. **¿Qué diferencia existe entre tu cuenta de Atlas y el usuario de base de datos?**  
   La cuenta de Atlas administra el proyecto, el despliegue y sus reglas. La API
   se autentica con un usuario de base de datos independiente, limitado a
   `readWrite` sobre `task_api`; no necesita permisos administrativos de Atlas.

2. **¿Por qué `MONGODB_URI` se considera un secreto aunque el repositorio sea privado?**  
   La URI contiene la ubicación de la instancia y las credenciales que permiten
   conectarse. Un repositorio privado puede compartirse, filtrarse o exponerse
   por error, así que el valor real vive en `.env`, que Git ignora.

3. **¿Qué riesgo introduce permitir `0.0.0.0/0` en la lista de acceso?**  
   Permite intentos de conexión desde cualquier dirección IP. La lista debe
   incluir solo la IP o el rango estrictamente necesario.

4. **¿Por qué la API espera `connectDatabase` antes de ejecutar `app.listen`?**  
   Así no acepta solicitudes hasta que MongoDB confirme la conexión. El proceso
   termina con un mensaje seguro si falta configuración o Atlas no está
   disponible, en vez de anunciar un servicio listo que no puede usar su
   dependencia.

5. **¿Qué comprueba `readyState` y qué añade el comando `ping`?**  
   `readyState` indica el estado de conexión que mantiene Mongoose. El `ping`
   comprueba además que la aplicación puede comunicarse con el servidor de
   MongoDB en ese momento.

6. **¿Por qué una falla de MongoDB corresponde a infraestructura y no a validación HTTP?**  
   La solicitud puede ser válida y aun así fallar una dependencia externa. Por
   eso la disponibilidad de MongoDB se reporta como `503 DATABASE_UNAVAILABLE`,
   sin atribuir el problema al cuerpo o a los parámetros del usuario.

7. **¿Cómo llega un `AppError` lanzado por `getDatabaseHealth` al manejador central en Express 5?**  
   `getDatabaseHealth` es asíncrono. Express 5 reenvía automáticamente el
   rechazo de su promesa a la cadena de middleware de errores, donde
   `errorHandler` produce la respuesta uniforme.

8. **¿Qué pruebas demuestran que la incorporación de Atlas no rompió la API anterior?**  
   Las pruebas de regresión consultan, crean, buscan, completan y eliminan una
   tarea; las pruebas negativas comprueban las validaciones, los errores de
   negocio y las rutas inexistentes. También verifican que `/health` conserve
   su respuesta anterior.

9. **¿Por qué el arreglo en memoria se conserva todavía en esta actividad?**  
   El objetivo de esta actividad es configurar y diagnosticar la conexión.
   Mantener el arreglo permite probar esa infraestructura sin adelantar el
   modelado y la persistencia, que corresponden a las siguientes actividades.

10. **¿Qué información debe ocultarse al cliente cuando ocurre un error de conexión?**  
    La URI, la contraseña, el host, el stack y el objeto original de error de
    Mongoose. El cliente recibe solo un código y mensaje controlados, junto con
    el `requestId` que agrega el middleware existente.
