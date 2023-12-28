import { pool } from '../DATABASE/db.js';

// Conseguir todos los usuarios
export const getUsers = async (req, res) => {
    const [results] = await pool.query('CALL LeerUsuarios()');

    const setJson = results[0];
    return res.json(setJson);
}

// Crear un usuario
export const createUser = async (req, res) => {
    try {

        console.log('Datos del usuario a crear:');
        console.log(req.body);
        // Extraer los datos del nuevo usuario del cuerpo de la solicitud
        const { NombreUsuario, Contraseña, NombreCompleto, Rol } = req.body;

        if (!NombreUsuario || !Contraseña || !NombreCompleto || !Rol) {
          return res.status(400).json(['error', 'Todos los campos son obligatorios']);
        }
    
        // Realizar la consulta SQL para insertar el nuevo usuario en la base de datos
        const result = await pool.query(
          'CALL InsertarUsuario(?, ?, ?, ?)',
          [NombreUsuario, Contraseña, NombreCompleto, Rol]
        );
         
        // Verificar si se insertó correctamente
        if (result[0].affectedRows > 0) {
          res.send(['success', 'Usuario creado']);
        } else {
          res.send(['error', 'No se pudo crear el usuario']);
        }
      } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.send(['error', 'Error interno del servidor']);
      }
}

// Actualizar un usuario
export const updateUser = async (req, res) => {
    try {
        // Extraer el ID del usuario y los nuevos datos del cuerpo de la solicitud

        const { id, NombreUsuario, Contraseña, NombreCompleto, Rol } = req.body;

        if (!id || !NombreUsuario || !Contraseña || !NombreCompleto || !Rol) {
          return res.status(400).json(['error', 'Todos los campos son obligatorios']);
        }

        console.log('Datos del usuario a actualizar:');
        console.log("ID: "+id);
        console.log("Nombre usuario: "+NombreUsuario);
        console.log("Password: "+Contraseña);
        console.log("Nombre completo: "+NombreCompleto);
        console.log("Rol: "+Rol);
        console.log(req.body);
        console.log('--------------------------');
       
        // Realizar la consulta SQL para actualizar el usuario
        const result = await pool.query(
          'CALL ActualizarUsuario(?, ?, ?, ?, ?)',
          [id,NombreUsuario, Contraseña, NombreCompleto, Rol]
        );
    
        // Verificar si se actualizó correctamente
        if (result[0].affectedRows > 0) {
          res.send(['success', 'Usuario actualizado']);
        } else {
          res.send(['error', 'No se pudo actualizar el usuario']);
        }
      } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.send(['error', 'Error interno del servidor']);
      }
}

// Eliminar un usuario
export const deleteUser = async (req, res) => {
    res.send('Eliminando usuario');
}







