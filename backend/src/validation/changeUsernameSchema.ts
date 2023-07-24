import joi from 'joi';

export const changeUsernameSchema = joi.object({
    new_username: joi.string().min(3).max(20).alphanum().required(),
    password: joi.string().required(),
    code: joi.string().required(),
});
