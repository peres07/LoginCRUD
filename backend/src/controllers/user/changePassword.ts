import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import { changePassword as dbChangePassword } from '../../db/index';
import { encryptPassword } from '../../utils/encryptPassword';
import { validateCode } from '../../utils/validateCode';
import { changePasswordSchema } from '../../validation/changePasswordSchema';
import { RequestBody } from '../../types/user/RequestBody';
import { JwtPayload } from '../../types/auth/JwtPayload';

export async function changePassword(req: Request, res: Response) {
    try {
        if (!req.headers.authorization)
            return res.status(401).json({ error: 'No token provided.' });
        const token = req.headers.authorization.split(' ')[1];
        const { username, email } = jwt.decode(token) as JwtPayload;
        await changePasswordSchema.validateAsync(req.body);
        const { new_password } = req.body as RequestBody;
        const hash = encryptPassword(new_password);
        if (!(await validateCode(req, email))) {
            return res.status(401).json({ error: 'Invalid code or expired.' });
        }
        await dbChangePassword(username, hash);
        return res.status(200).json({ message: 'Password changed successfully.' });
    } catch (err) {
        console.log(err);
        if (err.isJoi) {
            return res.status(400).json({ error: err.details[0].message });
        }
        res.status(500).json({ error: err });
    }
}
