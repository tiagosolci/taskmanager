const estrategiasAutenticacao = require('./estrategiaAutenticacao')
const middlewaresAutenticacao = require('./middlewaresAutenticacao')
const tokens = require('./tokens')
const EmailVerificacao = require('./EmailVerificacao')

module.exports = { estrategiasAutenticacao, middlewaresAutenticacao, tokens, EmailVerificacao }