'use strict';

/**
 * @ngdoc function
 * @name probaseUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the probaseUiApp
 */
angular.module('probaseUiApp')
  .controller('LoginCtrl',function (GlobalService,$location,$scope,$http) {
     $scope.user='Enrollment no.';
     $scope.pass='password';
     $scope.response;
     $scope.error=GlobalService.error;
     $scope.usertype={student:true,
     					teacher:false
     				};
     function retcheckbox()
     	{
     	if($scope.usertype.student)
     		return 'S';
     	else if($scope.usertype.teacher)
     		return 'E';
     	else
     		return 'S';
     	}
      $scope.reset = function(){
        $scope.user="";
        $scope.pass="";
        $scope.date1="DD/MM/YYYY"
      }
      $scope.blockui=function (opt){
        if(opt=="start"){
          $scope.spinner=true;
          $scope.whitediv=true;
        }
        else if (opt=="stop") {
          $scope.spinner=false;
          $scope.whitediv=false;
        }
      };
     $scope.date1='DD/MM/YYYY';
     $scope.submit = function()
		  { var checkboxvalue =retcheckbox();
		  	var url=GlobalService.baseurl+"login_action";
		  	console.log(url);
		    var data={ 'user': $scope.user,
		    		'pass': $scope.pass,
		    		'usertype': checkboxvalue,
		    		'date1': $scope.date1
		    	};
          $scope.blockui("start");
		    $http.post(url,data)
		      .then(function(response)
		      	{ if(response.data.error!=="")
		      		 {$scope.blockui("stop");
		      		 	GlobalService.error=response.data.error;
		      		 	$scope.error=GlobalService.error;
                $scope.reset();
		      		 }
		      		else
		      			{$scope.blockui("stop");
                  GlobalService.authkey=response.data.authkey;
                  GlobalService.usertype=response.data.usertype;
                  GlobalService.user=response.data.user;
                  GlobalService.loggedin=true;
                  $scope.$parent.loggedin=true;
                  $scope.$parent.user=response.data.user;
                $location.path("/search");
              }

		      	}),(function(response){
		      	$scope.response=response;
		      	console.log($scope.response.error);
            blockui("stop");
		      });
		  }
      // console.log($scope.$parent.loggedin);
  });
