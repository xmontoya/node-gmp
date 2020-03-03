import { UserGroup } from '../models';

import { logResponse } from '../utils/logger';

module.exports = {
    addUsersToGroup(req, res) {
        const groupId = req.body.group_id;
        const users = req.body.users;
        const groupUsers = users.map(userId => {
            return {
                UserId: userId,
                GroupId: groupId
            };
        });

        return UserGroup
            .bulkCreate(groupUsers)
            .then(result => {
                logResponse(201, result.length);
                return res.status(201).send(result);
            })
            .catch(error => {
                logResponse(400, error);
                res.status(400).send(error);
            });
    },
    removeGroup(req, res) {
        const where = {
            UserId: req.params.user_id,
            GroupId: req.params.group_id
        };

        return UserGroup
            .destroy({ where })
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
