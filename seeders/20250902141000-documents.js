'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('documents', [
      {
        name: 'Proyecto Informe Final',
        path: '/documents/proyecto-informe-final.pdf',
        projectId: 1,  // Asegúrate que exista un proyecto con ID 1
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Plan de Trabajo',
        path: '/documents/plan-de-trabajo.docx',
        projectId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Presentación del Proyecto',
        path: '/documents/presentacion-proyecto.pptx',
        projectId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('documents', null, {});
  }
};
