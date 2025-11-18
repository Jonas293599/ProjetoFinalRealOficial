// Importações principais
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
export const PORT = 3000;
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importa as rotas
import calendarioRoutes from './routes/calendarioRoutes.js';
import professorRoutes from './routes/professorRoutes.js';
import ambienteRoutes from './routes/ambienteRoutes.js';
import cursoRoutes from './routes/cursoRoutes.js';
import areaRoutes from './routes/areaRoutes.js';
import disciplinaRoutes from './routes/disciplinaRoutes.js';
import userRoutes from './routes/userRoutes.js';
import router from './routes/userRoutes.js';
const telaLogin = "/pages/telalogin.html";

// --- Configuração para servir os ficheiros HTML ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

// --- Rotas da API ---
app.use('/api/users', userRoutes);
app.use('/api/calendario', calendarioRoutes);
app.use('/api/professores', professorRoutes);
app.use('/api/ambientes', ambienteRoutes);
app.use('/api/cursos', cursoRoutes);
app.use('/api/areas', areaRoutes);
app.use('/api/disciplinas', disciplinaRoutes);
app.use(router);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em: http://localhost:${PORT}${telaLogin}`);
});

