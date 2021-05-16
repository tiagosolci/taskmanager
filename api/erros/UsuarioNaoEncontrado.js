/**
 * * @extends {Error}
 * A classe TokenNaoEnviado extende a classe Error e é responsável por devolver o erro que ocorre quando um usário não é encontrado no DB com o e-mail informado.
 */
class UsuarioNaoEncontrado extends Error {
    /**
     * O construtor não recebe parâmetros e somente invoca o super passando a string de que o usuário não existe. 
     */
    constructor() {
        super(`Não existe usuário com esse e-mail.`)
        /**
         * nome do erro que é sempre igual ao nome da classe
         * @type {string}
         */
        this.name = 'UsuarioNaoEncontrado'
        /**
         * o id desse tipo de erro é 4.
         * @type {string}
         */
        this.idError = 4
    }
}

module.exports = UsuarioNaoEncontrado