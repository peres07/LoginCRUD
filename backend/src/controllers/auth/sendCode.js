import jwt from 'jsonwebtoken';
import { generateCode } from '../../utils/generateCode.js';
import { sendEmail } from '../../utils/sendEmail.js';
import { sendCodeSchema } from '../../validation/sendCodeSchama.js';

export async function sendCode(req, res) {
    try {
        let email;
        try {
            const token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, process.env.JWT_SECRET, (err) => {
                if (err) throw new Error('Token invalid or expired.');
            });
            email = jwt.decode(token).email;
            console.log(email);
        } catch {
            await sendCodeSchema.validateAsync(req.body);
            email = req.body.email;
            console.log(email);
            
        }


        const code = await generateCode(email);
        if (
            code &&
            (await sendEmail({
                to: email,
                subject: 'Confirmation code',
                text: `<h1>Confirmation code</h1><p>Your confirmation code is: <b>${code}</b></p>`,
            }))
        )
            return res.status(200).json({ message: 'Code sent successfully.' });

        return res
            .status(500)
            .json({ error: 'Error sending code, wait a few minutes.' });
    } catch (err) {
        if (err.isJoi) {
            return res.status(400).json({ error: err.details[0].message });
        }
        else if (err.message === 'Token invalid or expired.') {
            return res.status(401).json({ error: err.message });
        } else {
            return res.status(500).json({ error: err });
        }
    }
}
