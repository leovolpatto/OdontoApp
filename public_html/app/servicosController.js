app.controller("ServicosController", function($scope, $servicosService){
    $scope.servicos = [];
    $scope.servicoSendoEditado = null;
    $scope.servicoOriginal = {};

    $scope.carregarServicos = function(){
        $servicosService.GetServicos(function(callback){
            $scope.servicos = callback.data;
        });
    };

    $scope.abrirModalEdicao = function(servico){
        $scope.servico = servico;
        $scope.servicoSendoEditado = angular.copy(servico);
        $('#modalServico').modal('show');
    };
    
    $scope.abrirModalNovo = function(){
        $scope.servico = null;
        $scope.servicoSendoEditado = {};
        $('#modalServico').modal('show');        
    };
    
    $scope.excluir = function(servico){
        $servicosService.DeleteServico(servico.id, function(result){
            var indice = $scope.servicos.indexOf(servico);
            $scope.servicos.splice(indice, 1);
        },
        function(erro){
           alert(erro.data);
        });
    };
    
    $scope.inserirServico = function(servico){
        angular.copy($scope.servicoSendoEditado, $scope.servico);
        $servicosService.PostServico(servico, 
        function(result){
            $scope.servicos.push(servico);
        },
        function(falha){
           alert(falha.data); 
        });
    };
    
    $scope.atualizarServico = function(servico){
        angular.copy($scope.servicoSendoEditado, $scope.servico);
        $servicosService.PutServico(servico, 
        function(result){
        },
        function(falha){
           alert(falha.data); 
        });        
    };
    
    $scope.salvarEdicao = function(servico){
        if($scope.servico == null){
            $scope.inserirServico(servico);
        }else{
            $scope.atualizarServico(servico);
        }
        $('#modalServico').modal('hide');
    };
    
    $scope.carregarServicos();
    
});