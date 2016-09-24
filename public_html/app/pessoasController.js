app.controller("PessoasController", function($scope, $rootScope, $pessoasService){
    
    $scope.pessoas = [];
    $scope.carregando = false;
    $scope.pessoaEmEdicao = null;
    $scope.pessoaOriginal = null;
    
    $scope.carregarPessoas = function(){
        $scope.carregando = true;
        $pessoasService.GetPessoas(function(callback){
            $scope.carregando = false;
            $scope.pessoas = callback.data;
        });
    };
    
    $scope.abrirModalEdicao = function(pessoa){
        $scope.pessoaOriginal = pessoa;
        $scope.pessoaEmEdicao = angular.copy(pessoa);
        $('#modalPessoa').modal('show');
    };
    
    $scope.abrirModalNovo = function(){
        $scope.pessoaOriginal = null;
        $scope.pessoaEmEdicao = {nome:"", sobrenome: "", idade : 0, ativa: true};
        $('#modalPessoa').modal('show');        
    }
    
    $scope.excluir = function(pessoa){
        $pessoasService.DeletePessoa(pessoa.id, 
        function(result){
            var indice = $scope.pessoas.indexOf(pessoa);
            $scope.pessoas.splice(indice, 1);
        }, 
        function(falha){
           alert(falha.data); 
        });
    };
    
    $scope.inserirPessoa = function(pessoa){
        $pessoasService.PostPessoa(pessoa,
                function (result) {
                    angular.copy(pessoa, $scope.pessoaOriginal);
                },
                function (erro) {
                    alert(erro.data);
                });
        $scope.pessoas.push(pessoa);        
    };
    
    $scope.atualizarPessoa = function(pessoa){
        $pessoasService.PutPessoa(pessoa,
                function (result) {
                    angular.copy(pessoa, $scope.pessoaOriginal);
                },
                function (erro) {
                    alert(erro.data);
                });     
    };
    
    $scope.salvarEdicao = function(pessoa){
        if($scope.pessoaOriginal == null){
            $scope.inserirPessoa(pessoa);
        }else{
            $scope.atualizarPessoa(pessoa);
        }
        
        $('#modalPessoa').modal('hide');
    };
    
    $scope.abrirModalHistoricos = function(pessoa){
        $rootScope.abrirModalHistoricosParaPessoa(pessoa);
    };    
    
    $scope.carregarPessoas();
});