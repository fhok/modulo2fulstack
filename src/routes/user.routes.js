const { createNewUser, login, updateStatusUser,updateDataUser,updateUserSenha,getDataUser} = require("../controllers/user.controller");
const auth = require("../middlewares/auth");

const router = require("express").Router();

class UserRoutes {
  routesFromUser() {
    router.get("/usuarios/:id",auth, getDataUser)
    router.post("/usuarios", createNewUser),
    router.post("/usuarios/login", login);
    router.patch("/usuarios/:id/status",auth, updateStatusUser)
    router.patch("/usuarios/:id",auth, updateDataUser)
    router.patch("/usuarios/:id/senha",auth, updateUserSenha)
    return router;
  }
}

module.exports = new UserRoutes();
