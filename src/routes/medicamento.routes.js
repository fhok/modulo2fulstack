const {createMedicamento,updateMedicamento,getMedicamentos,getMedicamentoId,deleteMedicamento } = require("../controllers/medicamento.controller");
const router = require("express").Router();
const auth = require("../middlewares/auth");

class MedicamentoRoutes{
    routesFromMedicamento(){

        router.get("/medicamentos",auth,getMedicamentos);
        router.get("/medicamentos/:medicamentoId",auth,getMedicamentoId);
        router.post("/medicamentos",auth,createMedicamento);
        router.patch("/medicamentos/:medicamentoId",auth,updateMedicamento);
        router.delete("/medicamentos/:medicamentoId",auth,deleteMedicamento);

        return router;
    }

}

module.exports = new MedicamentoRoutes();