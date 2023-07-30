"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("medicamentos", {
      medicamento_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      deposito_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "depositos",
          key: "deposito_id",
        },
      },
      nome_medicamento: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
          msg: "Este medicamento já está cadastrado",
        },
      },
      nome_laboratorio: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      dosagem: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      unidade_dosagem: {
        type: Sequelize.ENUM("mg", "mcg", "ml", "g", "%", "outro"),
        allowNull: false,
      },
      tipo: {
        type: Sequelize.ENUM("controlado", "naocontrolado"),
        allowNull: false,
      },     
      preco_unitario: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("medicamentos");
  },
};
