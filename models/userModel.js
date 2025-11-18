import { register } from 'module';
import pool from '../config/db.js';
import bcrypt from 'bcrypt';


const User = {
    login: async (email, senha) => {
        const query = `
            Select id, nome, email, senha
            From users
            Where email = ?
        `;
        // O `pool.query` usará `?` para evitar injeção de SQL.
        const [rows] = await pool.query(query, [email]);
        if (rows.length === 0) {
            return null;
        }
        const user = rows[0];
        const match = await bcrypt.compare(senha, user.senha);
        if (match) {
            // Login bem-sucedido: Retorna o objeto do usuário (sem a senha/hash)
            const { senha, ...userWithoutHash } = user;
            return userWithoutHash;
        } else {
            // 5. Senha incorreta
            return null;
        }
    },
    register: async (nome, email, senha) => {
        // 1. Gerar o hash da senha de forma assíncrona
        const saltRounds = 10; // Custo de processamento (10 é um bom padrão)
        const hashedPassword = await bcrypt.hash(senha, saltRounds);

        // 2. Consulta SQL com placeholders (ponto de interrogação `?`)
        const query = `
        INSERT INTO Users (nome, email, senha)
        VALUES (?, ?, ?);
    `;

        // 3. Executar a consulta passando os valores como um array
        try {
            const [result] = await pool.query(query, [nome, email, hashedPassword]);

            // Retorna o ID do novo usuário (ou objeto de sucesso)
            return {
                id: result.insertId,
                nome: nome,
                email: email
            };
        } catch (error) {
            // Tratar erros como email duplicado (UNIQUE constraint)
            console.error("Erro ao registrar usuário:", error);

            // Você pode retornar null ou lançar um erro mais específico
            if (error.code === 'ER_DUP_ENTRY') {
                throw new Error("E-mail já está em uso.");
            }
            throw error;
        }
    }
};

export default User;
