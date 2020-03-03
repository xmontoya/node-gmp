import express from 'express';
import { logger } from './utils/logger';
import logReq from './middlewares/logReq';
import groupRouter from './routes/group';
import userGroupRouter from './routes/user-group';
import userRouter from './routes/user';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logReq);
app.use(groupRouter, userGroupRouter, userRouter);


app.use((err, req, res) => {
    const message = 'Something broke!';
    const status = 500;

    logger.error({
        message,
        status,
        error: err
    });

    res.status(status).send(message);
});

app.use((req, res) => {
    const message = 'Sorry cant find that!';
    const status = 404;

    logger.error({ message, status });

    res.status(status).send('Sorry cant find that!');
});

module.exports = app;
