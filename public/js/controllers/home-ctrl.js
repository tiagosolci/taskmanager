angular.module('taskmanager')
    .controller('HomeCtrl',function($scope,$http,$window){
        $scope.projeto = {
            tarefa: {}
        }
        $scope.projetos = []

        $scope.criarProjeto = ()=>{
            $scope.erro = ''
            let novoProjeto = $scope.projeto
            novoProjeto.idUsuario = JSON.parse($window.sessionStorage.user).id
            $http.post('/projeto/',novoProjeto)
            .then((response)=>{
                $scope.projetos.push(response.data)
                $scope.projeto = {}
            },(error)=>{
                $scope.erro = 'Houve um erro ao criar o projeto. ' 
                let erros = error.data
                if(Array.isArray(erros)){
                    erros.forEach(erro => {
                        $scope.erro += erro.msg     
                })  
                }else{
                    if(error.data.msg){
                        $scope.erro += error.data.msg     
                    }else{
                        $scope.erro += error.data    
                    }
                }
            })
        }

        $scope.listarProjetos = ()=>{
            $scope.erro = ''
            let idUsuario = JSON.parse($window.sessionStorage.user).id
            $http.get('/projeto/'+idUsuario)
            .then((response)=>{
                $scope.projetos = response.data
                buscarTarefas()
            },(error)=>{
                $scope.erro = 'Houve um erro ao buscar a lista de projetos. ' 
                let erros = error.data
                if(Array.isArray(erros)){
                    erros.forEach(erro => {
                        $scope.erro += erro.msg     
                })  
                }else{
                    if(error.data.msg){
                        $scope.erro += error.data.msg     
                    }else{
                        $scope.erro += error.data    
                    }
                }   
            })
        }

        $scope.listarProjetos()

        $scope.editarProjeto = (projeto)=>{
            projeto.editar = true
        }

        $scope.atualizarProjeto = (projeto)=> {
            $scope.erro = ''
            $http.put('/projeto/'+projeto.id,projeto)
                .then((response)=>{
                    projeto.versao = response.data
                    projeto.editar = false
                },(error)=>{
                    $scope.erro = 'Houve um erro ao tentar atualizar o projeto. ' 
                let erros = error.data
                if(Array.isArray(erros)){
                    erros.forEach(erro => {
                        $scope.erro += erro.msg     
                })  
                }else{
                    if(error.data.msg){
                        $scope.erro += error.data.msg     
                    }else{
                        $scope.erro += error.data    
                    }
                }
                })
        }

        $scope.deletarProjeto = (projeto) =>{
            $scope.erro = ''
         $http.delete('/projeto/'+projeto.id)
            .then(response =>{
                var index = $scope.projetos.indexOf(projeto);
                $scope.projetos.splice(index,1);
            },error =>{
                $scope.erro = 'Houve um erro ao tentar deletar o projeto. ' 
                let erros = error.data
                if(Array.isArray(erros)){
                    erros.forEach(erro => {
                        $scope.erro += erro.msg     
                })  
                }else{
                    if(error.data.msg){
                        $scope.erro += error.data.msg     
                    }else{
                        $scope.erro += error.data    
                    }
                }
            })
        }

        $scope.criarTarefa = (projeto)=>{
            $scope.erro = ''
            let tarefa = projeto.tarefa
            tarefa.idProjeto = projeto.id
            $http.post('/tarefa/',tarefa)
            .then(response=>{
                projeto.tarefa = {}
                buscarTarefas()
            },error=>{
                $scope.erro = 'Houve um erro ao tentar criar a tarefa. ' 
                let erros = error.data
                if(Array.isArray(erros)){
                    erros.forEach(erro => {
                        $scope.erro += erro.msg     
                })  
                }else{
                    if(error.data.msg){
                        $scope.erro += error.data.msg     
                    }else{
                        $scope.erro += error.data    
                    }
                }
            })
        }

        function buscarTarefas(){
            $scope.erro = ''
            $scope.projetos.forEach(projeto => {
                const idProjeto = projeto.id
                $http.get('/tarefa/'+idProjeto)
            .then((response)=>{
                projeto.tarefas = response.data
                projeto.tarefas.forEach(tarefa =>{
                    tarefa.concluido = retornaBooleano(tarefa.concluido)
                })
            },(error)=>{
                $scope.erro = 'Houve um erro ao buscar a lista de tarefas. ' 
                let erros = error.data
                if(Array.isArray(erros)){
                    erros.forEach(erro => {
                        $scope.erro += erro.msg     
                })  
                }else{
                    if(error.data.msg){
                        $scope.erro += error.data.msg     
                    }else{
                        $scope.erro += error.data    
                    }
                }   
            })

            })
        }

        $scope.editarTarefa = (tarefa)=>{
            tarefa.editar = true
        }

        $scope.atualizarTarefa = (tarefa)=> {
            $scope.erro = ''
            $http.put('/tarefa/'+tarefa.id,tarefa)
                .then((response)=>{
                    tarefa.versao = response.data
                    tarefa.editar = false
                },(error)=>{
                    $scope.erro = 'Houve um erro ao tentar atualizar a tarefa. ' 
                let erros = error.data
                if(Array.isArray(erros)){
                    erros.forEach(erro => {
                        $scope.erro += erro.msg     
                })  
                }else{
                    if(error.data.msg){
                        $scope.erro += error.data.msg     
                    }else{
                        $scope.erro += error.data    
                    }
                }
                })
        }

        $scope.deletarTarefa = (projeto,tarefa) =>{
            $scope.erro = ''
         $http.delete('/tarefa/'+tarefa.id)
            .then(response =>{
                var index = projeto.tarefas.indexOf(tarefa);
                projeto.tarefas.splice(index,1);
            },error =>{
                $scope.erro = 'Houve um erro ao tentar deletar a tarefa. ' 
                let erros = error.data
                if(Array.isArray(erros)){
                    erros.forEach(erro => {
                        $scope.erro += erro.msg     
                })  
                }else{
                    if(error.data.msg){
                        $scope.erro += error.data.msg     
                    }else{
                        $scope.erro += error.data    
                    }
                }
            })
        }


        function retornaBooleano(concluido){
            return Boolean(Number(concluido));
        }

    });