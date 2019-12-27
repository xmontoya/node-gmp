import { Router } from 'express';

import usersModel from '../models/user';
import userValidator from '../middlewares/user-validator';

const router = Router();

router.use((req, res, next) => {
    console.log('Request URL: ', req.originalUrl);
    console.log('Time: ', Date.now());
    next();
});

router.post('/user',
    userValidator.validateBodyParams,
    userValidator.validateLogin,
    (req, res) => {
        const user = {
            login: req.body.login,
            password: req.body.password,
            age: req.body.age
        };
        res.status(201).json(usersModel.saveUser(user));
    });

router.put('/user/:id', userValidator.validateUser, (req, res) => {
    const user = {
        age: req.body.age ? req.body.age : req.user.age
    };
    res.json(usersModel.updateUser(req.params.id, user));
});

router.get('/user/:id', userValidator.validateUser, (req, res) => {
    res.status(200).json(req.user);
});

router.get('/users',
    (req, res, next) => {
        req.users = usersModel.getAutoSuggestUsers(req.query.loginSubstring, req.query.limit);
        next();
    },
    (req, res) => {
        res.status(200).json(req.users);
    });

router.delete('/user/:id', userValidator.validateUser, (req, res) => {
    if (!usersModel.deleteUser(req.params.id)) {
        res.status(500).send('something went wrong!');
    }
    res.status(200).send('user deleted.');
});

module.exports = router;
