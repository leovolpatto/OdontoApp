app.controller("ServicosController", function($scope){
    $scope.servicos = [
        {
            id : 1,
            descricao : "servico 1"
        },
        {
            id : 2,
            descricao : "servico 2"
        }
    ];

    $scope.abrirModalEdicao = function(servico){        
        $('#modalServico').modal('show');
    };
    
    $scope.abrirModalNovo = function(){
        alert('oi');
        $('#modalServico').modal('show');        
    }
    
    $scope.excluir = function(servico){
        console.log(pessoa);
    };
    
    $scope.salvarEdicao = function(servico){
        
        $('#modalServico').modal('hide');
    };
        
    
});