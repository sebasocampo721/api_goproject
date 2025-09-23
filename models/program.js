'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class program extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // One-to-many: program -> groups
      program.hasMany(models.group, {
        foreignKey: 'programId',
        as: 'groups'
      });

      // One-to-many: program -> projects
      program.hasMany(models.project, {
        foreignKey: 'programId',
        as: 'projects'
      });
    }
  }
  program.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'program',
  });
  return program;
};