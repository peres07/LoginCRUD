import jwt from 'jsonwebtoken';
import * as db from '../db/index.js';

export async function deleteAccount(req, res) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const { username } = jwt.decode(token);
        await db.deleteAccount(username);
        return res.status(200).json({ message: 'User deleted successfully.' });
    } catch (err) {
        res.status(500).json({ error: err });
    }
}
