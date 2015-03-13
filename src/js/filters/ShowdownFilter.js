'use strict';
angular.module('mitopedia.filters.showdown', [])
	.filter('showdown', ['$sce', function($sce) {
		var converter = new Showdown.converter();
		return function(value) {
			if (typeof value !== 'string') return value;
			return $sce.trustAsHtml(converter.makeHtml(value || ''));
		};
	}]);
