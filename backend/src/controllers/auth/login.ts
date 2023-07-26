import { Request, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';

import { findEmail } from '../../db/index.js';
import { decryptPassword } from '../../utils/decryptPassword.js';

export async function login(req: Request, res: Response) {
    if (!req.headers.authorization) return res.status(401).json({ error: 'No credentials sent.' });
    const hash = req.headers.authorization.split(' ')[1];
    const [email, password] = Buffer.from(hash, 'base64').toString().split(':');
    const user = await findEmail(email);
    if (!user) return res.status(401).json({ error: 'Credentials invalid.' });
    if (decryptPassword(password, user.password)) {
        const token = jsonwebtoken.sign(
            {
                email: user.email,
                username: user.username,
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: '7d',
            },
        );

        return res.status(200).json({
            token: token,
        });
    }

    res.status(401).json({
        error: 'Credentials invalid.',
    });
}
