const MedicamentoDeposito = require("../models/MedicamentoDeposito");

async function addDeposito(medicamentoInstance, deposito) {
  try {
    // Verifica se o depósito já está associado ao medicamento
    const isAssociated = await MedicamentoDeposito.findOne({
      where: {
        medicamentoId: medicamentoInstance.medicamentoId,
        depositoId: deposito.depositoId,
      },
    });

    if (isAssociated) {
      throw new Error("Depósito já associado ao medicamento.");
    }

    // Cria a associação entre o medicamento e o depósito
    await MedicamentoDeposito.create({
      medicamentoId: medicamentoInstance.medicamentoId,
      depositoId: deposito.depositoId,
    });
  } catch (error) {
    throw error;
  }
}

module.exports = { addDeposito };
