define(['directives/directives'], function(directives){
    directives.directive('hrjcValidate',function($log){
        $log.debug('Directive: hrjcValidate');

        return {
            restrict: 'A',
            require:  '^form',
            link: function ($scope, el, attrs, formCtrl) {
                var inputEl   = el[0].querySelector("[name]"),
                    inputNgEl = angular.element(inputEl),
                    inputName = inputNgEl.attr('name'),
                    iconEl = document.createElement('span'),
                    iconNgEl = angular.element(iconEl);

                if (!inputName) {
                    return;
                }

                el.addClass('has-feedback');
                iconNgEl.addClass('glyphicon form-control-feedback');
                inputNgEl.after(iconNgEl);

                function toggleSuccess(invalid) {
                    el.toggleClass('has-success', !invalid);
                    iconNgEl.toggleClass('glyphicon-ok', !invalid);
                }

                function toggleError(invalid) {
                    el.toggleClass('has-error', invalid);
                    iconNgEl.toggleClass('glyphicon-remove', invalid);
                }

                $scope.$watch(function() {
                    return formCtrl[inputName] && formCtrl[inputName].$invalid;
                }, function(invalid) {
                    if (formCtrl[inputName].$dirty) {
                        toggleSuccess(invalid);
                        toggleError(invalid);
                    }
                });

                inputNgEl.bind('blur', function() {
                    toggleError(formCtrl[inputName].$invalid)
                });
            }
        }
    });
});