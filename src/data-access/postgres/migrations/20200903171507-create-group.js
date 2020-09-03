const {ARRAY, ENUM, STRING, UUID, UUIDV4} = require("sequelize");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('groups', {
            id: {
                type: UUID,
                defaultValue: UUIDV4,
                allowNull: false,
                primaryKey: true
            },
            name: {
                type: STRING,
                unique: true,
                allowNull: false
            },
            permissions: {
                type: ARRAY(ENUM({values: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']})),
                allowNull: false
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('groups');
    }
};
