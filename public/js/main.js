angular.module('taskmanager', ['ngAnimate', 'ngRoute','ngResource','ngCookies','minhasDiretivas','meusServicos','ui.bootstrap','ui.mask'])
    .config(function($routeProvider, $locationProvider, $httpProvider,$sceProvider){

        $sceProvider.enabled(false);
        $httpProvider.interceptors.push('tokenInterceptor');
        $locationProvider.hashPrefix('');


        $routeProvider.when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'LoginCtrl'
        });

        $routeProvider.when('/usuario/registrar/', {
            templateUrl: 'partials/usuarioRegistrar.html',
            controller: 'UsuarioRegistrarCtrl'
        });

        $routeProvider.when('/home/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        });

        $routeProvider.when('/tarefa/editar/:id', {
            templateUrl: 'partials/tarefa.html',
            controller: 'TarefaCtrl'
        });

        $routeProvider.otherwise({redirectTo: '/login'});

    })