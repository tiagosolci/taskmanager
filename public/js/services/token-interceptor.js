angular.module('taskmanager')
    .factory('tokenInterceptor', function($window, $q, $location) {
        let interceptor = {};

        interceptor.response  = function(response) {
            let token = response.headers('x-access-token');
            if(token){
                console.log('Armazenando token recebido no navegador');
                $window.sessionStorage.token = token;
            }
            return response;
        };

        interceptor.request = function(config) {
            config.headers = config.headers || {};
            if($window.sessionStorage.token){
                config.headers['x-access-token'] = $window.sessionStorage.token;
                console.log('Adicionando token no header da requisição para ser enviado para servidor');
            }
            return config;
        };

        interceptor.responseError = function(rejection) {
            console.log(rejection);
            if(rejection !== null && rejection.status === 401){
                console.log('direcionando para login');
                delete $window.sessionStorage.token;
                delete $window.sessionStorage.user;
                $location.path('/login');
            }
            return $q.reject(rejection);
        };

        return interceptor;
    });
