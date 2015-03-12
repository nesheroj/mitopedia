/// <reference path='../../libs/angular.d.ts' />
"use strict";
var GdMFilters;
(function (GdMFilters) {
    GdMFilters.filter('split', function () {
        return function (items, separator) {
            return typeof items === 'string' ? (items !== "" ? items.split(separator) : []) : items;
        };
    });
})(GdMFilters || (GdMFilters = angular.module('GdM.Filters', [])));
