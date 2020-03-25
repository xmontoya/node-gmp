import { Router } from 'express';

import { auth, users } from '../services';

import { logResponse } from '../utils/logger';

const router = Router();

router.post('/login', async (req, res, next) => {
    try {
        const user = await users.getUserByLoginPass(req.body.login, req.body.password);
        if (user.length <= 0) {
            const message = 'Invalid user name or password.';

            logResponse(400, message);
            return res.status(400).send(message);
        }
        const token = auth.login(user[0]);

        logResponse(201, { token });
        return res.status(201).send({ token });
    } catch (e) {
        return next(e);
    }
});

module.exports = router;
