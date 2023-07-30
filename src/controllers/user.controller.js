const User = require("../models/User");
const moment = require("moment");
const { isDateFormat } = require("../utils/dateFormat");
const { validarCPF } = require("../utils/validarCpf-Cnpj");
const { sign } = require("jsonwebtoken");
const validarSenha = require("../utils/validarSenha");



class UserController {
  async createNewUser(req, res) {
    try {
      const {
        nome,
        sobrenome,
        genero,
        dataAniversario,
        cpf,
        telefone,
        email,
        senha,
      } = req.body;
          
      // verifica se os campos nome sobrenome datanascimento cpf email e senha estão preenchidos
      if (!nome || !sobrenome || !dataAniversario || !cpf || !email || !senha || !genero) {
        return res.status(400).json({
          code: "NOK",
          error: "Dados inválidos",
          msg: {
            info:"Verifique se todos os campos obrigatórios foram preenchidos",
            obrigatorio: "nome, sobrenome, genero, dataAniversario, cpf, email e senha"
          },


        });
      }

      if (!isDateFormat(dataAniversario)) {
        return res.status(400).json({
          code: "NOK",
          error: "Data de aniversário inválida",
          msg: "Informe uma data no formato YYYY-MM-DD",
        });
      }

      
      const validaCpf = validarCPF(cpf);
      if (!validaCpf) {
        return res.status(400).json({
          code: "NOK",
          error: "Informe um cpf válido",
        });
      }

      //verifica se a data de aniversario é menor que a data atual
      const verificaDataNascimento = moment(dataAniversario, "YYYY-MM-DD", true);
      const today = moment().startOf("day");
      if (verificaDataNascimento.isSame(today)) {
        return res.status(400).json({
          code: "NOK",
          error: "Data de aniversário inválida",
          msg: "Informe uma data diferente da data atual",
        });
      }
      
      if (!validarSenha(senha)) {
        return res.status(400).json({
          code: "NOK",
          error: "Senha inválida",
          msg: "A senha deve ter no mínimo 8 caracteres, pelo menos 1 letra maiúscula e 1 número",
        });
      }


      const isEmail = email.includes("@");
      if (!isEmail) {
        return res.status(400).json({
          code: "NOK",
          error: "Informe um email inválido",
        });
      }

      //verifica se é  email e se ja existe no banco
      const verificaEmail = await User.findOne({ where: { email } });
      if (verificaEmail) {
        return res.status(409).json({
          code: "NOK",
          error: "Email já cadastrado",
        });
      }

      const verificaCpf = await User.findOne({ where: { cpf } });
      if (verificaCpf) {
        return res.status(409).json({
          code: "NOK",
          error: "CPF já cadastrado",
        });
      }

    const userCadastrado =  await User.create({
      nome,
      sobrenome,
      genero,
      dataAniversario,
      cpf,
      telefone,
      email,
      senha,
    });

    const newUser = {
      identificador: userCadastrado.userId,
      nome: userCadastrado.nome,
      sobrenome: userCadastrado.sobrenome,
      genero: userCadastrado.genero,
      dataAniversario: userCadastrado.dataAniversario,
      cpf: userCadastrado.cpf,
      telefone: userCadastrado.telefone,
      email: userCadastrado.email,
      status: userCadastrado.status,
    };

      res.status(201).json({
        code: "OK",
        msg: "Usuário criado com sucesso",
        usuario: newUser,
      });
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      res.status(500).json({ error: "Erro ao criar usuário" });
    }
  }

  async login(req, res) {
    const { email, senha } = req.body;
    try {
      if (!email || !senha) {
        return res.status(400).json({
          code: "NOK",
          error: "Dados inválidos",
          msg: "Campos obrigatorios email e senha",
        });
      }

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({
          code: "NOK",
          error: "Usuário não encontrado",
        });
      }
      if (user.senha !== senha) {
        return res.status(400).json({
          code: "NOK",
          error: "Senha inválida",
        });
      }
      const token = sign({ id: user.userId }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      res.status(200).json({
        code: "OK",
        token,
      });
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      res.status(500).json({ error: "Erro ao realizar login" });
    }
  }

  async updateStatusUser(req, res) {
    const userId = req.userId;

    const { status } = req.body;
    const id = Number(req.params.id);
    try {
      if (userId !== id) {
        return res.status(401).json({
          code: "NOK",
          error: "Dados inválidos",
          msg: "Açao não permitida para este usuário, faça login novamente",
        });
      }

      const usuarioData = await User.findOne({ where: { userId: userId } });
      if (!usuarioData) {
        return res.status(404).json({
          code: "NOK",
          error: "Usuário não encontrado",
        });
      }

      if (status !== "Ativo" && status !== "Inativo") {
        return res.status(400).json({
          code: "NOK",
          error: "Status inválido",
          msg: "Status deve ser Ativo ou Inativo",
        });
      }

      await User.update(
        { status },
        {
          where: {
            userId: userId,
          },
        }
      );

      res.status(200).json({
        code: "OK",
        msg: "Status atualizado com sucesso para" + " " + status + "!",
      });
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      res.status(500).json({ error: "Erro ao atualizar status" });
    }
  }

  async updateDataUser(req, res) {
    const userId = req.userId;
    const { nome, sobrenome, genero, telefone } = req.body;
    const id = Number(req.params.id);
    try {
      if (userId !== id) {
        return res.status(401).json({
          code: "NOK",
          error: "Dados inválidos",
          msg: "Açao não permitida para este usuário, faça login novamente",
        });
      }

      if (!nome && !sobrenome && !genero && !telefone) {
        return res.status(400).json({
          code: "NOK",
          error: "Dados inválidos",
          msg: "Informe pelo menos um campo para atualizar",
        });
      }

      const atualizacaoPermitida = ["nome", "sobrenome", "genero", "telefone"];
      const updateData = {};

      for (const atualizar of atualizacaoPermitida) {
        if (req.body[atualizar]) {
          updateData[atualizar] = req.body[atualizar];
        }
      }

      const usuarioData = await User.findOne({ where: { userId } });
      if (!usuarioData) {
        return res.status(404).json({
          code: "NOK",
          error: "Usuário não encontrado",
        });
      }

      await User.update(updateData, {
        where: {
          userId,
        },
      });
      res.status(200).json({
        code: "OK",
        msg: "Dados atualizados com sucesso!",
        dadosAtualizados: updateData,
      });
    } catch (error) {
      console.error("Erro ao atualizar dados:", error);
      res.status(500).json({ error: "Erro ao atualizar dados" });
    }
  }

  async updateUserSenha(req, res) {
    const userId = req.userId;
    const { senhaAtual, novaSenha } = req.body;
    const id = Number(req.params.id);
    try {
      if (userId !== id) {
        return res.status(401).json({
          code: "NOK",
          error: "Dados inválidos",
          msg: "Açao não permitida para este usuário, faça login novamente",
        });
      }
      if (!userId || !senhaAtual || !novaSenha) {
        return res.status(400).json({
          code: "NOK",
          error: "Dados inválidos",
          msg: "Informe todos os campos obrigatórios",
        });
      }

      const usuarioData = await User.findOne({ where: { userId } });
      if (!usuarioData) {
        return res.status(404).json({
          status: "NOK",
          error: "Usuário não encontrado",
        });
      }

      if (senhaAtual !== usuarioData.senha) {
        return res.status(400).json({
          code: "NOK",
          error: "Senha atual inválida",
        });
      }

      await User.update(
        { senha: novaSenha },
        {
          where: {
            userId,
          },
        }
      );

      res.status(204).json();
    } catch (error) {
      console.error("Erro ao atualizar senha:", error);
      res.status(500).json({ error: "Erro ao atualizar senha" });
    }
  }

  async getDataUser(req, res) {
    const userId = req.userId;

    const id = Number(req.params.id);
    try {
      if (userId !== id) {
        return res.status(401).json({
          code: "NOK",
          error: "Dados inválidos",
          msg: "Açao não permitida para este usuário, faça login novamente",
        });
      }

      const usuarioData = await User.findOne({ where: { userId } });
      if (!usuarioData) {
        return res.status(404).json({
          code: "NOK",
          error: "Usuário não encontrado",
        });
      }
      const dateBird = JSON.stringify(usuarioData.dataAniversario);
      const usuarioFiltrado = {
        identificado: usuarioData.userId,
        nome: usuarioData.nome,
        sobrenome: usuarioData.sobrenome,
        genero: usuarioData.genero,
        dataAniversario: dateBird.toString().slice(1, 11),
        cpf: usuarioData.cpf,
        telefone: usuarioData.telefone,
        email: usuarioData.email,
        status: usuarioData.status,
      };

      res.status(200).json({
        code: "OK",
        usuario: usuarioFiltrado,
      });
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
      res.status(500).json({ error: "Erro ao buscar dados do usuário" });
    }
  }
}

module.exports = new UserController();
