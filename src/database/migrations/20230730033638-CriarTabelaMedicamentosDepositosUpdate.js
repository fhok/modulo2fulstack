"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("medicamento_depositos", {
      fields: ["medicamento_id"],
      type: "foreign key",
      name: "fk_medicamento_depositos_medicamentos",
      references: {
        table: "medicamentos",
        field: "medicamento_id",
      },
      onDelete: "CASCADE", 
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      "medicamentoDepositos",
      "fk_medicamento_depositos_medicamentos"
    );
  },
};
