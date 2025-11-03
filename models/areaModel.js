import pool from '../config/db.js';

const Area = {
    findAll: async () => {
        const [rows] = await pool.query('SELECT * FROM areas ORDER BY nome ASC');
        return rows;
    },

    create: async (area) => {
        const { nome, cor } = area;
        const [result] = await pool.query(
            'INSERT INTO areas (nome, cor) VALUES (?, ?)',
            [nome, cor]
        );
        return { id: result.insertId, ...area };
    },

    delete: async (id) => {
        await pool.query('DELETE FROM areas WHERE id = ?', [id]);
        return { message: 'Área apagada com sucesso' };
    }
};

export default Area;
