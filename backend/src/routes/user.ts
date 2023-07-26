import express from 'express';

import * as userController from '../controllers/user/index';

const router = express.Router();

router.delete('/deleteAccount', userController.deleteAccount);
router.patch('/changeUsername', userController.changeUsername);
router.patch('/changeEmail', userController.changeEmail);
router.patch('/changePassword', userController.changePassword);

export default router;
