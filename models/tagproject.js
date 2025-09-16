'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tagProject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      tagProject.belongsTo(models.tag, {
        foreignKey: 'tagId',
        as: 'tag'
      });
      tagProject.belongsTo(models.project, {
        foreignKey: 'projectId',
        as: 'project'
      });
    }
  }
  tagProject.init({
    tagId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tagProject',
  });
  return tagProject;
};