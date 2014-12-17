console.log('Controller: ModalContractViewCtrl');
define(['controllers/controllers'], function(controllers){
    controllers.controller('ModalContractViewCtrl',['$scope','$modalInstance','contract',
        function($scope, $modalInstance, contract){

            $scope.contract = {};
            $scope.title = 'Contract';
            $scope.allowSave = false;
            $scope.isDisabled = true;

            angular.copy(contract,$scope.contract);

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }]);
});