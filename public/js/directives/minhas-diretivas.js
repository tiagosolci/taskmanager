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
    .directive('projetoCard',function() {
        let ddo = {};

        ddo.restrict = "AE";
        ddo.transclude = true;

        ddo.templateUrl = 'js/directives/projeto-card.html';

        return ddo;

    })
    .directive('tarefasPendentesCard',function() {
        let ddo = {};

        ddo.restrict = "AE";
        ddo.transclude = true;

        ddo.templateUrl = 'js/directives/tarefas-pendentes-card.html';

        return ddo;

    })
    .directive('tarefasConcluidasCard',function() {
        let ddo = {};

        ddo.restrict = "AE";
        ddo.transclude = true;

        ddo.templateUrl = 'js/directives/tarefas-concluidas-card.html';

        return ddo;

    })
    .directive('tooltip', function(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs){
                element.hover(function(){
                    // on mouseenter
                    element.tooltip('show');
                }, function(){
                    // on mouseleave
                    element.tooltip('hide');
                });
            }
        };
    });