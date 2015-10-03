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
    $scope.query="";
    $scope.showdetail = function(x)
      {
        $scope.title=x._source.title;
        $scope.description=x._source.description;
        $scope.rating     =x._source.rating;
        $scope.approved   =x._source.approved;
        $scope.evaluated  =x._source.evaluated;
        $scope.synopsis   =x._source.synopsis;

      };
    $scope.submit = function()
          {
            var url=GlobalService.baseurl+"v1/projects/search";

            var data={ 'query': $scope.query,
                'authkey': GlobalService.authkey,
                'usertype': GlobalService.usertype,
                'user': GlobalService.user
              };
              console.log(url);
            $http.post(url,data)
              .then(function(response)
                 {console.log(response.data);
                  $scope.projects=response.data.hits;
                },function(response){
                  GlobalService.error=response.data.error;
                  $scope.error=GlobalService.error;

              });
          };
  });
