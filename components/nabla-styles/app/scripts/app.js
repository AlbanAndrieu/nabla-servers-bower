'use strict';

/**
 * @ngdoc overview
 * @name tempApp
 * @description
 * # tempApp
 *
 * Main module of the application.
 */
angular
  .module('nablaStyleApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
    $routeProvider
      .when('/', {
        templateUrl: 'views/styles.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
