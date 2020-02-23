import { Group } from '../models';

module.exports = {
    list(req, res) {
        return Group
            .findAll()
            .then(groups => res.status(200).send(groups))
            .catch(error => res.status(400).send(error));
    },
    getGroup(req, res) {
        const query = {
            where: {
                id: req.params.id
            }
        };

        return Group
            .findAll(query)
            .then(groups => {
                if (groups.length >= 1) {
                    return res.status(200).send(groups[0]);
                }

                return res.status(404).send('group not found.');
            })
            .catch(error => res.status(400).send(error));
    },
    create(req, res) {
        const query = {
            name: req.body.name,
            permissions: req.body.permissions
        };

        return Group
            .create(query)
            .then(group => res.status(201).send(group))
            .catch(error => res.status(400).send(error));
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
            .then(() => res.status(204).send())
            .catch(error => res.status(400).send(error));
    },
    delete(req, res) {
        const where = {
            id: req.params.id
        };

        return Group.destroy({ where })
            .then(() => res.status(204).send())
            .catch(error => res.status(400).send(error));
    }
};
