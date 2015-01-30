console.log('Directive: hrjcNumber');
define(['directives/directives'], function(directives){
    directives.directive('hrjcNumber',function(){
        return {
            require: 'ngModel',
            link: function ($scope, el, attrs, modelCtrl) {
                el.bind('blur', function () {
                    var val = modelCtrl.$viewValue;
                    modelCtrl.$setViewValue(!isNaN(val) ? parseFloat(val).toFixed(2) : (0).toFixed(2));
                    modelCtrl.$render();
                });
            }
        }
    });
});