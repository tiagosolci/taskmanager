module.exports = (app) =>{
    const api = app.api.projetos;

    app.route('/projeto/:id?')
        .post(api.criar)
        .get(api.listar)
        .put(api.atualizar)
        .delete(api.deletar)
}