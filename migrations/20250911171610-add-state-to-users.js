'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'state', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Activo',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'state');
  }
};
