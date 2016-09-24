app.controller("HistoricosController", function($scope, $rootScope, $pessoasService, $servicosService){
    $scope.pessoa = {};
    $scope.historico = {};
    $scope.historicos = [];
    $scope.historicoEmEdicao = null;
    $scope.servicos = [];
    $scope.servicoSelecionado = {};
    
    $scope.abrirModalEdicao = function(historico){
        $scope.historicoEmEdicao = angular.copy(historico);
        $scope.historico = historico;
        $scope.carregarServicos(function(){
            angular.forEach($scope.servicos, function(serv){
               if(serv.id == $scope.historico.idServico){
                   $scope.servicoSelectSelecionado = serv;
               }
            });
            $('#modalHistorico').modal('show');
        });
    };
        
    $scope.abrirModalNovo = function(){
        $scope.historico = null;
        $scope.servicoSelecionado = $scope.servicos[0];        
        $scope.historicoEmEdicao = {};
        $scope.historicoEmEdicao.data = "2016-09-23";
        $scope.historicoEmEdicao.idPessoa = $scope.pessoa.id;
        $scope.historicoEmEdicao.idServico = $scope.servicoSelecionado.id;
        $('#modalHistorico').modal('show');
    }
    
    $scope.excluir = function(historico){
        $pessoasService.DeletePessoaHistorico($scope.pessoa.id, historico.id,
        function(result){
           var indice = $scope.historicos.indexOf(historico);
           $scope.historicos.splice(indice, 1);
        },
        function(erro){
            alert(erro.data);
        });
    };
    
    $scope.inserirHistorico = function(historico){
        historico.idServico = $scope.servicoSelecionado.id;
        $pessoasService.PostPessoaHistorico($scope.pessoa, historico,
        function(result){
            $scope.historicos.push(angular.copy(historico));
        },
        function(falha){
           alert(falha.data); 
        });
    };
    
    $scope.definirServicoSelecionado = function(servico){
        $scope.servicoSelecionado = servico;
    }
    
    $scope.atualizarHistorico = function(historico){
        historico.idServico = $scope.servicoSelecionado.id;
        //alert($scope.servicoSelecionadox.id);
        console.log('servico');
        console.log($scope.servicoSelecionado);
        
        $pessoasService.PutPessoaHistorico($scope.pessoa, historico,
        function(result){
            angular.copy(historico, $scope.historico);
        },
        function(falha){
           alert(falha.data); 
        });
    };
    
    $scope.salvarEdicao = function(historico){
        historico.idServico = $scope.servicoSelecionado.id;
        if($scope.historico == null){
            $scope.inserirHistorico(historico);
        }else{
            $scope.atualizarHistorico(historico);
        }
        
        $('#modalHistorico').modal('hide');
    };
    
    $scope.carregarServicos = function(callback){
        $servicosService.GetServicos(function(servicosResult){
            $scope.servicos = servicosResult.data;
            $scope.servicoSelecionado = $scope.servicos[0];
            callback();
        });        
    };
    
    $rootScope.abrirModalHistoricosParaPessoa = function(pessoa){
        $scope.pessoa = pessoa;
        $('#modalListHistoricos').modal('show');
        $scope.carregarServicos(function(){
            $pessoasService.GetPessoasHistoricos(pessoa.id, function(callback){
               $scope.historicos = callback.data;
            });
        });
    };     
    
});