console.log('Controller: ModalContractNewCtrl');
define(['controllers/controllers',
        'services/contract',
        'services/contractDetails',
        'services/contractHours',
        'services/contractPay',
        'services/contractLeave',
        'services/contractInsurance',
        'services/contractPension',
        'services/utils'], function(controllers){

    controllers.controller('ModalContractNewCtrl', ['$scope', '$modalInstance', '$q', 'Contract','ContractService',
        'ContractDetailsService', 'ContractHoursService', 'ContractPayService', 'ContractLeaveService',
        'ContractInsuranceService', 'ContractPensionService', 'model', 'UtilsService', 'utils', 'settings',
        function($scope, $modalInstance, $q, Contract, ContractService, ContractDetailsService, ContractHoursService,
                 ContractPayService, ContractLeaveService, ContractInsuranceService, ContractPensionService,
                 model, UtilsService, utils, settings){

            $scope.allowSave = true;
            $scope.contract = {};
            $scope.isDisabled = false;
            $scope.showIsPrimary = utils.contractListLen;
            $scope.title = 'Add New Job Contract';
            $scope.utils = utils;

            angular.copy(model,$scope.contract);

            $scope.contract.leave = ContractLeaveService.model($scope.utils.absenceType);


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
                        contractPay = $scope.contract.pay,
                        contractLeave = $scope.contract.leave,
                        contractInsurance = $scope.contract.insurance,
                        contractPension = $scope.contract.pension;

                    contract.is_current = !contractDetails.period_end_date || new Date(contractDetails.period_end_date) > new Date();

                    UtilsService.prepareEntityIds(contractDetails, contractId);

                    ContractDetailsService.save(contractDetails).then(function(results){
                        return results.jobcontract_revision_id;
                    },function(reason){
                        alert(reason);
                        ContractService.delete(contractId);
                        $modalInstance.dismiss();
                        return $q.reject();
                    }).then(function(revisionId){

                        angular.forEach($scope.contract, function(entity){
                            UtilsService.prepareEntityIds(entity, contractId, revisionId);
                        });

                        return $q.all([
                            ContractHoursService.save(contractHours),
                            ContractPayService.save(contractPay),
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