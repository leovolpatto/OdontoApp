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
        
        $scope.pessoas = [
            {nome:"pessoa1", sobrenome: "", idade : 20, ativa: true},
            {nome:"pessoa2", sobrenome: "", idade : 30, ativa: true}
        ];
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
    
    $scope.abrirModalHistoricos = function(pessoa){
        $rootScope.abrirModalHistoricosParaPessoa(pessoa);
    };    
    
    
    $scope.carregarPessoas();
    
});


app.controller("HistoricosController", function($scope, $rootScope){
    
    $scope.historicos = [
        {
            id : 1,
            descricao : 'teste'
        }
    ];
    
    $scope.servicos = [
        {
            id : 1,
            descricao : 'servico 1'
        },
        {
            id : 2,
            descricao : 'servico 2'
        }
    ];
    
    $scope.servicoSelecionado = {id:1};
    
    $scope.abrirModalEdicao = function(pessoa){
        $('#modalHistorico').modal('show');
    };
    
    $scope.abrirModalNovo = function(){;
        $('#modalHistorico').modal('show');
    }
    
    $scope.excluir = function(pessoa){
        console.log(pessoa);
    };
    
    $scope.salvarEdicao = function(pessoa){;
    };
    
    $rootScope.abrirModalHistoricosParaPessoa = function(pessoa){
        console.log(pessoa);
        $('#modalListHistoricos').modal('show');        
    };     
    
});