'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('admins', [
      {
        userId: 1,  // Asegúrate que exista el usuario con ID 1
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('admins', null, {});
  }
};
