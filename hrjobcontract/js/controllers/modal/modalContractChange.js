console.log('Controller: ModalContractChangeCtrl');
define(['controllers/controllers',
        'services/contractDetails',
        'services/contractHours',
        'services/contractPay',
        'services/contractLeave',
        'services/contractInsurance',
        'services/contractPension'], function(controllers){

    controllers.controller('ModalContractChangeCtrl',['$scope','$modalInstance','$q', 'ContractDetailsService',
        'ContractHoursService', 'ContractPayService', 'ContractLeaveService','ContractInsuranceService',
        'ContractPensionService', 'contract','utils',
        function($scope, $modalInstance, $q, ContractDetailsService, ContractHoursService, ContractPayService,
                 ContractLeaveService, ContractInsuranceService, ContractPensionService, contract, utils){

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

                var contractNew = $scope.contract,
                    entity, entityLen, i, revisionId;

                function changeParams(obj, contractId, revisionId){
                    obj.jobcontract_id = contractId;
                    delete obj.id;
                    revisionId ? obj.jobcontract_revision_id = revisionId : delete obj.jobcontract_revision_id;
                }

                changeParams(contractNew.details,contractNew.id);

                ContractDetailsService.save(contractNew.details).then(function(contractDetails){
                    return contractDetails;
                }).then(function(contractDetails){
                    revisionId = contractDetails.jobcontract_revision_id;

                    for (entity in contractNew) {

                        if (angular.isArray(contractNew[entity])) {
                            i = 0, entityLen = contractNew[entity].length;
                            for (i; i < entityLen; i++) {
                                changeParams(contractNew[entity][i],contractNew.id,revisionId);
                            }
                            continue;
                        }

                        if (angular.isObject(contractNew[entity])) {
                            changeParams(contractNew[entity],contractNew.id,revisionId);
                        }

                    }

                    return $q.all({
                        details: contractDetails,
                        hours: ContractHoursService.save(contractNew.hours),
                        pay: ContractPayService.save(contractNew.pay),
                        leave: ContractLeaveService.save(contractNew.leave),
                        insurance: ContractInsuranceService.save(contractNew.insurance),
                        pension: ContractPensionService.save(contractNew.pension)
                    });

                }).then(function(results){

                    //TODO (incorrect date format in the API response)
                    results.details.period_start_date = $scope.contract.details.period_start_date;
                    results.details.period_end_date = $scope.contract.details.period_end_date;
                    //

                    results.requireReload = contract.details.period_end_date ? contract.details.period_end_date !== results.details.period_end_date : !!contract.details.period_end_date !== !!results.details.period_end_date;
                    results.revisionCreated = {
                        details_revision_id: revisionId,
                        health_revision_id: revisionId,
                        hour_revision_id: revisionId,
                        id: revisionId,
                        jobcontract_id: contractNew.id,
                        leave_revision_id: revisionId,
                        pay_revision_id: revisionId,
                        pension_revision_id: revisionId,
                        status: 0
                    }

                    $modalInstance.close(results);
                });

            };

        }]);
});