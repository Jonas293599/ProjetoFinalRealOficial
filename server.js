import express from 'express';
import mysql from 'mysql2';
import path from 'path';
import { fileURLToPath } from 'url';

const telaLogin = "/pages/telalogin.html"

// Importa todas as nossas rotas
import calendarioRoutes from './routes/calendarioRoutes.js';
import professorRoutes from './routes/professorRoutes.js';
import ambienteRoutes from './routes/ambienteRoutes.js';
import cursoRoutes from './routes/cursoRoutes.js';
import areaRoutes from './routes/areaRoutes.js';
import disciplinaRoutes from './routes/disciplinaRoutes.js';

// Configuração inicial do Express
const app = express();
const PORT = 3001;

// conectando e configurando o banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',         // Usuário do MySQL (padrão é 'root')
  password: '',         // Senha do MySQL (padrão é vazio)
  database: 'cronograma_senai' // Nome do banco de dados criado
});

db.connect((err) => {
    if(err){
        console.error('Erro ao conetar ao banco de dados: ', err.stack);
        return;
    }
    console.log('Conectando ao banco de dados como ID ' + db.threadId);
});

// Permite que o servidor entenda JSON no corpo das requisições
app.use(express.json());

// --- Configuração para servir os ficheiros HTML (as nossas Views) ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));


// --- Rotas da API ---
app.use('/api/calendario', calendarioRoutes);
app.use('/api/professores', professorRoutes);
app.use('/api/ambientes', ambienteRoutes);
app.use('/api/cursos', cursoRoutes);
app.use('/api/areas', areaRoutes);
app.use('/api/disciplinas', disciplinaRoutes);


// Inicia o servidor na porta definida
app.listen(PORT, () => {
    console.log(`Servidor a correr na porta http://localhost:${PORT + telaLogin}`);
});

