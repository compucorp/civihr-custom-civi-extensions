console.log('Controller: ModalContractNewCtrl');
define(['controllers/controllers',
        'services/contract',
        'services/contractDetails',
        'services/contractHours',
        'services/contractPay',
        'services/contractLeave',
        'services/contractInsurance',
        'services/contractPension',
        'services/contractFiles',
        'services/utils'], function(controllers){

    controllers.controller('ModalContractNewCtrl', ['$scope', '$modalInstance', '$q', 'Contract','ContractService',
        'ContractDetailsService', 'ContractHoursService', 'ContractPayService', 'ContractLeaveService',
        'ContractInsuranceService', 'ContractPensionService', 'ContractFilesService', 'model', 'UtilsService', 'utils',
        'settings',
        function($scope, $modalInstance, $q, Contract, ContractService, ContractDetailsService, ContractHoursService,
                 ContractPayService, ContractLeaveService, ContractInsuranceService, ContractPensionService,
                 ContractFilesService, model, UtilsService, utils, settings){

            $scope.allowSave = true;
            $scope.contract = {};
            $scope.isDisabled = false;
            $scope.showIsPrimary = utils.contractListLen;
            $scope.title = 'Add New Job Contract';
            $scope.uploaderContractFile = ContractFilesService.uploader('civicrm_hrjobcontract_details');
            $scope.uploaderEvidenceFile = ContractFilesService.uploader('civicrm_hrjobcontract_pension',1);
            $scope.utils = utils;

            console.log($scope.uploaderContractFile);

            angular.copy(model,$scope.contract);

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
                        contractPension = $scope.contract.pension,
                        promiseContractNew = [];

                    contract.is_current = !contractDetails.period_end_date || new Date(contractDetails.period_end_date) > new Date();

                    UtilsService.prepareEntityIds(contractDetails, contractId);

                    ContractDetailsService.save(contractDetails).then(function(results){
                        contract.is_primary = results.is_primary;
                        return results.jobcontract_revision_id;
                    },function(reason){
                        CRM.alert(reason, 'Error', 'error');
                        ContractService.delete(contractId);
                        $modalInstance.dismiss();
                        return $q.reject();
                    }).then(function(revisionId){

                        angular.forEach($scope.contract, function(entity){
                            UtilsService.prepareEntityIds(entity, contractId, revisionId);
                        });

                        promiseContractNew = [
                            ContractHoursService.save(contractHours),
                            ContractPayService.save(contractPay),
                            ContractLeaveService.save(contractLeave),
                            ContractInsuranceService.save(contractInsurance),
                            ContractPensionService.save(contractPension)
                        ];

                        if ($scope.uploaderContractFile.queue.length) {
                            promiseContractNew.push(ContractFilesService.upload($scope.uploaderContractFile, revisionId));
                        }

                        if ($scope.uploaderEvidenceFile.queue.length) {
                            promiseContractNew.push(ContractFilesService.upload($scope.uploaderEvidenceFile, revisionId));
                        }

                        return $q.all(promiseContractNew);
                    }).then(function(){
                        $modalInstance.close(contract);
                    },function(reason){
                        CRM.alert(reason, 'Error', 'error');
                        $modalInstance.dismiss();
                        return $q.reject();
                    });

                });
            };

        }]);
});