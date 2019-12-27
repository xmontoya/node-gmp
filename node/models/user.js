
import uuidv1 from 'uuid/v1';
import utils from '../libraries/utils';

const users = [
    {
        id: '0c370440-2823-11ea-845f-a9c4350eae74',
        login: 'administrator',
        password: 'administrator',
        age: 30,
        isDeleted: true
    },
    {
        id: '0fd539a0-2823-11ea-845f-a9c4350eae74',
        login: 'firstuser',
        password: 'firstuser',
        age: 28
    },
    {
        id: '8cf47cd0-2827-11ea-ba37-d90b07e599da',
        login: 'seconduser',
        password: 'seconduser',
        age: 26
    },
    {
        id: '10bf4b80-2823-11ea-845f-a9c4350eae74',
        login: 'tercerousr',
        password: 'tercerousr',
        age: 24
    },
    {
        id: '8e495e70-2827-11ea-ba37-d90b07e599da',
        login: 'cuatrousuario',
        password: 'cuatrousuario',
        age: 25
    }
];

const usersModel = {
    getUser: (id) => {
        const userIndex = users.findIndex(user => user.id === id);
        if (users[userIndex]) {
            return users[userIndex];
        }
        return false;
    },
    getUserByLogin: (login)  => {
        const user = users.filter(item => item.login === login);
        if (user) {
            return user[0];
        }
        return false;
    },
    getAutoSuggestUsers: (loginSubstring, limit) => {
        const usersFiltered = users.filter(user => (!user.hasOwnProperty('isDeleted') || user.isDeleted === false) && user.login.includes(loginSubstring));
        return usersFiltered.slice(0, limit).sort(utils.userCompare);
    },
    saveUser: (user) => {
        user.id = uuidv1();
        users.push(user);
        return user;
    },
    updateUser: (id, userInfo) => {
        const userIndex = users.findIndex(user => user.id === id);
        if (users[userIndex]) {
            return users[userIndex] = { ...users[userIndex], ...userInfo };
        }
        return false;
    },
    deleteUser: (id) => {
        const userIndex = users.findIndex(user => user.id === id);
        if (users[userIndex]) {
            return users[userIndex].isDeleted = true;
        }
        return false;
    }
};

module.exports = usersModel;
