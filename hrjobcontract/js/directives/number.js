define(['directives/directives'], function(directives){
    directives.directive('hrjcNumber',function($log){
        $log.debug('Directive: hrjcNumber');

        return {
            require: 'ngModel',
            link: function ($scope, el, attrs, modelCtrl) {
                var toFixedVal = 2;

                if (attrs.hrjcNumber && typeof +attrs.hrjcNumber === 'number') {
                    toFixedVal = attrs.hrjcNumber;
                }

                el.bind('blur', function () {
                    var val = modelCtrl.$viewValue;
                    modelCtrl.$setViewValue(!!val && !isNaN(val) ? parseFloat(val).toFixed(toFixedVal) : (0).toFixed(toFixedVal));
                    modelCtrl.$render();
                });
            }
        }
    });
});