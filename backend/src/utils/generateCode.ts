import { findCode, deleteCode, saveCode } from '../db/index.js';

export async function generateCode(email: string) {
    const length = 6;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    const expiration = new Date(new Date().getTime() + 60 * 60 * 1000);
    const now = new Date(Date.now());
    const code = await findCode(email);
    if (code) {
        const { generated_at } = code;
        const generated_at_date = new Date(generated_at + 3 * 60 * 1000);

        if (generated_at_date > now) {
            return false;
        }
        await deleteCode(email);
    }
    if (await saveCode(email, result, expiration, now.getTime())) {
        return result;
    }

    return false;
}
