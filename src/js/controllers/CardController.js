'use strict';
export default ['$scope', '$location', '$rootScope', '$routeParams', 'mitopediaStore', function CardController($scope, $location, $rootScope, $routeParams, mitopediaStore) {
	$scope.showField = column => {
		if ($scope.Card !== undefined && $scope.Card !== null) {
			switch (column) {
				case 'cost':
					return ['personaje', 'token', 'equipo', 'recurso', 'accion', 'invocacion'].indexOf($scope.Card.type) !== -1;
				case 'strength':
					return ['personaje', 'token', 'equipo'].indexOf($scope.Card.type) !== -1;
				case 'power':
					return ['personaje', 'token', 'equipo', 'panteon', 'invocacion'].indexOf($scope.Card.type) !== -1;
				default:
					return false;
			}
		}
	};

	$scope.noflavor = cardText => cardText.type !== 'Flavor' && cardText.type !== 'Notas';

	mitopediaStore.getCards().then(result => {
		$scope.Card = result.single(card => card.code === $routeParams.code);
		$rootScope.Title = 'Carta: ' + $scope.Card.name;
		$scope.CardImages = $scope.Card.image === '' ? [$scope.Card.code] : ($scope.Card.code + ';' + $scope.Card.image).split(';');
		$scope.CardImages = $scope.Card.image === '' ? [$scope.Card.code] : ($scope.Card.code + ';' + $scope.Card.image).split(';');

		// /*jshint -W106 */
		// window.disqus_shortname = 'mitopedia';
		// window.disqus_identifier = $location.path();
		// window.disqus_url = 'http://mitopedia.guerrademitos.com' + $location.path();
		//
		// if ($location.host() === 'localhost') {
		// 	window.disqus_developer = 1;
		// }
		// /*jshint +W106 */
		// (function() {
		// 	var dsq = document.createElement('script');
		// 	dsq.type = 'text/javascript';
		// 	dsq.async = true;
		// 	dsq.src = 'http://angularjs.disqus.com/embed.js';
		// 	document.getElementsByTagName('body')[0].appendChild(dsq);
		// })();
		//
		// angular.element(document.getElementById('disqus_thread')).html('');
	}, console.log);
}];
