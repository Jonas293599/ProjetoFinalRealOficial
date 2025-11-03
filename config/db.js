// Usamos a biblioteca 'mysql2' que é uma versão mais moderna e rápida do driver mysql
import mysql from 'mysql2/promise';

// A função 'pool' cria uma piscina de conexões, o que é mais eficiente
// para gerir várias conexões simultâneas ao banco de dados.
const pool = mysql.createPool({
    host: 'localhost',       // Endereço do seu servidor MySQL (geralmente localhost)
    user: 'root',            // O seu nome de utilizador do MySQL
    password: '',   // A sua senha do MySQL
    database: 'cronograma_senai', // O nome do banco de dados que irá criar
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Mensagem de sucesso para saber que a ligação foi bem-sucedida
console.log("Conexão com o banco de dados MySQL estabelecida com sucesso.");

// Exportamos a 'pool' para que os nossos Models a possam usar
export default pool;
