'use strict';


angular.module('probaseUiApp')
  .controller('FeedbackCtrl',function (GlobalService,$scope,$http) {

  	$scope.email = '';
  	$scope.text  = '';
    $scope.showSuccess = false;
    $scope.showError=false;
    $scope.hideModal = function(){
    $scope.showError = false;
    $scope.showSuccess = false;
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
  	$scope.submit = function()
      {

       var url=GlobalService.baseurl+"feedback";

        var data={ 'from': $scope.email,
                   'msg' : $scope.text,
                   'authkey': GlobalService.authkey
                 };
          console.log(url);
          console.log(data);
        $http.post(url,data)
          .then(function(response)
            {console.log(response);
                 $scope.successModal();
                 GlobalService.error="";
                 $scope.success=response.data.success;
              

            },function(response){
           GlobalService.error = response.data.error;
            $scope.error=GlobalService.error;
            $scope.errorModal(); 
            console.log($scope.response);
            
          });
      };

});
