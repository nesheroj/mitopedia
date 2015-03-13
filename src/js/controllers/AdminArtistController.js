'use strict';

export default [function adminArtistController($scope, $location, $route, $routeParams, $rootScope, MitopediaApiStorage) {
	if (!$scope.isAdmin)
		$location.url('/');

	$scope.saving = false;

	$scope.saveArtist = function() {
		$scope.saving = true;
		MitopediaApiStorage.postArtist($scope.Artist).then(function(result) {
			if (!$routeParams.code)
				$location.path('/AdminIlustrador/' + result);
			else
				$route.reload();
		});
	};

	MitopediaApiStorage.getArtists(true).then(function(result) {
		if ($routeParams.id) {
			$scope.Artist = result.single(function(artist) {
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
	}, function(error) {
		console.log(error);
	});
}];
