define(['controllers/controllers', 'moment'], function(controllers, moment){
    controllers.controller('ModalChangeReasonCtrl',['$scope','$modalInstance', '$log',
        function($scope, $modalInstance, $log){
            $log.debug('Controller: ModalChangeReasonCtrl');

            $scope.dpDateEffectiveMin = new Date();

            $scope.dpOpen = function($event, opened){
                $event.preventDefault();
                $event.stopPropagation();

                $scope[opened] = true;
            }

            $scope.save = function () {
                $modalInstance.close({
                    reasonId: $scope.change_reason,
                    date: $scope.effective_date ? moment($scope.effective_date).format('YYYY-MM-DD') : ''
                });
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }]);
});