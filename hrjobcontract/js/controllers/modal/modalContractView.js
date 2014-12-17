console.log('Controller: ModalContractViewCtrl');
define(['controllers/controllers'], function(controllers){
    controllers.controller('ModalContractViewCtrl',['$scope','$modalInstance','contract','utils',
        function($scope, $modalInstance, contract, utils){

            $scope.allowSave = false;
            $scope.contract = {};
            $scope.isDisabled = true;
            $scope.title = 'Contract';
            $scope.utils = utils;

            angular.copy(contract,$scope.contract);

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }]);
});