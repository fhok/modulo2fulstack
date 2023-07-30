const { DataTypes, DATE} = require('sequelize');
const { connect } = require('../database/connect');
const Deposito = require('./Deposito');


const User = connect.define(
  'user',
  {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        len: [2, 20],
      },
    },
    sobrenome: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        len: [2, 20],
      },
    },
    genero: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dataAniversario: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING(11),
      allowNull: false,
      validate: {
        len: {
          args: [11, 11],
          msg: "Este campo deve ter exatamente 11 caracteres."
        }
      },
      unique: {
        msg: "Este cpf já esta cadastrado"
      }
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: { msg: 'Informe um email válido' },
      },
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
          msg:
            'A senha deve ter no mínimo 8 caracteres, pelo menos 1 letra maiúscula e 1 número',
        },
      },
    },
    status: {
      type: DataTypes.ENUM('Ativo', 'Inativo'),
      defaultValue: 'Ativo',
      validate: {
        isIn: {
          args: [['Ativo', 'Inativo']],
          msg: 'Status deve ser Ativo ou Inativo',
        },
      },
    },
    createdAt:DATE,
    updatedAt: DATE,
    
  },
  {
    underscored: true,
  }
);

User.associate = () => {
  User.hasMany(Deposito, {
    foreignKey: 'userId',
    as: 'depositos',
  });
};



module.exports = User;
