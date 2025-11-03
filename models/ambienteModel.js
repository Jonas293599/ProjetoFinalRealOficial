import pool from '../config/db.js';

const Ambiente = {
    findAll: async () => {
        const query = `
            SELECT amb.*, a.nome as areaNome, a.cor as areaCor 
            FROM ambientes amb
            LEFT JOIN areas a ON amb.areaId = a.id
            ORDER BY amb.bloco, amb.andar, amb.nome ASC
        `;
        const [rows] = await pool.query(query);
        return rows;
    },

    create: async (ambiente) => {
        const { nome, bloco, andar, ocupacao, areaId } = ambiente;
        const [result] = await pool.query(
            'INSERT INTO ambientes (nome, bloco, andar, ocupacao, areaId) VALUES (?, ?, ?, ?, ?)',
            [nome, bloco, andar, ocupacao, areaId]
        );
        return { id: result.insertId, ...ambiente };
    },

    delete: async (id) => {
        await pool.query('DELETE FROM ambientes WHERE id = ?', [id]);
        return { message: 'Ambiente apagado com sucesso' };
    }
};

export default Ambiente;
