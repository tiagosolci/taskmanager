/**
 * * @extends {Error}
 * A classe ProjetoNaoEncontrado extende a classe Error e é responsável por devolver o erro que ocorre quando um determinado projeto não é encontrado com o id e usuario_id informados.
 */
class ProjetoNaoEncontrado extends Error {
    /**
     * O construtor não recebe parâmetros e somente invoca o super passando a mensagem genérica do erro. 
     */
    constructor() {
        super(`O projeto não foi localizado`)
        /**
         * nome do erro que é sempre igual ao nome da classe
         * @type {string}
         */
        this.name = 'ProjetoNaoEncontrado'
        /**
         * o id desse tipo de erro é 8.
         * @type {string}
         */
        this.idError = 8
    }
}

module.exports = ProjetoNaoEncontrado