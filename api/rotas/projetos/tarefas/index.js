const router = require('express').Router({ mergeParams: true })
const Tarefa = require('./Tarefa')

router.get('/:id', async (req, res, next) => {
    try {
        const projeto_id = req.projeto.id
        const id = Number(req.params.id)
        const tarefa = new Tarefa({ id, projeto_id })
        await tarefa.buscarTarefa()
        res.status(201).json(tarefa)
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const projeto_id = req.projeto.id
        const { nome, concluido, dataTermino, dataConclusao, descricao } = req.body
        const tarefa = new Tarefa({ projeto_id, nome, concluido, dataTermino, dataConclusao, descricao })
        await tarefa.criar()
        res.status(201).json(tarefa)
    } catch (error) {
        next(error)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const projeto_id = req.projeto.id
        const id = Number(req.params.id)
        const { nome, concluido, dataTermino, dataConclusao, descricao } = req.body
        const tarefa = new Tarefa({ id, projeto_id, nome, concluido, dataTermino, dataConclusao, descricao })
        await tarefa.atualizar()
        res.status(201).json(tarefa)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const projeto_id = req.projeto.id
        const id = Number(req.params.id)
        const tarefa = new Tarefa({ id, projeto_id })
        await tarefa.buscarTarefa()
        await tarefa.deletar()
        res.status(200).json({ mensagem: `Tarefa ${ tarefa.nome } deletada` })

    } catch (error) {
        next(error)
    }
})

module.exports = router