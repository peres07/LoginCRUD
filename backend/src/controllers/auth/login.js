import jsonwebtoken from 'jsonwebtoken';
import { findEmail } from '../../db/index.js';
import { decryptPassword } from '../../utils/decryptPassword.js';

export async function login(req, res) {
    const hash = req.headers.authorization.split(' ')[1];
    const [email, password] = Buffer.from(hash, 'base64').toString().split(':');
    const user = await findEmail(email);
    console.log(user);
    
    if (decryptPassword(password, user.password)) {
        const token = jsonwebtoken.sign(
            {
                email: user.email,
                username: user.username,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '7d',
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
