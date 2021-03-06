angular.module('taskmanager')
    .controller('TaskNavCtrl',function($scope,$window,logout){
        $scope.nome = JSON.parse($window.sessionStorage.user).nome

        $scope.logout = function() {
            logout.sair();
        };

    })