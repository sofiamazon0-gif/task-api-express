# Reflexión sobre el CRUD persistente

Respuestas de referencia basadas en la API. Añade resultados de las pruebas
realmente ejecutadas; no afirmes resultados de Atlas que no hayas comprobado.

1. **¿Qué operación de Mongoose corresponde a cada letra de CRUD?**  
   Create usa `TaskModel.create`; Read usa `find` y `findById`; Update usa
   `findByIdAndUpdate`; Delete usa `findByIdAndDelete`. Todas acceden a la
   colección persistente de tareas.

2. **¿Por qué se usa PATCH y no un reemplazo completo del documento?**  
   PATCH representa cambios parciales. El cliente puede modificar título,
   estado o prioridad sin volver a enviar los demás campos.

3. **¿Qué problema evita `$set`?**  
   `$set` actualiza solo las propiedades validadas presentes en la solicitud.
   Así los campos ausentes, como `createdAt` o `description`, no se pierden al
   editar la tarea.

4. **¿Qué efecto tienen `new: true` y `runValidators: true`?**  
   `new: true` devuelve el documento después del cambio. `runValidators: true`
   vuelve a aplicar las reglas del esquema durante la actualización.

5. **¿Por qué un cuerpo vacío debe rechazarse?**  
   No expresa ningún cambio. Rechazarlo con 422 evita una actualización
   aparentemente correcta que no modifica el recurso.

6. **¿Qué diferencia existe entre `INVALID_ID` y `TASK_NOT_FOUND`?**  
   `INVALID_ID` (400) indica que el parámetro no tiene formato ObjectId válido.
   `TASK_NOT_FOUND` (404) significa que el formato sí es válido, pero no hay un
   documento con ese ID.

7. **¿Qué responsabilidad cumple `validateTaskUpdate` y cuál cumple `TaskModel`?**  
   El middleware valida el cuerpo HTTP, rechaza arreglos, cuerpo vacío y
   propiedades no permitidas, y crea un objeto de cambios confiable. El modelo
   protege la integridad del documento y sus valores permitidos en persistencia.

8. **¿Cómo llega un error de `updateTask` al `errorHandler` de Express 5?**  
   El controlador es asíncrono y espera al servicio. Express 5 reenvía al
   middleware de errores el rechazo de la promesa, donde `errorHandler`
   conserva el código, mensaje, detalles y `requestId`.

9. **¿Por qué DELETE responde 204 sin cuerpo?**  
   204 indica que la operación se completó y no incluye representación en el
   cuerpo. La consulta posterior comprueba la ausencia con 404.

10. **¿Qué prueba demuestra que el CRUD es persistente y no solo funcional en memoria?**  
    Crear y actualizar un documento, reiniciar la API y consultar el mismo ID
    para observar los cambios conservados en Atlas.

## Desafío opcional: `priority`

Se agregó `priority` con valores `low`, `medium` y `high`. El esquema establece
`medium` por defecto, y la creación y el PATCH validan y exponen ese campo. Se
puede comprobar el valor por defecto, crear una tarea con `high`, y cambiarla a
`low` sin añadir una ruta.
