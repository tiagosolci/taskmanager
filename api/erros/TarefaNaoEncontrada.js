/**
 * * @extends {Error}
 * A classe TarefaNaoEncontrada extende a classe Error e é responsável por devolver o erro que ocorre quando uma determinada tarefa não é encontrada com o id e projeto_id informados.
 */
class TarefaNaoEncontrada extends Error {
    /**
     * O construtor não recebe parâmetros e somente invoca o super passando a mensagem genérica do erro. 
     */
    constructor() {
        super(`A tarefa não foi encontrada.`)
        /**
         * nome do erro que é sempre igual ao nome da classe
         * @type {string}
         */
        this.name = 'TarefaNaoEncontrada'
        /**
         * o id desse tipo de erro é 9.
         * @type {string}
         */
        this.idError = 9
    }
}

module.exports = TarefaNaoEncontrada