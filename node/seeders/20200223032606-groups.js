module.exports = {
    up: (queryInterface, Sequelize) => { // eslint-disable-line
        return queryInterface.bulkInsert('Groups', [
            {
                name: 'super',
                permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'],
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'human',
                permissions: ['READ', 'SHARE'],
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },
    down: (queryInterface, Sequelize) => { // eslint-disable-line
        return queryInterface.bulkDelete('Groups', null, {});
    }
};
