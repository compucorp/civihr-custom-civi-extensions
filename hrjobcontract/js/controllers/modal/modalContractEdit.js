console.log('Controller: ModalContractEditCtrl');
define(['controllers/controllers',
        'services/contractDetails',
        'services/contractLeave',
        'services/contractInsurance',
        'services/contractPension'], function(controllers){

    controllers.controller('ModalContractEditCtrl',['$scope','$modalInstance','$q', 'ContractDetailsService',
        'ContractLeaveService','ContractInsuranceService','ContractPensionService','contract','utils',
        function($scope, $modalInstance, $q, ContractDetailsService, ContractLeaveService, ContractInsuranceService,
                 ContractPensionService, contract, utils){

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
                    promiseContractInsurance = ContractInsuranceService.save($scope.contract.insurance),
                    promiseContractPension = ContractPensionService.save($scope.contract.pension);

                $q.all({
                    details: promiseContractDetails,
                    leave: promiseContractLeave,
                    insurance: promiseContractInsurance,
                    pension: promiseContractPension
                }).then(function(results){

                    //TODO (incorrect date format in the API response)
                    //results.requireReload = contract.details.period_end_date !== results.details.period_end_date;
                    $modalInstance.close(results);
                });

            };

        }]);
});