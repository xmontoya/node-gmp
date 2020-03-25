import { Router } from 'express';

import { users } from '../services';
import authorization from '../middlewares/authorization';
import userValidator from '../middlewares/userValidator';

import { logResponse } from '../utils/logger';

const router = Router();

router.use(authorization.authenticate);

router.post('/user',
    userValidator.validateBodyParams,
    userValidator.validateLogin,
    async (req, res, next) => {
        try {
            const user = {
                login: req.body.login,
                password: req.body.password,
                age: req.body.age
            };
            const result = await users.createUser(user);

            logResponse(201, result.get({ plain:true }));
            return res.status(201).send(result.get({ plain:true }));
        } catch (e) {
            return next(e);
        }
    });

router.put('/user/:id',
    userValidator.validateUpdateParams,
    async (req, res, next) => {
        try {
            const result = await users.updateUser(req.params.id, req.body.age);

            logResponse(204, result);
            return res.status(204).send();
        } catch (e) {
            return next(e);
        }
    });

router.get('/user/:id', async (req, res, next) => {
    try {
        const user = await users.getUser(req.params.id);

        if (user.length >= 1) {
            logResponse(200, user[0]);
            return res.status(200).send(user[0]);
        }

        const message = 'user not found.';
        logResponse(404, message);
        return res.status(404).send(message);
    } catch (e) {
        return next(e);
    }
});

router.get('/users', async (req, res, next) => {
    try {
        const loginSubstring = req.query.loginSubstring;
        const limit = req.query.limit;

        const userList = await users.getAutoSuggestUsers(loginSubstring, limit);

        logResponse(200, userList);
        return res.status(200).send(userList);
    } catch (e) {
        return next(e);
    }
});

router.delete('/user/:id', async (req, res, next) => {
    try {
        const result = await users.deleteUser(req.params.id);

        logResponse(204, result);
        return res.status(204).send();
    } catch (e) {
        return next(e);
    }
});

module.exports = router;
