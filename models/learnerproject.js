'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class learnerProject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      learnerProject.belongsTo(models.learner, {
        foreignKey: 'learnerId',
        as: 'learner'
      });
      learnerProject.belongsTo(models.project, {
        foreignKey: 'projectId',
        as: 'project'
      });
    }
  }
  learnerProject.init({
    learnerId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'learnerProject',
  });
  return learnerProject;
};