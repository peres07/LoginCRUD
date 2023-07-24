import { Request, Response } from 'express';

import { registerSchema } from '../../validation/registerSchema.js';
import { findEmail, findUser, register as dbRegister } from '../../db/index.js';
import { validateCode } from '../../utils/validateCode.js';
import { encryptPassword } from '../../utils/encryptPassword.js';
import { RegisterBody } from '../../types/user/RequestBody.js';

export async function register(req: Request, res: Response) {
    try {
        const { username, email, password } = req.body as RegisterBody;
        const hash = encryptPassword(password);
        await registerSchema.validateAsync(req.body);
        if (await findEmail(email)) {
            return res.status(409).json({ error: 'Email already exists.' });
        } else if (await findUser(username)) {
            return res.status(409).json({ error: 'Username already exists.' });
        }
        if (!(await validateCode(req, email))) {
            return res.status(401).json({ error: 'Invalid code or expired.' });
        }
        await dbRegister(username, email, hash);
        return res.status(200).json({ message: 'User created successfully.' });
    } catch (err) {
        console.log(err);
        if (err.isJoi) {
            return res.status(400).json({ error: err.details[0].message });
        }
        return res.status(500).json({ error: err });
    }
}
