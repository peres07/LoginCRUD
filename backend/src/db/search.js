import { query } from './utils/query.js';

export async function findUser(username) {
    const res = await query('SELECT * FROM users WHERE username = $1', [
        username,
    ]);
    if (!res.rows[0]) return false;
    return true;
}

export async function findEmail(email) {
    const res = await query('SELECT * FROM users WHERE email = $1', [email]);
    if (!res.rows[0]) return false;
    return true;
}

export async function findCode(email) {
    const res = await query('SELECT * FROM confirmation_codes WHERE email = $1', [email]);
    if (!res.rows[0]) return false;
    return res.rows[0];
}
