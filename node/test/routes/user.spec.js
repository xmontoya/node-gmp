import jwt from 'jsonwebtoken';
import request from 'supertest';
import app from '../../app';

import users from '../../services/users';

import mockUsers from '../mock/users';

jest.mock('jsonwebtoken');
jest.mock('../../services/users');

describe('User Endpoints', () => {
    jwt.verify.mockResolvedValue({ login: 'test' });

    it('should get a list of users', () => {
        users.getAutoSuggestUsers.mockReturnValue(mockUsers.userList);
        return request(app)
            .get('/users')
            .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6Ik')
            .then(response => {
                expect(response.body.length).toEqual(3);
                expect(response.statusCode).toEqual(200);
            });
    });

    it('Should get a single user', () => {
        users.getUser.mockReturnValue(mockUsers.singleUser);
        return request(app)
            .get('/user/3')
            .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6Ik')
            .then(response => {
                expect(response.body).toHaveProperty('id');
                expect(response.statusCode).toEqual(200);
            });
    });

    it('Should get a 400 error for invalid login', () => {
        users.getUser.mockReturnValue(mockUsers.singleUser);
        return request(app)
            .post('/user')
            .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6Ik')
            .send({ password: 'supersecretpass', age: '20' })
            .then(response => {
                expect(response.text).toEqual('Error validating request body. "login" is required.');
                expect(response.statusCode).toEqual(400);
            });
    });

    it('Should get a 201 when a new user is created', () => {
        users.getUserByLogin.mockReturnValue(mockUsers.emptyUsers);
        users.createUser.mockReturnValue({ get: () => mockUsers.singleUser[0] });
        return request(app)
            .post('/user')
            .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6Ik')
            .send({ login: 'developer', password: 'supersecretpass', age: 20 })
            .then(response => {
                expect(response.body).toHaveProperty('id');
                expect(response.statusCode).toEqual(201);
            });
    });

    it('Should get a 204 when user is updated', () => {
        users.updateUser.mockReturnValue(mockUsers.emptyUsers);
        return request(app)
            .put('/user/3')
            .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6Ik')
            .send({ age: 30 })
            .then(response => {
                expect(response.statusCode).toEqual(204);
            });
    });

    it('Should get a 204 when user is deleted', () => {
        users.deleteUser.mockReturnValue(mockUsers.emptyUsers);
        return request(app)
            .delete('/user/4')
            .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6Ik')
            .then(response => {
                expect(response.statusCode).toEqual(204);
            });
    });
});
