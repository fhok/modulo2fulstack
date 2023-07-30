"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("depositos", {
      deposito_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users", // Nome da tabela referenciada
          key: "user_id", // Nome da coluna referenciada
        },
      },
      razao_social: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      cnpj: {
        type: Sequelize.STRING(14),
        allowNull: false,
        unique: true,
      },
      nome_fantasia: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        
      },
      telefone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      celular: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cep: {
        type: Sequelize.STRING(8),
        allowNull: false,
      },
      logradouro: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      numero: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      complemento: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bairro: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cidade: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      uf: {
        type: Sequelize.STRING(2),
        allowNull: false,
      },
      latitude: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      longitude: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM("Ativo", "Inativo"),
        defaultValue: "Ativo",
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

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("depositos");
  },
};
