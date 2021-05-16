const { CampoInvalido } = require('../../erros')
const { UsuariosService } = require('../../services')
const usuariosService = new UsuariosService()
const bcrypt = require('bcrypt')

/**
 * A classe Usuário é responsável por gerenciar todas as operações relacionadas a usuários.
 */

class Usuario {
    /**
     * O construtor recebe os dados de um usuário e os atribui a instância atual
     * @param {object} usuario 
     */
    constructor({ id, nome, email, senha, emailVerificado, createdAt, updatedAt, deleteAt }) {
        this.id = id
        this.nome = nome
        this.email = email
        this.senha = senha
        this.emailVerificado = emailVerificado
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.deleteAt = deleteAt
    }

    /**
     * @throws {sequelize.UniqueConstraintError} - Esse erro ocorre quando um usuário com o mesmo e-mail já está cadastrado.
     */
    async criar() {
        this.validar()

        const resultado = await usuariosService.criaRegistro({
            nome: this.nome,
            email: this.email,
            senha: await this.gerarSenhaHash(this.senha)
        })
        this.id = resultado.id
        this.createdAt = resultado.createdAt
        this.updatedAt = resultado.updatedAt
    }
    /**
     * Define e Valida se os campos obrigatórios foram informados
     * @throws {CampoInvalido} - Esse erro ocorre caso um campo obrigatório não tenha sido passado na requisição.
     */
    validar() {
        const campos = ['nome', 'email', 'senha']

        campos.forEach((campo) => {
            const valor = this[campo]
            if (typeof (valor) !== 'string' || valor.length === 0) {
                throw new CampoInvalido(campo)
            }
        })
    }

    /**
     * Verifica se a senha possui possui no minímo 8 e no máximo 64 caracteres
     * @param {string} senha 
     * @throws {CampoInvalido} - Esse erro ocorre quando a senha possui menos que 8 e mais de 64 caracteres.
     * @returns 
     */
    validarSenha(senha) {
        if (senha.length < 8) throw new CampoInvalido('senha', `O campo senha precisa ser maior que 8 caracteres!`)
        if (senha.length > 64) throw new CampoInvalido('senha', `O campo senha precisa ser menor que 64 caracteres!`)
        return senha
    }

    /**
     * Define um custo do hash e gera um hash da senha informada pelo usuário. O custo é a dificuldade computacional envolvida em quebrar o hash.
     * @param {*} senha 
     * @returns 
     */
    gerarSenhaHash(senha) {
        const custoHash = 12
        return bcrypt.hash(this.validarSenha(senha), custoHash)
    }

    /**
     * Busca um usuario através do e-mail
     * @returns 
     */
    async buscarPorEmail() {
        const usuario = await usuariosService.pegaUmRegistro({
            email: this.email
        })
        if (!usuario) return null
        this.id = usuario.id
        this.nome = usuario.nome
        this.senha = usuario.senha
        this.emailVerificado = usuario.emailVerificado
        this.createdAt = usuario.createdAt
        this.updatedAt = usuario.updatedAt
        this.deleteAt = usuario.deleteAt
    }

    /**
     * Busca um usuario através do id
     * @returns 
     */
    async buscarPorId() {
        const usuario = await usuariosService.pegaUmRegistro({
            id: this.id
        })
        if (!usuario) return null
        this.nome = usuario.nome
        this.email = usuario.email
        this.senha = usuario.senha
        this.emailVerificado = usuario.emailVerificado
        this.createdAt = usuario.createdAt
        this.updatedAt = usuario.updatedAt
        this.deleteAt = usuario.deleteAt
    }

    /**
     * Registra no DB que o e-mail do usuário foi confirmado.
     */
    async verificaEmail() {
        this.emailVerificado = true
        await usuariosService.atualizaRegistro({ emailVerificado: this.emailVerificado }, this.id)
    }
}

module.exports = Usuario