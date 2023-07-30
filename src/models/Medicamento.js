const { DataTypes } = require("sequelize");
const { connect } = require("../database/connect");
const User = require("./User");
const Deposito = require("./Deposito");
const MedicamentoDeposito = require("./MedicamentoDeposito");

const Medicamento = connect.define(
  "medicamentos",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "userId",
      },
    },
    depositoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Deposito,
        key: "depositoId",
      },
    },
    medicamentoId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nomeMedicamento: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Este medicamento já esta cadastrado",
      },
    },
    nomeLaboratorio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dosagem: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unidadeDosagem: {
      type: DataTypes.ENUM("mg", "mcg", "ml", "g", "%", "outro"),
      allowNull: false,
    },
    tipo: {
      type: DataTypes.ENUM("controlado", "naocontrolado"),
      allowNull: false,
    },
    precoUnitario: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },

  {
    underscored: true,
  }
);

Medicamento.associate = () => {
  Medicamento.belongsToMany(Deposito, {
    through: MedicamentoDeposito,
    foreignKey: "medicamento_id",
    otherKey: "deposito_id",
    as: "depositos",
  });
  User.hasMany(Medicamento, {
    foreignKey: "user_id",
    as: "medicamentos",
  });
};

module.exports = Medicamento;
