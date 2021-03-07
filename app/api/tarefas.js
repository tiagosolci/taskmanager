module.exports = (app)=>{
    const api = {}
    const conn = app.helpers.connectionFactory()
    const TarefasDAO = new app.models.TarefasDAO(conn)

    api.criar = (req,res)=>{
        req.assert("nome", "o nome da tarefa é obrigatória").notEmpty();
        req.assert("idProjeto", "o id do projeto é obrigatório").notEmpty();

        if (req.validationErrors()){
            res.status(400).send(req.validationErrors())
        }else{
            const tarefa = req.body
            tarefa.dataCriacao = new Date()
            tarefa.dataAtualizacao = new Date()
            tarefa.versao = 0
            TarefasDAO.criar(tarefa,(error,results) =>{
                if(error){
                    res.status(400)
                    res.send(
                        JSON.stringify({
                            msg:'Erro ao tentar criar a tarefa no DB.'
                        })
                    )
                }else{
                    res.status(201)
                    res.json({...tarefa,id:results.insertId})
                }
            })
        }
        
    }

    api.lista = (req,res)=>{
        const idProjeto = parseInt(req.params.id)
        TarefasDAO.listar(idProjeto,(error,results)=>{
            if(error){
                res.status(400)
                res.send(res.send(
                    JSON.stringify({
                        msg:'Erro ao tentar listar as tarefas do DB.'
                    })
                ))
            }else{
                res.status(200)
                res.json(results)
            }
        })
    }

    api.atualizar = (req,res)=>{
        req.assert("nome", "o nome da tarefa é obrigatória").notEmpty();
        req.assert("idProjeto", "o id do projeto da tarefa é obrigatório").notEmpty();
        req.assert("versao", "a versão da tarefa é obrigatória").notEmpty();
        if (req.validationErrors()){
            res.status(400).send(req.validationErrors())
        }else{
            const idTarefa = parseInt(req.params.id)
            
            const tarefa = {
                nome:req.body.nome,
                concluido:req.body.concluido,
                dataAtualizacao:new Date(),
                versao: parseInt(req.body.versao)+1
            }

            if(req.body.concluido){
                tarefa.dataConclusao = new Date()
            }else{
                tarefa.dataConclusao = null
            }

            if(req.body.descricao){
                tarefa.descricao = req.body.descricao
            }

            if(req.body.dataTermino){
                tarefa.dataTermino = new Date(req.body.dataTermino)
            }
            TarefasDAO.atualizar(idTarefa,tarefa,(error,results)=>{
                if(error){
                    console.log(error)
                    res.status(400)
                    res.send(res.send(
                        JSON.stringify({
                            msg:`Erro ao tentar atualizar o projeto ${tarefa.nome} no DB.`
                        })
                    ))
                }else{
                    res.status(201)
                    res.json(tarefa.versao)
                }
            })
        }
    }

    api.deletar = (req,res)=>{
        const idTarefa = parseInt(req.params.id)
        TarefasDAO.deletar(idTarefa,(error,results)=>{
            if(error){
                res.status(400)
                res.send(res.send(
                    JSON.stringify({
                        msg:`Erro ao tentar deletar a tarefa id:${idTarefa} do DB.`
                    })
                )) 
            }else{
                res.status(204)
                res.end()
            }
        })
    }

    api.buscarTarefaPorId = (req,res) =>{
        const id = parseInt(req.params.id)
        TarefasDAO.buscarTarefaPorId(id,(error,results)=>{
            if(error){
                res.status(400)
                res.send(res.send(
                    JSON.stringify({
                        msg:'Erro ao tentar buscar a tarefa do DB.'
                    })
                ))
            }else{
                res.status(200)
                res.json(results[0])
            }  
        })
    }

    return api

}