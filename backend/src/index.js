import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
import { validateToken } from './auth.js';
import * as db from './db.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3333;
const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;

app.post('/api/login', async (req, res) => {
    const hash = req.headers.authorization.split(' ')[1];
    const [email, password] = atob(hash).split(':');
    if (await db.findLogin(email, password)) {
        const token = jsonwebtoken.sign(
            {
                email: email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: 300,
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
    const body = req.body;
    try {
        const username = body.username;
        const email = body.email;
        const password = body.password;

        if (!username || !email || !password)
            return res.status(400).json({
                error: 'Missing parameters.',
            });
        else if (username.length < 3 || username.length > 20)
            return res.status(400).json({
                error: 'Username must be between 3 and 20 characters.',
            });
        else if (password.length < 6 || password.length > 20)
            return res.status(400).json({
                error: 'Password must be between 6 and 20 characters.',
            });
        else if (emailRegex.test(email) === false)
            return res.status(400).json({
                error: 'Invalid email.',
            });
        else if (await db.findEmail(email))
            return res.status(409).json({
                error: 'Email already exists.',
            });
        else if (await db.findUser(username))
            return res.status(409).json({
                error: 'Username already exists.',
            });

        if (db.register(username, email, password))
            return res.status(200).json({
                message: 'User created successfully.',
            });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err,
        });
    }
});

app.use('*', validateToken);

app.post('/api/validate', (req, res) => {
    return res.status(200);
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
