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
    $scope.projecttype='Major';
    $scope.description='';

$scope.memberids=[];
$scope.members =
[{
  name:'', eno:'',email:'',branch:'Computer Science'
}];

$scope.addInput = function(){
    $scope.members.push({name:'', eno:'',email:'',branch:''});
};

$scope.removeInput = function(index){
    $scope.members.splice(index,1);
};


$scope.teachersData == function()
{

    var url=GlobalService.baseurl+"v1/project/create";
  $http.post(url)
.then(function(response)
            {console.log(response);
               if(response.data.error!="")
               {
                 GlobalService.error=response.data.error;
                 $scope.error=GlobalService.error;
                
               }
              else
                {
                 $scope.teachers = response;
                 }

            }),(function(response){
            $scope.response=response;
            console.log($scope.response.error);

          });
};




$scope.submit = function()
      {
        for (var x =0; x < $scope.members.length;x++)
        {
          $scope.memberids.push($scope.members[x].eno);
        }

        var url=GlobalService.baseurl+"v1/project/create";

        var data={ 'title': $scope.title,
            'membersid':$scope.memberids,
            'projecttype': $scope.projecttype,
            'description': $scope.description,
            'members': $scope.members,
            'authkey': GlobalService.authkey,
            'usertype':GlobalService.usertype
          };
          console.log(url);
          console.log(data);
        $http.post(url,data)
          .then(function(response)
            {console.log(response);
               if(response.data.error!="")
               {
                console.log(response.data.success);
                console.log(response.data.error);
                GlobalService.error=response.data.error;
                $scope.error=GlobalService.error;
                $scope.memberids=[];
                // console.log("dljjlkjljljlknhkhlhlh;flkj00");
               }
              else
                {
                  // console.log("dljflkj00");
                  // console.log(response.data.success);
                $scope.success=response.data.success;
                $scope.error=response.data.error;
                 $scope.error=GlobalService.error;
                 }

            }),(function(response){
            $scope.response=response;
            console.log($scope.response.error);

          });
      };

});
