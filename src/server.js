const express = require("express");
const cors = require("cors");

const { connect } = require("./database/connect");
const routes = require("./routes");

class Server {

  constructor(server = express()) {
    this.middlewares(server);
    this.database();
    this.todasRodas(server);
    this.start(server);
  };

  async middlewares(app) {
    app.use(cors()) 
    app.use(express.json()) 
  }

  async database() {
    try {
      await connect.authenticate();
      console.log("Conexão estabelecida com sucesso.");
    } catch (error) {
      console.error("Não foi possível conectar ao banco de dados:", error);
      throw error;
    }
  }

  async start(app) {
    app.listen(process.env.PORTSERVER, () => {
      console.log(`Servidor rodando na porta ${process.env.PORTSERVER}`);
    });
  }

  async todasRodas(app) {
    app.use(routes)
  }

}

module.exports = { Server};
