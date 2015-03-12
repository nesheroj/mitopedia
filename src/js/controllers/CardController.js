"use strict";
var MitoPedia;
(function (MitoPedia) {
    var CardController = (function () {
        function CardController($scope, $location, $rootScope, $routeParams, MitopediaApiStorage) {
            this.$scope = $scope;
            this.$location = $location;
            this.$rootScope = $rootScope;
            this.$routeParams = $routeParams;
            this.MitopediaApiStorage = MitopediaApiStorage;
            $scope.showField = function (column) {
                if ($scope.Card !== undefined && $scope.Card !== null) {
                    switch (column) {
                        case "cost":
                            return ["personaje", "token", "equipo", "recurso", "accion", "invocacion"].indexOf($scope.Card.type) !== -1;
                        case "strength":
                            return ["personaje", "token", "equipo"].indexOf($scope.Card.type) !== -1;
                        case "power":
                            return ["personaje", "token", "equipo", "panteon", "invocacion"].indexOf($scope.Card.type) !== -1;
                        default:
                            return false;
                    }
                }
            };

            $scope.noflavor = function (cardText) {
                return cardText.type !== 'Flavor' && cardText.type != 'Notas';
            };

            MitopediaApiStorage.getCards().then(function (result) {
                $scope.Card = result.single(function (card) {
                    return card.code === $routeParams.code;
                });
                $rootScope.Title = "Carta: " + $scope.Card.name;
                $scope.CardImages = $scope.Card.image === '' ? [$scope.Card.code] : ($scope.Card.code + ';' + $scope.Card.image).split(';');

                window.disqus_shortname = 'mitopedia';
                window.disqus_identifier = $location.path();
                window.disqus_url = 'http://mitopedia.guerrademitos.com' + $location.path();

                if ($location.host() == 'localhost') {
                    window.disqus_developer = 1;
                }

                (function () {
                    var dsq = document.createElement('script');
                    dsq.type = 'text/javascript';
                    dsq.async = true;
                    dsq.src = 'http://angularjs.disqus.com/embed.js';
                    document.getElementsByTagName('body')[0].appendChild(dsq);
                })();

                angular.element(document.getElementById('disqus_thread')).html('');
            }, function (error) {
                console.log(error);
            });
        }
        CardController.prototype.injection = function () {
            return [
                '$scope',
                '$location',
                '$rootScope',
                '$routeParams',
                'MitoPediaApiStorage',
                CardController
            ];
        };
        return CardController;
    })();
    MitoPedia.CardController = CardController;
})(MitoPedia || (MitoPedia = {}));
