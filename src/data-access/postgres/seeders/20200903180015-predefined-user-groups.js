module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('user-groups', [{
            userId: '2580bd3b-8090-45f3-b1e3-e4fc55288a60',
            groupId: '2580bd3b-8090-45f3-b1e3-e4fc55288a70'
        }, {
            userId: '2580bd3b-8090-45f3-b1e3-e4fc55288a61',
            groupId: '2580bd3b-8090-45f3-b1e3-e4fc55288a71'
        }], {});
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('user-groups', null, {});
    }
};
