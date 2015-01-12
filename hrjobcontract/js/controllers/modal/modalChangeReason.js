console.log('Controller: ModalChangeReasonCtrl');
define(['controllers/controllers'], function(controllers){
    controllers.controller('ModalChangeReasonCtrl',['$scope','$modalInstance',
        function($scope, $modalInstance){

            $scope.dpDateEffectiveMin = new Date();

            $scope.dpOpen = function($event, opened){
                $event.preventDefault();
                $event.stopPropagation();

                $scope[opened] = true;
            }

            $scope.save = function () {
                $modalInstance.close({
                    reasonId: $scope.change_reason,
                    date: $scope.effective_date
                });
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }]);
});