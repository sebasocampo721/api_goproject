'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class instructor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Instructor belongs to user
      instructor.belongsTo(models.user, {
        foreignKey: 'userId',
        as: 'user'
      });
    }
  }
  instructor.init({
    profession: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'instructor',
  });
  return instructor;
};