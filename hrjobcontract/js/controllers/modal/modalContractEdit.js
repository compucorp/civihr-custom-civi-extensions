console.log('Controller: ModalContractEditCtrl');
define(['controllers/controllers','services/contractDetails'], function(controllers){
    controllers.controller('ModalContractEditCtrl',['$scope','$modalInstance','$log', 'ContractDetailsService','contract','utils',
        function($scope, $modalInstance, $log, ContractDetailsService, contract, utils){

            $scope.allowSave = true;
            $scope.contract = {};
            $scope.isDisabled = false;
            $scope.title = 'Edit contract';
            $scope.utils = utils;

            angular.copy(contract,$scope.contract);

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

            $scope.save = function () {
                var promiseContractDetails = ContractDetailsService.save($scope.contract.details);

                promiseContractDetails.then(function(contractDetails){
                    $modalInstance.close(contractDetails);
                },function(reason){
                    $log.error('Failed: ' + reason);
                });
            };

        }]);
});