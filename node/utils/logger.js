import winston from 'winston';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint(),
    ),
    transports: [
        new winston.transports.Console()
    ],
    exitOnError: false
});

const logResponse = (status, message) => {
    if (process.env.NODE_ENV !== 'test') {
        let log = {};
        switch (status) {
            case 200:
                log = {
                    level: 'info',
                    code: 'Ok',
                    status,
                    message
                };
                break;
            case 201:
                log = {
                    level: 'info',
                    code: 'Created',
                    status,
                    message
                };
                break;
            case 204:
                log = {
                    level: 'info',
                    code: 'No Content',
                    status,
                    message
                };
                break;
            case 400:
                log = {
                    level: 'error',
                    code: 'Bad Request',
                    status,
                    error: message
                };
                break;
            case 401:
                log = {
                    level: 'error',
                    code: 'Unauthorized',
                    status,
                    error: message
                };
                break;
            case 403:
                log = {
                    level: 'error',
                    code: 'Forbidden',
                    status,
                    error: message
                };
                break;
            case 404:
                log = {
                    level: 'error',
                    code: 'Not Found',
                    status,
                    error: message
                };
                break;
            case 500:
            default:
                log = {
                    level: 'error',
                    code: 'Internal Server Error',
                    status: 500,
                    error: message
                };
        }

        logger.log(log);
    }
};

module.exports = { logger, logResponse };
