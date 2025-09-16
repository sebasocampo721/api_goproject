'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('groups', [
      {
        id: 1,
        fichaGroup: 'FG-101',
        numApprenticess: '25',
        tartDate: new Date('2023-01-15'),
        endDate: new Date('2023-06-15'),
        programId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        fichaGroup: 'FG-102',
        numApprenticess: '30',
        tartDate: new Date('2023-02-01'),
        endDate: new Date('2023-07-01'),
        programId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        fichaGroup: 'FG-103',
        numApprenticess: '28',
        tartDate: new Date('2023-03-10'),
        endDate: new Date('2023-08-10'),
        programId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('groups', null, {});
  }
};
