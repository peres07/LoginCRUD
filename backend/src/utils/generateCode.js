import * as db from '../db/index.js';

export async function generateCode(email) {
    const length = 6;
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    }
    const code = await db.findCode(email);
    if (code) {
        await db.deleteCode(email);
    }
    const expiration = new Date(new Date().getTime() + 60 * 60 * 1000).toISOString();
    const generated_at = new Date(code.generated_at).getTime();
    const now = new Date(new Date()).getTime();
    if (generated_at + 180 * 1000 > now) return false;
    if (await db.saveCode(email, result, expiration, new Date(now).toISOString())) return result;
    return false;
}
