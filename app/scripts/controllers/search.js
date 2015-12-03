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
    $scope.query="jiit library";
    $scope.showsidebar=false;
    $scope.items=3;
    $scope.display=false;
    $scope.search_github=function()
    {var url=GlobalService.baseurl+"v1/projects/search?query="+$scope.title
    +" "+$scope.description 
    +" "+$scope.languages+"&source=github_repos";
      $http.get(url)
              .then(function(response)
                 {console.log(response.data);
                  $scope.github_repos=response.data.hits;
                },function(response){
                  GlobalService.error=response.data.error;
                  $scope.error=GlobalService.error;

              });
    }
    $scope.selected = undefined;
  $scope.getSuggestions = function(val) {
      var url=GlobalService.baseurl+"typeahead";
    return $http.get(url, {
      params: {
        q: val,
        size: 10
      }
    }).then(function(response){
      return response.data.projects;
    });
  };


    // $scope.getSuggestions=function(q)
    // {
    //   $http.get(url)
    //   .then(function(res)
    //       {
    //         // console.log(res.data);
    //         return res.data.projects.map(function(item){
    //     console.log(item);
    //     return item.title
    //       });
    //     });
    // };
    $scope.showdetail = function(x)
      { $scope.display=true;
        $scope.title=x._source.title;
        $scope.description=x._source.description;
        $scope.rating     =x._source.rating;
        $scope.approved   =x._source.approved;
        $scope.evaluated  =x._source.evaluated;
        $scope.synopsis   =x._source.synopsis;
        $scope.languages  =x._source.languages
        $scope.showsidebar=true;
      };
    $scope.submit = function()
          {
            var url=GlobalService.baseurl+"v1/projects/search?query="+$scope.query+"&source=probase_repos&size=8";
            $scope.showsidebar=false;
            $scope.display=false;
            console.log(url);
            $http.get(url)
              .then(function(response)
                 {console.log(response.data);
                  $scope.projects=response.data.hits;
                  if($scope.projects.length) 
                    {
                      $scope.showdetail($scope.projects[0]);
                    }
                  $scope.search_github();
                },function(response){
                  GlobalService.error=response.data.error;
                  $scope.error=GlobalService.error;

              });

          };
  });

  