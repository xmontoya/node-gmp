module.exports = {
    up: (queryInterface, Sequelize) => { // eslint-disable-line
        return queryInterface.bulkInsert('Users', [
            {
                login: 'admin',
                password: 'admin',
                age: 28,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                login: 'developer',
                password: 'developer',
                age: 28,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                login: 'tester',
                password: 'tester',
                age: 28,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                login: 'enduser',
                password: 'enduser',
                age: 28,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                login: 'deluser',
                password: 'deluser',
                age: 28,
                isDeleted: true,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },
    down: (queryInterface, Sequelize) => { // eslint-disable-line
        return queryInterface.bulkDelete('Users', null, {});
    }
};
