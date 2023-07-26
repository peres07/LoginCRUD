import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import { deleteAccount as dbDeleteAccount } from '../../db/index';
import { validateCode } from '../../utils/validateCode';
import { JwtPayload } from '../../types/auth/JwtPayload';

export async function deleteAccount(req: Request, res: Response) {
    try {
        if (!req.headers.authorization)
            return res.status(401).json({ error: 'No token provided.' });
        const token = req.headers.authorization.split(' ')[1];
        const { email } = jwt.decode(token) as JwtPayload;
        if (!(await validateCode(req, email))) {
            return res.status(401).json({ error: 'Invalid code.' });
        }
        await dbDeleteAccount(email);
        return res.status(200).json({ message: 'User deleted successfully.' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
}
