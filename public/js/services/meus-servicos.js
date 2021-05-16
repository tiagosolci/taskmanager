angular.module('meusServicos', ['ngResource'])
    .factory('logout', function ($location, $window, $http) {
        let service = {};
        service.sair = function () {
            $http.post('/api/usuarios/logout')
                .success((response) => {
                    delete $window.sessionStorage.token;
                    delete $window.sessionStorage.user;
                    $location.path('/login');
                })
                .error((data, status) => {
                    console.log(data, status)
                })
                .catch((error) => {
                    $scope.erro = `Erro ao tentar sair do Task Manager ${ error }`
                })
        }
        return service;
    })
