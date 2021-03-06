module.exports = (app) =>{
    const api = {}
    const conn = app.helpers.connectionFactory()
    const ProjetosDAO = new app.models.ProjetosDAO(conn)

    api.criar = (req,res)=>{ 
        req.assert("nome", "o nome do projeto é obrigatório").notEmpty();
        req.assert("idUsuario", "o id do usuário do projeto é obrigatório").notEmpty();

        if (req.validationErrors()){
            res.status(400).send(req.validationErrors())
        } else{
            const projeto = {
                nome:req.body.nome,
                idUsuario:req.body.idUsuario
            }
            projeto.dataCriacao = new Date()
            projeto.dataAtualizacao = new Date()
            projeto.versao = 0
            ProjetosDAO.criar(projeto,(error,results) =>{
                if(error){
                    res.status(400)
                    res.send(
                        JSON.stringify({
                            msg:'Erro ao tentar criar o projeto no DB.'
                        })
                    )
                }else{
                    res.status(201)
                    res.json({...projeto,id:results.insertId})
                }
            })
        }

        
    }

    api.listar = (req,res)=>{
        const idUsuario = parseInt(req.params.id)
        ProjetosDAO.listar(idUsuario,(error,results)=>{
            if(error){
                res.status(400)
                res.send(res.send(
                    JSON.stringify({
                        msg:'Erro ao tentar listar os projetos do DB.'
                    })
                ))
            }else{
                res.status(200)
                res.json(results)
            }
        })
    }

    api.atualizar = (req,res)=>{
        req.assert("nome", "o nome do projeto é obrigatório").notEmpty();
        req.assert("idUsuario", "o id do usuário do projeto é obrigatório").notEmpty();
        req.assert("versao", "a versão do projeto é obrigatório").notEmpty();
        if (req.validationErrors()){
            res.status(400).send(req.validationErrors())
        }else{
            const idProjeto = parseInt(req.params.id)
    
            const projeto = {
                nome:req.body.nome,
                dataAtualizacao:new Date(),
                versao: parseInt(req.body.versao)+1
            }
            ProjetosDAO.atualizar(idProjeto,projeto,(error,results)=>{
                if(error){
                    res.status(400)
                    res.send(res.send(
                        JSON.stringify({
                            msg:`Erro ao tentar atualizar o projeto ${projeto.nome} no DB.`
                        })
                    ))
                }else{
                    res.status(201)
                    res.json(projeto.versao)
                }
            })
        }
    }

    api.deletar = (req,res)=>{
        const idProjeto = parseInt(req.params.id)
        ProjetosDAO.deletar(idProjeto,(error,results)=>{
            if(error){
                res.status(400)
                res.send(res.send(
                    JSON.stringify({
                        msg:`Erro ao tentar deletar o projeto id:${idProjeto} do DB.`
                    })
                )) 
            }else{
                res.status(204)
                res.end()
            }
        })
    }

    return api
}