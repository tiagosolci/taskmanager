angular.module('taskmanager')
    .controller('UsuarioRegistrarCtrl',function($scope,$http,$location){
        $scope.usuario = {}

        $scope.registrar = ()=>{
            if($scope.form.$valid){
                $http.post('/usuarios/registrar/',$scope.usuario)
                    .then((response)=> {
                        alert('Usuário criado com sucesso!')
                        $location.path('/login')
                    },(error) => {
                        $scope.erro = 'Houve um erro ao tentar cadastrar o usuário. ' 
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
                    });
            }
        }


    $scope.cancelar = ()=>{
        $location.path('/login')
    }
    })