'use strict';
angular.module('mitopedia.filters.split', [])
	.filter('split', function() {
		return function(items, separator) {
			return typeof items === 'string' ? (items !== '' ? items.split(separator) : []) : items;
		};
	});
