import { Router } from 'express';

import { groups } from '../services';

const router = Router();

router.use((req, res, next) => {
    console.log('Request URL: ', req.originalUrl);
    console.log('Time: ', Date.now());
    next();
});

router.post('/group', groups.create);

router.put('/group/:id', groups.update);

router.get('/group/:id', groups.getGroup);

router.get('/groups', groups.list);

router.delete('/group/:id', groups.delete);

module.exports = router;
