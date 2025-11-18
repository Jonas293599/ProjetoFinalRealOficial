import express from 'express';
import { getUserLogin } from '../controllers/loginController.js'; 

const router = express.Router();

// A rota final será /api/users + /
router.post('/', getUserLogin); 

export default router;