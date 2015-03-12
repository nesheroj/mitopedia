'use strict';

export default ['$scope', '$location', '$routeParams', '$rootScope', '$q', 'mitopediaStore', function cardsController($scope, $location, $routeParams, $rootScope, $q, mitopediaStore) {
	this.$scope = $scope;
	this.$location = $location;
	this.$routeParams = $routeParams;
	this.$rootScope = $rootScope;
	this.$q = $q;
	this.mitopediaStore = mitopediaStore;
	$rootScope.Title = $routeParams.type || 'Cartas';
	$scope.Artists = [];
	$scope.Cards = [];
	$scope.Expansions = [];
	$scope.Keywords = [];
	$scope.KeywordModes = {
		'todas': true,
		'cualquiera de': false
	};
	$scope.Mythologies = [];
	$scope.SortDirections = {
		'Descendiente': true,
		'Ascendiente': false
	};
	$scope.TextTypes = ['cualquier tipo', 'enfrentamiento', 'influencia'];
	$scope.currentPage = 1;

	$scope.sortMode = {
		predicate: 'name',
		reverse: false
	};

	($scope.setDisplayMode = function(mode) {
		sessionStorage.setItem('displayMode', mode);
		$scope.displayMode = mode;
		if (mode === 'table') {
			if ($scope.sortMode.predicate === 'artist.name')
				$scope.sortMode = {
					predicate: 'name',
					reverse: false
				};
		} else {
			if (['name', 'type', 'mythology.name', 'artist.name'].indexOf($scope.sortMode.predicate) === -1)
				$scope.sortMode = {
					predicate: 'name',
					reverse: false
				};
		}
	})(sessionStorage.getItem('displayMode') || 'table');

	$scope.sortBy = function(predicate) {
		if (predicate === $scope.sortMode.predicate)
			$scope.sortMode.reverse = !$scope.sortMode.reverse;
		else {
			$scope.sortMode.reverse = false;
			$scope.sortMode.predicate = predicate;
		}
	};

	$scope.showCol = function(column) {
		switch (column) {
			case 'cost':
				return ['personaje', 'equipo', 'recurso', 'accion', 'invocacion'].indexOf($scope.CardsType) !== -1;
			case 'strength':
				return ['personaje', 'equipo'].indexOf($scope.CardsType) !== -1;
			case 'power':
				return ['personaje', 'equipo', 'panteon', 'invocacion'].indexOf($scope.CardsType) !== -1;
			default:
				return false;
		}
	};

	var savedFilter = JSON.parse(sessionStorage.getItem('filter'));
	var defaultFilter = {
		text: '',
		extendSearch: false,
		keywordMode: false,
		artistId: -1,
		expansions: [],
		keywords: [],
		mythologies: [],
		textType: $scope.TextTypes[0]
	};

	$scope.clearFilters = function() {
		var filter = {};
		for (var attrName in defaultFilter)
			filter[attrName] = defaultFilter[attrName];
		$scope.Filter = filter;
	};

	if (!savedFilter) {
		$scope.clearFilters();
	} else {
		var filter = {};
		for (var attrName in defaultFilter)
			filter[attrName] = savedFilter[attrName] || defaultFilter[attrName];
		$scope.Filter = filter;
	}

	switch ($routeParams.type) {
		case 'Panteones':
			$scope.CardsType = 'panteon';
			break;
		case 'Recursos':
			$scope.CardsType = 'recurso';
			break;
		case 'Personajes':
			$scope.CardsType = 'personaje';
			break;
		case 'Eventos':
			$scope.CardsType = 'evento';
			break;
		case 'Acciones':
			$scope.CardsType = 'accion';
			break;
		case 'Equipo':
			$scope.CardsType = 'equipo';
			break;
		case 'Invocaciones':
			$scope.CardsType = 'invocacion';
			break;
		case 'Tokens':
			$scope.CardsType = 'token';
			break;
		default:
			$scope.CardsType = '';
	};

	function filterCards() {
		$scope.filteredCards = $scope.Cards.filter(function(card, index, cards) {
			var pass = ($scope.Filter.text === '' || card.name.sanitizeForSearch().indexOf($scope.Filter.text.sanitizeForSearch()) !== -1);
			if ($scope.Filter.extendSearch) {
				pass = pass || ($scope.Filter.text === '' || (card.texts || []).some(function(cardText) {
					return cardText.text.sanitizeForSearch().indexOf($scope.Filter.text.sanitizeForSearch()) !== -1;
				}) || card.keywords.sanitizeForSearch().indexOf($scope.Filter.text.sanitizeForSearch()) !== -1);
			}
			pass = pass && ($scope.CardsType === '' || $scope.CardsType === card.type);
			pass = pass && ($scope.Filter.artistId === -1 || $scope.Filter.artistId === card.artistId);
			pass = pass && ($scope.Filter.expansions.length === 0 || $scope.Filter.expansions.some(function(filterExpansion) {
				return filterExpansion === card.expansion;
			}));
			pass = pass && ($scope.Filter.mythologies.length === 0 || $scope.Filter.mythologies.some(function(filterMythology) {
				return filterMythology === card.mythology;
			}));
			pass = pass && ($scope.Filter.textType === 'cualquier tipo' || card.texts.some(function(cardText) {
				return cardText.type.sanitizeForSearch() === $scope.Filter.textType;
			}));
			if ($scope.Filter.keywordMode) {
				pass = pass && ($scope.Filter.keywords.length === 0 || $scope.Filter.keywords.every(function(filterKeyword) {
					return card.keywords.split(';').some(function(cardKeyword) {
						return filterKeyword === cardKeyword;
					});
				}));
			} else {
				pass = pass && ($scope.Filter.keywords.length === 0 || card.keywords.split(';').some(function(cardKeyword) {
					return $scope.Filter.keywords.some(function(filterKeyword) {
						return filterKeyword === cardKeyword;
					});
				}));
			}
			return pass;
		});
	}

	$q.all([mitopediaStore.getCards(), mitopediaStore.getArtists()]).then(function(result) {
		$scope.Cards = result[0];
		$scope.Artists.push({
			id: -1,
			name: 'Cualquiera',
			picture: '',
			url: '',
			bio: ''
		});
		$scope.Artists = $scope.Artists.concat(result[1].sort(function(a, b) {
			if (a.name > b.name)
				return 1;
			if (a.name < b.name)
				return -1;
			return 0;
		}));
		$scope.Cards.forEach(function(card) {
			if ($scope.Expansions.indexOf(card.expansion) === -1)
				$scope.Expansions.push(card.expansion);
			if ($scope.Mythologies.indexOf(card.mythology) === -1)
				$scope.Mythologies.push(card.mythology);
			if (card.keywords) {
				card.keywords.split(';').forEach(function(cardKeyword) {
					if ($scope.Keywords.indexOf(cardKeyword) === -1)
						$scope.Keywords.push(cardKeyword);
				});
			}
		});

		$scope.Expansions.sort();
		$scope.Mythologies.sort();
		$scope.Keywords.sort();

		$scope.$watch('Filter', function(newValue, oldValue, scope) {
			sessionStorage.setItem('filter', JSON.stringify(newValue));
			filterCards();
		}, true);
	}, function(error) {
		console.log(error);
	});
}];
