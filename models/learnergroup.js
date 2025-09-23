'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class learnerGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Esta tabla es una tabla puente para Learner y Group (muchos a muchos)
      learnerGroup.belongsTo(models.learner, {
        foreignKey: 'learnerId',
        as: 'learner'
      });
      learnerGroup.belongsTo(models.group, {
        foreignKey: 'groupId',
        as: 'group'
      });
    }
  }
  learnerGroup.init({
    learnerId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'learnerGroup',
  });
  return learnerGroup;
};