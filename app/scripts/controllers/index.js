'use strict';

/**
 * @ngdoc function
 * @name probaseUiApp.controller:MainCtrl
 * @description
 * # IndexCtrl
 * Controller of the probaseUiApp
 */
angular.module('probaseUiApp')
  .controller('IndexCtrl',function (GlobalService,$scope,$http,$location) {

$scope.user = GlobalService.user;
$scope.usertype = GlobalService.usertype;
// $scope.loggedin = 'Abcd';
$scope.loggedin = GlobalService.loggedin;

$scope.checklogin = function()
    {
      if(GlobalService.authkey!= "")
        $location.path("/search");
    };
// $scope.$watch(function(GlobalService){
//   return GlobalService
// },function(newval,oldval,scope){
//   $scope.user=newval.user;
//   $scope.loggedin=newval.loggedin;
//   console.log("watcher called");
// });
// $scope.$watch( 'loggedIn', function(newval,oldval,scope){
  // $scope.user=newval.user;
  // $scope.loggedin=newval.loggedin;
  // console.log("watcher called");
// });
});
