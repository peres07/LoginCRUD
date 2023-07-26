import { query } from './utils/query.js';

export async function deleteAccount(email: string): Promise<boolean> {
    try {
        await query('DELETE FROM users WHERE email = $1', [email]);

        return true;
    } catch {
        return false;
    }
}

export async function changeUsername(old_username: string, new_username: string): Promise<boolean> {
    try {
        await query('UPDATE users SET username = $1 WHERE username = $2', [
            new_username,
            old_username,
        ]);

        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

export async function changeEmail(old_email: string, new_email: string): Promise<boolean> {
    try {
        await query('UPDATE users SET email = $1 WHERE email = $2', [new_email, old_email]);

        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

export async function changePassword(username: string, new_password: string): Promise<boolean> {
    try {
        await query('UPDATE users SET password = $1 WHERE username = $2', [new_password, username]);

        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}
