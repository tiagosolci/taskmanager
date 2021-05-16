angular.module('taskmanager')
    .controller('HomeCtrl', function ($scope, $http, $window) {
        $scope.dataAtual = new Date()
        $scope.projeto = {
            tarefa: {}
        }
        $scope.projetos = []

        $scope.criarProjeto = () => {
            $scope.erro = ''
            let novoProjeto = $scope.projeto
            novoProjeto.idUsuario = JSON.parse($window.sessionStorage.user).id
            $http.post('/api/projetos/', novoProjeto)
                .then((response) => {
                    $scope.projetos.push(response.data)
                    $scope.projeto = {}
                }, (error) => {
                    $scope.erro = 'Houve um erro ao criar o projeto. '
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

        $scope.listarProjetos = () => {
            $scope.erro = ''
            $http.get('/api/projetos/')
                .then((response) => {
                    $scope.projetos = response.data
                }, (error) => {
                    $scope.erro = 'Houve um erro ao buscar a lista de projetos. '
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

        $scope.listarProjetos()

        $scope.editarProjeto = (projeto) => {
            projeto.editar = true
        }

        $scope.atualizarProjeto = (projeto) => {
            $scope.erro = ''
            $http.put('/api/projetos/', projeto)
                .then((response) => {
                    projeto.versao = response.data
                    projeto.editar = false
                }, (error) => {
                    $scope.erro = 'Houve um erro ao tentar atualizar o projeto. '
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

        $scope.deletarProjeto = (projeto) => {
            $scope.erro = ''
            $http.delete('/api/projetos/', projeto.id)
                .then(response => {
                    var index = $scope.projetos.indexOf(projeto);
                    $scope.projetos.splice(index, 1);
                }, error => {
                    $scope.erro = 'Houve um erro ao tentar deletar o projeto. '
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

        $scope.criarTarefa = (projeto) => {
            $scope.erro = ''
            let tarefa = projeto.tarefa
            tarefa.idProjeto = projeto.id
            $http.post(`/api/projetos/${ projeto.id }/tarefas/`, tarefa)
                .then(response => {
                    projeto.tarefas.push(reponse.data)
                }, error => {
                    $scope.erro = 'Houve um erro ao tentar criar a tarefa. '
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

        $scope.editarTarefa = (tarefa) => {
            tarefa.editar = true
        }

        $scope.atualizarTarefa = (tarefa) => {
            $scope.erro = ''
            $http.put(`/api/projetos/${ tarefa.projeto_id }/tarefas/${ tarefa.id }`, tarefa)
                .then((response) => {
                    tarefa.versao = response.data
                    tarefa.editar = false
                }, (error) => {
                    $scope.erro = 'Houve um erro ao tentar atualizar a tarefa. '
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

        $scope.deletarTarefa = (projeto, tarefa) => {
            $scope.erro = ''
            $http.delete(`/api/projetos/${ projeto.id }/tarefas/${ tarefa.id }`)
                .then(response => {
                    console.log(projeto)
                    var index = projeto.Tarefas.indexOf(tarefa);
                    projeto.Tarefas.splice(index, 1);
                }, error => {
                    $scope.erro = 'Houve um erro ao tentar deletar a tarefa. '
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

        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        });

    });