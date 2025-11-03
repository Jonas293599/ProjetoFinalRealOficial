import pool from '../config/db.js';

const Professor = {
    // Busca todos os professores, juntando o nome da área
    findAll: async () => {
        const query = `
            SELECT p.*, a.nome as areaNome, a.cor as areaCor 
            FROM professores p
            LEFT JOIN areas a ON p.areaId = a.id
            ORDER BY p.nome ASC
        `;
        const [rows] = await pool.query(query);
        return rows;
    },

    // Cria um novo professor
    create: async (professor) => {
        const { nome, areaId, diaFolga, horarioInicio, horarioFim } = professor;
        const [result] = await pool.query(
            'INSERT INTO professores (nome, areaId, diaFolga, horarioInicio, horarioFim) VALUES (?, ?, ?, ?, ?)',
            [nome, areaId, diaFolga, horarioInicio, horarioFim]
        );
        return { id: result.insertId, ...professor };
    },

    // Atualiza um professor existente
    update: async (id, professor) => {
        const { nome, areaId, diaFolga, horarioInicio, horarioFim } = professor;
        await pool.query(
            'UPDATE professores SET nome = ?, areaId = ?, diaFolga = ?, horarioInicio = ?, horarioFim = ? WHERE id = ?',
            [nome, areaId, diaFolga, horarioInicio, horarioFim, id]
        );
        return { id, ...professor };
    },

    // Apaga um professor
    delete: async (id) => {
        await pool.query('DELETE FROM professores WHERE id = ?', [id]);
        return { message: 'Professor apagado com sucesso' };
    }
};

export default Professor;
