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
                    entityName, entityChangedList = [], entityChangedListLen = 0, i = 0, isChanged,
                    promiseEntityService = {}, revisionId, services = {
                        details: ContractDetailsService,
                        hours: ContractHoursService,
                        pay: ContractPayService,
                        leave: ContractLeaveService,
                        insurance: ContractInsuranceService,
                        pension: ContractPensionService
                    }

                function changeParams(obj, contractId, revisionId){

                    function setIds(obj){
                        obj.jobcontract_id = contractId;
                        delete obj.id;
                        revisionId ? obj.jobcontract_revision_id = revisionId : delete obj.jobcontract_revision_id;
                    }

                    if (angular.isArray(obj)) {
                        var i = 0, len = obj.length;
                        for (i; i < len; i++) {
                            setIds(obj[i]);
                        }
                        return
                    }

                    if (angular.isObject(obj)) {
                        setIds(obj);
                        return
                    }

                }

                for (entityName in contractNew) {
                    isChanged = !angular.equals(contract[entityName], contractNew[entityName])

                    if (isChanged) {
                        entityChangedList[i] = {};
                        entityChangedList[i].name = entityName;
                        entityChangedList[i].data = contractNew[entityName];
                        entityChangedList[i].service = services[entityName];
                        i++
                        entityChangedListLen = i;
                    }
                }

                if (!entityChangedListLen) {
                    $modalInstance.dismiss('cancel');
                    return;
                }

                changeParams(entityChangedList[0].data,contract.id);

                entityChangedList[0].service.save(entityChangedList[0].data).then(function(results){
                    revisionId = results.jobcontract_revision_id, i = 1;

                    promiseEntityService[entityChangedList[0].name] = results;

                    for (i; i < entityChangedListLen; i++) {
                        changeParams(entityChangedList[i].data,contract.id,revisionId);
                        promiseEntityService[entityChangedList[i].name] = entityChangedList[i].service.save(entityChangedList[i].data);
                    }

                    return $q.all(promiseEntityService);

                }).then(function(results){

                    for (entityName in contractNew) {
                        results[entityName] = results[entityName] || contractNew[entityName];
                    }

                    //TODO (incorrect date format in the API response)
                    results.details.period_start_date = $scope.contract.details.period_start_date;
                    results.details.period_end_date = $scope.contract.details.period_end_date;
                    //

                    results.requireReload = contract.details.period_end_date ? contract.details.period_end_date !== results.details.period_end_date : !!contract.details.period_end_date !== !!results.details.period_end_date;

                    results.revisionCreated = {
                        details_revision_id: results.details.jobcontract_revision_id,
                        health_revision_id: results.insurance.jobcontract_revision_id,
                        hour_revision_id: results.hours.jobcontract_revision_id,
                        id: revisionId,
                        jobcontract_id: contractNew.id,
                        leave_revision_id: results.leave[0].jobcontract_revision_id,
                        pay_revision_id: results.pay.jobcontract_revision_id,
                        pension_revision_id: results.pension.jobcontract_revision_id
                    };

                    $modalInstance.close(results);

                });

                /*
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

                    console.log(results);

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
                        pension_revision_id: revisionId
                    };

                    $modalInstance.close(results);
                });
                */

            };

        }]);
});