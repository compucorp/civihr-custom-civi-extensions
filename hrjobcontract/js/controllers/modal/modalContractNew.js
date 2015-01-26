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
            $scope.uploader = {
                details: {
                    contract_file: ContractFilesService.uploader('civicrm_hrjobcontract_details')
                },
                pension: {
                    evidence_file: ContractFilesService.uploader('civicrm_hrjobcontract_pension',1)
                }
            };
            $scope.utils = utils;

            angular.copy(model,$scope.contract);

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

            $scope.save = function () {
                $scope.$broadcast('hrjc-loader-show');
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
                        promiseUpload = [],
                        revisionId;

                    contract.is_current = !contractDetails.period_end_date || new Date(contractDetails.period_end_date) > new Date();

                    UtilsService.prepareEntityIds(contractDetails, contractId);

                    ContractDetailsService.save(contractDetails).then(function(results){
                        contract.is_primary = results.is_primary;
                        revisionId = results.jobcontract_revision_id;
                    },function(reason){
                        CRM.alert(reason, 'Error', 'error');
                        ContractService.delete(contractId);
                        $modalInstance.dismiss();
                        return $q.reject();
                    }).then(function(){

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

                        if ($scope.uploader.details.contract_file.queue.length) {
                            promiseUpload.push(ContractFilesService.upload($scope.uploader.details.contract_file, revisionId));
                        }

                        if ($scope.uploader.pension.evidence_file.queue.length) {
                            promiseUpload.push(ContractFilesService.upload($scope.uploader.pension.evidence_file, revisionId));
                        }

                        return $q.all(promiseUpload);

                    },function(reason){
                        CRM.alert(reason, 'Error', 'error');
                        $modalInstance.dismiss();
                        return $q.reject();
                    }).then(function(){
                        $scope.$broadcast('hrjc-loader-hide');
                        $modalInstance.close(contract);
                    });

                });
            };

        }]);
});