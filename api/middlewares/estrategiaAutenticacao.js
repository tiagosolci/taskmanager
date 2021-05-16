/**
 * middleware que implementa as estratégias de autenticação da aplicação
 * @interface 
 */
const passport = require('passport')
/**
 * @module {passport}
 */
const bcrypt = require('bcrypt')
/**
 * @module {bcript}
 */

/**
 * Para configuração da estratégia local de autenticação do usuário foi usado o módulo node passport e passport-local
 */
const LocalStrategy = require('passport-local').Strategy
/**
 * constante que contém a estratégia local do passport
 * @type {class} LocalStrategy
 */
const BearerStrategy = require('passport-http-bearer').Strategy
/**
 * * constante que contém a estratégia bearer do passport
 * @type {class} BearerStrategy
 */

const Usuario = require('../rotas/usuarios/Usuario')
/**
 * * constante da Classe Usuário
 * @type {class} Usuario
 */
const { FalhaAutenticacao, UsuarioNaoEncontrado } = require('../erros')
/**
 * * constante das classes de tratamento de erro da interface
 * @type {class} FalhaAutenticacao
 * @type {class} UsuarioNaoEncontrado
 */

const tokens = require('./tokens')
/**
 * constante com a interface que concentra manipulação dos tokens do sistema.
 * @type {interface}
 */

/**
 * O método verifica se um usuário foi encontrado com o e-mail informado
 * @param {object} usuario 
 * Esse erro ocorre quando um usuário não é encontrado.
 * @throws {UsuarioNaoEncontrado}
 */
function verificaUsuario(usuario) {
    if (!usuario) throw new UsuarioNaoEncontrado()
}

/**
 * O métdo verifica atráves do módulo bcrypt se a senha informada pelo cliente é compatível com o hash da senha guardado no DB
 * @param {string} senha 
 * @param {string} senhaHash 
 * Esse erro ocorre quando a comparação da senha com o hash da senha falha.
 * @throws {FalhaAutenticacao}
 */
async function verificaSenha(senha, senhaHash) {
    const senhaValida = await bcrypt.compare(senha, senhaHash)
    if (!senhaValida) throw new FalhaAutenticacao()
}

/**
 * A classe Usuário é instanciada e é feito a busca do registro do usuário pelo e-mail informado no login, caso retorno nulo a estratégia devolve o erro de que o usuário não foi localizado.
 * 
 * Encontrado o usuário a senha informada é validada com hash da senha salvo no DB através do método compare do bcrypt.
 * Confirmado que a senha é a correta o middleware passa o usuário localizado para o próximo middleware.
 */
passport.use(
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'senha',
        session: false
    }, async (email, senha, next) => {
        try {
            const usuario = new Usuario({ email })
            await usuario.buscarPorEmail()
            verificaUsuario(usuario)
            await verificaSenha(senha, usuario.senha)
            next(null, usuario)
        } catch (error) {
            next(error)
        }

    })
)
/**
 * Implementa a estratégia a ser usada nas rotas que devem ser protegidas
 */
passport.use(
    new BearerStrategy(
        async (token, next) => {
            try {
                const id = await tokens.access.verifica(token)
                const usuario = new Usuario({ id })
                await usuario.buscarPorId()
                next(null, usuario, { token })
            } catch (error) {
                next(error)
            }
        }
    )
)