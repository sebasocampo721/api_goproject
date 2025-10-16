'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('userTypes', [
      {
        id: 1,
        name: 'administrador',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Instructor',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'aprendiz',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: 'investigator',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('userTypes', null, {});
  }
};
