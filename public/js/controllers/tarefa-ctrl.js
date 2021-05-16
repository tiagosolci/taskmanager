angular.module('taskmanager')
    .controller('TarefaCtrl', function ($scope, $http, $routeParams, $location) {
        $scope.tarefa = {}
        const { id, projeto_id } = $routeParams

        $http.get(`/api/projetos/${ projeto_id }/tarefas/${ id }`)
            .then(response => {
                $scope.tarefa = response.data
                if ($scope.tarefa.dataTermino) $scope.tarefa.dataTermino = new Date($scope.tarefa.dataTermino)
            }, erro => {
                $scope.erro = 'Houve um erro ao tentar buscar a tarefa. '
                let erros = error.data
                if (Array.isArray(erros)) {
                    erros.forEach(erro => {
                        $scope.erro += erro.msg
                    })
                } else {
                    if (error.data.msg) {
                        $scope.erro += error.data.msg
                    } else {
                        $scope.erro += error.data
                    }
                }
            })

        $scope.salvar = () => {
            $scope.erro = ''
            $http.put(`/api/projetos/${ projeto_id }/tarefas/${ id }`, $scope.tarefa)
                .then(response => {
                    $scope.form.$setPristine();
                    $scope.form.$setUntouched();
                }, erro => {
                    $scope.erro = 'Houve um erro ao tentar salvar a tarefa. '
                    let erros = error.data
                    if (Array.isArray(erros)) {
                        erros.forEach(erro => {
                            $scope.erro += erro.msg
                        })
                    } else {
                        if (error.data.msg) {
                            $scope.erro += error.data.msg
                        } else {
                            $scope.erro += error.data
                        }
                    }
                })
        }

        $scope.concluido = () => {
            if ($scope.tarefa.concluido) {
                $scope.tarefa.dataConclusao = new Date()
            } else {
                $scope.tarefa.dataConclusao = null
            }
            $scope.salvar()
        }

        $scope.cancelar = () => {
            $location.path('/home/')
        }
    })