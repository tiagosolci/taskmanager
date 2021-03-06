module.exports = (app) => {


    const api = {};
    const jwt = require('jsonwebtoken');
    const conn = app.helpers.connectionFactory();
    const LoginDAO = new app.models.LoginDAO(conn)

    api.criarUsuario = (req,res)=>{
        req.assert("email", "o e-mail é obrigatório").notEmpty();
        req.assert("senha", "a senha é obrigatória").notEmpty();
        req.assert("nome", "o nome é obrigatório.").notEmpty();

        if (req.validationErrors()){
            res.status(400).send(req.validationErrors())
        } else{
            const usuario ={
                email:req.body.email,
                senha:req.body.senha,
                nome:req.body.nome,
                dataCriacao: new Date(),
                dataAtualizacao: new Date()
            }
            if (req.body.senha !== req.body.confirmacaoSenha) {
                res.status(403).send('As senhas digitadas não são iguais.');
            }else{
                LoginDAO.criaUsuario(usuario,function (error,results) {
                    if(error){
                        res.status(500).send('Erro ao incluir o usuário no banco de dados '+error);
                    } else{
                        res.status(201).send('Usuário criado com sucesso');
                    }
                });
            }
        }
    };

    api.autentica = (req, res) => {
        req.assert("email", "o e-mail é obrigatório").notEmpty();
        req.assert("senha", "a senha é obrigatória").notEmpty();

        if (req.validationErrors()) {
            res.status(400).send(req.validationErrors());
        }
        
        LoginDAO.validar(req.body, function (error, results) {
            if (error) {
                res.status(400).send(
                    JSON.stringify({
                        msg:'Usuário não encontrado.'
            }))
        }  
            else {
                if (!results.length > 0) {
                    res.status(401).send(
                        JSON.stringify({
                            msg:'Não autorizado, Login ou senha inválidos'
                        })
                        );
                }else{
                    const token = jwt.sign({user: req.body.user}, app.get('secret'), {expiresIn: '12h'});
                    results = JSON.parse(JSON.stringify(results))
                            res.set('x-access-token', token);
                            res.json({id:results[0].id,nome:results[0].nome});
                            res.end();
                }
            }
        });
    };

    api.verificaToken = (req, res, next) => {
            console.log('Verificando Token....');
            jwt.verify(req.headers['x-access-token'], app.get('secret'), function (err, decoded) {
                if (err) {
                    console.log(err);
                    res.sendStatus(401);
                    next();
                }else{
                    next();
                }
            })
    };

    return api;
};