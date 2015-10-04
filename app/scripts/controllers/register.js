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
    $scope.errors = [];

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

// $scope.validatefun = function(title,description,members)
// {
//   if (title == "")
//   {
//     $scope.errors[0] = "Title can't be Empty"
//   }
//   if (description == "")
//    {
//     $scope.errors[1] = "Description can't be Empty"
//   }
//   for (var y =0; y < $scope.members.length;y++)
//          {
//             var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@example\.com$/i;
//            if ($scope.members[y].name != /[0-9]?/)
//            {
//             $scope.flag = 1;
//             console.log($scope.members[y].name);
//             console.log("Flag");
//            }
//          }
//     for (var z =0; z < $scope.members.length;z++)
//          {
//            if ($scope.members[z].eno != /^[a-zA-Z]$/)
//            {
//             $scope.flag1 = 1;

//             console.log("Flag1");
//            }
//          }      

//          if($scope.flag == 1)
//              {
//     $scope.errors[2] = "Either Name Field Empty Or Unwanted Symbol";
//              }
//         else if ($scope.flag1 == 1)
//         {
//    $scope.errors[2] = "Eno. should be No"
//         }
//         else
//         {
//              $scope.errors[2] = "";
//         }

// };




$scope.submit = function()
      {
     
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
                   
      };

      
});
