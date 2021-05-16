/**
 * * @extends {Error}
 * A classe FalhaAutenticacao extende a classe Error e é responsável por devolver o erro que ocorre quando há falha na autenticação do usuário seja pelo e-mail ou senha errados.
 */
class FalhaAutenticacao extends Error {
    /**
     * O construtor não recebe parâmetros e somente invoca o super passando a mensagem genérica do erro. Dessa forma o sistema não informa a um possível agente malicioso se um determinado e-mail existe ou não no banco de dados.
     */
    constructor() {
        super(`E-mail ou senha inválidos`)
        /**
         * nome do erro que é sempre igual ao nome da classe
         * @type {string}
         */
        this.name = 'FalhaAutenticacao'
        /**
         * o id desse tipo de erro é 3.
         * @type {string}
         */
        this.idError = 3
    }
}

module.exports = FalhaAutenticacao