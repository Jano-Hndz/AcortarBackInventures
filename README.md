# Acortador de URLs

Este proyecto es una API para acortar URLs, permitiendo a los usuarios registrados gestionar sus enlaces y a los invitados generar enlaces temporales sin autenticación.

## Instalación


1. Instala las dependencias:
   ```bash
   cd tu-repositorio
   npm install
   ```

2. Configura las variables de entorno en un archivo `.env`:
   ```env
   MONGODB_URI=tu_conexion_mongodb
   JWT_SECRET=tu_secreto_jwt
   PORT=3000
   ```

3. Inicia el servidor:
   ```bash
   npm start
   ```

## Endpoints

### Usuarios

- **POST /usuarios/register** → Registra un nuevo usuario.

- **POST /usuarios/login** → Inicia sesión y obtiene un token JWT.

### Acortados

- **POST /acortados** → Crea una URL acortada para un usuario autenticado.
  - **Requiere autenticación:** ✅
  - **Justificación:** Se necesita autenticación para que el enlace quede registrado en la cuenta del usuario y pueda gestionarlo posteriormente.

- **POST /acortados/invitado** → Crea una URL acortada sin necesidad de autenticación.
  - **Requiere autenticación:** ❌
  - **Justificación:** Se permite la creación de enlaces sin cuenta, pero estos tienen una fecha de expiración predefinida.

- **GET /acortados/:id** → Obtiene información de una URL acortada.
  - **Requiere autenticación:** ❌
  - **Justificación:** Permite a cualquier usuario acceder a la URL acortada sin restricciones.

- **GET /acortados/mis-links** → Obtiene las URLs acortadas del usuario autenticado.
  - **Requiere autenticación:** ✅
  - **Justificación:** Solo el usuario debe poder ver sus propios enlaces.

- **DELETE /acortados/:id** → Elimina una URL acortada.
  - **Requiere autenticación:** ✅
  - **Justificación:** Solo el propietario del enlace puede eliminarlo.

## Justificación del Uso de Autenticación
Algunos endpoints requieren autenticación porque están relacionados con la gestión de URLs de un usuario, asegurando que solo el dueño de los enlaces pueda ver o eliminar sus datos. Sin embargo, la generación de URLs cortas para invitados es abierta, permitiendo un uso más accesible del servicio sin necesidad de registro.


