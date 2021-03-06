    function ProjetosDAO(connection){
        this._connection = connection;
    }
    
    ProjetosDAO.prototype.criar = function (projeto,callback){
        this._connection.query(`INSERT INTO projetos SET ?`,projeto, callback)
    };

    ProjetosDAO.prototype.listar = function (idUsuario,callback){
        this._connection.query(`SELECT * FROM projetos WHERE idUsuario = ${idUsuario}`, callback)
    };

    ProjetosDAO.prototype.atualizar = function(id,projeto,callback){
        this._connection.query(`UPDATE projetos SET ? WHERE id = ${id}`,projeto,callback)
    }

    ProjetosDAO.prototype.deletar = function(id,callback){
        this._connection.query(`DELETE FROM projetos WHERE id = ${id}`,callback)
    }


    
    module.exports = () =>{
        return ProjetosDAO;
    };
    