'use strict';

export default ['$scope', '$location', '$routeParams', '$rootScope', '$q', '$http', 'mitopediaStore', function migrateController($scope, $location, $routeParams, $rootScope, $q, $http, mitopediaStore) {
	$q.all([mitopediaStore.getCards(), mitopediaStore.getArtists()]).then(function(result) {
		$scope.migratedCards = [];
		$scope.migratedArtists = [];
		$scope.cards = result[0];
		$scope.artists = result[1];
	//	let current = 0, total = $scope.cards.length;

	// 	$scope.cards.map((card) => {
	// 		card.cost = Number(card.cost);
	// 		card.strength = Number(card.strength);
	// 		card.power = Number(card.power);
  //     card.keywords = card.keywords === '' ? [] : card.keywords.split(';');
  //     card.additionalImages = card.image === '' ? [] : card.image.split(';').map((name) => {
	// 			return {
	// 				name,
	// 				artistId: '',
	// 				artistName: '',
	// 				footNote: ''
	// 			};
	// 		});
  //     card.published = card.published === 1? new Date() : new Date(2015, 4, 14);
  //     delete card.promotion;
  //     delete card.image;
  //     delete card.era;
	// 		return $http({
	// 			method: 'POST',
	// 			url: 'https://api.parse.com/1/classes/cards',
	// 			headers: {
	// 				'X-Parse-Application-Id': 'cY4crIA5XgkCSrKMA4ZMmrFF7bbjJjwTeo2yge6B',
	// 				'X-Parse-REST-API-Key': 'mno5o5sIu41lgFzjgMvUB26ryDqAOCGYGGU9k2Lx'
	// 			},
	// 			data: card,
	// 		});
	// 	}).reduce(function (soFar, next) {
	// 	    return soFar.then(() => {
	//       	console.log(`${++current}/${total}`);
	// 				return next;
	// 			});
	// 	}, $q(function(resolve) {
	// 	  resolve();
	// 	}));
	// }, console.log);
		let current = 0, total = $scope.artists.length;

		$scope.artists.map((artist) => {

			return $http({
				method: 'POST',
				url: 'https://api.parse.com/1/classes/artists',
				headers: {
					'X-Parse-Application-Id': 'cY4crIA5XgkCSrKMA4ZMmrFF7bbjJjwTeo2yge6B',
					'X-Parse-REST-API-Key': 'mno5o5sIu41lgFzjgMvUB26ryDqAOCGYGGU9k2Lx'
				},
				data: artist,
			});
		}).reduce(function (soFar, next) {
		    return soFar.then(() => {
	      	console.log(`${++current}/${total}`);
					return next;
				});
		}, $q(function(resolve) {
		  resolve();
		}));
	}, console.log);
}];
