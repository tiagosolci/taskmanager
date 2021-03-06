angular.module('taskmanager')
    .controller('LoginCtrl',function($scope,$http,$location){
        $scope.login = {};

        $scope.logar = ()=>{
            if($scope.form.$valid){
                $http.post('/login',$scope.login)
                    .then((response)=> {
                        $scope.erro = '';
                        sessionStorage.user = JSON.stringify(response.data);
                        $location.path('/home');
                    },(error)=> {
                        $scope.login = {};
                        $scope.erro = 'Houve um erro ao tentar logar no sistema. ' 
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
        }

        $scope.registrar =  ()=>{
            $location.path('/usuario/registrar/');
        }
    })