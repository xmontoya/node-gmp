import { Router } from 'express';

import { userGroup } from '../services';
import authorization from '../middlewares/authorization';

const router = Router();

router.use(authorization.authenticate);

router.post('/user-group', userGroup.addUsersToGroup);

router.delete('/user-group/:user_id/:group_id', userGroup.removeGroup);

module.exports = router;
