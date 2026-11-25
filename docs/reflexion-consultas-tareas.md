# Reflexión sobre consultas de tareas

Respuestas de referencia basadas en esta implementación. Agrega resultados de
Atlas que hayas comprobado; no afirmes ejecuciones que no realizaste.

1. **¿Qué responsabilidad nueva cumple `task.repository.ts`?**  
   Encapsula las operaciones de Mongoose y convierte una consulta tipada en
   filtros, orden, paginación y operaciones de escritura. El servicio ya no
   construye consultas de base de datos.

2. **¿Por qué el middleware debe validar `req.query` antes del controlador?**  
   Los parámetros vienen del cliente y pueden ser cadenas, arreglos por
   parámetros repetidos u objetos. El middleware los valida y normaliza antes
   de que el controlador entregue una consulta tipada al servicio.

3. **¿Cómo se calcula `skip` para una página determinada?**  
   Se calcula como `(page - 1) * limit`. Por ejemplo, `page=3&limit=10`
   omite los primeros veinte documentos.

4. **¿Por qué `find` y `countDocuments` deben usar el mismo filtro?**  
   `find` devuelve los documentos de la página filtrada y `countDocuments`
   cuenta ese mismo conjunto. Así `meta.total` y `totalPages` describen la
   consulta solicitada, no toda la colección.

5. **¿Qué problema evita `escapeRegex`?**  
   Hace que caracteres como `.*` se busquen literalmente y no cambien el
   significado de la expresión regular. La búsqueda de título sigue siendo
   parcial y no distingue mayúsculas.

6. **¿Por qué `sortBy` utiliza una lista permitida?**  
   Evita usar directamente un nombre de campo enviado por el cliente para
   construir el orden de MongoDB. Solo permite `createdAt`, `updatedAt`,
   `title` y `status`.

7. **¿Qué diferencia existe entre `data.length`, `meta.total` y `meta.totalPages`?**  
   `data.length` es la cantidad de elementos en esta página; `meta.total` es
   el total que coincide con los filtros; `meta.totalPages` es el número de
   páginas calculado con ese total y el límite.

8. **¿Cómo llega un error asíncrono del repositorio al `errorHandler` de Express 5?**  
   El rechazo pasa por el servicio y el controlador asíncrono. Express 5 lo
   reenvía al middleware central, que produce el contrato uniforme y agrega el
   `requestId`.

9. **¿Qué prueba demuestra que A8 no rompió el CRUD de A7?**  
   Repetir creación, lectura, actualización parcial, completar, eliminación y
   lectura posterior del ID eliminado, además de probar las rutas de salud y
   confirmar que todo usa la misma colección.

10. **¿Qué limitación tiene la paginación basada en `skip` cuando la colección crece mucho?**  
    MongoDB debe recorrer los documentos omitidos para llegar a páginas
    profundas, por lo que el costo puede crecer. En colecciones grandes se
    suele evaluar paginación basada en cursor.

## Desafío opcional: rango de fechas

`createdFrom` y `createdTo` aceptan fechas ISO 8601. El middleware rechaza
fechas no válidas y un inicio posterior al fin; el repositorio aplica `$gte` y
`$lte` y reutiliza el filtro tanto para documentos como para el total. Estos
parámetros se pueden combinar con estado, búsqueda, paginación y orden.
