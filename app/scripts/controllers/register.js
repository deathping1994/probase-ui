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
    $scope.mentor=["mahendragurve"];

$scope.memberids=[];
$scope.members =
[{
  name:'', eno:'',email:'',branch:'Computer Science'
}];

$scope.addInput = function(){
    $scope.members.push({name:'', eno:'',email:'',branch:''});
};

$scope.majorSelected = function(){
    $scope.mentor.push("mahendragurve","mahendragurve","mahendragurve","mahendragurve");
};

$scope.minorSelected = function(){
    $scope.mentor.splice(1,4);
};
$scope.removeInput = function(index){
    $scope.members.splice(index,1);
};


$scope.teachersData = function()
{

    var url=GlobalService.baseurl+"teachers";
    console.log(url);
  $http.post(url)
.then(function(response)
            {
              $scope.teachers = response.data.teachers;
            

          });
};




$scope.submit = function()
      {

        console.log($scope.mentor);

        for (var x =0; x < $scope.members.length;x++)
        {
          $scope.memberids.push($scope.members[x].eno);
        }

        console.log($scope.memberids);
        var url=GlobalService.baseurl+"v1/project/create";

        var data={ 'title': $scope.title,
            'membersid':$scope.memberids,
            'projecttype': $scope.projecttype,
            'description': $scope.description,
            'members': $scope.members,
            'authkey': GlobalService.authkey,
            'usertype': GlobalService.usertype,
            'mentor' : $scope.mentor
          };
          console.log(url);
          console.log(data);
        $http.post(url,data)

          .then(function(response)
            {
                GlobalService.error="";
                $scope.response=response.data.success;
                $scope.memberids=[]; 
             },function(response){

            GlobalService.error=response.data.error;
            $scope.response= GlobalService.error;
            $scope.memberids=[];

            console.log(response);            
          });
                   
      };

});
