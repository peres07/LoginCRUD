import { registerSchema } from '../../validation/registerSchema.js';
import * as db from '../../db/index.js';
import { validateCode } from '../../utils/validateCode.js';

export async function register(req, res) {
    try {
        const { username, email, password } = req.body;
        await registerSchema.validateAsync(req.body);
        if (await db.findEmail(email)) {
            return res.status(409).json({ error: 'Email already exists.' });
        } else if (await db.findUser(username)) {
            return res.status(409).json({ error: 'Username already exists.' });
        }
        if (!(await validateCode(req, email))) {
            return res.status(401).json({ error: 'Invalid code or expired.' });
        }
        await db.register(username, email, password);
        return res.status(200).json({ message: 'User created successfully.' });
    } catch (err) {
        if (err.isJoi) {
            return res.status(400).json({ error: err.details[0].message });
        }
        res.status(500).json({ error: err });
    }
}
