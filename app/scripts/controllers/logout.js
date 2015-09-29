'use strict';

/**
 * @ngdoc function
 * @name probaseUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the probaseUiApp
 */
angular.module('probaseUiApp')
  .controller('LogoutCtrl',function (GlobalService,$scope,$http) {
     $scope.logout = function()
     { var url=GlobalService.baseurl+"logout";
        $http.post(url,data)
         .then(function(response)
           { if(response.data.error!=="")
              {GlobalService.error=response.data.error;
               $scope.error=GlobalService.error;
               }
             else
               {GlobalService.authkey="";
                 GlobalService.usertype="";
                 GlobalService.user="";
                 GlobalService.loggedin=false;
                 $scope.$parent.loggedin=false;
                 $scope.$parent.user="";
                 $scope.success="Successfully Logged Off !"
               $location.path("/search");
             }

           }),(function(response){
           $scope.response=response;
           console.log($scope.response.error);
         });
     }

    });
