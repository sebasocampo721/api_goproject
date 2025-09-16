'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('researchers', [
      {
        id: 1,
        phone: '555-1234567',
        institution: 'Universidad Nacional',
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        phone: '555-9876543',
        institution: 'Instituto de Ciencias',
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        phone: '555-4567890',
        institution: 'Centro de Investigación Avanzada',
        userId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('researchers', null, {});
  }
};
