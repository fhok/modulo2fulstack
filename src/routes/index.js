const { Router } = require('express');
const { routesFromUser } = require('./user.routes');
const { routesFromDeposito } = require('./deposito.routes');
const { routesFromMedicamento } = require('./medicamento.routes');

const routes = Router();

routes.use('/api', routesFromUser()); 
routes.use('/api', routesFromDeposito()); 
routes.use('/api', routesFromMedicamento()); 

module.exports = routes;
