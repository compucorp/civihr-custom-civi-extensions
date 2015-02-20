define(['controllers/controllers',
        'services/contract',
        'services/contractDetails',
        'services/contractHour',
        'services/contractPay',
        'services/contractLeave',
        'services/contractHealth',
        'services/contractPension',
        'services/contractFiles',
        'services/utils'], function(controllers){

    controllers.controller('ModalContractNewCtrl', ['$scope', '$modalInstance', '$q', '$modal', '$rootElement',
        'Contract','ContractService', 'ContractDetailsService', 'ContractHourService', 'ContractPayService', 'ContractLeaveService',
        'ContractHealthService', 'ContractPensionService', 'ContractFilesService', 'model', 'UtilsService', 'utils',
        'settings', '$log',
        function($scope, $modalInstance, $q, $modal, $rootElement, Contract, ContractService, ContractDetailsService, ContractHourService,
                 ContractPayService, ContractLeaveService, ContractHealthService, ContractPensionService,
                 ContractFilesService, model, UtilsService, utils, settings, $log){
            $log.debug('Controller: ModalContractNewCtrl');

            $scope.allowSave = true;
            $scope.copy = {
                close: 'Cancel',
                save: 'Add New Job Contract',
                title: 'Add New Job Contract'
            };
            $scope.contract = {};
            $scope.isDisabled = false;
            $scope.showIsPrimary = utils.contractListLen;
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
                        contractHour = $scope.contract.hour,
                        contractPay = $scope.contract.pay,
                        contractLeave = $scope.contract.leave,
                        contractHealth = $scope.contract.health,
                        contractPension = $scope.contract.pension,
                        modalInstance,
                        promiseContractNew,
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

                        promiseContractNew = [
                            ContractHourService.save(contractHour),
                            ContractPayService.save(contractPay),
                            ContractLeaveService.save(contractLeave),
                            ContractHealthService.save(contractHealth),
                            ContractPensionService.save(contractPension)
                        ];

                        if ($scope.uploader.details.contract_file.queue.length) {
                            promiseUpload.push(ContractFilesService.upload($scope.uploader.details.contract_file, revisionId));
                        }

                        if ($scope.uploader.pension.evidence_file.queue.length) {
                            promiseUpload.push(ContractFilesService.upload($scope.uploader.pension.evidence_file, revisionId));
                        }

                        if (promiseUpload.length) {
                            modalInstance  = $modal.open({
                                targetDomEl: $rootElement.find('div').eq(0),
                                templateUrl: settings.pathApp+'views/modalProgress.html?v='+(new Date()).getTime(),
                                size: 'sm',
                                controller: 'ModalProgressCtrl',
                                resolve: {
                                    uploader: function(){
                                        return $scope.uploader;
                                    },
                                    promiseFilesUpload: function(){
                                        return promiseUpload;
                                    }
                                }
                            });

                            promiseContractNew.push(modalInstance.result);
                        }

                        return $q.all(promiseContractNew);
                    },function(reason){
                        CRM.alert(reason, 'Error', 'error');
                        $modalInstance.dismiss();
                        return $q.reject();
                    }).then(function(){
                        $scope.$broadcast('hrjc-loader-hide');
                        $modalInstance.close(contract);
                    });

                },function(reason){
                    $scope.$broadcast('hrjc-loader-hide');
                    $modalInstance.dismiss();
                    CRM.alert((reason.statusText || 'Unknown error'), 'Error', 'error');
                    return $q.reject();
                });
            };

        }]);
});