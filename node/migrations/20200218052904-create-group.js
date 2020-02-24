module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Groups', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            permissions: {
                type: Sequelize.ARRAY(Sequelize.STRING),
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => { // eslint-disable-line
        return queryInterface.dropTable('Groups');
    }
};
