'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
      {
        id: 1,
        name: 'Carlos Admin',
        email: 'admin@example.com',
        password: 'admin123',
        gender: 1,
        age: 35,
        userTypeId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Laura Instructor',
        email: 'instructor@example.com',
        password: 'instructor123',
        gender: 2,
        age: 29,
        userTypeId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'Pedro Learner',
        email: 'learner@example.com',
        password: 'learner123',
        gender: 1,
        age: 22,
        userTypeId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: 'Sofía Researcher',
        email: 'researcher@example.com',
        password: 'researcher123',
        gender: 2,
        age: 32,
        userTypeId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        name: 'Investigador 1',
        email: 'investigador1@example.com',
        password: 'pass123',
        gender: 1,
        age: 40,
        userTypeId: 4, // tipo investigador
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        name: 'Investigador 2',
        email: 'investigador2@example.com',
        password: 'pass456',
        gender: 2,
        age: 38,
        userTypeId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
