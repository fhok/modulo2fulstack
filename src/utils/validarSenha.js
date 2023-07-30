
function validarSenha(senha) {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    return regex.test(senha);
    }

module.exports = validarSenha;