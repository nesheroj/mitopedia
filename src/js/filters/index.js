import './reverseFilter.js';
import './searchSanitizerFilter.js';
import './commonmarkFilter.js';
import './splitFilter.js';

angular.module('mitopedia.filters', [
	'mitopedia.filters.commonmark',
	'mitopedia.filters.split',
	'mitopedia.filters.searchSanitizer',
	'mitopedia.filters.reverse'
]);
