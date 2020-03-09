import express from 'express';
import cors from 'cors';

import { logger } from './utils/logger';
import logReq from './middlewares/logReq';

import authRouter from './routes/auth';
import groupRouter from './routes/group';
import userGroupRouter from './routes/user-group';
import userRouter from './routes/user';

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logReq);
app.use(authRouter, groupRouter, userGroupRouter, userRouter);


app.use((err, req, res, next) => { // eslint-disable-line
    const message = 'Something broke!';
    const status = 500;

    logger.error({ message, status, error: err });
    res.status(status).json({ message });
});

app.use((req, res) => {
    const message = 'Sorry cant find that!';
    const status = 404;

    logger.error({ message, status });
    res.status(status).json({ message });
});

module.exports = app;
