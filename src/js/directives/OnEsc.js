'use strict';

angular.module('mitopedia.directives.onEsc', [])
	.directive('mpOnEsc', function() {
		return function(scope, element, attrs) {
			element.bind('keydown keypress', function(event) {
				if (event.which === 27) {
					scope.$apply(function() {
						scope.$eval(attrs.mpOnEsc);
					});

					event.preventDefault();
				}
			});
		};
	});
