const { DataTypes } = require("sequelize");
const { connect } = require("../database/connect");

const MedicamentoDeposito = connect.define(
  "medicamento_depositos",
  {
    medicamentoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "medicamentos",
        key: "medicamentoId",
      },
      onDelete: 'CASCADE', 
    },
    depositoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "depositos",
        key: "depositoId",
      },
    },
  },
  {
    underscored: true,
    timestamps: false,
  }
);

module.exports = MedicamentoDeposito;


