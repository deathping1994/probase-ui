'use strict';

/**
 * @ngdoc function
 * @name probaseUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the probaseUiApp
 */
angular.module('probaseUiApp')
  .controller('LogoutCtrl',function (GlobalService,$scope,$http,$location) {
     
     $scope.logoutme = function()
     { 
       var url=GlobalService.baseurl+"logout";

       var data = {
                 'authkey':GlobalService.authkey,
                 'usertype':GlobalService.usertype
       };

     console.log(url,data);
        $http.post(url)
         .then(function(response)
           { 
                 GlobalService.authkey="";
                 GlobalService.usertype="";
                 GlobalService.user="";
                 GlobalService.error="";
                 GlobalService.loggedin=false;
                 $scope.$parent.loggedin=false;
                 $scope.$parent.user="";
                 $scope.response=response.data.success;
                 console.log($scope.response);
                 $location.path("/search");
             

           },function(response){
          $scope.response=response.data.error;
          console.log(response);
         });
     };

    });
