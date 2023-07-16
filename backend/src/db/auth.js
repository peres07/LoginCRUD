import { query } from './utils/query.js';

export async function findLogin(email, password) {
    const res = await query(
        'SELECT * FROM users WHERE email = $1 AND password = $2',
        [email, password]
    );
    if (!res.rows[0]) return false;
    return res.rows[0];
}

export async function register(username, email, password) {
    try {
        await query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)',
            [username, email, password]
        );
        return true;
    } catch {
        return false;
    }
}
