import Joi from '@hapi/joi';
import joiValidator from 'express-joi-validation';

import { User } from '../models';
import { Op } from 'sequelize';

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
    validateLogin: (req, res, next) => {
        const query = {
            where: {
                login: req.body.login,
                isDeleted: { [Op.not]: false }
            },
            limit: 1
        };

        return User
            .findAll(query)
            .then(users => {
                if (users.length >= 1) {
                    return res.status(400).send('login already exists.');
                }
                next();
            })
            .catch(error => res.status(400).send(error));
    },
    validateBodyParams: validator.body(userCreateSchema),
    validateUpdateParams: validator.body(userUpdateSchema)
};

module.exports = userValidator;
