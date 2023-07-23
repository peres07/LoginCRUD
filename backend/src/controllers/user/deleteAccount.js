import jwt from 'jsonwebtoken';
import { deleteAccount as dbDeleteAccount} from '../../db/index.js';
import { validateCode } from '../../utils/validateCode.js';

export async function deleteAccount(req, res) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const { email } = jwt.decode(token);
        if (!(await validateCode(req, email))) {
            return res.status(401).json({ error: 'Invalid code.' });
        }
        await dbDeleteAccount(email);
        return res.status(200).json({ message: 'User deleted successfully.' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
}
