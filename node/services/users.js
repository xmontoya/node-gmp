import { User } from '../models';
import { Op } from 'sequelize';

import { logResponse } from '../utils/logger';

module.exports = {
    getAutoSuggestUsers(req, res) {
        const query = {
            attributes: { exclude: ['password', 'isDeleted'] },
            order: [['login', 'ASC']],
            where: {
                isDeleted: { [Op.not]: true }
            },
            raw : true
        };

        if (req.query.loginSubstring) {
            query.where.login = { [Op.substring]: req.query.loginSubstring };
        }

        if (req.query.limit) {
            query.limit = req.query.limit;
        }

        return User
            .findAll(query)
            .then(users => {
                logResponse(200, users);
                return res.status(200).send(users);
            })
            .catch(error => {
                logResponse(400, error);
                return res.status(400).send(error);
            });
    },
    getUser(req, res) {
        const query = {
            attributes: { exclude: ['password', 'isDeleted'] },
            where: {
                id: req.params.id,
                isDeleted: { [Op.not]: true }
            },
            limit: 1,
            raw : true
        };

        return User
            .findAll(query)
            .then(users => {
                if (users.length >= 1) {
                    logResponse(200, users);
                    return res.status(200).send(users[0]);
                }
                const message = 'user not found.';
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
            login: req.body.login,
            password: req.body.password,
            age: req.body.age
        };

        return User
            .create(query)
            .then(user => {
                logResponse(201, user.get({ plain:true }));
                return res.status(201).send(user);
            })
            .catch(error => {
                logResponse(400, error);
                return res.status(400).send(error);
            });
    },
    update(req, res) {
        const user = {
            age: req.body.age
        };
        const where = {
            id: req.params.id
        };

        return User
            .update(user, { where })
            .then(() => {
                logResponse(204, '');
                return res.status(200).send();
            })
            .catch(error => {
                logResponse(400, error);
                return res.status(400).send(error);
            });
    },
    delete(req, res) {
        const user = {
            isDeleted: true
        };
        const where = {
            id: req.params.id,
            isDeleted: false
        };

        return User
            .update(user, { where })
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
