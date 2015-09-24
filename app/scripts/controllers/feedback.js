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
               if(response.data.error!=="")
               {
                GlobalService.error=response.data.error;
                $scope.error=GlobalService.error;
               }
              else
                {GlobalService.authkey=response.data.authkey;
                console.log(response.data);}

            }),
          (function(response)
          {
            $scope.response=response;
            console.log($scope.response.error);

          });
      };

});
