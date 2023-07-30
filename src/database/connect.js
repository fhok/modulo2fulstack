const {Sequelize} = require('sequelize');

const dbConfig = require('../config/db.config');

const connect = new Sequelize(dbConfig);

//exporta o modulo de conexão
module.exports = {connect};