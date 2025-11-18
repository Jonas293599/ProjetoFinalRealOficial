// Usamos a biblioteca 'mysql2' que é uma versão mais moderna e rápida do driver mysql
import mysql from 'mysql2/promise';

// A função 'pool' cria uma piscina de conexões, o que é mais eficiente
// para gerir várias conexões simultâneas ao banco de dados.
// conectando e configurando o banco de dados
function iniciarBancoDeDados() {
  const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cronograma_senai',
    waitForConnections: true,
    connectionLimit: 10,   // número máximo de conexões simultâneas
    queueLimit: 0
  });

  console.log("✅ Pool de conexões MySQL criado com sucesso.");
  return pool;
}
// Mensagem de sucesso para saber que a ligação foi bem-sucedida
console.log("Conexão com o banco de dados MySQL estabelecida com sucesso.");

// Exportamos a 'pool' para que os nossos Models a possam usar
export default iniciarBancoDeDados();


//Codigo do banco de dados
// CREATE TABLE areas(
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     nome VARCHAR(100),
//     cor Varchar(11)
// );



// Codigo para gitar no git hub
// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/Jonas293599/ProjetoFinalRealOficial.git
// git push -u origin main