const Deposito = require("../models/Deposito");
const MedicamentoDeposito = require("../models/MedicamentoDeposito");
const User = require("../models/User");
const { checkUserDeposito } = require("../services/checkDeposito");
const {
  checkDuplicateCnpj,
  checkDuplicateRazaoSocial,
} = require("../services/checkDuplicate");
const { validarCNPJ } = require("../utils/validarCpf-Cnpj");

class DepositoController {

    async getDepositos(req, res) {
        const status = req.query.status;
        try {
          // Verificar se o query param "status" foi informado
          if (status && (status !== "Ativo" && status !== "Inativo")) {
            return res.status(400).json({
                code: "NOK", 
                error: "Valor inválido para o parâmetro 'status'",
                msg: "Valores permitidos: 'Ativo' ou 'Inativo'",
            });
          }
      
          let depositos;
          if (status) {
            // Filtrar os depósitos com base no valor do query param "status"
            depositos = await Deposito.findAll({
              where: {
                status: status,
              },
            });
          } else {
            // Caso não seja informado o parâmetro de pesquisa (status), retornar todos os registros da base de dados
            depositos = await Deposito.findAll();
          }
      
          res.status(200).json(depositos);
        } catch (error) {
          console.error("Erro ao buscar depósitos:", error);
          res.status(500).json({ error: "Erro ao buscar depósitos" });
        }
      }

        async getDepositosId(req, res) {
            const depositoId = Number(req.params.id);
            try {
                const deposito = await Deposito.findOne({
                    where: {
                        depositoId,
                    },
                });
                if (!deposito) {
                    return res.status(404).json({
                        code: "NOK",
                        error: "Depósito não encontrado",
                    });
                }
                res.status(200).json(deposito);
            } catch (error) {
                console.error("Erro ao buscar depósito:", error);
                res.status(500).json({ error: "Erro ao buscar depósito" });
            }
        }

      



  async createDeposito(req, res) {
    //id do usuário logado
    const userIdToken = req.userId;
    const {
      userId,
      razaoSocial,
      cnpj,
      nomeFantasia,
      email,
      telefone,
      celular,
      cep,
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      status,
      latitude,
      longitude,
    } = req.body;

    try {
      if (userId) {
        if (userId !== userIdToken) {
          return res.status(401).json({
            code: "NOK",
            error: "Não autorizado para cadastrado depósito para outro usuário",
          });
        }
      }

      //verifica se os campos obrigatorios foram preenchidos

      if (
        !razaoSocial ||
        !cnpj ||
        !nomeFantasia ||
        !email ||
        !celular ||
        !cep ||
        !logradouro ||
        !numero ||
        !bairro ||
        !cidade ||
        !uf
      ) {
        return res.status(400).json({
          code: "NOK",
          error: "Dados inválidos",
          msg: "Verifique se todos os campos obrigatórios foram preenchidos",
        });
      }

      if (cnpj.length !== 14) {
        return res.status(400).json({
          code: "NOK",
          error: "CNPJ deve ter 14 dígitos",
        });
      }
      if (!validarCNPJ(cnpj)) {
        return res.status(400).json({
          code: "NOK",
          error: "Informe um CNPJ válido",
        });
      }

      // Verifica campos obrigatórios
      const envioObrigatorio = [
        "razaoSocial",
        "cnpj",
        "nomeFantasia",
        "email",
        "celular",
        "cep",
        "logradouro",
        "numero",
        "bairro",
        "cidade",
        "uf",
      ];

      if (!envioObrigatorio.every((field) => req.body[field])) {
        const campoFaltante = envioObrigatorio.filter(
          (field) => !req.body[field]
        );
        return res.status(400).json({
          code: "NOK",
          error: "Dados inválidos",
          msg: `Campos obrigatórios não informados: ${campoFaltante.join(
            ", "
          )}`,
        });
      }

      // Verifica se o usuário existe
      const user = await User.findOne({ where: { userId: userIdToken } });
      if (!user) {
        return res.status(404).json({
          code: "NOK",
          error: "Usuário não encontrado",
        });
      }

      // Verifica se CNPJ ou Razão Social já estão cadastrados
      const jaExisteCnpj = await checkDuplicateCnpj(cnpj);
      if (jaExisteCnpj) {
        return res.status(409).json({
          code: "NOK",
          error: "CNPJ já cadastrado",
        });
      }

      const jaExisteRazaoSocial = await checkDuplicateRazaoSocial(razaoSocial);
      if (jaExisteRazaoSocial) {
        return res.status(409).json({
          code: "NOK",
          error: "Razão Social já cadastrada",
        });
      }

      if (!email.includes("@")) {
        return res.status(400).json({
          code: "NOK",
          error: "Informe um email válido",
        });
      }
      if(cep.length !== 8) {
        return res.status(400).json({
            code: "NOK",
            error: "CEP deve ter 8 dígitos",
        });
    }
    if(uf.length !== 2) {
        return res.status(400).json({
            code: "NOK",
            error: "UF deve ter 2 dígitos",
        });
    }

      // Cria o depósito
      const deposito = await Deposito.create({
        userId: userIdToken,
        razaoSocial,
        cnpj,
        nomeFantasia,
        email,
        telefone,
        celular,
        cep,
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        uf,
        status,
        latitude,
        longitude,
      });

      const depositoSucesso = {
        identificador: deposito.depositoId,
        razaoSocial: deposito.razaoSocial,
      }
        
      res.status(201).json({
        code: "OK",
        msg: "Depósito criado com sucesso",
        deposito: depositoSucesso,
      });
    } catch (error) {
      console.error("Erro ao criar depósito:", error);
      res.status(500).json({ error: "Erro ao criar depósito" });
    }
  }
  async updateDeposito(req, res) {
    const userId = req.userId;
    const depositoId = Number(req.params.id);
    const checkDeposito = await checkUserDeposito(depositoId);
    const {
      nomeFantasia,
      email,
      telefone,
      celular,
      cep,
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      latitude,
      longitude,
    } = req.body;
    if (
      !nomeFantasia &&
      !email &&
      !telefone &&
      !celular &&
      !cep &&
      !logradouro &&
      !numero &&
      !complemento &&
      !bairro &&
      !cidade &&
      !uf &&
      !latitude &&
      !longitude
    ) {
      return res.status(400).json({
        code: "NOK",
        error: "Dados inválidos",
        msg: "Informe pelo menos um campo para atualizar",
      });
    }

    if(!email.includes("@")) {
        return res.status(400).json({
            code: "NOK",
            error: "Informe um email válido",
        });
    }
    if(cep.length !== 8) {
        return res.status(400).json({
            code: "NOK",
            error: "CEP deve ter 8 dígitos",
        });
    }

    if(uf.length !== 2) {
        return res.status(400).json({
            code: "NOK",
            error: "UF deve ter 2 dígitos",
        });
    }


    try {
      if (!checkDeposito) {
        return res.status(404).json({
          code: "NOK",
          error: "Depósito não encontrado",
        });
      }

      if (userId !== checkDeposito.userId) {
        return res.status(401).json({
          code: "NOK",
          error: "Não autorizado",
        });
      }

      const atualizacaoPermitida = [
        "nomeFantasia",
        "email",
        "telefone",
        "celular",
        "cep",
        "logradouro",
        "numero",
        "complemento",
        "bairro",
        "cidade",
        "uf",
        "latitude",
        "longitude",
      ];

      const updateData = {};
      
      for (const atualizar of atualizacaoPermitida) {
          if (req.body[atualizar]) {
              updateData[atualizar] = req.body[atualizar];
            }
        }

      await Deposito.update(updateData, {
        where: {
          depositoId,
        },
      });
      res.status(204).json({});
    } catch (error) {
      console.error("Erro ao atualizar depósito:", error);
      res.status(500).json({ error: "Erro ao atualizar depósito" });
    }
  }


    async updateStatusDeposito(req, res) {
        const userId = req.userId;
        const depositoId = Number(req.params.id);
        const checkDeposito = await checkUserDeposito(depositoId);
        const { status } = req.body;
     

        if(status !== "Ativo" && status !== "Inativo") {
            return res.status(400).json({
                code: "NOK",
                error: "Valor inválido para o campo 'status'",
                msg: "Valores permitidos: 'Ativo' ou 'Inativo'",
            });
        }
        try {
            if (!checkDeposito) {
                return res.status(404).json({
                    code: "NOK",
                    error: "Depósito não encontrado",
                });
            }
            if (userId !== checkDeposito.userId) {
                return res.status(401).json({
                    code: "NOK",
                    error: "Não autorizado",
                });
            }
            await Deposito.update({ status }, {
                where: {
                    depositoId,
                },
            });
            res.status(204).json({});
        } catch (error) {
            console.error("Erro ao atualizar depósito:", error);
            res.status(500).json({ error: "Erro ao atualizar depósito" });
        }
    }

    async deleteDeposito(req, res) {
      const userId = req.userId;
      const depositoId = Number(req.params.id);
      
      try {
          // Verifica se o depósito existe e se pertence ao usuário correto
          const checkDeposito = await checkUserDeposito(depositoId);
  
          if (!checkDeposito) {
              return res.status(404).json({
                  code: "NOK",
                  error: "Depósito não encontrado",
              });
          }
          
          if (userId !== checkDeposito.userId) {
              return res.status(401).json({
                  code: "NOK",
                  error: "Não autorizado",
              });
          }
  
          // Verifica se existem medicamentos associados ao depósito
          const temMedicamentos = await MedicamentoDeposito.findOne({
              where: {
                  depositoId,
              },
          });
  
          if (temMedicamentos) {
              return res.status(400).json({
                  code: "NOK",
                  error: "Depósito possui medicamentos associados",
                  msg: "Não é possível excluir um depósito que possui medicamentos associados",
              });
          }
  
          // Se não houver medicamentos associados, pode excluir o depósito
          await Deposito.destroy({
              where: {
                  depositoId,
              },
          });
  
          res.status(204).json({});
      } catch (error) {
          console.error("Erro ao deletar depósito:", error);
          res.status(500).json({ error: "Erro ao deletar depósito" });
      }
  }
  

}

module.exports = new DepositoController();
