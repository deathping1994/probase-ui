'use strict';


angular.module('probaseUiApp')
  .controller('FeedbackCtrl',function (GlobalService,$scope,$http) {

  	$scope.email = '';
  	$scope.text  = '';


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
                 
                 GlobalService.error="";
                 $scope.response=response.data.success;
              

            },function(response){
             
           GlobalService.error = response.data.error;
            $scope.response=GlobalService.error;
            console.log($scope.response);

          });
      };

});
