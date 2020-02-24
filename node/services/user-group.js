import { UserGroup } from '../models';

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
            .then(result  => res.status(201).send(result))
            .catch(error => res.status(400).send(error));
    },
    removeGroup(req, res) {
        const where = {
            UserId: req.params.user_id,
            GroupId: req.params.group_id
        };

        return UserGroup
            .destroy({ where })
            .then(() => res.status(204).send())
            .catch(error => res.status(400).send(error));
    }
};
