'use strict';

angular.module('probaseUiApp')
  .controller('UpdateCtrl',function (GlobalService,$scope,$http,$location) {
    $scope.temp={};
    $scope.projectsFound=false;
    $scope.showPreview=false;
    $scope.showSuccess = false;
    $scope.showError=false;
    $scope.hideModal = function(){
    $scope.showError = false;
    $scope.showSuccess = false;
    $scope.showPreview=false;
    };
    $scope.errorModal = function(){
    $scope.showError = true;
    $scope.showSuccess = false;
    $scope.showPreview=false;
    };
    $scope.successModal = function(){
    $scope.showError = false;
    $scope.showSuccess = true;
    $scope.showPreview=false;
    };
    $scope.previewModal = function(){
    $scope.showError = false;
    $scope.showSuccess = false;
    
    $scope.showPreview=true;
    };

$scope.submit = function() 
{

var url=GlobalService.baseurl+"v1/projects/update/" + $scope.groupid;
$scope.temp.authkey = GlobalService.authkey;
$scope.temp.usertype = GlobalService.usertype;
console.log(url);
    $http.post(url,temp)
    .then(function(response)
            {
              console.log(response);
              GlobalService.error="";
              $scope.success=response.data.success;
              $scope.showSuccess();  
             },function(response){
              console.log(response);
            GlobalService.error=response.data.error;
              console.log(GlobalService.error);
             if(GlobalService.error === "Login Required")
            {
              $scope.error= GlobalService.error;
              $scope.showError();
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
            $scope.error = GlobalService.error;
            $scope.showError();
          }
            
          });



  
};


$scope.projects = function(){

var url=GlobalService.baseurl+"projects/" + GlobalService.user;
console.log(url);

        var data={ 'authkey': GlobalService.authkey
                 };

          $http.post(url,data)
          .then(function(response)
            {
              var res=response.data.success;
           
              if (res === "Found projects")
              {
                 $scope.projectsFound=true;
                 console.log(res);
                 $scope.projects=response.data.projects.hits;
                 $scope.showdetail(0);
                
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

$scope.showdetail = function(index)
      { 
        $scope.temp.title           =$scope.projects[index]._source.title;
        $scope.temp.description     =$scope.projects[index]._source.description;
        $scope.temp.additional_links =$scope.projects[index]._source.additional_links;
        $scope.temp.synopsis        =$scope.projects[index]._source.synopsis; 
        $scope.temp.project_report  =$scope.projects[index]._source.project_report;
        $scope.temp.groupid        =$scope.projects[index]._id;
        $scope.temp.lang        =$scope.projects[index].lang;
      };

});
