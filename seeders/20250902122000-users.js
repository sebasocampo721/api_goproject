"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    // Pre-hashear todas las contraseñas
    const hashedAdmin = await bcrypt.hash("admin123", 10);
    const hashedInstructor = await bcrypt.hash("instructor123", 10);
    const hashedLearner = await bcrypt.hash("learner123", 10);
    const hashedResearcher = await bcrypt.hash("researcher123", 10);
    const hashedInv1 = await bcrypt.hash("pass123", 10);
    const hashedInv2 = await bcrypt.hash("pass456", 10);

    return queryInterface.bulkInsert("users", [
      {
        id: 1,
        name: "Carlos Admin",
        email: "admin@example.com",
        password: hashedAdmin,
        gender: 1,
        age: 35,
        userTypeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "Laura Instructor",
        email: "instructor@example.com",
        password: hashedInstructor,
        gender: 2,
        age: 29,
        userTypeId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: "Pedro Learner",
        email: "learner@example.com",
        password: hashedLearner,
        gender: 1,
        age: 22,
        userTypeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        name: "Sofía Researcher",
        email: "researcher@example.com",
        password: hashedResearcher,
        gender: 2,
        age: 32,
        userTypeId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        name: "Investigador 1",
        email: "investigador1@example.com",
        password: hashedInv1,
        gender: 1,
        age: 40,
        userTypeId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        name: "Investigador 2",
        email: "investigador2@example.com",
        password: hashedInv2,
        gender: 2,
        age: 38,
        userTypeId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users", null, {});
  },
};
