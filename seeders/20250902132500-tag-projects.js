'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('tagProjects', [
      {
        tagId: 1,  // Asegúrate que exista un tag con ID 1
        projectId: 1,  // Asegúrate que exista un project con ID 1
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tagId: 2,
        projectId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tagId: 1,
        projectId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tagId: 3,
        projectId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('tagProjects', null, {});
  }
};
