const redis = require('redis')
const blocklist = redis.createClient({ prefix: 'blocklistAccessToken:' })

const jwt = require('jsonwebtoken')
const { createHash } = require('crypto')

const manipulaLista = require('./manipulaLista')
const manipulaBlocklist = manipulaLista(blocklist)


function geraTokenHash(token) {
    return createHash('sha256').update(token).digest('hex');
}

module.exports = {
    async adiciona(token) {
        const dataExpiracao = jwt.decode(token).exp;
        const tokenHash = geraTokenHash(token);
        await manipulaBlocklist.adiciona(tokenHash, '', dataExpiracao);
    },
    async contemToken(token) {
        const tokenHash = geraTokenHash(token);
        return manipulaBlocklist.contemChave(tokenHash);
    },
};
