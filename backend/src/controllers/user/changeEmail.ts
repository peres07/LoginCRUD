import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import { findEmail, changeEmail as dbChangeEmail } from '../../db/index.js';
import { validateCode } from '../../utils/validateCode.js';
import { changeEmailSchema } from '../../validation/changeEmailSchema.js';
import { ChangeEmailBody } from '../../types/user/RequestBody';
import { JwtPayload } from '../../types/auth/JwtPayload';

export async function changeEmail(req: Request, res: Response) {
    try {
        if (!req.headers.authorization)
            return res.status(401).json({ error: 'No token provided.' });
        const token = req.headers.authorization.split(' ')[1];
        const { email: old_email } = jwt.decode(token) as JwtPayload;
        await changeEmailSchema.validateAsync(req.body);
        const { new_email } = req.body as ChangeEmailBody;
        if (old_email === new_email) {
            return res.status(409).json({
                error: 'New email cannot be the same as the old email.',
            });
        }
        if (await findEmail(new_email)) {
            return res.status(409).json({ error: 'Email already exists.' });
        }
        if (!(await validateCode(req, old_email))) {
            return res.status(401).json({ error: 'Invalid code or expired.' });
        }
        await dbChangeEmail(old_email, new_email);
        return res.status(200).json({ message: 'Email changed successfully.' });
    } catch (err) {
        console.log(err);
        if (err.isJoi) {
            return res.status(400).json({ error: err.details[0].message });
        }
        res.status(500).json({ error: err });
    }
}
