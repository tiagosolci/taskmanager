const { CampoInvalido, TarefaNaoEncontrada } = require('../../../erros')
const { TarefasService } = require('../../../services')
const tarefasService = new TarefasService()
/**
 * A classe Tarefa é responsável por gerenciar todas as operações relacionadas a projetos.
 */
class Tarefa {
    constructor({ id, projeto_id, nome, concluido, dataTermino, dataConclusao, descricao, createdAt, updatedAt, deletedAt }) {
        this.id = id
        this.projeto_id = projeto_id
        this.nome = nome
        this.concluido = concluido
        this.dataTermino = dataTermino
        this.dataConclusao = dataConclusao
        this.descricao = descricao
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.deletedAt = deletedAt
    }
    /**
     * Cria uma tarefa após validação dos campos obrigatórios
     */
    async criar() {
        this.validar()
        const resultado = await tarefasService.criaRegistro({
            projeto_id: this.projeto_id,
            nome: this.nome,
            concluido: this.concluido,
            dataTermino: this.dataTermino,
            dataConclusao: this.dataConclusao,
            descricao: this.descricao
        })
        this.id = resultado.id
        this.concluido = resultado.concluido
        this.createdAt = resultado.createdAt
        this.updatedAt = resultado.updatedAt

    }

    /**
     * Define e valida os campos obrigratórios para criação e atualização de tarefas
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
     * Atualiza uma tarefa após a validação dos campos
     */
    async atualizar() {
        this.validar()
        await tarefasService.atualizaRegistro(this, this.id)
    }

    /**
     * Busca uma tarefa atráves do id da tarefa e do projeto
     * @throws {TarefaNaoEncontrada} - Esse erro ocorre quando a tarefa não é encontrada.
     */
    async buscarTarefa() {
        const resultado = await tarefasService.pegaUmRegistro(this.id, this.projeto_id)
        if (!resultado) throw new TarefaNaoEncontrada()
        this.nome = resultado.nome
        this.concluido = resultado.concluido
        this.dataTermino = resultado.dataTermino
        this.dataConclusao = resultado.dataConclusao
        this.descricao = resultado.descricao
        this.createdAt = resultado.createdAt
        this.updatedAt = resultado.updatedAt
        this.deleteAt = resultado.deleteAt
    }

    /**
     * Deleta uma tarefa através do seu id.
     */
    async deletar() {
        await tarefasService.apagaRegistro(this.id)
    }
}

module.exports = Tarefa