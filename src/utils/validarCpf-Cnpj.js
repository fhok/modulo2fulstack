const { cpf, cnpj } = require('cpf-cnpj-validator');

function validarCPF(cpfNumero) {
  if (cpfNumero === undefined) {
    throw new Error('Número de CPF não informado');
  }

  const cpfNumberLength = cpfNumero.length;

  if (cpfNumberLength !== 11) {
    
    throw new Error('Número de CPF deve ter 11 dígitos');
  }

  return cpf.isValid(cpfNumero);
}

function validarCNPJ(cnpjNumero) {
  if (cnpjNumero === undefined) {
    throw new Error('Número de CNPJ não informado');
  }

  const cnpjNumberLength = cnpjNumero.length;

  if (cnpjNumberLength !== 14) {
    return ('Número de CNPJ deve ter 14 dígitos');
  }

  return cnpj.isValid(cnpjNumero);
}

module.exports = { validarCPF, validarCNPJ };

