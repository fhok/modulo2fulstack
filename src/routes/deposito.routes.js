const { createDeposito,updateDeposito,updateStatusDeposito,getDepositos,getDepositosId,deleteDeposito} = require("../controllers/deposito.controller");
const router = require("express").Router();
const auth = require("../middlewares/auth");

class DepositoRoutes{
    routesFromDeposito(){
        router.get("/depositos",auth,getDepositos);
        router.get("/depositos/:id",auth,getDepositosId);
        router.post("/depositos",auth,createDeposito);
        router.patch("/depositos/:id",auth,updateDeposito);
        router.patch("/depositos/:id/status",auth,updateStatusDeposito);
        router.delete("/depositos/:id",auth,deleteDeposito);
        return router;
    }

}

module.exports = new DepositoRoutes();