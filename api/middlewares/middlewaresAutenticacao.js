/**
 * interface que implementa os middlwares de autenticação da aplicação
 * @interface 
 */

const passport = require('passport')
const { FalhaAutenticacao, TokenInvalido } = require('../erros')
const Usuario = require('../rotas/usuarios/Usuario')
const tokens = require('./tokens')

module.exports = {
    /**
     * O método local é responsável por interceptar a requisição de login na aplicação e possibilitar o tratamento de erros no padrão do sistema omitindo os erros fora do padrão do passport quando o usuário não é encontrado.
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @throws {FalhaAutenticacao} - Esse erro ocorre quando o usuário não é identificado.
     */
    local(req, res, next) {
        passport.authenticate(
            'local',
            { session: false },
            (error, usuario, info) => {
                if (error) return next(error)
                if (!usuario) {
                    error = new FalhaAutenticacao()
                    return next(error)
                }
                req.user = usuario
                return next()
            }
        )(req, res, next)
    },
    /**
     * O método bearer é responsável por interceptar as chamadas realizadas em todas as rotas em que o usuário deverá estar logado para requisitar. Ele permite o tratamento de erros gerados pela confirmação do access token enviado é válido e não está expirado.
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @throws {TokenInvalido} - Esse erro ocorre quando é verificado que o token enviado na rota é inválido.
     */
    bearer(req, res, next) {
        passport.authenticate(
            'bearer',
            { session: false },
            (error, usuario, info) => {
                if (error) return next(error)
                if (!usuario) {
                    error = new TokenInvalido('Access Token')
                    next(error)
                }
                req.token = info.token
                req.user = usuario
                return next()
            }
        )(req, res, next)
    },
    /**
     * O método refresh é responsável por interceptar a chamada realizada para criar um novo access token quando esse está expirado à partir do refresh token enviado. Ele permite o tratamento de erros gerados pela verificação se o refresh token é válido e não está expirado.
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.body
            const id = await tokens.refresh.verifica(refreshToken)
            await tokens.refresh.invalida(refreshToken)
            const usuario = new Usuario({ id })
            await usuario.buscarPorId()
            req.user = usuario
            return next()
        } catch (error) {
            next(error)
        }
    },
    /**
     * O método é responsável por interceptar a rota de verificação do e-mail do usuário recém cadastrado, validando se o token é válido e devolvendo o id do usuário para passar para o próximo middleware.
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async verificacaoEmail(req, res, next) {
        try {
            const { token } = req.params
            const id = await tokens.verificacaoEmail.verificar(token)
            const usuario = new Usuario({ id })
            await usuario.buscarPorId()
            req.user = usuario
            return next()
        } catch (error) {
            next(error)
        }
    }


}