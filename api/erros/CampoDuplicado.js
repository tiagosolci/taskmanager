/**
 * @extends {Error}
 * A classe CampoDuplicado extende a classe Error e é responsável por formatar e devolver o erro que ocorre quando o usuário tentar inserir uma mesma informação em uma campo no DB que é único. (Ex: e-mail)
 */
class CampoDuplicado extends Error {
    /**
     * O construtor recebe o nome do campo que gerou o erro
     * @param {string} campo 
     */
    constructor(campo) {
        /**
         * Concatena o nome do campo a string do erro que será devolvida pela classe.
         * @type {string}
         */
        const mensagem = `O ${ campo } é único e já foi usado.`
        super(mensagem)
        /**
         * nome do erro que é sempre igual ao nome da classe
         * @type {string}
         */
        this.name = 'CampoDuplicado'
        /**
         * o id desse tipo de erro é 2.
         * @type {string}
         */
        this.idError = 2
    }
}

module.exports = CampoDuplicado