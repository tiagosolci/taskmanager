const redis = require('redis')
const manipulaLista = require('./manipulaLista')

const allowlist = redis.createClient({ prefix: 'allowlistRefreshToken:' })


module.exports = manipulaLista(allowlist)