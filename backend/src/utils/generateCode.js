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
    const expiration = new Date(
        new Date().getTime() + 60 * 60 * 1000
    ).toISOString();
    const now = new Date(Date.now());
    const code = await db.findCode(email);
    if (code) {
        let { generated_at } = code;
        generated_at = parseInt(generated_at);
        const generated_at_date = new Date(generated_at + 3 * 60 * 1000);

        if (generated_at_date > now) {
            return false;
        }
        await db.deleteCode(email);
    }
    if (await db.saveCode(email, result, expiration, now.getTime())) {
        return result;
    }

    return false;
}
