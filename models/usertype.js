'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // One-to-many: userType -> user
      userType.hasMany(models.user, {
        foreignKey: 'userTypeId',
        as: 'users'
      });
    }
  }
  userType.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'userType',
  });
  return userType;
};