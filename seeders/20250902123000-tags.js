'use strict';

const { col } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('tags', [
      {
        id: 1,
        name: 'Tecnología',
        color: '#FF5733',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Educación',
        color: '#33FF57',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'Salud',
        color: '#3357FF',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: 'Innovación',
        color: '#F1C40F',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('tags', null, {});
  }
};
