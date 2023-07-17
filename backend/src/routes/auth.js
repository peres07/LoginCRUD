import express from 'express';
import * as authController from '../controllers/auth/index.js';
import { validateToken } from '../../../frontend/src/context/utils/util.js';

const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/validate', validateToken, (req, res) => res.status(200));

export default router;
