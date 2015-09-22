'use strict';

/**
 * @ngdoc overview
 * @name probaseUiApp
 * @description
 * # probaseUiApp
 *
 * Main module of the application.
 */
var probaseUiApp=angular
  .module('probaseUiApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angular-loading-bar'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'register'
      })
      .when('/feedback', {
        templateUrl: 'views/feedback.html',
        controller: 'FeedbackCtrl',
        controllerAs: 'feedback'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

probaseUiApp.factory('GlobalService', function() {
    return {
        baseurl : 'http://188.166.249.229:5000/',
         //baseurl : 'http://192.168.43.189:5000/',
        error:"",
        authkey:""
    };
});
