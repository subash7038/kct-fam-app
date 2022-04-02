'use strict';
const {
  Model,Sequelize
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Department}) {
      // define association here
    
    }
    toJSON() {
      return { ...this.get(), password: undefined }
    }
  }
  User.init({
    emp_id: {
      type:DataTypes.STRING,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    department: DataTypes.STRING,
    designation: DataTypes.STRING,
    password: DataTypes.STRING,
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
    modelName: 'User',
  });
  return User;
};