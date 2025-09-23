'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class productType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // One-to-many: productType -> projects
      productType.hasMany(models.project, {
        foreignKey: 'productTypeId',
        as: 'projects'
      });
    }
  }
  productType.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'productType',
  });
  return productType;
};