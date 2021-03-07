module.exports = (app)=> {
    let api = app.api.usuario;

    app.post('/usuarios/registrar/',api.criarUsuario);

};
