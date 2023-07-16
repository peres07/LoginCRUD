import express from 'express';
import * as authController from '../controllers/auth.js';
import { validateToken } from '../middleware/validateToken.js';

const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/validate', validateToken, (req, res) => res.status(200));

export default router;
