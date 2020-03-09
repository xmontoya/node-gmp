import jwt from 'jsonwebtoken';
import request from 'supertest';
import app from '../../app';

import groups from '../../services/groups';

import mockGroups from '../mock/groups';

jest.mock('jsonwebtoken');
jest.mock('../../services/groups');

describe('Group Endpoints', () => {
    jwt.verify.mockResolvedValue({ login: 'test' });

    it('should get a list of groups', () => {
        groups.getList.mockReturnValue(mockGroups.groupList);
        return request(app)
            .get('/groups')
            .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6Ik')
            .then(response => {
                expect(response.body.length).toEqual(3);
                expect(response.statusCode).toEqual(200);
            });
    });

    it('Should get a single group', () => {
        groups.getGroup.mockReturnValue(mockGroups.singleGroup);
        return request(app)
            .get('/group/3')
            .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6Ik')
            .then(response => {
                expect(response.body).toHaveProperty('id');
                expect(response.statusCode).toEqual(200);
            });
    });

    it('Should get a 201 when a new group is created', () => {
        groups.createGroup.mockReturnValue({ get: () => mockGroups.singleGroup[0] });
        return request(app)
            .post('/group')
            .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6Ik')
            .send({ name: 'testGroup', permissions: ['READ'] })
            .then(response => {
                expect(response.body).toHaveProperty('id');
                expect(response.statusCode).toEqual(201);
            });
    });

    it('Should get a 204 when group is updated', () => {
        groups.updateGroup.mockReturnValue(mockGroups.emptyGroups);
        return request(app)
            .put('/group/3')
            .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6Ik')
            .send({ permissions: ['READ', 'SHARE'] })
            .then(response => {
                expect(response.statusCode).toEqual(204);
            });
    });

    it('Should get a 204 when group is deleted', () => {
        groups.deleteGroup.mockReturnValue(mockGroups.emptyGroups);
        return request(app)
            .delete('/group/3')
            .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6Ik')
            .then(response => {
                expect(response.statusCode).toEqual(204);
            });
    });
});
