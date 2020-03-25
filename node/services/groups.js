import { Group } from '../models';

const getList = async () => {
    try {
        return await Group.findAll({ raw: true });
    } catch (e) {
        return  new Error(e);
    }
};

const getGroup = async (groupId) => {
    try {
        const query = {
            where: {
                id: groupId
            },
            raw: true
        };

        return Group.findAll(query);
    } catch (e) {
        return  new Error(e);
    }
};

const createGroup = async (group) => {
    try {
        return await Group.create(group);
    } catch (e) {
        return  new Error(e);
    }
};

const updateGroup = async (groupId, group) => {
    try {
        const where = {
            id: groupId
        };

        return await Group.update(group, { where });
    } catch (e) {
        return  new Error(e);
    }
};

const deleteGroup = async (groupId) => {
    try {
        const where = {
            id: groupId
        };

        return await Group.destroy({ where });
    } catch (e) {
        return  new Error(e);
    }
};

module.exports = {
    getList,
    getGroup,
    createGroup,
    updateGroup,
    deleteGroup
};
