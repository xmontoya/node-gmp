import express from 'express';
import userRouter from './routes/user';

const app = express();
const port = 3000;

app.use(userRouter);

app.use((req, res) => {
    res.status(404).send('Sorry cant find that!');
});

app.listen(port, () => console.log(`Node GMP listening on port ${port}!`));
