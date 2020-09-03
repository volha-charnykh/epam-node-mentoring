module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('users',
            Array.from(Array(5).keys()).map((el, i) => ({
                id: `2580bd3b-8090-45f3-b1e3-e4fc55288a6${i}`,
                login: `user${el}@test.com`,
                password: 'pass123',
                age: 30,
                isDeleted: false
            }), {}));
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users', null, {});
    }
};
