angular.module('taskmanager')
    .controller('TarefaCtrl',function($scope,$http,$routeParams,$location){
        $scope.tarefa = {}
        const idTarefa = $routeParams.id

        $http.get('/tarefa/editar/'+idTarefa)
            .then(response =>{
                $scope.tarefa = response.data
                formatarTarefa()
            },erro => {
                $scope.erro = 'Houve um erro ao tentar buscar a tarefa. ' 
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

            $scope.salvar = ()=>{
                $scope.erro =''
                $http.put('/tarefa/editar/'+idTarefa,$scope.tarefa)
                .then(response =>{
                    $scope.form.$setPristine();
                    $scope.form.$setUntouched();
                },erro => {
                    $scope.erro = 'Houve um erro ao tentar salvar a tarefa. ' 
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
            
            function formatarTarefa(){
                $scope.tarefa.concluido = retornaBooleano($scope.tarefa.concluido)
                if($scope.tarefa.dataTermino !== null){
                    $scope.tarefa.dataTermino = new Date($scope.tarefa.dataTermino)
                }else{
                    $scope.tarefa.dataTermino = ''
                }
                
            }

            $scope.concluido = ()=>{
                if($scope.tarefa.concluido){
                    $scope.tarefa.dataConclusao = new Date()
                }else{
                    $scope.tarefa.dataConclusao = null
                }
                $scope.salvar()
            }

            $scope.cancelar = ()=>{
                $location.path('/home/')
            }
    })