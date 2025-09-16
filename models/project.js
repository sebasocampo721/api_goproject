'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      project.belongsTo(models.productType, {
        foreignKey: 'productTypeId',
        as: 'productType'
      });

      project.belongsTo(models.program, {
        foreignKey: 'programId',
        as: 'program'
      });
    }
  }
  project.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    objective: DataTypes.TEXT,
    justification: DataTypes.TEXT,
    problem: DataTypes.TEXT,
    productTypeId: DataTypes.INTEGER,
    programId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'project',
  });
  return project;
};