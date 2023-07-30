const Deposito = require("../models/Deposito");
const Medicamento = require("../models/Medicamento");
const MedicamentoDeposito = require("../models/MedicamentoDeposito");
const { checkUserDeposito } = require("../services/checkDeposito");
const { checkDuplicateNomeMedicamento } = require("../services/checkDuplicate");
const { addDeposito } = require("../services/medicamento.services");

class MedicamentoController {


    async getMedicamentos(req, res) {
        const tipo = req.query.tipo;

        try {
            if (tipo) {
                if (!["CONTROLADO", "NAOCONTROLADO"].includes(tipo)) {
                    return res.status(400).json({
                        code: "NOK",
                        error: "tipo deve ser CONTROLADO ou NAOCONTROLADO",
                    });
                }
                const medicamentos = await Medicamento.findAll({
                    where: {
                        tipo: tipo.toLowerCase(),
                    },
                });
                return res.status(200).json({
                    code: "OK",
                    medicamentos,
                });
            } else {
                const medicamentos = await Medicamento.findAll();
                return res.status(200).json({
                    code: "OK",
                    medicamentos,
                });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error });
        }


    }    

    async getMedicamentoId(req, res) {
        const medicamentoId = req.params.medicamentoId;
       

        try {

            if (isNaN(medicamentoId)) {
                return res.status(400).json({
                    code: "NOK",
                    error: "Identificador deve ser número",
                });
            }


            const medicamento = await Medicamento.findByPk(medicamentoId);
            if (!medicamento) {
                return res.status(404).json({
                    code: "NOK",
                    error: "Medicamento não encontrado",
                });
            }
            const existeMedicamento={
                identificador: medicamento.medicamentoId,
                nomeMedicamento: medicamento.nomeMedicamento,
                laboratorio: medicamento.nomeLaboratorio,
                descricao: medicamento.descricao,
                dosagem: medicamento.dosagem,
                unidadeDosagem: medicamento.unidadeDosagem,
                tipo: medicamento.tipo,
                precoUnitario: medicamento.precoUnitario,
                quantidade: medicamento.quantidade,
            }
            return res.status(200).json({
                code: "OK",
                medicamento: existeMedicamento,
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error });
        }
    }

  async createMedicamento(req, res) {
    try {
      const userIdToken = req.userId;

      const {
        userId,
        depositoId,
        nomeMedicamento,
        nomeLaboratorio,
        descricao,
        dosagem,
        unidadeDosagem,
        tipo,
        precoUnitario,
        quantidade,
      } = req.body;

      if (userIdToken != userId) {
        return res.status(400).json({
          code: "NOK",
          error:
            "Você não tem permissão para cadastrar medicamentos para outro usuário",
        });
      }

      const envioObrigatorios = [
        "depositoId",
        "nomeMedicamento",
        "nomeLaboratorio",
        "dosagem",
        "unidadeDosagem",
        "tipo",
        "precoUnitario",
        "quantidade",
      ];

      if (!envioObrigatorios.every((field) => req.body[field])) {
        const campoFaltante = envioObrigatorios.filter(
          (field) => !req.body[field]
        );
        return res.status(400).json({
          code: "NOK",
          error:
            "Campos obrigatorios: obrigatorios, depositoId, nomeMedicamento, nomeLaboratorio, dosagem, unidadeDosagem, tipo, precoUnitario, quantidade",
          msg: `Verifique o(s) campos faltantes: ${campoFaltante}`,
        });
      }

      if (!["mg", "mcg", "ml", "g", "%", "outro"].includes(unidadeDosagem)) {
        return res.status(400).json({
          code: "NOK",
          error: "unidadeDosagem deve ser: mg, mcg, ml, g, % ou outro",
        });
      }

      if (!["controlado", "naocontrolado"].includes(tipo)) {
        return res.status(400).json({
          code: "NOK",
          error: "tipo deve ser controlado ou naoControlado",
        });
      }

      if (isNaN(dosagem) || dosagem < 0) {
        return res.status(400).json({
          code: "NOK",
          error: "Dosagem deve ser número maior que zero",
        });
      }
      if (isNaN(precoUnitario) || precoUnitario < 0.01) {
        return res.status(400).json({
          code: "NOK",
          error: "Preço Unitário deve ser número maior que zero",
        });
      }
      if (isNaN(quantidade)) {
        return res.status(400).json({
          code: "NOK",
          error: "Quantidade deve ser número",
        });
      }

      if ((await checkUserDeposito(depositoId)) === false) {
        return res.status(400).json({
          code: "NOK",
          error: "Depósito não encontrado",
        });
      }

      //verifica se o medicamento ja esta cadastrado no deposito com mesmo nome
      if (await checkDuplicateNomeMedicamento(nomeMedicamento, depositoId)) {
        return res.status(400).json({
          code: "NOK",
          error: "Medicamento já cadastrado neste depósito",
        });
      }

      const medicamento = await Medicamento.create({
        userId,
        depositoId,
        nomeMedicamento,
        nomeLaboratorio,
        descricao,
        dosagem,
        unidadeDosagem,
        tipo,
        precoUnitario,
        quantidade,
      });

      // Associa o medicamento ao depósito
      const medicamentoId = medicamento.medicamentoId;
      const deposito = await Deposito.findByPk(depositoId); 
      const medicamentoInstance = await Medicamento.findByPk(medicamentoId);

      await addDeposito(medicamentoInstance, deposito);

      const newMedicamento={
        identificador: medicamento.medicamentoId,
        userId: medicamento.userId,
        depositoId: medicamento.depositoId,
        nomeMedicamento: medicamento.nomeMedicamento,
        laboratorio: medicamento.nomeLaboratorio,
        descricao: medicamento.descricao,
        dosagem: medicamento.dosagem,
        unidadeDosagem: medicamento.unidadeDosagem,
        tipo: medicamento.tipo,
        precoUnitario: medicamento.precoUnitario,
        quantidade: medicamento.quantidade,

      }

      return res.status(201).json({
        code: "OK",
        msg: "Medicamento cadastrado com sucesso",
        medicamento: newMedicamento,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  }

    async updateMedicamento(req, res) {
        const medicamentoId = req.params.medicamentoId;
        const{descricao,precoUnitario,quantidade}=req.body;
        try {
            const medicamento = await Medicamento.findByPk(medicamentoId);
            if (!medicamento) {
                return res.status(404).json({
                    code: "NOK",
                    error: "Medicamento não encontrado",
                });
            }

            if(!descricao && !precoUnitario && !quantidade){
                return res.status(400).json({
                    code: "NOK",
                    error: "Informe ao menos um campo para atualizar",
                    msg: "Campos disponíveis: descricao, precoUnitario, quantidade"
                });
            }

            if(precoUnitario && (isNaN(precoUnitario) || precoUnitario < 0.01)){
                return res.status(400).json({
                    code: "NOK",
                    error: "Preço Unitário deve ser número maior que zero",
                });
            }

            if(quantidade && isNaN(quantidade)){
                return res.status(400).json({
                    code: "NOK",
                    error: "Quantidade deve ser número",
                });
            }

            const dadosAtualizar = {
                descricao,
                precoUnitario,
                quantidade
            }


            const medicamentoAtualizado = await medicamento.update(dadosAtualizar);

            const newMedicamento={
                identificador: medicamentoAtualizado.medicamentoId,
                nomeMedicamento: medicamentoAtualizado.nomeMedicamento,
                laboratorio: medicamentoAtualizado.nomeLaboratorio,
                descricao: medicamentoAtualizado.descricao,
                dosagem: medicamentoAtualizado.dosagem,
                unidadeDosagem: medicamentoAtualizado.unidadeDosagem,
                tipo: medicamentoAtualizado.tipo,
                precoUnitario: medicamentoAtualizado.precoUnitario,
                quantidade: medicamentoAtualizado.quantidade,
            }
            return res.status(200).json({
                code: "OK",
                msg: "Medicamento atualizado com sucesso",
                medicamento: newMedicamento,
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error });
        }

    }
    async deleteMedicamento(req, res) {
        const medicamentoId = req.params.medicamentoId;
      
        try {
          // Verificar se o medicamento existe
          const medicamento = await Medicamento.findByPk(medicamentoId);
          if (!medicamento) {
            return res.status(404).json({
              code: "NOK",
              error: "Medicamento não encontrado",
            });
          }
      
          // Verificar se há registros na tabela medicamento_depositos que referenciam o medicamento
          const medicamentoDepositos = await MedicamentoDeposito.findAll({
            where: {
              medicamentoId: medicamentoId,
            },
          });
      
          // Se houver registros na tabela medicamento_depositos, exclua-os primeiro
          if (medicamentoDepositos.length > 0) {
            await MedicamentoDeposito.destroy({
              where: {
                medicamentoId: medicamentoId,
              },
            });
          }
      
          // Em seguida, exclua o medicamento da tabela medicamentos
          await medicamento.destroy();
      
          return res.status(204).json();
        } catch (error) {
          console.error(error);
          res.status(500).json({ error });
        }
      }
      
}

module.exports = new MedicamentoController();
