'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      // Admin belongs to user
      admin.belongsTo(models.user, {
        foreignKey: 'userId',
        as: 'user'
      });
    }
  }
  admin.init({
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'admin',
  });
  return admin;
};