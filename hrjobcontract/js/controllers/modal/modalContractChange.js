console.log('Controller: ModalContractChangeCtrl');
define(['controllers/controllers',
        'services/contractDetails',
        'services/contractLeave',
        'services/contractInsurance',
        'services/contractPension'], function(controllers){

    controllers.controller('ModalContractChangeCtrl',['$scope','$modalInstance','$q', 'ContractDetailsService',
        'ContractLeaveService','ContractInsuranceService','ContractPensionService','contract','utils',
        function($scope, $modalInstance, $q, ContractDetailsService, ContractLeaveService, ContractInsuranceService,
                 ContractPensionService, contract, utils){

            $scope.allowSave = true;
            $scope.contract = {};
            $scope.isDisabled = false;
            $scope.title = 'Change contract terms';
            $scope.utils = utils;

            angular.copy(contract,$scope.contract);

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

            $scope.save = function () {

                var contract = $scope.contract,
                    params = {
                        id: null,
                        jobcontract_revision_id: null,
                        jobcontract_id: null
                    },
                    entity, entityLen, i;

                for (entity in contract) {

                    if (!angular.isArray(contract[entity])) {
                        angular.extend(contract[entity],params);
                        continue;
                    } else {
                        i = 0, entityLen = contract[entity].length;
                        for (i; i < entityLen; i++) {
                            angular.extend(contract[entity][i],params);
                        }
                    }

                }

                console.log($scope.contract);
/*
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
                    results.requireReload = contract.details.period_end_date !== results.details.period_end_date;
                    $modalInstance.close(results);
                });
*/
            };

        }]);
});