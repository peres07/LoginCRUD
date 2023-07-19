import * as db from '../db/index.js';
import { validateCodeSchema } from '../validation/validateCodeSchema.js';

export async function validateCode(req, email) {
    try {
        await validateCodeSchema.validateAsync(req.body);
        const received_code = req.body.code;
        const { code, expiration } = await db.findCode(email);
        const now = new Date(Date.now()).getTime();
        const expiration_date = new Date(expiration).getTime();
        if (!code || received_code !== code || now > expiration_date) {
            return false;
        }
        await db.deleteCode(email);
        return true;
    } catch (err) {
        return false;
    }
}