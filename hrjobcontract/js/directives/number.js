define(['directives/directives'], function(directives){
    directives.directive('hrjcNumber',function($log){
        $log.debug('Directive: hrjcNumber');

        return {
            require: 'ngModel',
            link: function ($scope, el, attrs, modelCtrl) {
                el.bind('blur', function () {
                    var val = modelCtrl.$viewValue;
                    modelCtrl.$setViewValue(!!val && !isNaN(val) ? parseFloat(val).toFixed(2) : (0).toFixed(2));
                    modelCtrl.$render();
                });
            }
        }
    });
});