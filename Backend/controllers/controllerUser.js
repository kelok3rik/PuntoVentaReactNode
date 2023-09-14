import { pool } from '../DATABASE/db.js';

export const getUsers = async (req, res) => {
    const [results] = await pool.query('CALL LeerUsuarios()');

    const result2 = results[0];

    console.log(result2);
    

    return res.json(result2);
}

export const getUserById = async (req, res) => {
    res.send('Obteniendo usuario');
}

export const createUser = async (req, res) => {
    console.log(req.body);
    const { NombreUsuario, Contraseña, NombreCompleto, Rol } = req.body;
    const result = await pool.query('INSERT INTO usuarios (NombreUsuario, Contraseña, NombreCompleto, Rol) VALUES (?, ?, ?, ?)',
        [NombreUsuario, Contraseña, NombreCompleto, Rol]);
    console.log(result);
    res.send('Creando usuario');
}

export const updateUser = async (req, res) => {
    res.send('Actualizando usuario');
}

export const deleteUser = async (req, res) => {
    res.send('Eliminando usuario');
}



