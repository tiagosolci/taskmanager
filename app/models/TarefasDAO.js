function TarefasDAO(connection){
    this._connection = connection;
}

TarefasDAO.prototype.criar = function (projeto,callback){
    this._connection.query(`INSERT INTO tarefas SET ?`,projeto, callback)
};

TarefasDAO.prototype.listar = function (idProjeto,callback){
    this._connection.query(`SELECT * FROM tarefas WHERE idProjeto = ${idProjeto}`, callback)
};

TarefasDAO.prototype.atualizar = function(id,tarefa,callback){
    this._connection.query(`UPDATE tarefas SET ? WHERE id = ${id}`,tarefa,callback)
}

TarefasDAO.prototype.deletar = function(id,callback){
    this._connection.query(`DELETE FROM tarefas WHERE id = ${id}`,callback)
}



module.exports = () =>{
    return TarefasDAO;
};
