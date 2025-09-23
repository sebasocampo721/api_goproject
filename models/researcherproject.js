'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class researcherProject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      researcherProject.belongsTo(models.researcher, {
        foreignKey: 'researcherId',
        as: 'researcher'
      });
      researcherProject.belongsTo(models.project, {
        foreignKey: 'projectId',
        as: 'project'
      });
    }
  }
  researcherProject.init({
    researcherId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'researcherProject',
  });
  return researcherProject;
};