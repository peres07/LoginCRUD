import { Request } from 'express';

import { findCode, deleteCode } from '../db/index';
import { validateCodeSchema } from '../validation/validateCodeSchema';
import { RequestBody } from '../types/user/RequestBody';

export async function validateCode(req: Request, email: string) {
    try {
        await validateCodeSchema.validateAsync(req.body);
        const { code: received_code } = req.body as RequestBody;
        const result = await findCode(email);
        if (!result) {
            return false;
        }
        const { code, expiration } = result;
        const now = new Date(Date.now()).getTime();
        const expiration_date = new Date(expiration).getTime();
        if (!code || received_code !== code || now > expiration_date) {
            return false;
        }
        await deleteCode(email);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}
