const {config} = require('dotenv');
const {verify} = require('jsonwebtoken');
config();

async function auth(req, res, next) {
    try{
        const authorization = req.headers.authorization.split(' ')[1];
        if(!authorization) return res.status(400).json({
            status: 'NOK',
            error: 'Token não informado'
        });

        const decodificar = verify(authorization, process.env.JWT_SECRET);
        req.userId = decodificar.id;
        next();
    } catch (error) {
        return res.status(401).json({
            status: 'NOK',
            error: 'Não autorizado - Token inválido'
        });
    }
}

module.exports = auth;