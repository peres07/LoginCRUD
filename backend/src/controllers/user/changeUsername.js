import * as db from '../../db/index.js';
import { validateCode } from '../../utils/validateCode.js';
import { changeUsernameSchema } from '../../validation/changeUsernameSchema.js';
import jwt from 'jsonwebtoken';

export async function changeUsername(req, res) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const {username: old_username, email} = jwt.decode(token);
        await changeUsernameSchema.validateAsync(req.body);
        const { new_username } = req.body;
        if (old_username === new_username) {
            return res.status(409).json({
                error: 'New username cannot be the same as the old username.',
            });
        }
        if (await db.findUser(new_username)) {
            return res.status(409).json({ error: 'Username already exists.' });
        }
        if (!(await validateCode(req, email))) {
            return res.status(401).json({ error: 'Invalid code or expired.' });
        }
        await db.changeUsername(old_username, new_username);
        return res
            .status(200)
            .json({ message: 'Username changed successfully.' });
    } catch (err) {
        if (err.isJoi) {
            return res.status(400).json({ error: err.details[0].message });
        }
        res.status(500).json({ error: err });
    }
}
