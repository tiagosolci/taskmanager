const Services = require('./Services')
/**
 * @extends {Services}
 * A classe Usuário Service extende a classe abstrada Services e é reponsável por implementar os métodos específicos da classe no DB através do modelo do Sequelize.
 */
class UsuariosService extends Services {
    constructor() {
        super('Usuarios')
    }
}


module.exports = UsuariosService