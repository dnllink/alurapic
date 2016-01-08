angular.module('meusServicos', ['ngResource']).factory('recursoFoto', function ($resource) {
    return $resource('/v1/fotos/:fotoId', null, {
        'update': {
            method: 'PUT'
        }
    });
}).factory('cadastroFoto', function (recursoFoto, $q, $rootScope) {
    var evento = 'fotoCadastrada';
    var service = {};
    service.cadastrar = function (foto) {
        return $q(function (resolve, reject) {
            if (foto._id) {
                recursoFoto.update({
                    fotoId: foto._id
                }, foto, function () {
                    $rootScope.$broadcast(evento);
                    resolve({
                        mensagem: 'Foto ' + foto.titulo + ' incluida com sucesso',
                        inclusao: false
                    });
                }, function (erro) {
                    console.log(erro);
                    reject({
                        mensagem: 'Não foi possível atualizar a foto ' + foto.titulo
                    });
                });
            } else {
                recursoFoto.save(foto, function () {
                    $rootScope.$broadcast(evento);
                    resolve({
                        mensagem: 'Foto ' + foto.titulo + ' incluida com sucesso',
                        inclusao: true
                    });
                }, function (erro) {
                    console.error(erro);
                    reject({
                        mensagem: 'Foto ' + foto.titulo + ' não pode ser incluida'
                    });
                });
            }
        });
    };
    return service;
});