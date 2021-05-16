/**
 * * * @extends {Email}
 * A classe EmailVerificacao extende a classe Email e é responsável por implementar o template do e-mail de verificação de e-mail do usuário cadastrado na aplicação
 */
const Email = require('./Email')
class EmailVerificacao extends Email {
    /**
     * O construtor recebe o objeto usuario e a chave pseudo-aleatória que será usada para confirmar o usuário 
     * @param {object} usuario
     * @param {string} chave 
     */
    constructor(usuario, chave) {
        super()
        /**
         * monta o endereço da rota do e-mail de confirmação.
         * @type {string}
         */
        this.endereco = `${ process.env.BASE_URL }/api/usuarios/verifica_email/${ chave }`
        {
            /**
            * endereço do qual o e-mail está sendo enviado.
            * @type {string}
            */
            this.from = '"Task Manager" <noreply@taskmager.com>'
            /**
            * endereço para onde o e-mail será enviado.
            * @type {string}
            */
            this.to = usuario.email
            /**
            * Assunto do e-mail
            * @type {string}
            */
            this.subject = 'Verificação de e-mail'
            /**
            * corpo do e-mail em formato texto.
            * @type {string}
            */
            this.text = `Olá! Verifique o seu e-mail aqui: ${ this.endereco }`
            /**
            * corpo do e-mail em formato html.
            * @type {string}
            */
            this.html = `<h1>Olá!</h1> <p>Verifique o seu e-mail aqui: <a href="${ this.endereco }"> ${ this.endereco }</a></p>`
        }
    }
}

module.exports = EmailVerificacao