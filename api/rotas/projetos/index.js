const Projeto = require('./Projeto')
const router = require('express').Router()
const { middlewaresAutenticacao } = require('../../middlewares')

router.get('/', middlewaresAutenticacao.bearer, async (req, res, next) => {
    try {
        const usuario_id = req.user.id
        const projeto = new Projeto({ usuario_id })
        const projetos = await projeto.buscaProjetosPorUsuarioId()
        res.status(200).json(projetos)
    } catch (error) {
        next(error)
    }
})

router.post('/', middlewaresAutenticacao.bearer, async (req, res, next) => {
    try {
        const usuario_id = req.user.id
        const { nome } = req.body
        const projeto = new Projeto({ usuario_id, nome })
        await projeto.criar()
        res.status(201).json(projeto)
    } catch (error) {
        next(error)
    }
})

router.put('/', middlewaresAutenticacao.bearer, async (req, res, next) => {
    try {
        const usuario_id = req.user.id
        const { id, nome } = req.body
        const projeto = new Projeto({ id, usuario_id, nome })
        await projeto.atualizar()
        res.status(200).json(projeto)
    } catch (error) {
        next(error)
    }
})

router.delete('/', middlewaresAutenticacao.bearer, async (req, res, next) => {
    try {
        const usuario_id = req.user.id
        const { id } = req.body
        const projeto = new Projeto({ id, usuario_id })
        await projeto.buscarProjeto()
        await projeto.deletar()
        res.status(200).json({ mensagem: `Projeto ${ projeto.nome } deletado` })
    } catch (error) {
        next(error)
    }
})
/**
 * Método para validar se o projeto informado na rota de tarefas é válido e pertence ao usuário logado fazendo a requisição.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const verificarProjeto = async (req, res, next) => {
    try {
        const usuario_id = req.user.id
        const id = Number(req.params.idProjeto)
        const projeto = new Projeto({ id, usuario_id })
        await projeto.buscarProjeto()
        req.projeto = projeto
        next()
    } catch (error) {
        /**
         * chama o próximo middleware caso retorne erro
         */
        next(error)
    }
}

/**
 * Importa as rotas de tarefas, dessa forma elas ficam sobre projetos em dependência desse. Ganha-se além da validação do access token a validação do projeto.
 * @type 
 */
const roteadorTarefas = require('./tarefas')
router.use('/:idProjeto/tarefas', middlewaresAutenticacao.bearer, verificarProjeto, roteadorTarefas)



module.exports = router