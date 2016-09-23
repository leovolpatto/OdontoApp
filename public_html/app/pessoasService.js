app.service('$pessoasService', function ($http) {

    this.GetPessoas = function (callback) {
        return $http.get("http://localhost/phprest/api/pessoas", {
            headers:{
                
            },
            params:{
                
            }
        }).then(function (response) {
            callback(response);
        });
    };

    
});