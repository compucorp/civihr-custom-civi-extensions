console.log('Controller: ModalContractEditCtrl');
define(['controllers/controllers',
        'services/contractDetails',
        'services/contractLeave',
        'services/contractPension'], function(controllers){

    controllers.controller('ModalContractEditCtrl',['$scope','$modalInstance','$q', 'ContractDetailsService',
        'ContractLeaveService','ContractPensionService','contract','utils',
        function($scope, $modalInstance, $q, ContractDetailsService, ContractLeaveService, ContractPensionService, contract, utils){

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
                var promiseContractDetails = ContractDetailsService.save($scope.contract.details),
                    promiseContractLeave = ContractLeaveService.save($scope.contract.leave),
                    promiseContractPension = ContractPensionService.save($scope.contract.pension);

                $q.all({
                    details: promiseContractDetails,
                    leave: promiseContractLeave,
                    pension: promiseContractPension
                }).then(function(results){
                    results.requireReload = contract.details.period_end_date !== results.details.period_end_date;
                    $modalInstance.close(results);
                });

            };

        }]);
});