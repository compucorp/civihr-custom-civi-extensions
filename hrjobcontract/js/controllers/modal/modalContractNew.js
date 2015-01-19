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
        'ContractInsuranceService', 'ContractPensionService', 'FileUploader', 'model', 'UtilsService', 'utils', 'settings',
        function($scope, $modalInstance, $q, Contract, ContractService, ContractDetailsService, ContractHoursService,
                 ContractPayService, ContractLeaveService, ContractInsuranceService, ContractPensionService, FileUploader,
                 model, UtilsService, utils, settings){

            $scope.allowSave = true;
            $scope.contract = {};
            $scope.isDisabled = false;
            $scope.showIsPrimary = utils.contractListLen;
            $scope.title = 'Add New Job Contract';
            $scope.utils = utils;

            angular.copy(model,$scope.contract);

            $scope.contract.leave = ContractLeaveService.model($scope.utils.absenceType);

            $scope.uploaderContractFile = new FileUploader({
                url: settings.pathFile,
                formData: [
                    {
                        entityTable: 'civicrm_hrjobcontract_details'
                    }
                ]
            });

            $scope.uploaderEvidenceFile = new FileUploader({
                url: settings.pathFile,
                formData: [
                    {
                        entityTable: 'civicrm_hrjobcontract_pension'
                    }
                ],
                queueLimit: 1
            });

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
                        var defferedUploadContractFile, defferedUploadEvidenceFile;

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
                            defferedUploadContractFile = $q.defer();

                            $scope.uploaderContractFile.onBeforeUploadItem = function(item){
                                item.formData.push({
                                    entityID: revisionId
                                });
                            };

                            $scope.uploaderContractFile.onErrorItem = function(item, response, status, headers){
                                defferedUploadContractFile.reject('Could not upload file: '+item.file.name);
                                console.error(' ===== Item Error: ' + status + ' ======');
                                console.error(' =====  - item ======');
                                console.error(item);
                                console.error(' =====  - response ======');
                                console.error(response);
                                console.error(' =====  - headers ======');
                                console.error(headers);
                            };

                            $scope.uploaderContractFile.onCompleteItem = function(item, response, status, headers){
                                console.info(' ===== Item Complete: ' + status + ' ======');
                                console.info(' =====  - item ======');
                                console.info(item);
                                console.info(' =====  - response ======');
                                console.info(response);
                                console.info(' =====  - headers ======');
                                console.info(headers);
                            };

                            $scope.uploaderContractFile.onCompleteAll = function(){
                                defferedUploadContractFile.resolve(true);
                            };

                            promiseContractNew.push(defferedUploadContractFile.promise);

                            $scope.uploaderContractFile.uploadAll();
                        }

                        if ($scope.uploaderEvidenceFile.queue.length) {
                            defferedUploadEvidenceFile = $q.defer();

                            $scope.uploaderEvidenceFile.onBeforeUploadItem = function(item){
                                item.formData.push({
                                    entityID: revisionId
                                });
                            };

                            $scope.uploaderEvidenceFile.onErrorItem = function(item, response, status, headers){
                                defferedUploadEvidenceFile.reject('Could not upload file: '+item.file.name);
                                console.error(' ===== Item Error: ' + status + ' ======');
                                console.error(' =====  - item ======');
                                console.error(item);
                                console.error(' =====  - response ======');
                                console.error(response);
                                console.error(' =====  - headers ======');
                                console.error(headers);
                            };

                            $scope.uploaderEvidenceFile.onCompleteItem = function(item, response, status, headers){
                                console.info(' ===== Item Complete: ' + status + ' ======');
                                console.info(' =====  - item ======');
                                console.info(item);
                                console.info(' =====  - response ======');
                                console.info(response);
                                console.info(' =====  - headers ======');
                                console.info(headers);
                            };

                            $scope.uploaderEvidenceFile.onCompleteAll = function(){
                                defferedUploadEvidenceFile.resolve(true);
                            };

                            promiseContractNew.push(defferedUploadEvidenceFile.promise);

                            $scope.uploaderEvidenceFile.uploadAll();
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