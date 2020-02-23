module.exports = (sequelize, DataTypes) => {
    const UserGroup = sequelize.define('UserGroup', {
        UserId: { type: DataTypes.INTEGER, field: 'UserId' },
        GroupId: { type: DataTypes.INTEGER, field: 'GroupId' }
    }, { tableName: 'UserGroup' });
    UserGroup.associate = models => {
        models.User.belongsToMany(models.Group, { through: UserGroup });
        models.Group.belongsToMany(models.User, { through: UserGroup });
    };
    return UserGroup;
};
