import Joi from '@hapi/joi';
import joiValidator from 'express-joi-validation';

import usersModel from '../models/user';

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
    validateUser: (req, res, next) => {
        const user = usersModel.getUser(req.params.id);

        if (user === false ||
            (user.hasOwnProperty('isDeleted') && user.isDeleted === true)) {
            res.status(404).send('user not found.');
        }
        req.user = user;
        next();
    },
    validateLogin: (req, res, next) => {
        const user = usersModel.getUserByLogin(req.body.login);

        if (user) {
            res.status(400).send('login already exists.');
        }
        next();
    },
    validateBodyParams: validator.body(userCreateSchema),
    validateUpdateParams: validator.body(userUpdateSchema)
};

module.exports = userValidator;
