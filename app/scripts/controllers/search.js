'use strict';

/**
 * @ngdoc function
 * @name probaseUiApp.controller:MainCtrl
 * @description
 * # SearchCtrl
 * Controller of the probaseUiApp
 */
angular.module('probaseUiApp')
  .controller('SearchCtrl',function (GlobalService,$scope,$http) {

      	$scope.query = "What Can I find For you ?";
        $scope.submit = function()
                {
                  var url=GlobalService.baseurl+"search";
                  var data={ 'query' : $scope.query,
                             'authkey': GlobalService.authkey
                           };
                  console.log(data);
                  $http.post(url,data)

                    .then(function(response)
                      {
                      	console.log(response);
                         if(response.data.error!=="")
                         {
                          GlobalService.error=response.data.error;
                          $scope.error=GlobalService.error;
                         }
                        else
                          {
                          	GlobalService.authkey=response.data.authkey;
                              console.log(response.data);
                          }

                      }),(function(response){
                      $scope.response=response;
                      console.log($scope.response.error);

                    });
          };
