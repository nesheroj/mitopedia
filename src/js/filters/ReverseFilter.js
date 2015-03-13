/// <reference path='../../libs/angular.d.ts' />
'use strict';

angular.module('mitopedia.filters.reverse', [])
	.filter('reverse', function() {
		return function(items) {
			return angular.isArray(items) ? items.slice(0).reverse() : items;
		};
	});
