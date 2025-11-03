import express from 'express';
import { getAllCursos, createCurso, deleteCurso } from '../controllers/cursoController.js';

const router = express.Router();

router.get('/', getAllCursos);
router.post('/', createCurso);
router.delete('/:id', deleteCurso);

export default router;
