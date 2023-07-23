import { query } from './utils/query.js';

export async function register(username, email, password) {
    try {
        await query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)',
            [username, email, password]
        );
        return true;
    }  catch (err) {
        console.log(err);
        return false;
    }
}

export async function saveCode(email, code, expiration, generated_at) {
    try {
        await query(
            'INSERT INTO confirmation_codes (email, code, expiration, generated_at) VALUES ($1, $2, $3, $4)',
            [email, code, expiration, generated_at]
        );

        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

export async function deleteCode(email) {
    try {
        await query('DELETE FROM confirmation_codes WHERE email = $1', [email]);
        return true;
    }  catch (err) {
        console.log(err);
        return false;
    }
}
