module.exports = {
    up: (queryInterface, Sequelize) => { // eslint-disable-line
        return queryInterface.bulkInsert('UserGroup', [
            {
                UserId: 1,
                GroupId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },
    down: (queryInterface, Sequelize) => { // eslint-disable-line
        return queryInterface.bulkDelete('UserGroup', null, {});
    }
};
