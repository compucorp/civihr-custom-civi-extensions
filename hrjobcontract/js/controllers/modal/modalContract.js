console.log('Controller: ModalContractCtrl');
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

    controllers.controller('ModalContractCtrl',['$scope','$modal', '$modalInstance','$q', '$rootElement','$filter',
        'ContractService', 'ContractDetailsService', 'ContractHoursService', 'ContractPayService', 'ContractLeaveService',
        'ContractInsuranceService', 'ContractPensionService', 'ContractFilesService', 'action', 'contract',
        'content', 'files', 'UtilsService', 'utils', 'settings',
        function($scope, $modal, $modalInstance, $q, $rootElement, $filter, ContractService, ContractDetailsService,
                 ContractHoursService, ContractPayService, ContractLeaveService, ContractInsuranceService,
                 ContractPensionService, ContractFilesService, action, contract, content, files,
                 UtilsService, utils, settings){

            var content = content || {},
                action = action || 'view';

            $scope.allowSave = typeof content.allowSave !== 'undefined' ? content.allowSave : false;
            $scope.contract = {};
            $scope.files = {};
            $scope.filesTrash = {};
            $scope.isDisabled = typeof content.isDisabled !== 'undefined' ? content.isDisabled : true;
            $scope.isPrimaryDisabled = +contract.details.is_primary;
            $scope.showIsPrimary = utils.contractListLen > 1;
            $scope.title = typeof content.title !== 'undefined' ? content.title : 'Contract';
            $scope.uploader.details.contract_file = ContractFilesService.uploader('civicrm_hrjobcontract_details');
            $scope.uploader.pension.evidence_file = ContractFilesService.uploader('civicrm_hrjobcontract_pension',1)
            $scope.utils = utils;

            angular.copy(contract,$scope.contract);
            angular.copy(files,$scope.files);

            angular.forEach($scope.files, function(entityFiles, entityName){
                $scope.filesTrash[entityName] = [];
            })

            $scope.cancel = function () {

                if (action == 'view' ||
                    (angular.equals(contract,$scope.contract) && angular.equals(files,$scope.files) &&
                    !$scope.uploader.details.contract_file.queue.length && !$scope.uploader.pension.evidence_file.queue.length)) {
                    $modalInstance.dismiss('cancel');
                    return;
                }

                //DEBUG
                angular.forEach(contract, function(entity, entityName){
                    if (!angular.equals(entity,$scope.contract[entityName])) {
                        console.log('======================');
                        console.info('Changed entity: '+entityName);
                        console.log('Before:');
                        console.log(entity);
                        console.log('After:');
                        console.log($scope.contract[entityName]);
                    }

                });

                var modalInstance = $modal.open({
                    targetDomEl: $rootElement.find('div').eq(0),
                    templateUrl: settings.pathApp+'views/modalDialog.html?v='+(new Date()).getTime(),
                    size: 'sm',
                    controller: 'ModalDialogCtrl',
                    resolve: {
                        content: function(){
                            return {
                                copyCancel: 'No',
                                title: 'Alert',
                                msg: 'Are you sure you want to cancel? Changes will be lost!'
                            };
                        }
                    }
                });

                modalInstance.result.then(function(confirm){
                    if (confirm) {
                        $modalInstance.dismiss('cancel');
                    }
                });
            };

            $scope.fileMoveToTrash = function(index, entityName) {
                var entityFiles = $scope.files[entityName],
                    entityFilesTrash = $scope.filesTrash[entityName];

                entityFilesTrash.push(entityFiles[index]);
                entityFiles.splice(index, 1);
            }

            if ($scope.allowSave) {
                function changeReason(){
                    var modalChangeReason = $modal.open({
                        targetDomEl: $rootElement.find('div').eq(0),
                        templateUrl: settings.pathApp+'views/modalChangeReason.html?v='+(new Date()).getTime(),
                        controller: 'ModalChangeReasonCtrl',
                        resolve: {}
                    });

                    return modalChangeReason.result;
                }

                function confirmEdit() {
                    var modalConfirmEdit = $modal.open({
                        targetDomEl: $rootElement.find('div').eq(0),
                        templateUrl: settings.pathApp+'views/modalConfirmEdit.html?v='+(new Date()).getTime(),
                        controller: 'ModalDialogCtrl',
                        resolve: {
                            content: function(){
                                return {
                                    msg: 'Save without making a new revision?'
                                }
                            }
                        }
                    });

                    return modalConfirmEdit.result;
                }

                function contractEdit(){

                    var promiseContractEdit = {
                            details: ContractDetailsService.save($scope.contract.details),
                            hours: ContractHoursService.save($scope.contract.hours),
                            pay: ContractPayService.save($scope.contract.pay),
                            leave: ContractLeaveService.save($scope.contract.leave),
                            insurance: ContractInsuranceService.save($scope.contract.insurance),
                            pension: ContractPensionService.save($scope.contract.pension)
                        },
                        promiseFilesEdit = [];

                    if ($scope.uploader.details.contract_file.queue.length) {
                        promiseFilesEdit.push(ContractFilesService.upload($scope.uploader.details.contract_file, $scope.contract.details.jobcontract_revision_id));
                    }

                    if ($scope.uploader.pension.evidence_file.queue.length) {
                        promiseFilesEdit.push(ContractFilesService.upload($scope.uploader.pension.evidence_file, $scope.contract.pension.jobcontract_revision_id));
                    }

                    angular.forEach($scope.filesTrash, function(entityFilesTrash){
                        angular.forEach(entityFilesTrash, function(file){
                            promiseFilesEdit.push(ContractFilesService.delete(file.fileID, file.entityID, file.entityTable));
                        });
                    });

                    if (promiseFilesEdit.length) {
                        promiseContractEdit.files = $q.all(promiseFilesEdit);
                    }

                    $q.all(promiseContractEdit).then(function(results){

                        //TODO (incorrect date format in the API response)
                        results.details.period_start_date = $scope.contract.details.period_start_date;
                        results.details.period_end_date = $scope.contract.details.period_end_date;
                        //

                        //TODO (incorrect JSON format in the API response)
                        results.pay.annual_benefits = $scope.contract.pay.annual_benefits;
                        results.pay.annual_deductions = $scope.contract.pay.annual_deductions;

                        results.isPrimarySet = results.details.is_primary != contract.details.is_primary && +results.details.is_primary,
                        results.requireReload = contract.details.period_end_date ? contract.details.period_end_date !== results.details.period_end_date : !!contract.details.period_end_date !== !!results.details.period_end_date;

                        $modalInstance.close(results);
                    },function(reason){
                        CRM.alert(reason, 'Error', 'error');
                        $modalInstance.dismiss();
                    });
                }

                function contractChange(reasonId, date){

                    var contractNew = $scope.contract,
                        filesNew = $scope.files,
                        filesTrash = $scope.filesTrash,
                        uploader = $scope.uploader,
                        entityName, fieldName, entityChangedList = [], entityChangedListLen = 0, filesChangedList = [],
                        filesChangedListLen = 0, i = 0, isChanged, promiseContractChange = {}, promiseFilesChange = [],
                        revisionId, entityServices = {
                            details: ContractDetailsService,
                            hours: ContractHoursService,
                            pay: ContractPayService,
                            leave: ContractLeaveService,
                            insurance: ContractInsuranceService,
                            pension: ContractPensionService
                        }

                    //angular.equals(files,$scope.files) &&
                    //!$scope.uploaderContractFile.queue.length &&
                    //!$scope.uploaderEvidenceFile.queue.length)

                    for (entityName in contractNew) {
                        isChanged = !angular.equals(contract[entityName], contractNew[entityName]);

                        if (!isChanged) {

                            isChanged = filesTrash[entityName] && filesTrash[entityName].length;

                            if (!isChanged && uploader[entityName]) {
                                angular.forEach(uploader[entityName], function(field){
                                    if (field.queue.length) {
                                        isChanged = true;
                                        break;
                                    }
                                });
                            }

                        }

                        if (isChanged) {
                            entityChangedList[i] = {};
                            entityChangedList[i].name = entityName;
                            entityChangedList[i].data = contractNew[entityName];
                            entityChangedList[i].service = entityServices[entityName];
                            i++
                            entityChangedListLen = i;
                        }
                    }

                    UtilsService.prepareEntityIds(entityChangedList[0].data,contract.id);

                    entityChangedList[0].service.save(entityChangedList[0].data).then(function(results){
                        revisionId = !angular.isArray(results) ? results.jobcontract_revision_id : results[0].jobcontract_revision_id,
                        i = 1;

                        promiseContractChange[entityChangedList[0].name] = results;

                        for (i; i < entityChangedListLen; i++) {

                            entityName = filesTrash[entityChangedList[i].name];

                            UtilsService.prepareEntityIds(entityChangedList[i].data,contract.id,revisionId);
                            promiseContractChange[entityName] = entityChangedList[i].service.save(entityChangedList[i].data);

                            if (uploader[entityName]) {
                                angular.forEach(uploader[entityName], function(field){
                                    if (field.queue.length) {
                                        promiseFilesChange.push(ContractFilesService.upload(field, revisionId));
                                    }
                                });
                            }

                            if (filesTrash[entityName] && filesTrash[entityName].length) {
                                angular.forEach(filesTrash[entityName], function(file) {
                                    promiseFilesChange.push(ContractFilesService.delete(file.fileID, revisionId, file.entityTable));
                                });
                            }

                        }

                        if (promiseFilesChange.length) {
                            promiseContractChange.files = $q.all(promiseFilesChange);
                        }

                        return $q.all(angular.extend(promiseContractChange,{
                            revisionCreated: ContractService.saveRevision({
                                id: revisionId,
                                change_reason: reasonId,
                                effective_date: date
                            })
                        }));

                    }).then(function(results){

                        for (entityName in contractNew) {
                            results[entityName] = results[entityName] || contractNew[entityName];
                        }

                        //TODO (incorrect date format in the API response)
                        results.details.period_start_date = contractNew.details.period_start_date;
                        results.details.period_end_date = contractNew.details.period_end_date;
                        results.revisionCreated.effective_date = date;
                        //

                        //TODO (incorrect JSON format in the API response)
                        results.pay.annual_benefits = contractNew.pay.annual_benefits;
                        results.pay.annual_deductions = contractNew.pay.annual_deductions;

                        results.isPrimarySet = results.details.is_primary != contract.details.is_primary && +results.details.is_primary;
                        results.requireReload = contract.details.period_end_date ? contract.details.period_end_date !== results.details.period_end_date : !!contract.details.period_end_date !== !!results.details.period_end_date;
                        angular.extend(results.revisionCreated, {
                            details_revision_id: results.details.jobcontract_revision_id,
                            health_revision_id: results.insurance.jobcontract_revision_id,
                            hour_revision_id: results.hours.jobcontract_revision_id,
                            jobcontract_id: contractNew.id,
                            leave_revision_id: results.leave[0].jobcontract_revision_id,
                            pay_revision_id: results.pay.jobcontract_revision_id,
                            pension_revision_id: results.pension.jobcontract_revision_id
                        });

                        $modalInstance.close(results);

                    });

                }

                $scope.save = function () {

                    if (angular.equals(contract,$scope.contract) &&
                        angular.equals(files,$scope.files) &&
                        !$scope.uploader.details.contract_file.queue.length &&
                        !$scope.uploader.pension.evidence_file.queue.length) {
                        $modalInstance.dismiss('cancel');
                        return;
                    }

                    switch (action){
                        case 'edit':
                            confirmEdit().then(function(confirmed){
                                switch (confirmed) {
                                    case 'edit':
                                        contractEdit();
                                        break;
                                    case 'change':
                                        changeReason().then(function(results){
                                            contractChange(results.reasonId, results.date);
                                        });
                                        break;

                                }
                            });

                            break;
                        case 'change':
                            changeReason().then(function(results){
                                contractChange(results.reasonId, results.date);
                            });

                            break;
                        default:
                            $modalInstance.dismiss('cancel');
                            return;
                    }
                }
            }

        }]);
});