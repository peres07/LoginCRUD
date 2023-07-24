import { query } from './utils/query.js';
import { User } from '../types/user/User';
import { Code } from '../types/user/code';

export async function findUser(username: string): Promise<boolean> {
    const res = await query('SELECT * FROM users WHERE username = $1', [username]);
    if (!res.rows[0]) return false;
    return true;
}

export async function findEmail(email: string): Promise<User | false> {
    const res = await query('SELECT * FROM users WHERE email = $1', [email]);
    if (!res.rows[0]) return false;
    return res.rows[0];
}

export async function findCode(email: string): Promise<Code | false> {
    const res = await query('SELECT * FROM confirmation_codes WHERE email = $1', [email]);
    if (!res.rows[0]) return false;
    return res.rows[0];
}
