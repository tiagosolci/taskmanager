const Services = require('./Services')
const database = require('../models')
/**
 * @extends {Services}
 * A classe Projetos Service extende a classe abstrada Services e é reponsável por implementar os métodos específicos de consulta e atualização de Projetos no DB através do modelo do Sequelize.
 */
class ProjetosService extends Services {
    constructor() {
        super('Projetos')
    }
    /**
     * Busca projetos atrávés do id do usuário realizando um join com a tabela Tarefas, ordenando pelo id do projeto em ordem ascendente.
     * @param {number} usuario_id 
     * @returns {Array}
     */
    async buscaProjetosPorUsuarioId(usuario_id) {
        return database[this.nomeDoModelo].findAll(
            {
                where: { usuario_id },
                include: [{
                    model: database.Tarefas
                }],
                order: [['id', 'ASC']]
            }
        )
    }

    /**
     * Atualiza os dados de um projeto.
     * @param {objetc} dadosAtualizados 
     * @param {number} id 
     * @param {number} usuario_id 
     * @returns 
     */
    async atualizaProjetoDoUsuario(dadosAtualizados, id, usuario_id) {
        return database[this.nomeDoModelo]
            .update(dadosAtualizados, { where: { id, usuario_id } })
    }
}

module.exports = ProjetosService