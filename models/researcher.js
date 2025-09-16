'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class researcher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      researcher.belongsTo(models.user, {
        foreignKey: 'userId',
        as: 'user'
      });
    }
  }
  researcher.init({
    phone: DataTypes.STRING,
    institution: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'researcher',
  });
  return researcher;
};