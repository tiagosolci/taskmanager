const Services = require('./Services')
const database = require('../models')
/**
 * @extends {Services}
 * A classe Tarefas Service extende a classe abstrada Services e é reponsável por implementar os métodos específicos da classe no DB através do modelo do Sequelize.
 */
class TarefasService extends Services {
    constructor() {
        super('Tarefas')
    }
    /**
     * Busca uma tarefa com base no id da tarefa e no de projeto
     * @param {number} id 
     * @param {number} projeto_id 
     * @returns {object}
     */
    async pegaUmRegistro(id, projeto_id) {
        return database[this.nomeDoModelo].findOne({ where: { id, projeto_id } })
    }
}

module.exports = TarefasService