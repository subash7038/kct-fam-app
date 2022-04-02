'use strict';
const {
  Model,Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      // define association here
      
    }
  }
  Department.init({
    department: {
      primaryKey: true,
      type:DataTypes.STRING,
    },
    allocated_budget: DataTypes.INTEGER,
    used_budget: DataTypes.INTEGER,
    department_name: DataTypes.STRING,
    createdAt: {
      defaultValue: Sequelize.NOW,
      type:DataTypes.DATE

    },
    updatedAt:  {
      defaultValue: Sequelize.NOW,
      type:DataTypes.DATE

    }
  }, {
    sequelize,
    modelName: 'Department',
  });
  return Department;
};