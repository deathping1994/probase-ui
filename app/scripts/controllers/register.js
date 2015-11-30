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
    $scope.showsidebar=false;
    $scope.title='';
    $scope.projecttype='Major';
    $scope.description='';
    $scope.mentor=["mahendragurve"];
    $scope.items=5;
    $scope.showPreview=false;
    $scope.showSuccess = false;
    $scope.showError=false;
    $scope.hideModal = function(){
    $scope.showError = false;
    $scope.showSuccess = false;
    $scope.showPreview=false;
    };
    $scope.errorModal = function(){
    $scope.showError = true;
    $scope.showSuccess = false;
    $scope.showPreview=false;
    };
    $scope.successModal = function(){
    $scope.showError = false;
    $scope.showSuccess = true;
    $scope.showPreview=false;
    };
    $scope.previewModal = function(){
    $scope.showError = false;
    $scope.showSuccess = false;
    $scope.showPreview=true;
    };
$scope.memberids=[];
$scope.members =
[{
  name:'', eno:'',email:'',branch:'Computer Science'
}];

$scope.addInput = function(){
    $scope.members.push({name:'', eno:'',email:'',branch:'Computer Science'});
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

$scope.search_probase=function(){
  var url=GlobalService.baseurl+"v1/projects/search?query="+$scope.title
    +" "+$scope.description 
    +" "+$scope.languages+"&source=probase_repos";
      $http.get(url)
              .then(function(response)
                 {console.log(response.data);
                  if(response.data.max_score>0.4)
                  {
                    $scope.probase_repos=response.data.hits;
                  }
                  else{
                    $scope.probase_repos=[];  
                  }
                },function(response){
                  GlobalService.error=response.data.error;
                  $scope.error=GlobalService.error;

              });
}
$scope.search_github=function()
    {var url=GlobalService.baseurl+"v1/projects/search?query="+$scope.title
    +" "+$scope.description 
    +" "+$scope.languages+"&source=github_repos";
      $http.get(url)
              .then(function(response)
                 {console.log(response.data);
                  if(response.data.max_score>0.4)
                  {
                    $scope.github_repos=response.data.hits;
                  }
                  else{
                    $scope.github_repos=[];  
                  }
                },function(response){
                  GlobalService.error=response.data.error;
                  $scope.error=GlobalService.error;

              });
    }

$scope.showsimilar=function(){
  if($scope.description.length>40){
    $scope.search_probase();
    $scope.search_github();
    $scope.showsidebar=true;
  }
  console.log($scope.showsidebar);
}

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
              $scope.error = 'Mentor should be different.';
              $scope.errorModal();
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
        console.log ($scope.description);
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
            {   $scope.success=true;
                GlobalService.error="";
                $scope.success=response.data.success;
                $scope.memberids=[];
                console.log(response);
                $scope.successModal();
             },function(response){
                  
            GlobalService.error=response.data.error;

            if(GlobalService.error === "Login Required")
            { 
              $scope.error= GlobalService.error;
              GlobalService.authkey="";
              GlobalService.usertype="";
              GlobalService.user="";
              GlobalService.loggedin=false;
              $scope.$parent.loggedin=false;
              $scope.$parent.user="";
              $location.path("/");
              $scope.errorModal();
            }
            else
            {
            $scope.error= GlobalService.error;
            $scope.errorModal();
            $scope.memberids=[];
          }

            console.log(response);            
          });

        }
                   
      };

      
});
