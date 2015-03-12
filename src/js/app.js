'use strict';

import * as controllers from 'js/controllers/';
import * as services from 'js/services/';
import 'js/directives/';
import 'js/filters/';
import 'js/utils.js';

const FACEBOOK_APP_ID = '628709617168962';
const ANALYTICS_APP_ID = 'UA-44248684-1';

angular
	.module('mitopedia', ['ngRoute', 'ngTouch', 'ezfb', 'chieffancypants.loadingBar', 'mitopedia.directives.', 'mitopedia.filters'])
	.service('mitopediaStore', services.mitopediaStore)
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', { controller: controllers.cardsController, templateUrl: require('views/cards.html') })
			.when('/AdminCarta/:code?', { controller: MitoPedia.AdminCardController, templateUrl: '/Views/admincard.html' })
			.when('/AdminIlustrador/:id?', { controller: MitoPedia.AdminArtistController, templateUrl: '/Views/adminartist.html' })
			.when('/Cartas/:type', { controller: controllers.cardsController, templateUrl: require('views/cards.html') })
			.when('/Carta/:code', { controller: MitoPedia.CardController, templateUrl: '/Views/card.html' })
			.when('/Ilustradores/', { 	controller: MitoPedia.ArtistsController, templateUrl: '/Views/artists.html' })
			.when('/Ilustrador/:id', { controller: MitoPedia.ArtistController, templateUrl: '/Views/artist.html' })
			.otherwise({ redirectTo: '/' });

		$locationProvider.html5Mode(true).hashPrefix('!');
	}]).config(['$FBProvider', function($FBProvider) {
		$FBProvider.setInitParams({
			appId: FACEBOOK_APP_ID,
			status: true,
			cookie: true
		});
	}]).run(['$location', '$rootScope', '$window' /*, '$FB'*/ , function($location, $rootScope, $window, $FB) {
		$FB.Event.subscribe('auth.statusChange', function(statusRes) {
			$rootScope.loginStatus = statusRes;
			$FB.api('/me').then(function(me) {
				$rootScope.me = me;
			});
			$FB.api('/me/applications/developer').then(function(res) {
				$rootScope.isAdmin = res.data && res.data.some(function(app) {
					return app.id === FACEBOOK_APP_ID;
				});
			});
		});

		$FB.getLoginStatus().then(function(res) {
			$rootScope.loginStatus = res;
		});

		$rootScope.login = function() {
			$FB.login();
		};

		$rootScope.logout = function() {
			$FB.logout().then(function() {
				$location.url('/');
			});
		};

		$window._gaq = [ ['_setAccount', ANALYTICS_APP_ID], ['_trackPageview'] ];
		var ga = document.createElement('script');
		ga.type = 'text/javascript';
		ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(ga, s);

		$rootScope.$on('$viewContentLoaded', function() {
			$window._gaq.push(['_trackPageview', $location.path()]);
		});
	}]);
