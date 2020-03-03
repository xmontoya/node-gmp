import { Router } from 'express';

import { userGroup } from '../services';

const router = Router();

router.post('/user-group', userGroup.addUsersToGroup);

router.delete('/user-group/:user_id/:group_id', userGroup.removeGroup);

module.exports = router;
