import express from 'express';
import groupRouter from './routes/group';
import userGroupRouter from './routes/user-group';
import userRouter from './routes/user';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(groupRouter, userGroupRouter, userRouter);

app.use((req, res) => {
    res.status(404).send('Sorry cant find that!');
});

module.exports = app;
