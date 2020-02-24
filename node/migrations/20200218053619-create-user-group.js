module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('UserGroup', {
            UserId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Users',
                    key: 'id'
                },
                onDelete: 'cascade'
            },
            GroupId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Groups',
                    key: 'id'
                },
                onDelete: 'cascade'
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
        return queryInterface.dropTable('UserGroup');
    }
};
