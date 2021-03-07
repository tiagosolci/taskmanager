function UsuarioDAO(connection){
    this._connection = connection;
}

UsuarioDAO.prototype.criaUsuario = function(usuario,callback) {
    this._connection.query('INSERT INTO usuarios SET ?',usuario,callback);
};

module.exports = () =>{
    return UsuarioDAO;
};
