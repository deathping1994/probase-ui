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
    'mymodal',
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angular-loading-bar',
   'ui.bootstrap'
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
        // resolve: {
        //             factory: checkRouting
        //         }
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
        // resolve: {
        //             factory: checkRouting
        //         }
      })
      .when('/approve', {
        templateUrl: 'views/approve.html',
        controller: 'ApproveCtrl',
        controllerAs: 'approve',
        resolve: {
                    factory: checkRouting
                }
      })
      .when('/evaluate', {
        templateUrl: 'views/evaluate.html',
        controller: 'EvaluateCtrl',
        controllerAs: 'evaluate',
        resolve: {
                    factory: checkRouting
                }
      })
      .when('/update', {
        templateUrl: 'views/update.html',
        controller: 'UpdateCtrl',
        controllerAs: 'update'
        // resolve: {
        //             factory: checkRouting
        //         }
      })
      .when('/test', {
        templateUrl: 'views/test.html',
        controller: 'SearchCtrl',
        controllerAs: 'dumb'
        // resolve: {
        //             factory: checkRouting
        //         }
      })
      .otherwise({
        redirectTo: '/search'
        // resolve: {
        //             factory: checkRouting
        //         }
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
        // baseurl : 'http://probase.anip.xyz:8080/',
        baseurl : 'http://localhost:5000/',
        error:"",
        authkey:"",
        usertype:"",
        user:"",
        loggedin: false
    };
});
