import { Router } from 'express';

import { users } from '../services';
import userValidator from '../middlewares/user-validator';

const router = Router();

router.post('/user',
    userValidator.validateBodyParams,
    userValidator.validateLogin,
    users.create);

router.put('/user/:id', userValidator.validateUpdateParams, users.update);

router.get('/user/:id', users.getUser);

router.get('/users', users.getAutoSuggestUsers);

router.delete('/user/:id', users.delete);

module.exports = router;
