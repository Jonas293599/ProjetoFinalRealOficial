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
        if(rows.length === 0){
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
    }
};

export default User;
