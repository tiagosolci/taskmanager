/**
 * * @extends {Error}
 * A classe CampoInvalido extende a classe Error e é responsável por formatar e devolver o erro que ocorre quando um campo obrigatório não é enviado na requisição ou é nulo.
 */
class CampoInvalido extends Error {
    /**
     * O construtor recebe o nome do campo que gerou o erro e pode receber também o motivo pelo qual ele é inválido.
     * @param {string} campo 
     * @param {string} motivo
     */
    constructor(campo, motivo) {
        if (!motivo) motivo = ''
        /**
         * Concatena o nome do campo e o motivo se existir a string do erro que será devolvida pela classe.
         * @type {string}
         */
        const mensagem = `O campo ${ campo } está inválido.`.concat(motivo)
        // if (motivo.length > 0) {
        //     mensagem.concat(motivo)
        // }
        super(mensagem)
        /**
         * nome do erro que é sempre igual ao nome da classe
         * @type {string}
         */
        this.name = 'CampoInvalido'
        /**
         * o id desse tipo de erro é 1.
         * @type {string}
         */
        this.idError = 1
    }
}

module.exports = CampoInvalido