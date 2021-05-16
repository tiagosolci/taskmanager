/**
 * A classe Email é uma classe abstrata que implementa a configuração básica do nodemailer para envio de e-mails.
 */
const nodemailer = require('nodemailer')
class Email {
    /**
     * O método enviaEmail invoca é responsável por verificar se estamos no ambiente de produção ou desenvolvimento e enviar o e-mail com base nessas informações.
     */
    async enviaEmail() {
        const configuracaoEmail = await criarConfiguracaoEmail()
        const transportador = nodemailer.createTransport(configuracaoEmail)

        const info = await transportador.sendMail(this)

        if (process.env.NODE_ENV !== 'production') {
            console.log(`URL :${ nodemailer.getTestMessageUrl(info) }`)
        }

    }

}
/**
 * objeto construído com os parâmetros de host, usuario e senha existente do ambiente.
 * @type {object}
 */
const configuracaoEmailProducao = {
    host: process.env.EMAIL_HOST,
    auth: {
        user: process.env.EMAIL_USUARIO,
        pass: process.env.EMAIL_SENHA
    },
    secure: true
}

/**
 * objeto construído com os dados do nodemailer para envio de e-mails de testes no ambiente de desenvolvimento.
 * @type {object}
 * @param {object} contaTeste
 */
const configuracaoEmailTeste = contaTeste => ({
    host: 'smtp.ethereal.email',
    auth: contaTeste
})

/**
 * Método que retorna com base no ambinente de produção ou desenvolvimento um objeto com os dados para conexão para envio dos e-mails.
 * @returns {object}
 */
async function criarConfiguracaoEmail() {
    if (process.env.NODE_ENV === 'production') {
        return configuracaoEmailProducao
    } else {
        const contaTeste = await nodemailer.createTestAccount()
        return configuracaoEmailTeste(contaTeste)
    }
}


module.exports = Email