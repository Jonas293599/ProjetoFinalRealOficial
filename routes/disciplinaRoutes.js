import express from 'express';
import { getAllDisciplinas, createDisciplina, deleteDisciplina } from '../controllers/disciplinaController.js';

const router = express.Router();

router.get('/', getAllDisciplinas);
router.post('/', createDisciplina);
router.delete('/:id', deleteDisciplina);

export default router;
