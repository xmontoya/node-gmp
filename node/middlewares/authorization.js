import jwt from 'jsonwebtoken';
import { auth } from 'config';

import { logResponse } from '../utils/logger';

const secretKey = auth.key;

const authorization = {
    authenticate: (req, res, next) => {
        const token = req.headers.authorization;

        if (!token) {
            const message = 'Unauthorized Error';

            logResponse(401, { message });
            return res.status(401).send({ message });
        }

        const result = jwt.verify(token, secretKey, (err, decoded) => {
            return { err, decoded };
        });

        if (result.err) {
            const message = 'Forbidden Error';
            logResponse(403, { message });
            return res.status(403).send({ message });
        }

        req.decoded = result.decoded;
        return next();
    }
};

module.exports = authorization;
