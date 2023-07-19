import jsonwebtoken from 'jsonwebtoken';
import * as db from '../../db/index.js';

export async function login(req, res) {
    const hash = req.headers.authorization.split(' ')[1];
    const [email, password] = Buffer.from(hash, 'base64').toString().split(':');
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
