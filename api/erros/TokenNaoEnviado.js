/**
 * * @extends {Error}
 * A classe TokenNaoEnviado extende a classe Error e é responsável por devolver o erro que ocorre quando um token não é enviado para a api.
 */
class TokenNaoEnviado extends Error {
    /**
         * O construtor recebe o nome do do tipo de token que não foi enviado em uma requisição (ex: Access Token, Refresh Token)
         * @param {string}
         */
    constructor(nome) {
        super(`${ nome } não foi enviado.`)
        /**
         * nome do erro que é sempre igual ao nome da classe
         * @type {string}
         */
        this.name = 'TokenNaoEnviado'
        /**
         * o id desse tipo de erro é 7.
         * @type {string}
         */
        this.idError = 7
    }
}


module.exports = TokenNaoEnviado
