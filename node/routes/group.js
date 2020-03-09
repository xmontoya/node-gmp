import { Router } from 'express';

import { groups } from '../services';
import authorization from '../middlewares/authorization';

const router = Router();

router.use(authorization.authenticate);

router.post('/group', groups.create);

router.put('/group/:id', groups.update);

router.get('/group/:id', groups.getGroup);

router.get('/groups', groups.list);

router.delete('/group/:id', groups.delete);

module.exports = router;
