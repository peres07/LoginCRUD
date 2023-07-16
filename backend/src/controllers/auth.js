import jsonwebtoken from 'jsonwebtoken';
import * as db from '../db/index.js';
import { registerSchema } from '../validation/registerSchema.js';

export async function login(req, res) {
    const hash = req.headers.authorization.split(' ')[1];
    const [email, password] = atob(hash).split(':');
    const user = await db.findLogin(email, password);
    if (user) {
        const token = jsonwebtoken.sign(
            {
                email: user.email,
                username: user.username,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: 600,
            }
        );

        return res.status(200).json({
            token: token,
        });
    }

    res.status(401).json({
        error: 'Credentials invalid.',
    });
}

export async function register(req, res) {
    try {
        const { username, email, password } = req.body;
        await registerSchema.validateAsync(req.body);
        if (await db.findEmail(email)) {
            return res.status(409).json({ error: 'Email already exists.' });
        } else if (await db.findUser(username)) {
            return res.status(409).json({ error: 'Username already exists.' });
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
