import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import { findEmail } from '../db/index.js';
import { decryptPassword } from '../utils/decryptPassword.js';
import { validatePasswordSchema } from '../validation/validatePasswordSchema.js';
import { JwtPayload } from '../types/auth/JwtPayload.js';

export async function validatePassword(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.headers.authorization)
            return res.status(401).json({ error: 'No token provided.' });
        const token = req.headers.authorization.split(' ')[1];
        const { email } = jwt.decode(token) as JwtPayload;
        await validatePasswordSchema.validateAsync(req.body);
        const { password } = req.body;
        const user = await findEmail(email);
        if (!user || !decryptPassword(password, user.password))
            return res.status(401).json({ error: 'Invalid password.' });
        return next();
    } catch (err) {
        console.log(err);
        if (err.isJoi) {
            return res.status(400).json({ error: err.details[0].message });
        }
        res.status(500).json({ error: err });
    }
}
