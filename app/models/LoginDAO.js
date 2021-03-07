function LoginDAO(connection){
    this._connection = connection;
}

LoginDAO.prototype.validar = function(dados,callback) {
    this._connection.query(`SELECT id, nome, email FROM usuarios WHERE email = '${dados.email}' AND md5(senha) = md5(${dados.senha});`, callback)
};

module.exports = () =>{
    return LoginDAO;
};
