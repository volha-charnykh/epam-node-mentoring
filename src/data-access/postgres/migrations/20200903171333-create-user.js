const {BOOLEAN, INTEGER, STRING, UUID, UUIDV4} = require("sequelize");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('users', {
            id: {
                type: UUID,
                defaultValue: UUIDV4,
                allowNull: false,
                primaryKey: true
            },
            login: {
                type: STRING,
                unique: true,
                allowNull: false
            },
            password: {
                type: STRING,
                allowNull: false
            },
            age: {
                type: INTEGER,
                allowNull: false,
                validate: {min: 4, max: 130}
            },
            isDeleted: {
                type: BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('users');
    }
};
