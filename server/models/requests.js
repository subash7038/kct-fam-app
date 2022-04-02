'use strict';
const {
  Model,Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class requests extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  requests.init({
    request_id: {
      primaryKey: true,
      type:DataTypes.INTEGER,
    },
    emp_id: DataTypes.STRING,
    user_level: DataTypes.INTEGER,
    event_type: DataTypes.STRING,
    event_info: DataTypes.JSON,
    approval_status: DataTypes.INTEGER,
    budget_ref_no: DataTypes.STRING,
    aad_no: DataTypes.STRING,
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
    modelName: 'Request',
  });
  return requests;
};