require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const usuarios = require('./rotas/usuarios')
const projetos = require('./rotas/projetos')

const { CampoInvalido, CampoDuplicado, UsuarioNaoEncontrado, FalhaAutenticacao, TokenInvalido, TokenInvalidoPorLogout, TokenNaoEnviado } = require('./erros')
const sequelize = require('sequelize')
const jwt = require('jsonwebtoken')
const { estrategiasAutenticacao } = require('./middlewares')
require('../redis/blocklistAccessToken')
require('../redis/allowlistRefreshToken')

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.set('X-Powered-By', 'Task Manager')
    next()
})

app.use('/', express.static('public'));

app.use('/api/usuarios', usuarios)
app.use('/api/projetos', projetos)

app.use((error, req, res, next) => {
    let status = 500
    const body = {
        mensagem: error.message
    }

    if (error instanceof CampoInvalido) {
        status = 400
    }
    if (error instanceof sequelize.UniqueConstraintError) {
        error = new CampoDuplicado(error.errors[0].path)
        status = 403
    }
    if (error instanceof UsuarioNaoEncontrado) {
        status = 404
    }
    if (error instanceof FalhaAutenticacao) {
        status = 401
    }
    if (error instanceof TokenInvalido) {
        status = 401
    }
    if (error instanceof TokenInvalidoPorLogout) {
        status = 401
    }
    if (error instanceof jwt.TokenExpiredError) {
        status = 401
        body.expiradoEm = error.expiredAt
    }
    if (error instanceof TokenNaoEnviado) {
        status = 401
    }

    res.status(status)
    res.json({
        mensagem: error.message,
        id: error.idError
    })
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor rodando na porta ${ port }`))

module.exports = app