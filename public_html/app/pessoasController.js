app.controller("PessoasController", function($scope, $pessoasService){
    
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

        /*
        $('#modalPessoa').on('hidden.bs.modal', function (e) {
            alert("fechou");
        });*/
        
        $('#modalPessoa').modal('show');
    };
    
    $scope.abrirModalNovo = function(){
        $scope.pessoaOriginal = null;
        $scope.pessoaEmEdicao = {nome:"", sobrenome: "", idade : 0, ativa: true};
        $('#modalPessoa').modal('show');        
    }
    
    $scope.excluir = function(pessoa){
        console.log(pessoa);
    };
    
    $scope.salvarEdicao = function(pessoa){
        if($scope.pessoaOriginal == null){
            //nova pessoa
            $scope.pessoas.push(pessoa);
        }else{
            //editar
        }
        
        angular.copy(pessoa, $scope.pessoaOriginal);
        $('#modalPessoa').modal('hide');
    };
    
    $scope.carregarPessoas();
    
});