angular.module('alurapic').controller('FotoController', function ($scope, recursoFoto, $routeParams) {

    $scope.foto = {};
    $scope.mensagem = '';

    if ($routeParams.fotoId) {
        recursoFoto.get({
            fotoId: $routeParams.fotoId
        }, function (foto) {
            $scope.foto = foto;
        }, function (erro) {
            console.log(erro);
            $scope.mensagem = 'Não foi possível obter a foto'
        });
    };


    $scope.submeter = function () {

        if ($scope.formulario.$valid) {
            if ($routeParams.fotoId) {
                recursoFoto.update({
                    fotoId: $routeParams.fotoId
                }, $scope.foto, function () {
                    $scope.mensagem = 'Foto alterada com sucesso';
                }, function (erro) {
                    console.log(erro);
                    $scope.mensagem = 'Não foi possível alterar';
                });
            } else {
                recursoFoto.save($scope.foto, function () {
                    $scope.foto = {};
                    $scope.mensagem = 'Foto cadastrada com sucesso';
                }, function (erro) {
                    console.log(erro);
                    $scope.mensagem = 'Não foi possível cadastrar a foto';
                });
            };
        };

    };

});