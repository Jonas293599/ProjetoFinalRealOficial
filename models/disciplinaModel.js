import pool from '../config/db.js';

const Disciplina = {
    findAll: async () => {
        const [rows] = await pool.query('SELECT * FROM disciplinas ORDER BY nome ASC');
        return rows;
    },

    create: async (disciplina) => {
        const { nome, cargaHoraria } = disciplina;
        const [result] = await pool.query(
            'INSERT INTO disciplinas (nome, cargaHoraria) VALUES (?, ?)',
            [nome, cargaHoraria]
        );
        return { id: result.insertId, ...disciplina };
    },

    delete: async (id) => {
        await pool.query('DELETE FROM disciplinas WHERE id = ?', [id]);
        return { message: 'Disciplina apagada com sucesso' };
    }
};

export default Disciplina;
