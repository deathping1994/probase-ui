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
    'angular-loading-bar',
   // 'angular-ui-grid'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/logout', {
        templateUrl: 'views/logout.html',
        controller: 'LogoutCtrl',
        controllerAs: 'logout',
        resolve: {
                    factory: checkRouting
                }
      })
      .when('/search', {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl',
        controllerAs: 'search',
        resolve: {
                    factory: checkRouting
                }
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'register',
        resolve: {
                    factory: checkRouting
                }
      })
      .when('/feedback', {
        templateUrl: 'views/feedback.html',
        controller: 'FeedbackCtrl',
        controllerAs: 'feedback',
        resolve: {
                    factory: checkRouting
                }
      })
      .otherwise({
        redirectTo: '/search',
        resolve: {
                    factory: checkRouting
                }
      });
  });
  var checkRouting= function ($q, GlobalService, $location) {
      if (GlobalService.authkey!=="") {
          return true;
      } else {
          var deferred = $q.defer();
          deferred.reject();
          GlobalService.error="It seems you are not logged in!Please login to continue.";
          $location.path("/");
          return deferred.promise;
      }
  };
probaseUiApp.factory('GlobalService', function() {
    return {
      baseurl:"http://localhost:5000/",
       //  baseurl : 'http://188.166.249.229:5000/',
        // baseurl : 'http://188.166.249.229:5000/',
         //baseurl : 'http://192.168.43.189:5000/',
        error:"",
        authkey:"",
        usertype:"",
        user:"",
        loggedin: false
    };
});
