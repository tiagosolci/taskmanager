module.exports = (app) => {

    const api = {};
    const conn = app.helpers.connectionFactory();
    const UsuarioDAO = new app.models.UsuarioDAO(conn)

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
                UsuarioDAO.criaUsuario(usuario,function (error,results) {
                    if(error){
                        if(error+"".includes('ER_DUP_ENTRY: Duplicate entry ')){
                            error = `O E-mail ${usuario.email} já foi cadastrado no Task Manager`
                        }
                        res.status(403).send('Erro ao incluir o usuário no banco de dados '+error)
                    } else{
                        res.status(201).send('Usuário criado com sucesso')
                    }
                });
            }
        }
    };

    return api;
};