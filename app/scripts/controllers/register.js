'use strict';

/**
 * @ngdoc function
 * @name probaseUiApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the probaseUiApp
 */
angular.module('probaseUiApp')
  .controller('RegisterCtrl',function (GlobalService,$scope,$http,$location) {

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
    $scope.mentor=[];
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

$scope.validatefun = function(projecttype,mentor)
{
    for (var z =0; z < $scope.mentor.length;z++)
         {
          for (var k = z+1; k <$scope.mentor.length;k++)
          {
                 if($scope.mentor[z] == $scope.mentor[k])
                 {
                  $scope.flag = 1;
                  console.log($scope.mentor);
                  console.log($scope.flag);
                  break;
                 }
          }
        }
          

};




$scope.submit = function()
      {
        console.log($scope.projecttype);
       
        if($scope.projecttype == 'Major')
        $scope.validatefun($scope.projecttype,$scope.mentor);

            if($scope.flag == 1)
            {
              $scope.flag = 0;
          //    $scope.response    = '';
              $scope.projecttype = 'Minor';
              $scope.mentor.splice(1,4);
              $scope.errormentor = 'Mentor should be different.';
            }
     else
     {
         $scope.errormentor = '';
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
            'user'    :GlobalService.user,
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
                console.log(response);
             },function(response){
                  
            GlobalService.error=response.data.error;

            if(GlobalService.error === "Login Required")
            {
              $scope.response= GlobalService.error;
              GlobalService.authkey="";
              GlobalService.usertype="";
              GlobalService.user="";
              GlobalService.loggedin=false;
              $scope.$parent.loggedin=false;
              $scope.$parent.user="";
              $location.path("/");
            }
            else
            {
            $scope.response= GlobalService.error;
            $scope.memberids=[];
          }

            console.log(response);            
          });

        }
                   
      };

      
});
