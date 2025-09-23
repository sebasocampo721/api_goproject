'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      group.belongsTo(models.program, {
        foreignKey: 'programId',
        as: 'program'
      });
    }
  }
  group.init({
    fichaGroup: DataTypes.STRING,
    numApprenticess: DataTypes.STRING,
    tartDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    programId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'group',
  });
  return group;
};