import { Router } from 'express';

import { userGroup } from '../services';

const router = Router();

router.use((req, res, next) => {
    console.log('Request URL: ', req.originalUrl);
    console.log('Time: ', Date.now());
    next();
});

router.post('/user-group', userGroup.addUsersToGroup);

router.delete('/user-group/:user_id/:group_id', userGroup.removeGroup);

module.exports = router;
