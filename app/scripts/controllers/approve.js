'use strict';

angular.module('probaseUiApp')
  .controller('ApproveCtrl',function (GlobalService,$scope,$http) {
var url;
$scope.approveme = function() 
{
  console.log($scope.approvestatus);
 if ($scope.approvestatus === false)
 {
 url=GlobalService.baseurl+"v1/projects/" + $scope.groupid + "/approve";

 }
 else
 {
   url=GlobalService.baseurl+"v1/projects/" + $scope.groupid + "/disapprove";
 
 }

var data={'authkey' : GlobalService.authkey,
          'usertype': GlobalService.usertype,
          'user'    : GlobalService.user
        };
console.log(url);
console.log(data);

    $http.post(url,data)
    .then(function(response)
            {
              console.log(response);
              GlobalService.error="";
              $scope.response=response.data.success;
             },function(response){
              console.log(response);
            GlobalService.error=response.data.error;
             if(GlobalService.error === "Login Required")
            {
              $scope.response= GlobalService.error;
              GlobalService.authkey="";
              GlobalService.usertype="";
              GlobalService.user="";
              GlobalService.loggedin=false;
              $scope.$parent.loggedin=false;
              $scope.$parent.user="";
              $location.path("/");
            }
            else
            {
            $scope.response = GlobalService.error;
            $scope.temp = {};
          }
          });



  
};


$scope.projects = function(){

url=GlobalService.baseurl+"mentor/projects/" + GlobalService.user;

        var data={ 'authkey': GlobalService.authkey
                 };
          console.log(url,data);
          $http.post(url,data)
          .then(function(response)
            {
              var res =response.data.success;
           
              if (res == "Found projects")
              {
                 GlobalService.error="";
                 $scope.projects=response.data.projects.hits;
                
            }
             },function(response){
              console.log(response);
            GlobalService.error=response.data.error;
            $scope.response = GlobalService.error;
          });
     
};

$scope.showdetail = function(x)
      { 
        $scope.title           =x._source.title;
        $scope.description     =x._source.description;
        $scope.synopsis        =x._source.synopsis;
        $scope.approvestatus   =x._source.approved;
        $scope.groupid        =x._id;

      };

});
