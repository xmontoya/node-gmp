const users = [
    {
        id: '0c370440-2823-11ea-845f-a9c4350eae74',
        isDeleted: true
    },
    {
        id: '0fd539a0-2823-11ea-845f-a9c4350eae74'
    },
    {
        id: '8cf47cd0-2827-11ea-ba37-d90b07e599da'
    },
    {
        id: '10bf4b80-2823-11ea-845f-a9c4350eae74'
    },
    {
        id: '8e495e70-2827-11ea-ba37-d90b07e599da'
    }
];

const usersModel = {
    getUser: (id) => {
        const result = users.filter(user => user.id === id);
        return result;
    },

    getAutoSuggestUsers: () => users,

    saveUser: (user) => {
        users.push(user);
    },

    deleteUser: (id) => {
        const userIndex = users.findIndex(user => user.id === id);  
        if (users[userIndex]){
            return users[userIndex].isDeleted = true;
        }

        return false;
    }
};

module.exports = usersModel;
