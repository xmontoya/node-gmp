import { User } from '../models';
import { Op } from 'sequelize';

const getAutoSuggestUsers = async (loginSubstring = null, limit = null) => {
    try {
        const query = {
            attributes: { exclude: ['password', 'isDeleted'] },
            order: [['login', 'ASC']],
            where: {
                isDeleted: { [Op.not]: true }
            },
            raw : true
        };

        if (loginSubstring) {
            query.where.login = { [Op.substring]: loginSubstring };
        }

        if (limit) {
            query.limit = limit;
        }

        const users = await User.findAll(query);

        return users;
    } catch (e) {
        return new Error(e);
    }
};
const getUserByLogin = async (login) => {
    try {
        const query = {
            attributes: { exclude: ['password', 'isDeleted'] },
            where: { login },
            limit: 1,
            raw : true
        };

        const users = await User.findAll(query);

        return users;
    } catch (e) {
        return new Error(e);
    }
};

const getUser = async (userId) => {
    try {
        const query = {
            attributes: { exclude: ['password', 'isDeleted'] },
            where: {
                id: userId,
                isDeleted: { [Op.not]: true }
            },
            limit: 1,
            raw : true
        };

        const users = await User.findAll(query);

        return users;
    } catch (e) {
        return new Error(e);
    }
};

const getUserByLoginPass = async (login, password) => {
    try {
        const query = {
            attributes: { exclude: ['password', 'isDeleted'] },
            where: {
                login,
                password,
                isDeleted: { [Op.not]: true }
            },
            limit: 1,
            raw : true
        };

        const users = await User.findAll(query);

        return users;
    } catch (e) {
        return new Error(e);
    }
};

const createUser = async (userObj) => {
    try {
        const user = await User.create(userObj);

        return user;
    } catch (e) {
        return new Error(e);
    }
};

const updateUser = async (userId, age) => {
    try {
        const user = { age };
        const where = {
            id: userId
        };
        const result = await User.update(user, { where });

        return result;
    } catch (e) {
        return new Error(e);
    }
};

const deleteUser = async (userId) => {
    try {
        const user = {
            isDeleted: true
        };
        const where = {
            id: userId,
            isDeleted: false
        };
        const result = await User.update(user, { where });

        return result;
    } catch (e) {
        return new Error(e);
    }
};

module.exports = {
    getAutoSuggestUsers,
    getUser,
    getUserByLogin,
    getUserByLoginPass,
    createUser,
    updateUser,
    deleteUser
};
