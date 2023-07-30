const Deposito = require("../models/Deposito");

async function checkUserDeposito(id){
    
    const deposito = await Deposito.findOne({where:{depositoId:id}});
    
    if(!deposito){
       
        return false;
    }
    return deposito.dataValues;
   
}

module.exports = {
    checkUserDeposito
};