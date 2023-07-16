import { query } from './utils/query.js';

export async function deleteAccount(email) {
    try {
        query('DELETE FROM users WHERE email = $1', [email]);

        return true;
    } catch {
        return false;
    }
}

export async function changeUsername(old_username, new_username) {
    try {
        query('UPDATE users SET username = $1 WHERE username = $2', [
            new_username,
            old_username,
        ]);

        return true;
    } catch {
        return false;
    }
}

export async function changeEmail(old_email, new_email) {
    try {
        query('UPDATE users SET email = $1 WHERE email = $2', [
            new_email,
            old_email,
        ]);

        return true;
    } catch {
        return false;
    }
}

export async function changePassword(username, new_password) {
    try {
        query('UPDATE users SET password = $1 WHERE username = $2', [
            new_password,
            username,
        ]);

        return true;
    } catch {
        return false;
    }
}
