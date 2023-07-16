import * as db from '../../db/index.js';
import { changePasswordSchema } from '../../validation/changePasswordSchema.js';
import jwt from 'jsonwebtoken';

export async function changePassword(req, res) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const username = jwt.decode(token).username;
        await changePasswordSchema.validateAsync(req.body);
        const { new_password } = req.body;

        await db.changePassword(username, new_password);
        return res
            .status(200)
            .json({ message: 'Password changed successfully.' });
    } catch (err) {
        if (err.isJoi) {
            return res.status(400).json({ error: err.details[0].message });
        }
        res.status(500).json({ error: err });
    }
}
