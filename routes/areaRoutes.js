import express from 'express';
import { getAllAreas, createArea, deleteArea } from '../controllers/areaController.js';

const router = express.Router();

router.get('/', getAllAreas);
router.post('/', createArea);
router.delete('/:id', deleteArea);

export default router;
