import express from 'express';
import { getUserLogin, registerUser } from '../controllers/userController.js'; 

const router = express.Router();

// A rota final será /api/users + /
router.get('/', getUserLogin);
router.post('/', registerUser)

export default router;