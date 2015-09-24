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
    $scope.projecttype='Minor';
    $scope.description='';

$scope.memberids=[];
$scope.members =
[{
  name:'', eno:'',id:'',branch:'Computer Science'
}];

$scope.addInput = function(){
    $scope.members.push({name:'', eno:'',email:'',branch:''});
};

$scope.removeInput = function(index){
    $scope.members.splice(index,1);
};



$scope.submit = function()
      {
        for (var x ; x < $scope.members.length;x++)
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
            'usertype':"S"
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

            }),(function(response){
            $scope.response=response;
            console.log($scope.response.error);

          });
      };

});
