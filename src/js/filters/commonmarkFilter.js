'use strict';

import Remarkable from 'remarkable';

const remarkable = new Remarkable();

angular.module('mitopedia.filters.commonmark', [])
	.filter('commonmark', ['$sce', function($sce) {
		return function(value) {
			if (typeof value !== 'string') return value;

			return $sce.trustAsHtml(remarkable.render(value || ''));
		};
	}]);
