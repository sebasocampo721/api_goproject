'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class administrador extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      // administrador belongs to user
      administrador.belongsTo(models.user, {
        foreignKey: 'userId',
        as: 'user'
      });
    }
  }
  administrador.init({
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'administrador',
    tableName: 'administrador',
  });
  return administrador;
};