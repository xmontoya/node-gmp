import jwt from 'jsonwebtoken';
import request from 'supertest';
import app from '../../app';

import userGroup from '../../services/user-group';

import mockUserGroup from '../mock/user-group';

jest.mock('jsonwebtoken');
jest.mock('../../services/user-group');

describe('User-Group Endpoints', () => {
    jwt.verify.mockResolvedValue({ login: 'test' });

    it('should return a 200 when a users are assigned to a group', () => {
        userGroup.addUsersToGroup.mockReturnValue(mockUserGroup.userGroupList);
        return request(app)
            .post('/user-group')
            .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6Ik')
            .send({ group_id: 4, users: [2, 3] })
            .then(response => {
                expect(response.body.length).toEqual(2);
                expect(response.statusCode).toEqual(200);
            });
    });

    it('Should get a 204 when a user is removed form a group', () => {
        userGroup.removeGroup.mockReturnValue(mockUserGroup.emptyUserGroup);
        return request(app)
            .delete('/user-group/3/2')
            .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6Ik')
            .then(response => {
                expect(response.statusCode).toEqual(204);
            });
    });
});
