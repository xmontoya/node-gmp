import jwt from 'jsonwebtoken';

import config from '../config/config.json';
import { logResponse } from '../utils/logger';

const env = process.env.NODE_ENV || 'development';
const secretKey = config[env].auth.key;

module.exports = {
    login(req, res) {
        console.log(req.user);
        const token = jwt.sign(req.user, secretKey, { expiresIn: 1440 });

        logResponse(201, { token });
        return res.status(201).send({ token });
    }
};
