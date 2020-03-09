import { UserGroup } from '../models';

const addUsersToGroup = async (groupId, users) => {
    try {
        const groupUsers = users.map(userId => {
            return {
                UserId: userId,
                GroupId: groupId
            };
        });

        return await UserGroup.bulkCreate(groupUsers);
    } catch (e) {
        return new Error(e);
    }
};

const removeGroup = async (UserId, GroupId) => {
    try {
        const where = {
            UserId,
            GroupId
        };

        return await UserGroup.destroy({ where });
    } catch (e) {
        return new Error(e);
    }
};

module.exports = {
    addUsersToGroup,
    removeGroup
};
