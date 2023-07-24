import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import { findUser, changeUsername as dbChangeUsername } from '../../db/index.js';
import { validateCode } from '../../utils/validateCode.js';
import { changeUsernameSchema } from '../../validation/changeUsernameSchema.js';
import { ChangeUsernameBody } from '../../types/user/RequestBody';
import { JwtPayload } from '../../types/auth/JwtPayload';

export async function changeUsername(req: Request, res: Response) {
    try {
        if (!req.headers.authorization)
            return res.status(401).json({ error: 'No token provided.' });
        const token = req.headers.authorization.split(' ')[1];
        const { username: old_username, email } = jwt.decode(token) as JwtPayload;
        await changeUsernameSchema.validateAsync(req.body);
        const { new_username } = req.body as ChangeUsernameBody;
        if (old_username === new_username) {
            return res.status(409).json({
                error: 'New username cannot be the same as the old username.',
            });
        }
        if (await findUser(new_username)) {
            return res.status(409).json({ error: 'Username already exists.' });
        }
        if (!(await validateCode(req, email))) {
            return res.status(401).json({ error: 'Invalid code or expired.' });
        }
        await dbChangeUsername(old_username, new_username);
        return res.status(200).json({ message: 'Username changed successfully.' });
    } catch (err) {
        console.log(err);
        if (err.isJoi) {
            return res.status(400).json({ error: err.details[0].message });
        }
        res.status(500).json({ error: err });
    }
}
