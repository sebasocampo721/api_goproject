'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('learners', [
       {
        id: 1,
        status: 'active',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        status: 'inactive',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        status: 'pending',
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('learners', null, {});
  }
};
