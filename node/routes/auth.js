import { Router } from 'express';

import { auth, users } from '../services';

const router = Router();

router.post('/login', users.getUserByLogin, auth.login);

module.exports = router;
