"use strict";
var MitoPedia;
(function (MitoPedia) {
    var AdminCardController = (function () {
        function AdminCardController($scope, $location, $route, $routeParams, $rootScope, MitopediaApiStorage) {
            this.$scope = $scope;
            this.$location = $location;
            this.$route = $route;
            this.$routeParams = $routeParams;
            this.$rootScope = $rootScope;
            this.MitopediaApiStorage = MitopediaApiStorage;
            if (!$scope.isAdmin)
                $location.url('/');
            $scope.showField = function (column) {
                if ($scope.Card !== undefined && $scope.Card !== null) {
                    switch (column) {
                        case "cost":
                            return ["personaje", "token", "equipo", "recurso", "accion", "invocacion"].indexOf($scope.Card.type) === -1;
                        case "strength":
                            return ["personaje", "token", "equipo"].indexOf($scope.Card.type) === -1;
                        case "power":
                            return ["personaje", "token", "equipo", "panteon", "invocacion"].indexOf($scope.Card.type) === -1;
                        default:
                            return false;
                    }
                }
                return false;
            };
            $scope.saving = false;
            $scope.Expansions = ["GDM1", "GDM2", "GDM3", "GDM4", "Promocional"];
            $scope.Mythologies = ["Japonesa", "Nordica", "Azteca", "Griega", "Egipcia", "Neutral", "Primigenia", "Celta"];
            $scope.Types = ["panteon", "personaje", "equipo", "recurso", "accion", "evento", "invocacion", "token"];
            $scope.TextTypes = ["Flavor", "General", "Influencia", "Enfrentamiento", "Notas"];

            $scope.addText = function () {
                if ($scope.Card.texts === undefined)
                    $scope.Card.texts = [];
                $scope.Card.texts.push({ type: "General", text: "" });
            };

            $scope.removeText = function (index) {
                $scope.Card.texts.splice(index, 1);
            };

            $scope.publishCard = function () {
                $scope.saving = true;
                $scope.Card.published = true;
                MitopediaApiStorage.postCard($scope.Card).then(function (result) {
                    if (!$routeParams.code || $routeParams.code !== $scope.Card.code)
                        $location.path('/AdminCarta/' + $scope.Card.code);
                    else
                        $route.reload();
                });
            };

            $scope.saveCard = function () {
                $scope.saving = true;
                MitopediaApiStorage.postCard($scope.Card).then(function (result) {
                    if (!$routeParams.code || $routeParams.code !== $scope.Card.code)
                        $location.path('/AdminCarta/' + $scope.Card.code);
                    else
                        $route.reload();
                });
            };

            MitopediaApiStorage.getArtists(true).then(function (result) {
                $scope.Artists = result;
            });

            MitopediaApiStorage.getCards(true).then(function (result) {
                if ($routeParams.code) {
                    $scope.Card = result.single(function (card) {
                        return card.code === $routeParams.code;
                    });
                    $rootScope.Title = 'Editar Carta: ' + $scope.Card.name;
                } else {
                    $rootScope.Title = 'Crear Carta';
                    $scope.Card = {
                        code: "",
                        image: "",
                        name: "",
                        promotion: false,
                        expansion: $scope.Expansions[0],
                        mythology: $scope.Mythologies[0],
                        type: $scope.Types[0],
                        artistId: 1,
                        cost: 0,
                        strength: 0,
                        power: 0,
                        keywords: "",
                        published: false
                    };
                }
            }, function (error) {
                console.log(error);
            });
        }
        AdminCardController.prototype.injection = function () {
            return [
                '$scope',
                '$location',
                '$route',
                '$routeParams',
                '$rootScope',
                'MitoPediaApiStorage',
                AdminCardController
            ];
        };
        return AdminCardController;
    })();
    MitoPedia.AdminCardController = AdminCardController;
})(MitoPedia || (MitoPedia = {}));