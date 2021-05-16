const router = require('express').Router()
const Usuario = require('./Usuario')
const { middlewaresAutenticacao, EmailVerificacao, tokens } = require('../../middlewares')

router.post('/', async (req, res, next) => {
    try {
        const { nome, email, senha } = req.body
        const usuario = new Usuario({ nome, email, senha })
        await usuario.criar()

        const token = tokens.verificacaoEmail.gerar(usuario.id)
        const emailVerificacao = new EmailVerificacao(usuario, token)
        emailVerificacao.enviaEmail().catch(console.log)

        res.status(201).json({ mensagem: 'Usuário criado com sucesso.' })
    } catch (error) {
        next(error)
    }
})

router.post('/login', middlewaresAutenticacao.local, async (req, res, next) => {
    try {
        const { user } = req
        const { nome } = user
        const accessToken = tokens.access.gerar(user.id)
        const refreshToken = await tokens.refresh.gerar(user.id)

        res.set('Authorization', accessToken)
        res.status(200).json({ refreshToken, nome })
    } catch (error) {
        next(error)
    }
})

router.post('/logout', [middlewaresAutenticacao.refresh, middlewaresAutenticacao.bearer], async (req, res, next) => {
    try {
        const { token } = req
        await tokens.access.invalida(token)
        res.status(204).send()
    } catch (error) {
        next(error)
    }
})

router.post('/atualiza_token', middlewaresAutenticacao.refresh, async (req, res, next) => {
    try {
        const { user } = req
        const accessToken = tokens.access.gerar(user.id)
        const refreshToken = await tokens.refresh.gerar(user.id)

        res.set('Authorization', accessToken)
        res.status(200).json({ refreshToken })
    } catch (error) {
        next(error)
    }
})

router.get('/verifica_email/:token', middlewaresAutenticacao.verificacaoEmail, async (req, res, next) => {
    try {
        const { user } = req
        await user.verificaEmail()
        res.status(200).json()
    } catch (error) {
        next(error)
    }
})

module.exports = router