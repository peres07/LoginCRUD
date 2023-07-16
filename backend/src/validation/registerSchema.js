import joi from 'joi';

export const registerSchema = joi.object({
    username: joi.string().min(3).max(20).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(20).required(),
});
