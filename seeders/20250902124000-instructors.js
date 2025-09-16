'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('instructors', [
      {
        profession: 'Ingeniero de Software',
        userId: 1,  // Asegúrate que el usuario con ID 1 exista
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        profession: 'Profesor de Matemáticas',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        profession: 'Especialista en Marketing',
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('instructors', null, {});
  }
};
