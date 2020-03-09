import request from 'supertest';
import app from '../../app';

import auth from '../../services/auth';
import users from '../../services/users';

jest.mock('../../services/auth');
jest.mock('../../services/users');

describe('Auth login endpoint', () => {
    auth.login.mockReturnValue('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
    it('should create a new token for user', () => {
        users.getUserByLoginPass.mockReturnValue([{ login: 'test', password: 'test' }]);
        return request(app)
            .post('/login')
            .send({ login: 'test', password: 'test' })
            .then(response => {
                expect(response.statusCode).toEqual(201);
            });
    });

    it('should return a status 400 for invalid user', () => {
        users.getUserByLoginPass.mockReturnValue([]);
        return request(app)
            .post('/login')
            .send({ login: 'test', password: 'test' })
            .then(response => {
                expect(response.statusCode).toEqual(400);
            });
    });
});
