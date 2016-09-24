app.service('$servicosService', function ($http) {

    this.GetServicos = function (callback) {
        return $http.get("http://localhost/phprest/api/servicos", {
            headers: {
            },
            params: {
            }
        }).then(function (response) {
            callback(response);
        });
    };

    this.PutServico = function (servico, callback, falhaCallback) {
        return $http.put("http://localhost/phprest/api/servicos", servico).then(
                function (response) {
                    callback(response);
                }, function (erro) {
            falhaCallback(erro);
        });
    };

    this.PostServico = function (servico, callback, falhaCallback) {
        return $http.post("http://localhost/phprest/api/servicos", servico).then(
                function (response) {
                    servico.id = response.data.id;
                    callback(response);
                }, 
                function (erro) {
                    falhaCallback(erro);
                });
    };

    this.DeleteServico = function (idServico, callback, falhaCallback) {
        return $http.delete("http://localhost/phprest/api/servicos/" + idServico).then(
                function (response) {
                    callback(response);
                }, 
                function (erro) {
                    falhaCallback(erro);
                });
    };

});