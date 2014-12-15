console.log('Controller: ModalContractChangeCtrl');
define(['controllers/controllers'], function(controllers){
    controllers.controller('ModalContractChangeCtrl',['$scope','$modalInstance','details',
        function($scope, $modalInstance, details){

            $scope.details = {};
            angular.copy(details,$scope.details);

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }]);
});