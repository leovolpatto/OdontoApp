app.service('$pessoasService', function ($http) {

    this.GetPessoas = function (callback) {
        return $http.get("http://localhost/phprest/api/pessoas").then(function (response) {
            callback(response);
        });
    };

    this.PutPessoa = function (pessoa, callback, errorCallback) {
        return $http.put("http://localhost/phprest/api/pessoas", 
            pessoa
        ).then(function (response) {
            callback(response);
        }, function(error){
            errorCallback(error);
        });
    };

    this.PostPessoa = function (pessoa, callback, errorCallback) {
        return $http.post("http://localhost/phprest/api/pessoas", 
            pessoa
        ).then(function (response) {
            pessoa.id = response.data.id;
            callback(response);
        }, function(error){
            errorCallback(error);
        });
    };

    this.DeletePessoa = function (idPessoa, callback, errorCallback) {
        return $http.delete("http://localhost/phprest/api/pessoas/" + idPessoa)
        .then(function (response) {
            callback(response);
        }, function(error){
            errorCallback(error);
        });
    };

    this.GetPessoasHistoricos = function (idPessoa, callback) {
        return $http.get("http://localhost/phprest/api/pessoas/"+idPessoa+"/historicos", {
            headers:{
                
            },
            params:{
                
            }
        }).then(function (response) {
            callback(response);
        });
    };

    this.PostPessoaHistorico = function (pessoa, historico, callback, falhaCallback) {
        return $http.post("http://localhost/phprest/api/pessoas/"+pessoa.id+"/historicos", historico)
                .then(
                function (response) {
                    historico.id = response.data.id;
                    callback(response);
                },
                function(falha){
                    falhaCallback(falha);
                });
    };

    this.PutPessoaHistorico = function (pessoa, historico, callback, falhaCallback) {
        return $http.put("http://localhost/phprest/api/pessoas/"+pessoa.id+"/historicos", historico)
                .then(
                function (response) {
                    callback(response);
                },
                function(falha){
                    falhaCallback(falha);
                });
    };

    this.DeletePessoaHistorico = function (idPessoa, idHistorico, callback, falhaCallback) {
        return $http.delete("http://localhost/phprest/api/pessoas/"+idPessoa+"/historicos/"+idHistorico)
                .then(
                function (response) {
                    callback(response);
                },
                function(falha){
                    falhaCallback(falha);
                });
    };

    
});