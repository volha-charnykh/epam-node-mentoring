module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('groups', [{
            id: '2580bd3b-8090-45f3-b1e3-e4fc55288a70',
            name: 'admin',
            permissions: Sequelize.literal(`ARRAY['WRITE']::"enum_groups_permissions"[]`)
        }, {
            id: '2580bd3b-8090-45f3-b1e3-e4fc55288a71',
            name: 'user',
            permissions: Sequelize.literal(`ARRAY['READ']::"enum_groups_permissions"[]`)
        }], {});
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('groups', null, {});
    }
};
