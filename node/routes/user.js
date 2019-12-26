import { Router } from 'express';
import uuidv1 from 'uuid/v1';

import usersModel from '../models/user';
import userValidator from '../middlewares/user-validator';

const router = Router();

router.use((req, res, next) => {
    console.log('Request URL: ', req.originalUrl);
    console.log('Time: ', Date.now());
    next();
});

router.post('/user', (req, res) => {
    usersModel.saveUser({ id: uuidv1() });
    res.json(usersModel.getAutoSuggestUsers());
});

router.put('/user/:id', userValidator.validateUser, (req, res) => {
    usersModel.saveUser({ id: uuidv1() });
    res.json(usersModel.getAutoSuggestUsers());
});

router.get('/user/:id', userValidator.validateUser, (req, res) => {
    res.json(req.user);
});

router.get('/users', (req, res) => {
    res.json(usersModel.getAutoSuggestUsers());
});

router.delete('/user/:id', userValidator.validateUser, (req, res) => {
    if(!usersModel.deleteUser(req.params.id)){
        res.status(500).json({ status: 500, message: 'something went wrong!' });
    }
    res.status(200).json({ status: 200, message: 'user deleted.' });
});

module.exports = router;
