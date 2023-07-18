import joi from 'joi';

export const validateCodeSchema = joi.object({
    code: joi.string().required(),
    password: joi.string(),
    email: joi.string().email(),
    new_email: joi.string().email(),
    username: joi.string(),
    new_username: joi.string(),
    new_password: joi.string(),
    confirm_password: joi.string(),
});
