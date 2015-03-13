import './reverseFilter.js';
import './searchSanitizerFilter.js';
import './showdownFilter.js';
import './splitFilter.js';

angular.module('mitopedia.filters', [
	'mitopedia.filters.showdown',
	'mitopedia.filters.split',
	'mitopedia.filters.searchSanitizer',
	'mitopedia.filters.reverse'
]);
