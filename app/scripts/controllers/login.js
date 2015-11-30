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
    $scope.showModal = false;
    $scope.toggleModal = function(){
    $scope.showModal = !$scope.showModal;
    };
     $scope.$parent.checklogin();
     $scope.user='Enrollment no.';
     $scope.pass='password';
     $scope.response="";
     $scope.response=GlobalService.error;
     $scope.usertype = 'S';
   
      $scope.reset = function(){
        $scope.user="Enrollment no.";
        $scope.pass="password";
        $scope.date1="DD/MM/YYYY";
      };
      $scope.blockui=function (opt){
        if(opt==="start"){
          $scope.spinner=true;
          $scope.whitediv=true;
        }
        else if (opt==="stop") {
          $scope.spinner=false;
          $scope.whitediv=false;
        }
      };
     $scope.date1='DD/MM/YYYY';
     $scope.bypass = function()
		  { 
		  	var url=GlobalService.baseurl+"login_action";
		    
        $scope.user =angular.uppercase($scope.user);
        console.log($scope.user);
		    var data={ 'user': $scope.user,
		    		'pass': $scope.pass,
            'bypass': true,
		    		'usertype':$scope.usertype,
		    		'date1': $scope.date1
		    	};
        console.log(url);
        $scope.blockui("start");
		    $http.post(url,data)
		      .then(function(response)
		      	{ 
              $scope.blockui("stop");
                  GlobalService.authkey=response.data.authkey;
                  GlobalService.usertype=response.data.usertype;
                  GlobalService.user=response.data.user;
                  GlobalService.loggedin=true;
                  $scope.$parent.loggedin=true;
                  $scope.$parent.user=response.data.user;
                  $scope.$parent.usertype =response.data.usertype;
                  GlobalService.error="";
                //  console.log(GlobalService.user);
                $location.path("/search");
              

            },function(response){
		      		 $scope.blockui("stop");
		      		 	GlobalService.error=response.data.error;
		      		 	$scope.response=GlobalService.error;
                $scope.reset();
                $scope.toggleModal();
		      		 });
		  };
      $scope.submit = function()
      { 
        var url=GlobalService.baseurl+"login_action";
        
        $scope.user =angular.uppercase($scope.user);
        console.log($scope.user);
        var data={ 'user': $scope.user,
            'pass': $scope.pass,
            'usertype':$scope.usertype,
            'date1': $scope.date1
          };
        console.log(url);
        $scope.blockui("start");
        $http.post(url,data)
          .then(function(response)
            { 
              $scope.blockui("stop");
                  GlobalService.authkey=response.data.authkey;
                  GlobalService.usertype=response.data.usertype;
                  GlobalService.user=response.data.user;
                  GlobalService.loggedin=true;
                  $scope.$parent.loggedin=true;
                  $scope.$parent.user=response.data.user;
                  $scope.$parent.usertype =response.data.usertype;
                  GlobalService.error="";
                //  console.log(GlobalService.user);
                $location.path("/search");
              

            },function(response){
               $scope.blockui("stop");
                GlobalService.error=response.data.error;
                $scope.response=GlobalService.error;
                $scope.reset();
                $scope.toggleModal();
               });
      };
      // console.log($scope.$parent.loggedin);
  });
