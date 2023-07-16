import express from 'express';
import * as authController from '../controllers/auth/index.js';
import { validatePassword } from '../middleware/validatePassword.js';

const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/validate', validatePassword, (req, res) => res.status(200));

export default router;
