import * as db from '../../db/index.js';
import { validateCode } from '../../utils/validateCode.js';
import { changePasswordSchema } from '../../validation/changePasswordSchema.js';
import jwt from 'jsonwebtoken';

export async function changePassword(req, res) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const { username, email } = jwt.decode(token);
        await changePasswordSchema.validateAsync(req.body);
        const { new_password } = req.body;
        if (!(await validateCode(req, email))) {
            return res.status(401).json({ error: 'Invalid code or expired.' });
        }
        await db.changePassword(username, new_password);
        return res
            .status(200)
            .json({ message: 'Password changed successfully.' });
    } catch (err) {
        console.log(err);
        if (err.isJoi) {
            return res.status(400).json({ error: err.details[0].message });
        }
        res.status(500).json({ error: err });
    }
}
