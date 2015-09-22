'use strict';

/**
 * @ngdoc function
 * @name probaseUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the probaseUiApp
 */
angular.module('probaseUiApp')
  .controller('LoginCtrl',function (GlobalService,$scope,$http) {
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
     $scope.date1='DD/MM/YY';
     $scope.submit = function()
		  { var checkboxvalue =retcheckbox();
		  	var url=GlobalService.baseurl+"login_action";
		  	console.log(url);
		    var data={ 'user': $scope.user,
		    		'pass': $scope.pass,
		    		'usertype': checkboxvalue,
		    		'date1': $scope.date1
		    	};
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

		      	}),(function(response){
		      	$scope.response=response;
		      	console.log($scope.response.error);

		      });
		  }

  });
