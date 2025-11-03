import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

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

// Permite que o servidor entenda JSON no corpo das requisições
app.use(express.json());

// --- Configuração para servir os ficheiros HTML (as nossas Views) ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'views')));


// --- Rotas da API ---
app.use('/api/calendario', calendarioRoutes);
app.use('/api/professores', professorRoutes);
app.use('/api/ambientes', ambienteRoutes);
app.use('/api/cursos', cursoRoutes);
app.use('/api/areas', areaRoutes);
app.use('/api/disciplinas', disciplinaRoutes);


// Inicia o servidor na porta definida
app.listen(PORT, () => {
    console.log(`Servidor a correr na porta http://localhost:${PORT}`);
});

