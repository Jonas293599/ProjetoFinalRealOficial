import pool from '../config/db.js';

const Curso = {
    findAll: async () => {
        // Esta é uma query mais complexa que busca todos os cursos e agrega as suas disciplinas num array JSON
        const query = `
            SELECT 
                c.*, 
                a.nome as areaNome, 
                a.cor as areaCor,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', d.id, 
                        'nome', d.nome, 
                        'cargaHoraria', cd.cargaHoraria
                    )
                ) as disciplinas
            FROM cursos c
            LEFT JOIN areas a ON c.areaId = a.id
            LEFT JOIN cursos_disciplinas cd ON c.id = cd.cursoId
            LEFT JOIN disciplinas d ON cd.disciplinaId = d.id
            GROUP BY c.id
            ORDER BY c.nome ASC
        `;
        const [rows] = await pool.query(query);
        return rows;
    },

    create: async (curso) => {
        // Usamos uma transação para garantir que o curso e as suas disciplinas são inseridos atomicamente
        const connection = await pool.getConnection();
        await connection.beginTransaction();
        
        try {
            const { nome, tipo, pago, vagas, dataInicio, cargaTotal, areaId, disciplinas } = curso;
            const [cursoResult] = await connection.query(
                'INSERT INTO cursos (nome, tipo, pago, vagas, dataInicio, cargaTotal, areaId) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [nome, tipo, pago, vagas, dataInicio, cargaTotal, areaId]
            );
            const cursoId = cursoResult.insertId;

            if (disciplinas && disciplinas.length > 0) {
                const disciplinaValues = disciplinas.map(d => [cursoId, d.id, d.carga]);
                await connection.query(
                    'INSERT INTO cursos_disciplinas (cursoId, disciplinaId, cargaHoraria) VALUES ?',
                    [disciplinaValues]
                );
            }

            await connection.commit();
            return { id: cursoId, ...curso };
        } catch (error) {
            await connection.rollback();
            throw error; // Propaga o erro para o controller tratar
        } finally {
            connection.release();
        }
    },
    
    delete: async (id) => {
        // Graças ao 'ON DELETE CASCADE' no schema, as entradas em cursos_disciplinas serão apagadas automaticamente
        await pool.query('DELETE FROM cursos WHERE id = ?', [id]);
        return { message: 'Curso apagado com sucesso' };
    }
};

export default Curso;
