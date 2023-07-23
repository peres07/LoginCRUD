import { findEmail } from '../db/index.js';
import { decryptPassword } from '../utils/decryptPassword.js';
import { validatePasswordSchema } from '../validation/validatePasswordSchema.js';
import jwt from 'jsonwebtoken';

export async function validatePassword(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const { email } = jwt.decode(token);
        await validatePasswordSchema.validateAsync(req.body);
        const { password } = req.body;
        const user = await findEmail(email);
        if (!user || !decryptPassword(password, user.password)) return res.status(401).json({ error: 'Invalid password.' });
        return next();
    } catch (err) {
        console.log(err);
        if (err.isJoi) {
            return res.status(400).json({ error: err.details[0].message });
        }
        res.status(500).json({ error: err });
    }
}
