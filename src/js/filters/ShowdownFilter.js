/// <reference path='../../libs/angular.d.ts' />
"use strict";
var GdMFilters;
(function (GdMFilters) {
    GdMFilters.filter('showdown', [
        '$sce', function ($sce) {
            var converter = new Showdown.converter();
            return function (value) {
                if (typeof value !== 'string')
                    return value;
                return $sce.trustAsHtml(converter.makeHtml(value || ''));
            };
        }]);
})(GdMFilters || (GdMFilters = angular.module('GdM.Filters', [])));
