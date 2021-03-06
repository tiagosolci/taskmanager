module.exports = (app)=> {
    let api = app.api.login;

    app.post('/login', api.autentica);

    app.post('/usuarios/registrar/',api.criarUsuario);

    app.use('/*', api.verificaToken);

};
