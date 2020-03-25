import Joi from '@hapi/joi';
import joiValidator from 'express-joi-validation';

import { users } from '../services';

import { logResponse } from '../utils/logger';

const validator = joiValidator.createValidator({});

const userCreateSchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    age: Joi.number().integer().min(4).max(130).required()
});

const userUpdateSchema = Joi.object({
    age: Joi.number().integer().min(4).max(130)
});

const userValidator = {
    validateLogin: async (req, res, next) => {
        try {
            const user = await users.getUserByLogin(req.body.login);

            if (user.length >= 1) {
                const logMessage = 'login already exists.';
                logResponse(400, logMessage);
                return res.status(400).send(logMessage);
            }

            return next();
        } catch (e) {
            return next(e);
        }
    },
    validateBodyParams: validator.body(userCreateSchema),
    validateUpdateParams: validator.body(userUpdateSchema)
};

module.exports = userValidator;
