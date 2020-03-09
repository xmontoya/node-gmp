import config from 'config';
import jwt from 'jsonwebtoken';

const secretKey = config.auth.key;

const login = (user) => {
    const token = jwt.sign(user, secretKey, { expiresIn: 1440 });

    return token;
};

module.exports = {
    login
};
