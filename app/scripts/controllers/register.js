'use strict';

/**
 * @ngdoc function
 * @name probaseUiApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the probaseUiApp
 */
angular.module('probaseUiApp')
  .controller('RegisterCtrl',function (GlobalService,$scope,$http) {

    $scope.title='';
    $scope.projecttype='';
    $scope.description='';
    

$scope.members = 
[{
  name:'', eno:'',id:'',branch:''
}];

$scope.addInput = function(){
    $scope.members.push({name:'', eno:'',id:'',branch:''});
}

$scope.removeInput = function(index){
    $scope.members.splice(index,1);
}
  

  
$scope.submit = function()
      { 

        var url=GlobalService.baseurl+"v1/group/create"
        
        var data={ 'title': $scope.title,
            'projecttype': $scope.projecttype,
            'description': $scope.description,
            'members': $scope.members,
            'authkey': GlobalService.authkey
          };
          console.log(url);
          console.log(data);
        $http.post(url,data)
          .then(function(response)
            {console.log(response);
               if(response.data.error!="")
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
