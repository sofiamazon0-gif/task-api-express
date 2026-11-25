# Reflexión sobre el modelado y la persistencia

Respuestas de referencia basadas en la implementación. Añade tus observaciones
de Atlas y de las pruebas que hayas ejecutado; no afirmes resultados que no
hayas comprobado.

1. **¿Qué diferencia existe entre un documento, un esquema y un modelo?**  
   El documento es una tarea guardada en la colección `tasks`. El esquema en
   `src/models/task.ts` define sus campos y reglas. `TaskModel` es la interfaz
   de Mongoose que usa el servicio para crear, consultar, actualizar y borrar
   esos documentos.

2. **¿Por qué la API devuelve `id` en lugar de `_id`?**  
   MongoDB conserva el identificador como `ObjectId` en `_id`, pero
   `toTask` lo convierte a texto y lo presenta como `id`. Así el contrato HTTP
   es sencillo y no expone la estructura interna del documento ni `__v`.

3. **¿Qué problema evita migrar todas las operaciones a una sola fuente de datos?**  
   Evita que una tarea creada en MongoDB no aparezca al completar o eliminarla
   porque esas operaciones consultaran un arreglo distinto. Todas las
   operaciones actuales usan `TaskModel`.

4. **¿Qué reglas aplica el middleware y cuáles repite el esquema?**  
   El middleware valida que el título sea texto no vacío de hasta 120
   caracteres, que el `description` opcional sea texto de hasta 300 caracteres
   y que el ID tenga formato ObjectId. El esquema vuelve a proteger los límites
   de título y descripción, restringe `status` y genera fechas con timestamps.

5. **¿Qué diferencia existe entre `INVALID_ID` y `TASK_NOT_FOUND`?**  
   `INVALID_ID` (400) indica que el valor de la ruta no es un ObjectId válido.
   `TASK_NOT_FOUND` (404) indica que el identificador sí tiene ese formato,
   pero no corresponde a un documento existente.

6. **¿Qué hacen `timestamps` y `versionKey: false`?**  
   `timestamps` mantiene `createdAt` y `updatedAt` automáticamente. Desactivar
   `versionKey` evita que Mongoose agregue `__v`, que esta API no utiliza.

7. **¿Por qué los controladores deben usar `async` y `await`?**  
   Las operaciones de Mongoose son asíncronas. `await` hace que cada respuesta
   se construya con el resultado ya obtenido y que un rechazo no se convierta
   accidentalmente en una respuesta con una promesa.

8. **¿Cómo llega un `AppError` asíncrono al `errorHandler` de Express 5?**  
   Express 5 reenvía automáticamente los rechazos de promesas de los
   controladores asíncronos al middleware de errores, que conserva el código,
   mensaje, detalles y `requestId` de la API.

9. **¿Qué prueba demuestra realmente que una tarea es persistente?**  
   Crear una tarea, reiniciar el proceso de la API y consultar el mismo ID para
   recuperar el documento de nuevo. Una respuesta correcta antes del reinicio
   por sí sola no demuestra persistencia.

10. **¿Qué información de Mongoose o Atlas nunca debe aparecer en la respuesta HTTP?**  
    La URI, credenciales, host interno, stack trace y el objeto original de
    error de Mongoose. El cliente recibe un mensaje controlado y un código
    estable, junto con el `requestId`.

## Desafío opcional: `description`

`description` es opcional. Si se envía, la validación HTTP y el esquema exigen
texto de hasta 300 caracteres; ambos eliminan los espacios externos. Se omite
de la respuesta cuando no se proporcionó. Comprueba una descripción válida,
una tarea sin descripción y un valor que exceda el límite.

## Desafío opcional: `priority`

La prioridad admite `low`, `medium` o `high`. El modelo y la validación HTTP la
protegen, las tareas nuevas usan `medium` por defecto y el PATCH general permite
cambiarla. Se conserva en la respuesta pública. Comprueba el valor por defecto,
una tarea creada con `high` y una actualización a `low`.
