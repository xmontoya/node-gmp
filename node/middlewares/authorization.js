import jwt from 'jsonwebtoken';

import config from '../config/config.json';
import { logResponse } from '../utils/logger';

const env = process.env.NODE_ENV || 'development';
const secretKey = config[env].auth.key;

const authorization = {
    authenticate: (req, res, next) => {
        const token = req.headers.authorization;

        if (token) {
            jwt.verify(token, secretKey, (err, decoded) => {
                if (err) {
                    const message = 'Forbidden Error';
                    logResponse(403, { message });
                    return res.status(403).send({ message });
                }

                req.decoded = decoded;
                return next();
            });
        } else {
            const message = 'Unauthorized Error';
            logResponse(401, { message });
            return res.status(401).send({ message });
        }
    }
};

module.exports = authorization;
