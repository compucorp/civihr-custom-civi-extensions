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
                    entity, entityLen, i, revisionId;

                function changeParams(obj, contractId, revisionId){
                    obj.jobcontract_id = contractId;
                    delete obj.id;
                    revisionId ? obj.jobcontract_revision_id = revisionId : delete obj.jobcontract_revision_id;
                }

                changeParams(contract.details,contract.id);

                ContractDetailsService.save(contract.details).then(function(contractDetails){
                    return contractDetails;
                }).then(function(contractDetails){
                    revisionId = contractDetails.jobcontract_revision_id;

                    for (entity in contract) {

                        if (angular.isArray(contract[entity])) {
                            i = 0, entityLen = contract[entity].length;
                            for (i; i < entityLen; i++) {
                                changeParams(contract[entity][i],contract.id,revisionId);
                            }
                            continue;
                        }

                        if (angular.isObject(contract[entity])) {
                            changeParams(contract[entity],contract.id,revisionId);
                        }

                    }

                    return $q.all({
                        details: contractDetails,
                        leave: ContractLeaveService.save(contract.leave),
                        insurance: ContractInsuranceService.save(contract.insurance),
                        pension: ContractPensionService.save(contract.pension)
                    });

                }).then(function(results){
                    results.requireReload = contract.details.period_end_date !== results.details.period_end_date;
                    $modalInstance.close(results);
                });

            };

        }]);
});