'use strict';
var MitoPedia;
(function (MitoPedia) {
    var AdminArtistController = (function () {
        function AdminArtistController($scope, $location, $route, $routeParams, $rootScope, MitopediaApiStorage) {
            this.$scope = $scope;
            this.$location = $location;
            this.$route = $route;
            this.$routeParams = $routeParams;
            this.$rootScope = $rootScope;
            this.MitopediaApiStorage = MitopediaApiStorage;
            if (!$scope.isAdmin)
                $location.url('/');

            $scope.saving = false;

            $scope.saveArtist = function () {
                $scope.saving = true;
                MitopediaApiStorage.postArtist($scope.Artist).then(function (result) {
                    if (!$routeParams.code)
                        $location.path('/AdminIlustrador/' + result);
                    else
                        $route.reload();
                });
            };

            MitopediaApiStorage.getArtists(true).then(function (result) {
                if ($routeParams.id) {
                    $scope.Artist = result.single(function (artist) {
                        return artist.id === $routeParams.id;
                    });
                    $rootScope.Title = 'Editar Ilustrador: ' + $scope.Artist.name;
                } else {
                    $rootScope.Title = 'Crear Ilustrador';
                    $scope.Artist = {
                        name: '',
                        url: '',
                        picture: '',
                        bio: ''
                    };
                }
            }, function (error) {
                console.log(error);
            });
        }
        AdminArtistController.prototype.injection = function () {
            return [
                '$scope',
                '$location',
                '$route',
                '$routeParams',
                '$rootScope',
                'MitoPediaApiStorage',
                AdminArtistController
            ];
        };
        return AdminArtistController;
    })();
    MitoPedia.AdminArtistController = AdminArtistController;
})(MitoPedia || (MitoPedia = {}));
