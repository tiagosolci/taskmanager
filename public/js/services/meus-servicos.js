angular.module('meusServicos', ['ngResource'])
    .factory('logout',function($location,$window,$http) {
        let service = {};
        service.sair = function() {
            delete $window.sessionStorage.token;
            delete $window.sessionStorage.user;
            $location.path('/login');
        };
        return service;
    })
    