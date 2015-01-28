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

    controllers.controller('ModalContractCtrl',['$scope','$modal', '$modalInstance','$q', '$rootElement','$rootScope','$filter',
        'ContractService', 'ContractDetailsService', 'ContractHoursService', 'ContractPayService', 'ContractLeaveService',
        'ContractInsuranceService', 'ContractPensionService', 'ContractFilesService', 'action', 'contract',
        'content', 'files', 'UtilsService', 'utils', 'settings',
        function($scope, $modal, $modalInstance, $q, $rootElement, $rootScope, $filter, ContractService, ContractDetailsService,
                 ContractHoursService, ContractPayService, ContractLeaveService, ContractInsuranceService,
                 ContractPensionService, ContractFilesService, action, contract, content, files,
                 UtilsService, utils, settings){

            var content = content || {},
                copy = content.copy || {},
                action = action || 'view';

                copy.close = copy.close || 'Close',
                copy.save = copy.save || 'Save changes',
                copy.title = copy.title || 'Contract',

            $scope.allowSave = typeof content.allowSave !== 'undefined' ? content.allowSave : false;
            $scope.contract = {};
            $scope.copy = copy;
            $scope.files = {};
            $scope.filesTrash = {};
            $scope.isDisabled = typeof content.isDisabled !== 'undefined' ? content.isDisabled : true;
            $scope.isPrimaryDisabled = +contract.details.is_primary;
            $scope.showIsPrimary = utils.contractListLen > 1;
            $scope.uploader = {
                details: {
                    contract_file: ContractFilesService.uploader('civicrm_hrjobcontract_details')
                },
                pension: {
                    evidence_file: ContractFilesService.uploader('civicrm_hrjobcontract_pension',1)
                }
            };
            $scope.utils = utils;

            angular.copy(contract,$scope.contract);
            angular.copy(files,$scope.files);

            angular.forEach($scope.files, function(entityFiles, entityName){
                $scope.filesTrash[entityName] = [];
            })

            $modalInstance.opened.then(function(){
                $rootScope.$broadcast('hrjc-loader-hide');
            });

            $scope.cancel = function () {

                if (action == 'view' ||
                    (angular.equals(contract,$scope.contract) && angular.equals(files,$scope.files) &&
                    !$scope.uploader.details.contract_file.queue.length && !$scope.uploader.pension.evidence_file.queue.length)) {
                    $scope.$broadcast('hrjc-loader-hide');
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
                        $scope.$broadcast('hrjc-loader-hide');
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
                    $scope.$broadcast('hrjc-loader-show');

                    var contractNew = $scope.contract,
                        filesTrash = $scope.filesTrash,
                        uploader = $scope.uploader,
                        entityName, file, i = 0, len;

                    var promiseContractEdit = {
                            details: ContractDetailsService.save(contractNew.details),
                            hours: ContractHoursService.save(contractNew.hours),
                            pay: ContractPayService.save(contractNew.pay),
                            leave: ContractLeaveService.save(contractNew.leave),
                            insurance: ContractInsuranceService.save(contractNew.insurance),
                            pension: ContractPensionService.save(contractNew.pension)
                        },
                        promiseFilesEdit = [];

                    if (uploader.details.contract_file.queue.length) {
                        promiseFilesEdit.push(ContractFilesService.upload(uploader.details.contract_file, contractNew.details.jobcontract_revision_id));
                    }

                    if (uploader.pension.evidence_file.queue.length) {
                        promiseFilesEdit.push(ContractFilesService.upload(uploader.pension.evidence_file, contractNew.pension.jobcontract_revision_id));
                    }

                    for (entityName in filesTrash) {
                        i = 0, len = filesTrash[entityName].length;
                        for (i; i < len; i++) {
                            file = filesTrash[entityName][i];
                            promiseFilesEdit.push(ContractFilesService.delete(file.fileID, file.entityID, file.entityTable));
                        }
                    }

                    if (promiseFilesEdit.length) {
                        promiseContractEdit.files = $q.all(promiseFilesEdit);
                    }

                    $q.all(promiseContractEdit).then(function(results){

                        //TODO (incorrect date format in the API response)
                        results.details.period_start_date = contractNew.details.period_start_date;
                        results.details.period_end_date = contractNew.details.period_end_date;
                        //

                        //TODO (incorrect JSON format in the API response)
                        results.pay.annual_benefits = contractNew.pay.annual_benefits;
                        results.pay.annual_deductions = contractNew.pay.annual_deductions;


                        results.isPrimarySet = results.details.is_primary != contract.details.is_primary && +results.details.is_primary,
                        results.requireReload = contract.details.period_end_date ? contract.details.period_end_date !== results.details.period_end_date : !!contract.details.period_end_date !== !!results.details.period_end_date;

                        $scope.$broadcast('hrjc-loader-hide');
                        $modalInstance.close(results);
                    },function(reason){
                        $scope.$broadcast('hrjc-loader-hide');
                        CRM.alert(reason, 'Error', 'error');
                        $modalInstance.dismiss();
                    });
                }

                function contractChange(reasonId, date){
                    $scope.$broadcast('hrjc-loader-show');

                    var contractNew = $scope.contract,
                        filesTrash = $scope.filesTrash,
                        uploader = $scope.uploader,
                        entityName, field, fieldName, file, entityChangedList = [], entityChangedListLen = 0,
                        entityFilesTrashLen, i = 0, ii = 0, isChanged, promiseContractChange = {}, promiseFilesChange = [],
                        revisionId, entityServices = {
                            details: ContractDetailsService,
                            hours: ContractHoursService,
                            pay: ContractPayService,
                            leave: ContractLeaveService,
                            insurance: ContractInsuranceService,
                            pension: ContractPensionService
                        }

                    for (entityName in contractNew) {
                        isChanged = !angular.equals(contract[entityName], contractNew[entityName]);

                        if (!isChanged) {

                            isChanged = !!filesTrash[entityName] && !!filesTrash[entityName].length;

                            if (!isChanged && uploader[entityName]) {
                                for (fieldName in uploader[entityName]) {
                                    field = uploader[entityName][fieldName];
                                    if (field.queue.length) {
                                        isChanged = true;
                                        break;
                                    }
                                }
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
                            entityName = entityChangedList[i].name;

                            UtilsService.prepareEntityIds(entityChangedList[i].data,contract.id,revisionId);
                            promiseContractChange[entityName] = entityChangedList[i].service.save(entityChangedList[i].data);

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

                            if (uploader[entityName]) {
                                for (fieldName in uploader[entityName]) {
                                    field = uploader[entityName][fieldName];
                                    if (field.queue.length) {
                                        promiseFilesChange.push(ContractFilesService.upload(field, revisionId));
                                    }
                                }
                            }

                            ii = 0;
                            if (filesTrash[entityName] && filesTrash[entityName].length) {
                                entityFilesTrashLen =  filesTrash[entityName].length;
                                for (ii; ii < entityFilesTrashLen; ii++) {
                                    file = filesTrash[entityName][ii];
                                    promiseFilesChange.push(ContractFilesService.delete(file.fileID, revisionId, file.entityTable));
                                }
                            }

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

                        if (promiseFilesChange.length) {
                            results.files = $q.all(promiseFilesChange);
                        }

                        return $q.all(results);

                    }).then(function(results){
                        $scope.$broadcast('hrjc-loader-hide');
                        $modalInstance.close(results);
                    });

                }

                $scope.save = function () {

                    if (angular.equals(contract,$scope.contract) &&
                        angular.equals(files,$scope.files) &&
                        !$scope.uploader.details.contract_file.queue.length &&
                        !$scope.uploader.pension.evidence_file.queue.length) {
                        $scope.$broadcast('hrjc-loader-hide');
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
                            $scope.$broadcast('hrjc-loader-hide');
                            $modalInstance.dismiss('cancel');
                            return;
                    }
                }
            }

        }]);
});