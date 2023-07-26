import express from 'express';

import * as authController from '../controllers/auth/index';
import { validateToken } from '../middleware/validateToken';

const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/sendCode', authController.sendCode);
router.post('/validate', validateToken, (req, res) => {
    return res.sendStatus(200);
});

export default router;
