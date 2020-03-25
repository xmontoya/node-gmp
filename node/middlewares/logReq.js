import { logger } from '../utils/logger';

const logReq = (req, res, next) => {
    if (process.env.NODE_ENV !== 'test') {
        const message = `Request: ${req.method} ${req.url}`;
        const requestInfo = {
            query: req.query,
            body: req.body
        };

        logger.log({
            message,
            level:'info',
            request: requestInfo
        });
    }
    next();
};

module.exports = logReq;
