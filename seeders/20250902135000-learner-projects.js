'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('learnerProjects', [
      {
        learnerId: 1,  // Asegúrate que exista un learner con ID 1
        projectId: 1,  // Asegúrate que exista un project con ID 1
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        learnerId: 2,
        projectId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        learnerId: 2,
        projectId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        learnerId: 3,
        projectId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('learnerProjects', null, {});
  }
};
