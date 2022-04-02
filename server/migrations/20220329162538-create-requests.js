'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Requests', {
      request_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      emp_id: {
        type: Sequelize.STRING,
        references: {
          model: 'Users',
          key: 'emp_id',
       }
      },
      user_level: {
        type: Sequelize.INTEGER
      },
      event_type: {
        type: Sequelize.STRING
      },
      event_info: {
        type: Sequelize.JSON
      },
      approval_status: {
        type: Sequelize.INTEGER
      },
      budget_ref_no: {
        type: Sequelize.STRING
      },
      aad_no: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Requests');
  }
};