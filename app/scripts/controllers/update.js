'use strict';

angular.module('probaseUiApp')
  .controller('UpdateCtrl',function (GlobalService,$scope,$http,$location) {

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
temp.authkey = GlobalService.authkey;
temp.usertype = GlobalService.usertype;
console.log(url);
console.log(temp);

    $http.post(url,temp)
    .then(function(response)
            {
              console.log(response);
              GlobalService.error="";
              $scope.success=response.data.success;
              $scope.showSuccess();
              $scope.temp = {};
                
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
            $scope.temp = {};
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

$scope.showdetail = function(index)
      { 
        $scope.title           =$scope.projects[index]._source.title;
        $scope.description     =$scope.projects[index]._source.description;
        $scope.additionallink =$scope.projects[index]._source.additional_links;
        $scope.synopsis        =$scope.projects[index]._source.synopsis; 
        $scope.projectreport  =$scope.projects[index]._source.project_report;
        $scope.groupid        =$scope.projects[index]._id;

      };

});
