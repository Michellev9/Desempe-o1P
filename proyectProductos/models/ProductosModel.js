const pool = require('../config/db');

class Productos {
    // Método estático para obtener todos los registros de la tabla 'productos'.
    static async findAll() {
        const result = await pool.query('SELECT * FROM productos');
        return result.rows;
    }

    // Método estático para crear un nuevo producto.
    static async create(data) {
        const { producto, precio, stock_minimo, stock_maximo, existencias, SKU } = data;
        const result = await pool.query(
            'INSERT INTO productos(producto, precio, stock_minimo, stock_maximo, existencias, SKU) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
            [producto, precio, stock_minimo, stock_maximo, existencias, SKU]
        );
        return result.rows[0];
    }

    // Método estático para actualizar un producto existente en la base de datos.
    static async update(id, data) {
        const { producto, precio, stock_minimo, stock_maximo, existencias, SKU } = data;
        const result = await pool.query(
            'UPDATE productos SET producto = $1, precio = $2, stock_minimo = $3, stock_maximo = $4, existencias = $5, SKU = $6, updated_at = CURRENT_TIMESTAMP WHERE id = $7 RETURNING *',
            [producto, precio, stock_minimo, stock_maximo, existencias, SKU, id]
        );
        return result.rows[0];
    }

    // Método estático para eliminar un producto (borrado lógico) actualizando el campo 'deleted_at'.
    static async delete(id) {
        const result = await pool.query('UPDATE productos SET deleted_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    }

    // Método estático para buscar en todas las columnas de la tabla 'productos' según una cadena de búsqueda.
    static async searchAllColumns(searchString) {
        const result = await pool.query(
            `SELECT * FROM productos
             WHERE 
                 producto ILIKE $1 OR
                 CAST(precio AS TEXT) ILIKE $1 OR
                 CAST(stock_minimo AS TEXT) ILIKE $1 OR
                 CAST(stock_maximo AS TEXT) ILIKE $1 OR
                 CAST(existencias AS TEXT) ILIKE $1 OR
                 sku ILIKE $1 OR
                 CAST(created_at AS TEXT) ILIKE $1 OR
                 CAST(updated_at AS TEXT) ILIKE $1 OR
                 CAST(deleted_at AS TEXT) ILIKE $1`,
            [`%${searchString}%`]
        );
        return result.rows;
    }
}

module.exports = Productos;