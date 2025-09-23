'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class document extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      document.belongsTo(models.project, {
        foreignKey: 'projectId',
        as: 'project'
      });
    }
  }
  document.init({
    name: DataTypes.STRING,
    path: DataTypes.STRING,
    projectId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'document',
  });
  return document;
};