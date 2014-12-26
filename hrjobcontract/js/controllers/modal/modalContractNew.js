console.log('Controller: ModalContractNewCtrl');
define(['controllers/controllers',
        'services/contract',
        'services/contractDetails',
        'services/contractHours',
        'services/contractLeave',
        'services/contractInsurance',
        'services/contractPension'], function(controllers){

    controllers.controller('ModalContractNewCtrl', ['$scope', '$modalInstance', '$q', 'Contract',
        'ContractDetailsService', 'ContractHoursService', 'ContractLeaveService', 'ContractInsuranceService',
        'ContractPensionService', 'utils', 'settings',
        function($scope, $modalInstance, $q, Contract, ContractDetailsService, ContractHoursService,
                 ContractLeaveService, ContractInsuranceService, ContractPensionService, utils, settings){

            $scope.allowSave = true;
            $scope.isDisabled = false;
            $scope.title = 'Add New Job Contract';
            $scope.utils = utils;

            $scope.contract = {
                details: {},
                hours: {},
                leave: ContractLeaveService.model($scope.utils.absenceType),
                insurance: {},
                pension: {}
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

            $scope.save = function () {
                var contract = new Contract();
                contract.$save({
                    action: 'create',
                    json: {
                        sequential: 1,
                        contact_id: settings.contactId
                    }
                },function(data){
                    var contract = data.values[0],
                        contractId = contract.id,
                        contractDetails = $scope.contract.details,
                        contractHours = $scope.contract.hours,
                        contractLeave = $scope.contract.leave,
                        contractInsurance = $scope.contract.insurance,
                        contractPension = $scope.contract.pension;

                    contract.is_current = !contractDetails.period_end_date || new Date(contractDetails.period_end_date) > new Date();

                    contractDetails.jobcontract_id = contractId;
                    contractDetails.is_primary = 0;

                    ContractDetailsService.save(contractDetails).then(function(results){
                        return results.jobcontract_revision_id;
                    }).then(function(revisionId){

                        angular.forEach(contractLeave, function(values){
                            values.jobcontract_id = contractId;
                            values.jobcontract_revision_id = revisionId;
                        });

                        contractHours.jobcontract_id = contractId;
                        contractHours.jobcontract_revision_id = revisionId;

                        contractInsurance.jobcontract_id = contractId;
                        contractInsurance.jobcontract_revision_id = revisionId;

                        contractPension.jobcontract_id = contractId;
                        contractPension.jobcontract_revision_id = revisionId;

                        return $q.all([
                            ContractHoursService.save(contractHours),
                            ContractLeaveService.save(contractLeave),
                            ContractInsuranceService.save(contractInsurance),
                            ContractPensionService.save(contractPension)
                        ]);
                    }).then(function(){
                        $modalInstance.close(contract);
                    });

                });
            };

        }]);
});