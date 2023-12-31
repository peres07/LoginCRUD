import nodeMailer from 'nodemailer';
import { Options } from '../types/email/Options';

export const sendEmail = async (options: Options) => {
    try {
        const transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: options.to,
            subject: options.subject,
            html: options.text,
        };

        await transporter.sendMail(mailOptions);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};
