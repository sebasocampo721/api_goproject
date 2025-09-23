'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      request.belongsTo(models.project, {
        foreignKey: 'projectId',
        as: 'project'
      });
    }
  }
  request.init({
    observation: DataTypes.TEXT,
    status: DataTypes.STRING,
    submissionDate: DataTypes.DATE,
    projectId: DataTypes.INTEGER,
    learnerStatus: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'request',
  });
  return request;
};