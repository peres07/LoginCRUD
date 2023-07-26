import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import { generateCode } from '../../utils/generateCode.js';
import { sendEmail } from '../../utils/sendEmail.js';
import { sendCodeSchema } from '../../validation/sendCodeSchama.js';
import { JwtPayload } from '../../types/auth/JwtPayload.js';

export async function sendCode(req: Request, res: Response) {
    try {
        let email: string;
        try {
            if (!req.headers.authorization)
                throw new Error('No token provided.');
            const token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, process.env.JWT_SECRET as string, (err) => {
                if (err) throw new Error('Token invalid or expired.');
            });
            const decoded = jwt.decode(token) as JwtPayload;
            email = decoded.email;
        } catch {
            await sendCodeSchema.validateAsync(req.body);
            email = req.body.email;
        }

        const code = await generateCode(email);
        if (
            code &&
            (await sendEmail({
                to: email,
                subject: 'Confirmation code',
                text: `<h1>Confirmation code</h1><p>Your confirmation code is: <b>${code}</b></p>`,
            }))
        )
            return res.status(200).json({ message: 'Code sent successfully.' });

        return res.status(500).json({ error: 'Error sending code, wait a few minutes.' });
    } catch (err) {
        console.log(err);
        if (err.isJoi) {
            return res.status(400).json({ error: err.details[0].message });
        } else if (err.message === 'Token invalid or expired.') {
            return res.status(401).json({ error: err.message });
        } else {
            return res.status(500).json({ error: err });
        }
    }
}
