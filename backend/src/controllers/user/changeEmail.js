import * as db from '../../db/index.js';
import { validateCode } from '../../utils/validateCode.js';
import { changeEmailSchema } from '../../validation/changeEmailSchema.js';
import jwt from 'jsonwebtoken';

export async function changeEmail(req, res) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const old_email = jwt.decode(token).email;
        await changeEmailSchema.validateAsync(req.body);
        const { new_email } = req.body;
        if (old_email === new_email) {
            return res.status(409).json({
                error: 'New email cannot be the same as the old email.',
            });
        }
        if (await db.findEmail(new_email)) {
            return res.status(409).json({ error: 'Email already exists.' });
        }
        if (!(await validateCode(req, old_email))) {
            return res.status(401).json({ error: 'Invalid code or expired.' });
        }
        await db.changeEmail(old_email, new_email);
        return res.status(200).json({ message: 'Email changed successfully.' });
    } catch (err) {
        console.log(err);
        if (err.isJoi) {
            return res.status(400).json({ error: err.details[0].message });
        }
        res.status(500).json({ error: err });
    }
}
