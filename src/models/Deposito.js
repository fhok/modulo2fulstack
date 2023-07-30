const { DataTypes } = require("sequelize");
const { connect } = require("../database/connect");
const User = require("./User");
const MedicamentoDeposito = require("./MedicamentoDeposito");
const Medicamento = require("./Medicamento");

const Deposito = connect.define(
  "depositos",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'userId',
      },
    },
    depositoId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    razaoSocial: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Esta razão social já esta cadastrada",
      },
    },
    cnpj: {
      type: DataTypes.STRING(14),
      allowNull: false,
      validate: {
        len: {
          args: [14, 14],
          msg: "Número cnpj deve ter 14 caracteres.",
        },
      },
      unique: {
        msg: "Este cnpj já esta cadastrado",
      },
    },
    nomeFantasia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: { msg: "Informe um email válido" },
      },
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    celular: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cep: {
      type: DataTypes.STRING(8),
      allowNull: false,
      validate: {
        len: {
          args: [8, 8],
          msg: "Cep deve ter 8 caracteres.",
        },
      },
    },
    logradouro: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    complemento: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bairro: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cidade: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uf: {
      type: DataTypes.STRING(2),
      allowNull: false,
      validate: {
        len: {
          args: [2, 2],
          msg: "Este campo deve ter 2 caracteres.",
        },
      },
    },
    latitude: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    longitude: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("Ativo", "Inativo"),
      defaultValue: "Ativo",
      validate: {
        isIn: {
          args: [["Ativo", "Inativo"]],
          msg: "Status deve ser Ativo ou Inativo",
        },
      },
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

Deposito.associate = () => { 
  Deposito.belongsToMany(Medicamento, { 
    through: MedicamentoDeposito,
    foreignKey: "deposito_id",
    otherKey: "medicamento_id",
    as: "medicamentos",
  });
  User.hasMany(Deposito, {
    foreignKey: "user_id",
    as: "depositos",
  });
};


module.exports = Deposito;
