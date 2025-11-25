import Joi from 'joi';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const registerUserSchema = Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().min(6).max(20).required(),
})
