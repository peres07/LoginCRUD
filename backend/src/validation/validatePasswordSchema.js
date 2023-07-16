import joi from 'joi';

export const validatePasswordSchema = joi.object({
    password: joi.string().required(),
    new_email: joi.string().email(),
    new_username: joi.string().min(3).max(20).alphanum(),
    new_password: joi.string().min(8).max(20),
    confirm_password: joi.any().valid(joi.ref('new_password')).messages({
        'any.only': 'Passwords do not match.',
    }),
});
