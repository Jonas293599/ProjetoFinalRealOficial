import express from 'express';
import { getAllEventos, createEvento, updateEvento, deleteEvento } from '../controllers/calendarioController.js';

const router = express.Router();

// Rota para obter todos os eventos (GET /api/calendario)
router.get('/', getAllEventos);

// Rota para criar um novo evento (POST /api/calendario)
router.post('/', createEvento);

// Rota para atualizar um evento (PUT /api/calendario/:id)
router.put('/:id', updateEvento);

// Rota para apagar um evento (DELETE /api/calendario/:id)
router.delete('/:id', deleteEvento);

export default router;
