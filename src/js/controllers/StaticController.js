"use strict";
var MitoPedia;
(function (MitoPedia) {
    var StaticController = (function () {
        function StaticController($scope, $location) {
            this.$scope = $scope;
            this.$location = $location;
        }
        StaticController.prototype.injection = function () {
            return [
                '$scope',
                '$location',
                StaticController
            ];
        };
        return StaticController;
    })();
    MitoPedia.StaticController = StaticController;
})(MitoPedia || (MitoPedia = {}));
