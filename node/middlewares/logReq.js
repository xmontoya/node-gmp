import { logger } from '../utils/logger';

const logReq = (req, res, next) => {
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

    next();
};

module.exports = logReq;
