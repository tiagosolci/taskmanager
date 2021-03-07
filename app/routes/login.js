module.exports = (app)=> {
    let api = app.api.login;

    app.post('/login', api.autentica);

    app.use('/*', api.verificaToken);

};
