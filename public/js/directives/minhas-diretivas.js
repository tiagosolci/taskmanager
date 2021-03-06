angular.module('minhasDiretivas', [])
    .directive('painelMensagens',function() {
        let ddo = {};
        ddo.restrict = "AE";
        ddo.transclude = true;

        ddo.templateUrl = 'js/directives/painel-mensagens.html';

        return ddo;
    })
    .directive('taskNav',function() {
        let ddo = {};

        ddo.restrict = "AE";
        ddo.transclude = true;

        ddo.templateUrl = 'js/directives/task-nav.html';

        return ddo;

    })
