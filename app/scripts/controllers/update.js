'use strict';

angular.module('probaseUiApp')
  .controller('UpdateCtrl',function (GlobalService,$scope,$http,$location) {

var temp={};

      $scope.change1 = function(){
       temp.description = $scope.description;
    };
      
      $scope.change2 = function(){
       temp.synopsis = $scope.synopsis;
    };
      $scope.change3 = function(){
       temp.additional_links = $scope.additionallink;
    };
      $scope.change4 = function(){
       temp.project_report = $scope.projectreport;
    }; 


$scope.submit = function() 
{

var url=GlobalService.baseurl+"v1/projects/update/" + $scope.groupid;
temp.authkey = GlobalService.authkey;
temp.usertype = GlobalService.usertype;
console.log(url);
console.log(temp);

    $http.post(url,temp)
    .then(function(response)
            {
              console.log(response);
              GlobalService.error="";
              $scope.response=response.data.success;

              $scope.temp = {};
                
             },function(response){
              console.log(response);
            GlobalService.error=response.data.error;
              console.log(GlobalService.error);
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

var url=GlobalService.baseurl+"/mentor/projects/" + GlobalService.user;
console.log(url);

        var data={ 'authkey': GlobalService.authkey
                 };

          $http.post(url,data)
          .then(function(response)
            {
              var res=response.data.success;
           
              if (res === "Found projects")
              {
                 console.log(res);
                 $scope.projects=response.data.projects.hits;
                
            }
             },function(response){
            GlobalService.error=response.data.error;
            console.log(GlobalService.error);
             if(GlobalService.error === "Login Required")
            {
              $scope.response= GlobalService.error;
              GlobalService.authkey="";
              $location.path("/");
            }
            else
            {
            $scope.response = GlobalService.error;
          }
        });
     
};

$scope.showdetail = function(x)
      { 
        $scope.title           =x._source.title;
        $scope.description     =x._source.description;
        $scope.additionallink =x._source.additional_links;
        $scope.synopsis        =x._source.synopsis; 
        $scope.projectreport  =x._source.project_report;
        $scope.groupid        =x._id;

      };

});
