var mymodal = angular.module('mymodal', []);

mymodal.directive('modal', function () {
    return {
      template: '<div class="modal fade">' + 
          '<div class="modal-dialog">' + 
            '<div class="modal-content">' + 
              '<div class="modal-header">' + 
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
                '<h4 class="modal-title">{{ title }}</h4>' + 
              '</div>' + 
              '<div class="modal-body" ng-transclude></div>' + 
            '</div>' + 
          '</div>' + 
        '</div>',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope:true,
      link: function postLink(scope, element, attrs) {
        scope.title = attrs.title;

        scope.$watch(attrs.visible, function(value){
          if(value == true)
            $(element).modal('show');
          else
            $(element).modal('hide');
        });

        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
    };
  });


var app = angular.module('gsmarkdown', []);

app.directive('markdown', function ($window) {
    var converter = new $window.showdown.Converter();
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, element, attrs, model) {

            var ngModel = attrs['ngModel'],
                render = function () {
                    var html, value;

                    value = ((ngModel) ? model.$modelValue : element.text()) || '';

                    html = converter.makeHtml(value);

                    element.html(html);
                };

            if (ngModel) {
                scope.$watch(ngModel, render);
            }

            render();
        }
    };

});