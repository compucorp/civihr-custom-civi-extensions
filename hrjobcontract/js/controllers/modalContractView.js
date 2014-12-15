console.log('Controller: ModalContractViewCtrl');
define(['controllers/controllers'], function(controllers){
    controllers.controller('ModalContractViewCtrl',['$scope','$modalInstance','details',
        function($scope, $modalInstance, details){

            $scope.details = {};
            $scope.title = 'Contract';
            $scope.allowSave = false;
            $scope.isDisabled = true;

            angular.copy(details,$scope.details);

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }]);
});