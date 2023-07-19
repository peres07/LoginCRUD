import joi from 'joi';

export const sendCodeSchema = joi.object({
    email: joi.string().email().required(),
});
