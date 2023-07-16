import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
import { validateToken } from './auth.js';
import { registerSchema } from './validation_schema.js';
import * as db from './db.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3333;

app.post('/api/login', async (req, res) => {
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
});

app.post('/api/register', async (req, res) => {
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
});

app.use('*', validateToken);

app.post('/api/validate', (req, res) => {
    return res.status(200);
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
