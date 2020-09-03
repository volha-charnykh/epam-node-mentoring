const {UUID} = require("sequelize");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('user-groups', {
            groupId: {
                type: UUID,
                allowNull: false,
                foreignKey: true,
                unique: 'unique-user-per-group',
                references: {model: 'groups', key: 'id'},
                onDelete: 'cascade',
                onUpdate: 'cascade'
            },
            userId: {
                type: UUID,
                allowNull: false,
                foreignKey: true,
                unique: 'unique-user-per-group',
                references: {model: 'users', key: 'id'},
                onDelete: 'cascade',
                onUpdate: 'cascade'
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('user-groups');
    }
};
