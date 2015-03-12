/// <reference path='../../libs/angular.d.ts' />
"use strict";
var GdMDirectives;
(function (GdMDirectives) {
    GdMDirectives.directive('mpOnEsc', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if (event.which === 27) {
                    scope.$apply(function () {
                        scope.$eval(attrs.mpOnEsc);
                    });

                    event.preventDefault();
                }
            });
        };
    });
})(GdMDirectives || (GdMDirectives = angular.module('GdM.Directives', [])));
