import { Router } from 'express';

import { groups } from '../services';
import authorization from '../middlewares/authorization';

import { logResponse } from '../utils/logger';

const router = Router();

router.use(authorization.authenticate);

router.post('/group', async (req, res, next) => {
    try {
        const group = {
            name: req.body.name,
            permissions: req.body.permissions
        };
        const result = await groups.createGroup(group);

        logResponse(201, result.get({ plain:true }));
        return res.status(201).send(result.get({ plain:true }));
    } catch (e) {
        return next(e);
    }
});

router.put('/group/:id', async (req, res, next) => {
    try {
        const group = {
            name: req.body.name,
            permissions: req.body.permissions
        };
        const groupId = req.params.id;

        const result = await groups.updateGroup(groupId, group);

        logResponse(204, result);
        return res.status(204).send();
    } catch (e) {
        return next(e);
    }
});

router.get('/group/:id', async (req, res, next) => {
    try {
        const groupId = req.params.id;

        const result = await groups.getGroup(groupId);

        if (result.length <= 0) {
            const message = 'group not found.';
            logResponse(404, message);
            return res.status(404).send(message);
        }

        logResponse(200, result[0]);
        return res.status(200).send(result[0]);
    } catch (e) {
        return next(e);
    }
});

router.get('/groups', async (req, res, next) => {
    try {
        const result = await groups.getList();

        logResponse(200, result);
        return res.status(200).send(result);
    } catch (e) {
        return next(e);
    }
});

router.delete('/group/:id', async (req, res, next) => {
    try {
        const groupId = req.params.id;
        const result = await groups.deleteGroup(groupId);

        logResponse(204, result);
        return res.status(204).send();
    } catch (e) {
        return next(e);
    }
});

module.exports = router;
