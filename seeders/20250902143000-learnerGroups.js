'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('learnerGroups', [
      {
        learnerId: 1,  // Asegúrate que exista un learner con ID 1
        groupId: 1,    // Asegúrate que exista un group con ID 1
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        learnerId: 2,
        groupId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        learnerId: 3,
        groupId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        learnerId: 1,
        groupId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('learnerGroups', null, {});
  }
};
