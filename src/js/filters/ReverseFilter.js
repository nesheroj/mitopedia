/// <reference path='../../libs/angular.d.ts' />
"use strict";
var GdMFilters;
(function (GdMFilters) {
    GdMFilters.filter('reverse', function () {
        return function (items) {
            return angular.isArray(items) ? items.slice(0).reverse() : items;
        };
    });
})(GdMFilters || (GdMFilters = angular.module('GdM.Filters', [])));
