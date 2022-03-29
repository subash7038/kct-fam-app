'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('requests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      request_id: {
        type: Sequelize.STRING
      },
      emp_id: {
        type: Sequelize.STRING
      },
      user_level: {
        type: Sequelize.NUMBER
      },
      event_type: {
        type: Sequelize.STRING
      },
      event_info: {
        type: Sequelize.JSON
      },
      approval_status: {
        type: Sequelize.NUMBER
      },
      budget_ref_no: {
        type: Sequelize.STRING
      },
      aad_no: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('requests');
  }
};