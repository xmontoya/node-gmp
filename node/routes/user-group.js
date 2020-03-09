import { Router } from 'express';

import { userGroup } from '../services';
import authorization from '../middlewares/authorization';

import { logResponse } from '../utils/logger';

const router = Router();

router.use(authorization.authenticate);

router.post('/user-group', async (req, res, next) => {
    try {
        const groupId = req.body.group_id;
        const users = req.body.users;

        const result = await userGroup.addUsersToGroup(groupId, users);

        logResponse(200, result.length);
        return res.status(200).send(result);
    } catch (e) {
        return next(e);
    }
});

router.delete('/user-group/:user_id/:group_id', async (req, res, next) => {
    try {
        const GroupId = req.params.group_id;
        const UseId = req.params.user_id;

        const result = await userGroup.removeGroup(UseId, GroupId);

        logResponse(204, result);
        return res.status(204).send();
    } catch (e) {
        return next(e);
    }
});

module.exports = router;
