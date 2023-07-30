'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('medicamento_depositos', {
      medicamento_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      deposito_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('medicamento_depositos');
  }
};