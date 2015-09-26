'use strict';

/**
 * @ngdoc function
 * @name probaseUiApp.controller:MainCtrl
 * @description
 * # IndexCtrl
 * Controller of the probaseUiApp
 */
angular.module('probaseUiApp')
  .controller('IndexCtrl',function (GlobalService,$scope,$http) {
$scope.user=GlobalService.user;
$scope.loggedin=GlobalService.loggedin;
$scope.$watch(GlobalService,function(newval,oldval,scope){
  $scope.user=GlobalService.user;
  $scope.loggedin=GlobalService.loggedin;
});
});
