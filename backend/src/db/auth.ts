import { query } from './utils/query';

export async function register(
    username: string,
    email: string,
    password: string,
): Promise<boolean> {
    try {
        await query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [
            username,
            email,
            password,
        ]);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

export async function saveCode(
    email: string,
    code: string,
    expiration: Date,
    generated_at: number,
): Promise<boolean> {
    try {
        await query(
            'INSERT INTO confirmation_codes (email, code, expiration, generated_at) VALUES ($1, $2, $3, $4)',
            [email, code, expiration, generated_at],
        );

        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

export async function deleteCode(email: string): Promise<boolean> {
    try {
        await query('DELETE FROM confirmation_codes WHERE email = $1', [email]);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}
