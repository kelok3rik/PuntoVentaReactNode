import { pool } from '../DATABASE/db.js';

export const getProducts = async (req, res) => {
    try {
        const [results] = await pool.query('CALL LeerProductos()');
        const productos = results[0];
        return res.json(productos);
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        return res.status(500).json(['error', 'Error interno del servidor']);
    }
};


// crear Producto
export const createProduct = async (req, res) => {
    try {
        const { Nombre, Descripcion, Precio, CantidadStock, Reorden, CategoriaID, ProveedorID } = req.body;

        if (!Nombre || !Descripcion || !Precio || !CantidadStock || !Reorden || !CategoriaID || !ProveedorID) {
            return res.status(400).json(['error', 'Todos los campos son obligatorios']);
        }

        const result = await pool.query(
            'CALL InsertarProducto(?, ?, ?, ?, ?, ?, ?)',
            [Nombre, Descripcion, Precio, CantidadStock, Reorden, CategoriaID, ProveedorID]
        );

        if (result[0].affectedRows > 0) {
            return res.json(['success', 'Producto creado']);
        } else {
            return res.status(500).json(['error', 'No se pudo crear el producto']);
        }
    } catch (error) {
        console.error('Error al crear el producto:', error);
        return res.status(500).json(['error', 'Error interno del servidor']);
    }
};

// Actualizar un producto

export const updateProduct = async (req, res) => {
    try {
        const { ProductoID, Nombre, Descripcion, Precio, CantidadStock, Reorden, CategoriaID, ProveedorID } = req.body;

        if (!ProductoID || !Nombre || !Descripcion || !Precio || !CantidadStock || !Reorden || !CategoriaID || !ProveedorID) {
            return res.status(400).json(['error', 'Todos los campos son obligatorios']);
        }

        const result = await pool.query(
            'CALL ActualizarProducto(?, ?, ?, ?, ?, ?, ?, ?)',
            [ProductoID, Nombre, Descripcion, Precio, CantidadStock, Reorden, CategoriaID, ProveedorID]
        );

        if (result[0].affectedRows > 0) {
            return res.json(['success', 'Producto actualizado']);
        } else {
            return res.status(500).json(['error', 'No se pudo actualizar el producto']);
        }
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        return res.status(500).json(['error', 'Error interno del servidor']);
    }
};

// Eliminar un producto
export const deleteProduct = async (req, res) => {
    res.send("Eliminando producto");
};
