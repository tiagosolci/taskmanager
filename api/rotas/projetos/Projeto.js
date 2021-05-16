const { response } = require('express')
const { CampoInvalido, ProjetoNaoEncontrado } = require('../../erros')
const { ProjetosService } = require('../../services')
const projetosService = new ProjetosService()
/**
 * A classe Projeto é responsável por gerenciar todas as operações relacionadas a projetos.
 */
class Projeto {
    constructor({ id, usuario_id, nome, createdAt, updatedAt, deleteAt }) {
        this.id = id
        this.usuario_id = usuario_id
        this.nome = nome
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.deleteAt = deleteAt
    }

    /**
     * Busca a e retorna lista de projetos de um usuario atráves do id do usuário
     * @returns {[Projeto]}
     */
    async buscaProjetosPorUsuarioId() {
        const projetos = await projetosService.buscaProjetosPorUsuarioId(this.usuario_id)
        return projetos
    }

    /**
     * Cria um projeto após validação dos campos obrigatórios
     */
    async criar() {
        this.validar()

        const resultado = await projetosService.criaRegistro({
            usuario_id: this.usuario_id,
            nome: this.nome,
        })
        this.id = resultado.id
        this.createdAt = resultado.createdAt
        this.updatedAt = resultado.updatedAt
    }

    /**
     * Define e valida os campos obrigratórios para criação e atualização de projetos
     * @throws {CampoInvalido} - Esse erro ocorre quando um campo obrigatório não é informado.
     */
    validar() {
        const campos = ['nome']
        campos.forEach((campo) => {
            const valor = this[campo]
            if (typeof (valor) !== 'string' || valor.length === 0) {
                throw new CampoInvalido(campo)
            }
        })
    }

    /**
     * Atualiza um projeto após a validação dos campos
     */
    async atualizar() {
        this.validar()
        await projetosService.atualizaRegistro(this, this.id, this.usuario_id)
    }

    /**
     * Busca um projeto atráves do id do projeto e do usuário
     * @throws {ProjetoNaoEncontrado} - Esse erro ocorre quando um projeto não é encontrado
     */
    async buscarProjeto() {
        const resultado = await projetosService.pegaUmRegistro(this.id, this.usuario_id)
        if (!resultado) throw new ProjetoNaoEncontrado()
        this.nome = resultado.nome
        this.createdAt = resultado.createdAt
        this.updatedAt = resultado.updatedAt
        this.deleteAt = resultado.deleteAt
    }

    /**
     * Deleta um projeto através do seu id.
     */
    async deletar() {
        await projetosService.apagaRegistro(this.id)
    }

}

module.exports = Projeto