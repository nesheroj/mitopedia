'use strict';

export default ['$scope', '$location', '$routeParams', '$rootScope', '$q', 'mitopediaStore', function artistController($scope, $location, $routeParams, $rootScope, $q, mitopediaStore) {
	$scope.currentPage = 1;

	$q.all([mitopediaStore.getCards(), mitopediaStore.getArtists()]).then(function(result) {
		$scope.Cards = result[0];
		$scope.Artist = result[1].single(function(artist) {
			return artist.id === $routeParams.id;
		});

		$scope.filteredCards = $scope.Cards.filter(function(card) {
			return card.artistId === $routeParams.id;
		});

		$rootScope.Title = 'Ilustrador: ' + $scope.Artist.name;

		/*jshint -W106 */
		window.disqus_shortname = 'mitopedia';
		window.disqus_identifier = $location.path();
		window.disqus_url = 'http://mitopedia.guerrademitos.com' + $location.path();

		if ($location.host() === 'localhost') {
			window.disqus_developer = 1;
		}
		/*jshint +W106 */
		(function() {
			var dsq = document.createElement('script');
			dsq.type = 'text/javascript';
			dsq.async = true;
			dsq.src = 'http://angularjs.disqus.com/embed.js';
			document.getElementsByTagName('body')[0].appendChild(dsq);
		})();

		angular.element(document.getElementById('disqus_thread')).html('');
	}, function(error) {
		console.log(error);
	});
}];
