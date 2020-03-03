import { Group } from '../models';

import { logResponse } from '../utils/logger';

module.exports = {
    list(req, res) {
        return Group
            .findAll({ raw: true })
            .then(groups => {
                logResponse(200, groups);
                return res.status(200).send(groups);
            })
            .catch(error => {
                logResponse(400, error);
                return res.status(400).send(error);
            });
    },
    getGroup(req, res) {
        const query = {
            where: {
                id: req.params.id
            },
            raw: true
        };

        return Group
            .findAll(query)
            .then(groups => {
                if (groups.length >= 1) {
                    logResponse(200, groups);
                    return res.status(200).send(groups[0]);
                }
                const message = 'group not found.';
                logResponse(404, message);
                return res.status(404).send(message);
            })
            .catch(error => {
                logResponse(400, error);
                return res.status(400).send(error);
            });
    },
    create(req, res) {
        const query = {
            name: req.body.name,
            permissions: req.body.permissions
        };

        return Group
            .create(query)
            .then(group => {
                logResponse(201, group.get({ plain:true }));
                return res.status(201).send(group);
            })
            .catch(error => {
                logResponse(400, error);
                res.status(400).send(error);
            });
    },
    update(req, res) {
        const group = {
            name: req.body.name,
            permissions: req.body.permissions
        };
        const where = {
            id: req.params.id
        };

        return Group
            .update(group, { where })
            .then(() => {
                logResponse(204, '');
                return res.status(204).send();
            })
            .catch(error => {
                logResponse(400, error);
                return res.status(400).send(error);
            });
    },
    delete(req, res) {
        const where = {
            id: req.params.id
        };

        return Group.destroy({ where })
            .then(() => {
                logResponse(204, '');
                return res.status(204).send();
            })
            .catch(error => {
                logResponse(400, error);
                return res.status(400).send(error);
            });
    }
};
