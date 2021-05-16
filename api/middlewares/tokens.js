/**
 * Interface tokens concentra e abstrai todas as operações com tokens
 */
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const moment = require('moment')
const { allowlistRefreshToken } = require('../../redis')
const { blocklistAccessToken } = require('../../redis')
const { TokenInvalidoPorLogout, TokenNaoEnviado, TokenInvalido } = require('../erros')

/**
 * método responsável por criar token jwt com base no id do usuário e com o tempo de expiração
 * @param {*} id - id do usuario
 * @param {*} tempoExpiracao - tempo de expiração recebido como array [tempoQuantidade:number,tempoUnidade:string]
 * @returns 
 */
function gerarTokenJWT(id, [tempoQuantidade, tempoUnidade]) {
    const payload = { id }
    const token = jwt.sign(payload, process.env.CHAVE_JWT, { expiresIn: tempoQuantidade + tempoUnidade })
    return token
}
/**
 * Método que implementa a verificação na blocklist de um token informado, recebendo o token a ser verificado.
 * Ele invoca o método verificaTokenNaBlocklist e caso o token não esteja na lista o método verifica o token jwt informado e devolve o id do usuário.
 * @param {*} token token a ser verificado
 * @param {*} nome nome do token sendo verificado
 * @param {*} blocklist nome da blocklist do token sendo verificado
 * @returns 
 */
async function verificaTokenJWT(token, nome, blocklist) {
    await verificaTokenNaBlockList(token, nome, blocklist)
    const { id } = jwt.verify(token, process.env.CHAVE_JWT)
    return id
}
/**
 * Verifica se um token informado pelo usuário está ou não na blocklist e se positivo 
 * @param {*} token - Token a ser verificado
 * @param {*} nome - Nome do tipo do token 
 * @param {*} blocklist - Nome da Blocklist do token
 * @throws {TokenInvalidoPorLogout} - Esse erro ocorre quando o token verificado foi incluido na blocklist devido ao logout da aplicação.
 * @returns 
 */
async function verificaTokenNaBlockList(token, nome, blocklist) {
    if (!blocklist) return
    const tokenNaBlacklist = await blocklist.contemToken(token)
    if (tokenNaBlacklist) {
        throw new TokenInvalidoPorLogout(nome)
    }
}
/**
 * O método adiciona o token informado a blocklist
 * @param {*} token - Token a ser incluido na blocklist
 * @param {*} blocklist - Nome da Blocklist do token
 * @returns 
 */
function invalidaTokenJWT(token, blocklist) {
    return blocklist.adiciona(token)
}
/**
 * O método cria um token opaco com base em dados pseudo-aleatórios e converte em string hexadecimal, usando o módulo moment adicionamos em formato unix o tempo de expiração informado e por fim o token, o id e a data de expiração são adicionados a allowlist.
 * @param {*} id - Id do Usuário
 * @param {*} tempoExpiracao - Tempo de expiração do token, recebido como array [tempoQuantidade:number,tempoUnidade:string]
 * @param {*} allowlist - Nome da allowlist em que o token deve ser adicionado
 * @returns 
 */
async function gerarTokenOpaco(id, [tempoQuantidade, tempoUnidade], allowlist) {
    const tokenOpaco = crypto.randomBytes(24).toString('hex')
    const dataExpiracao = moment().add(tempoQuantidade, tempoUnidade).unix()
    await allowlist.adiciona(tokenOpaco, id, dataExpiracao)
    return tokenOpaco
}
/**
 * Método responsável por verificar se um token opaco é válido. O método verifica a existência do token na allowlist e retorna um id de usuário.
 * @param {*} token - Nome do Token a ser verificado
 * @param {*} nome - Nome do tipo do Token
 * @param {*} allowlist - Nome da allowlist a ser consultada
 * @throws {TokenNaoEnviado} - Esse erro ocorre quando é verificado que nenhum token foi enviado para consulta
 * @throws {TokenInvalido} - Esse erro ocorre quando é verificado que o token informado não existe na allowlist
 * @returns 
 */
async function verificaTokenOpaco(token, nome, allowlist) {
    if (!token) throw new TokenNaoEnviado(nome)
    const id = await allowlist.buscaValor(token)
    if (!id) throw new TokenInvalido(nome)
    return id
}
/**
 * O método é responsável por excluir um determinado token da allowlist informada.
 * @param {*} token - Token a ser excluído da allowlist
 * @param {*} allowlist - Nome da allowlist
 */
async function invalidaTokenOpaco(token, allowlist) {
    await allowlist.deleta(token)
}

module.exports = {
    access: {
        nome: 'Access token',
        lista: blocklistAccessToken,
        expiracao: [15, 'm'],
        gerar(id) {
            return gerarTokenJWT(id, this.expiracao)
        },
        verifica(token) {
            return verificaTokenJWT(token, this.nome, this.lista)
        },
        invalida(token) {
            return invalidaTokenJWT(token, this.lista)
        }
    },
    refresh: {
        nome: 'Refresh token',
        lista: allowlistRefreshToken,
        expiracao: [5, 'd'],
        gerar(id) {
            return gerarTokenOpaco(id, this.expiracao, this.lista)
        },
        verifica(token) {
            return verificaTokenOpaco(token, this.nome, this.lista)
        },
        invalida(token) {
            return invalidaTokenOpaco(token, this.lista)
        }
    },
    verificacaoEmail: {
        nome: 'Token de verificação de e-mail',
        expiracao: [1, 'h'],
        gerar(id) {
            return gerarTokenJWT(id, this.expiracao)
        },
        verificar(token) {
            return verificaTokenJWT(token, this.nome)
        }
    }
}