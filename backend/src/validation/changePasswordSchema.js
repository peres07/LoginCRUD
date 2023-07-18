import joi from 'joi';

export const changePasswordSchema = joi.object({
    new_password: joi.string().min(6).max(20).required(),
    confirm_password: joi
        .any()
        .valid(joi.ref('new_password'))
        .required()
        .messages({
            'any.only': 'Passwords do not match.',
        }),
    password: joi.string().required(),
    code: joi.string().required(),
});
