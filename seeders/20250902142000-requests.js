'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('requests', [
      {
        observation: 'Solicitud para extender la fecha de entrega.',
        status: 'pending',
        submissionDate: new Date('2025-08-15'),
        projectId: 1,  // Asegúrate que exista un proyecto con ID 1
        learnerStatus: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        observation: 'Revisión del proyecto para corrección de errores.',
        status: 'approved',
        submissionDate: new Date('2025-08-10'),
        projectId: 2,
        learnerStatus: 'completed',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        observation: 'Solicitud de material adicional para el proyecto.',
        status: 'rejected',
        submissionDate: new Date('2025-08-12'),
        projectId: 1,
        learnerStatus: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('requests', null, {});
  }
};
