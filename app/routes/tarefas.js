module.exports = (app)=>{
    const api = app.api.tarefas

    app.route('/tarefa/:id?')
        .post(api.criar)
        .get(api.lista)
        .put(api.atualizar)
        .delete(api.deletar)

    app.route('/tarefa/editar/:id')
        .get(api.buscarTarefaPorId)
        .put(api.atualizar)

}