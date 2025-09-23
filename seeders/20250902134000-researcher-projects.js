'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('researcherProjects', [
      {
        researcherId: 1,  // Asegúrate que exista un researcher con ID 1
        projectId: 1,     // Asegúrate que exista un project con ID 1
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        researcherId: 1,
        projectId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        researcherId: 2,
        projectId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        researcherId: 3,
        projectId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('researcherProjects', null, {});
  }
};
