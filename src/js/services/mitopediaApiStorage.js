
'use strict';

var api_root = 'http://mitopedia.guerrademitos.com/api/';
export default ['$q', '$http', function MitopediaApiStorage($q, $http) {
	this.getArtists = function(skipCache) {
		var _this = this;
		var deferred = $q.defer();
		if (!skipCache && this.artistCache != undefined)
			deferred.resolve(this.artistCache);
		else {
			$http.get(api_root + 'artists').success(function(data) {
				_this.artistCache = data;
				deferred.resolve(data);
			}).error(function(error) {
				console.log(error);
				deferred.reject(error);
			});
		}
		return deferred.promise;
	};
	this.getCards = function(skipCache) {
		var _this = this;
		var deferred = $q.defer();
		if (!skipCache && this.cardCache != undefined)
			deferred.resolve(this.cardCache);
		else {
			$http.get(api_root + 'cards').success(function(data) {
				_this.cardCache = data;
				deferred.resolve(data);
			}).error(function(error) {
				console.log(error);
				deferred.reject(error);
			});
		}
		return deferred.promise;
	};

	this.getDecks = function(skipCache) {
		var _this = this;
		var deferred = $q.defer();
		if (!skipCache && this.deckCache != undefined)
			deferred.resolve(this.deckCache);
		else {
			$http.get(api_root + 'decks').success(function(data) {
				_this.deckCache = data;
				deferred.resolve(data);
			}).error(function(error) {
				console.log(error);
				deferred.reject(error);
			});
		}
		return deferred.promise;
	};

	this.postArtist = function(artist) {
		var deferred = $q.defer();
		$http.post(api_root + 'artists', artist).success(function(data) {
			deferred.resolve(data);
		}).error(function(error) {
			console.log(error);
			deferred.reject(error);
		});
		return deferred.promise;
	};

	this.postCard = function(card) {
		var deferred = $q.defer();
		$http.post(api_root + 'cards', card).success(function(data) {
			deferred.resolve(data);
		}).error(function(error) {
			console.log(error);
			deferred.reject(error);
		});
		return deferred.promise;
	};

	this.postDeck = function(deck) {
		var _this = this;
		var deferred = $q.defer();
		$http.post(api_root + 'decks', deck).success(function(data) {
			deck.id = data;
			_this.deckCache.push(deck);
			deferred.resolve(deck);
		}).error(function(error) {
			console.log(error);
			deferred.reject(error);
		});
		return deferred.promise;
	};

	this.info = function() {
		var deferred = $q.defer();
		$http.get(api_root).success(function(data) {
			deferred.resolve(data);
		}).error(function(error) {
			console.log(error);
			deferred.reject(error);
		});
		return deferred.promise;
	};
}];
