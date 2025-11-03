import express from 'express';
import { getAllAmbientes, createAmbiente, deleteAmbiente } from '../controllers/ambienteController.js';

const router = express.Router();

router.get('/', getAllAmbientes);
router.post('/', createAmbiente);
router.delete('/:id', deleteAmbiente);

export default router;
