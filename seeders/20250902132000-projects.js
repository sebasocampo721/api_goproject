'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('projects', [
       {
        id: 1,
        name: 'Proyecto de Energías Renovables',
        description: 'Estudio y desarrollo de soluciones de energías limpias.',
        objective: 'Reducir la dependencia de combustibles fósiles.',
        justification: 'El cambio climático requiere una transición energética urgente.',
        problem: 'Alta contaminación y agotamiento de recursos no renovables.',
        productTypeId: 1,
        programId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Proyecto de Agricultura Sostenible',
        description: 'Implementación de técnicas agrícolas ecoamigables.',
        objective: 'Mejorar la productividad sin afectar el medio ambiente.',
        justification: 'Preservar los recursos naturales y aumentar la seguridad alimentaria.',
        problem: 'Degradación del suelo por prácticas agrícolas tradicionales.',
        productTypeId: 2,
        programId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'Proyecto de Tecnología Educativa',
        description: 'Desarrollo de plataformas digitales para educación remota.',
        objective: 'Facilitar el acceso a la educación en zonas rurales.',
        justification: 'Necesidad de educación inclusiva y accesible para todos.',
        problem: 'Brecha digital y falta de infraestructura tecnológica.',
        productTypeId: 3,
        programId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('projects', null, {});
  }
};
