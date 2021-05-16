/**
 * * @extends {Error}
 * A classe TokenInvalido extende a classe Error e é responsável por devolver o erro que ocorre quando um token invalidado ou expirado é enviado em uma requisição para a api.
 */
class TokenInvalido extends Error {
    /**
         * O construtor recebe o nome do do tipo de token inválido (ex: Access Token, Refresh Token)
         * @param {string}
         */
    constructor(nome) {
        super(`${ nome } inválido.`)
        /**
         * nome do erro que é sempre igual ao nome da classe
         * @type {string}
         */
        this.name = 'TokenInvalido'
        /**
         * o id desse tipo de erro é 5.
         * @type {string}
         */
        this.idError = 5
    }
}

module.exports = TokenInvalido
