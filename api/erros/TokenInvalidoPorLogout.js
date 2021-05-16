/**
 * * @extends {Error}
 ** A classe TokenInvalido extende a classe Error e é responsável por devolver o erro que ocorre quando um token que foi invalidado pelo logout é enviado em nova requisição para a api.
 */
class TokenInvalidoPorLogout extends Error {
    /**
         * O construtor recebe o nome do do tipo de token invalidado pelo logout (ex: Access Token, Refresh Token)
         * @param {string}
         */
    constructor(nome) {
        super(`${ nome } inválido por logout!`)
        /**
         * nome do erro que é sempre igual ao nome da classe
         * @type {string}
         */
        this.name = 'TokenInvalidoPorLogout'
        /**
         * o id desse tipo de erro é 6.
         * @type {string}
         */
        this.idError = 6

    }
}

module.exports = TokenInvalidoPorLogout