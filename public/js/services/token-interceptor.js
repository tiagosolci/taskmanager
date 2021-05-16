angular.module('taskmanager')
    .factory('tokenInterceptor', function ($window, $q, $location) {
        let interceptor = {};

        interceptor.response = function (response) {
            const token = response.headers('Authorization');
            const refreshToken = response.data.refreshToken
            if (token) {
                console.log('Armazenando token recebido no navegador');
                $window.sessionStorage.token = token;
                $window.sessionStorage.refreshToken = refreshToken;
            }
            return response;
        };

        interceptor.request = function (config) {
            config.body = { refreshToken: $window.sessionStorage.refreshToken }
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers['Authorization'] = `Bearer ${ $window.sessionStorage.token }`;
                console.log('Adicionando token no header da requisição para ser enviado para servidor');
            }
            return config;
        };

        interceptor.responseError = function (rejection) {
            console.log(rejection);
            if (rejection !== null && rejection.status === 401) {
                console.log('direcionando para login');
                delete $window.sessionStorage.token;
                delete $window.sessionStorage.user;
                delete $window.sessionStorage.refreshToken
                $location.path('/login');
            }
            return $q.reject(rejection);
        };

        return interceptor;
    });
