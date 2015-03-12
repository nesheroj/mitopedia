"use strict";
var MitoPedia;
(function (MitoPedia) {
    var DecksController = (function () {
        function DecksController($scope, $location, MitopediaApiStorage) {
            this.$scope = $scope;
            this.$location = $location;
            this.MitopediaApiStorage = MitopediaApiStorage;
            $scope.Decks = [];
            MitopediaApiStorage.info().then(function (data) {
                console.log(data);
            });
        }
        DecksController.prototype.injection = function () {
            return [
                '$scope',
                '$location',
                'MitopediaApiStorage',
                DecksController
            ];
        };
        return DecksController;
    })();
    MitoPedia.DecksController = DecksController;
})(MitoPedia || (MitoPedia = {}));
