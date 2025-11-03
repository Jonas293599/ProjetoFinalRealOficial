import pool from '../config/db.js';

// Objeto que agrupa todas as funções relacionadas a eventos do calendário
const Calendario = {
    // Função para buscar todos os eventos
    findAll: async () => {
        const [rows] = await pool.query('SELECT * FROM eventos_calendario ORDER BY date ASC');
        return rows;
    },

    // Função para criar um novo evento
    create: async (evento) => {
        const { date, type, description } = evento;
        const [result] = await pool.query(
            'INSERT INTO eventos_calendario (date, type, description) VALUES (?, ?, ?)',
            [date, type, description]
        );
        return { id: result.insertId, ...evento };
    },

    // Função para atualizar um evento existente
    update: async (id, evento) => {
        const { date, type, description } = evento;
        await pool.query(
            'UPDATE eventos_calendario SET date = ?, type = ?, description = ? WHERE id = ?',
            [date, type, description, id]
        );
        return { id, ...evento };
    },

    // Função para apagar um evento
    delete: async (id) => {
        await pool.query('DELETE FROM eventos_calendario WHERE id = ?', [id]);
        return { message: 'Evento apagado com sucesso' };
    }
};

export default Calendario;
