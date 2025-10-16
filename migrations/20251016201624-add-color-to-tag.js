'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('tags', 'color', {
      type: Sequelize.STRING,
      allowNull: true, // o false si quieres que sea obligatorio
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('tags', 'color');
  }
};
