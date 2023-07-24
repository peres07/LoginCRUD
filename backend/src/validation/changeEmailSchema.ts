import joi from 'joi';

export const changeEmailSchema = joi.object({
    new_email: joi.string().email().required(),
    password: joi.string().required(),
    code: joi.string().required(),
});
