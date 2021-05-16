const database = require('../models')
/**
 * A classe abstrada Services e é reponsável por implementar os métodos comuns para manipulação do DB através do Sequelize.
 */
class Services {
    /**
     * Campo da Tabela do DB que será manipulada
     * @param {strign} nomeDoModelo 
     */
    constructor(nomeDoModelo) {
        this.nomeDoModelo = nomeDoModelo
    }

    /**
     * Retorna todos os registros de uma tabela
     * @returns 
     */
    async pegaTodosOsRegistros() {
        return database[this.nomeDoModelo].findAll()
    }
    /**
     * Busca um registro da tabela onde as condicionais informadas no objeto where são encontradas
     * @param {object} where 
     * @returns {object}
     */
    async pegaUmRegistro(where) {
        return database[this.nomeDoModelo].findOne({ where: { ...where } })
    }

    /**
     * Cria um registro com base nos dados enviados
     * @param {object} dados 
     * @returns 
     */
    async criaRegistro(dados) {
        return database[this.nomeDoModelo].create(dados)
    }

    /**
     * Implementa a atualização do registro através do id e permite que seja usada a transação do Sequelize se desejado caso desejado.
     * @param {object} dadosAtualizados 
     * @param {number} id 
     * @param {object} transacao 
     * @returns 
     */
    async atualizaRegistro(dadosAtualizados, id, transacao = {}) {
        return database[this.nomeDoModelo]
            .update(dadosAtualizados, { where: { id: id } }, transacao)
    }

    /**
     * Atualiza diversos registros com os dados enviados onde as condições do objeto where são encontradas e permite a utilização da transação do Sequelize se desejado.
     * @param {object} dadosAtualizados 
     * @param {object} where 
     * @param {object} transacao 
     * @returns 
     */
    async atualizaRegistros(dadosAtualizados, where, transacao = {}) {
        return database[this.nomeDoModelo]
            .update(dadosAtualizados, { where: { ...where } }, transacao)
    }

    /**
     * Apaga um registro com o id informado.
     * @param {number} id 
     * @returns 
     */
    async apagaRegistro(id) {
        return database[this.nomeDoModelo].destroy({ where: { id: id } })
    }

    /**
     * Restaura um registro com o id informado.
     * @param {number} id 
     * @returns 
     */
    async restauraRegistro(id) {
        return database[this.nomeDoModelo].restore({ where: { id: id } })
    }

}

module.exports = Services