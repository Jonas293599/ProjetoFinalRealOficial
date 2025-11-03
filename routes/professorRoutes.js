import express from 'express';
import { getAllProfessores, createProfessor, updateProfessor, deleteProfessor } from '../controllers/professorController.js';

const router = express.Router();

// GET /api/professores
router.get('/', getAllProfessores);

// POST /api/professores
router.post('/', createProfessor);

// PUT /api/professores/:id
router.put('/:id', updateProfessor);

// DELETE /api/professores/:id
router.delete('/:id', deleteProfessor);

export default router;
