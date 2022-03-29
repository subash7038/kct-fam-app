'use strict';
const {
  Model
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
    request_id: DataTypes.STRING,
    emp_id: DataTypes.STRING,
    user_level: DataTypes.NUMBER,
    event_type: DataTypes.STRING,
    event_info: DataTypes.JSON,
    approval_status: DataTypes.NUMBER,
    budget_ref_no: DataTypes.STRING,
    aad_no: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'requests',
  });
  return requests;
};