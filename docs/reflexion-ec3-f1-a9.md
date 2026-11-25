# Reflexión EC3 F1 A9

1. **¿Por qué un hash de contraseña no debe poder descifrarse?**  
   El servidor no necesita recuperar la contraseña original: compara una
   contraseña recibida con el hash almacenado. Si alguien accede a la base de
   datos, una transformación unidireccional evita que los registros revelen
   directamente las credenciales.

2. **¿Qué diferencia existe entre una sal aleatoria y la clave HS256?**  
   bcrypt incorpora una sal aleatoria distinta en cada hash para impedir que
   contraseñas iguales produzcan el mismo resultado. La clave HS256 es un
   secreto compartido por la API para firmar y verificar tokens; no se guarda
   con cada contraseña ni se publica.

3. **¿Por qué `passwordHash` tiene `select: false` y aun así el login puede
   recuperarlo?**  
   `select: false` evita incluirlo accidentalmente en las consultas comunes.
   El repositorio lo solicita explícitamente con `select('+passwordHash')`
   solo para comparar la contraseña durante el login.

4. **¿Por qué `unique` no sustituye la validación HTTP del correo?**  
   El índice único evita duplicados al persistir, incluso si dos registros
   compiten. No comprueba que la entrada sea texto, tenga formato de correo ni
   que solo contenga campos permitidos. Esas reglas pertenecen a la frontera
   HTTP.

5. **¿Qué riesgo evita rechazar el campo `role` durante el registro?**  
   Evita que una persona se otorgue privilegios como `admin` enviando un campo
   adicional. El servicio asigna explícitamente el rol `user`.

6. **¿Por qué correo inexistente y contraseña incorrecta devuelven el mismo
   mensaje?**  
   Una respuesta distinta permitiría enumerar cuentas registradas. La API
   devuelve el mismo `401 INVALID_CREDENTIALS` para ambos casos y también
   ejecuta una comparación bcrypt ficticia cuando no encuentra el correo.

7. **¿Qué información contiene el JWT de esta actividad y qué información se
   excluye?**  
   Contiene el identificador del usuario en `sub`, su rol y claims estándar
   como emisor, audiencia y tiempos. No incluye contraseña, hash, nombre ni
   correo; el JWT está firmado, no cifrado.

8. **¿Qué validan issuer, audience, algorithms y exp?**  
   `issuer` identifica quién emitió el token, `audience` limita a quién va
   dirigido, `algorithms` restringe los algoritmos aceptados a HS256 y `exp`
   limita su vigencia.

9. **¿Cómo llega un error de MongoDB desde el repositorio hasta
   `errorHandler` en Express 5?**  
   El repositorio convierte fallos de persistencia en `AppError` con un estado
   y código públicos. El servicio y el controlador esperan las promesas; si
   fallan, Express 5 propaga el rechazo al middleware central `errorHandler`.

10. **¿Por qué las rutas de tareas permanecen públicas en A9 y qué cambiará en
    A10?**  
    A9 incorpora registro, login y verificación técnica del token sin cambiar
    el comportamiento previo de tareas. En A10 la identidad verificada se
    conectará a middleware de autenticación y se aplicarán permisos a los
    recursos protegidos.

11. **¿Por qué `confirmPassword` pertenece a la frontera HTTP y no al modelo?**  
    Solo sirve para detectar errores de escritura en el formulario de
    registro. Después de validarla, se elimina al construir `RegisterInput` y
    no aporta ningún dato persistente al usuario.
