console.log('Controller: ModalContractCtrl');
define(['controllers/controllers',
        'services/contractDetails',
        'services/contractHours',
        'services/contractPay',
        'services/contractLeave',
        'services/contractInsurance',
        'services/contractPension'], function(controllers){

    controllers.controller('ModalContractCtrl',['$scope','$modal', '$modalInstance','$q', '$rootElement',
        'ContractDetailsService', 'ContractHoursService', 'ContractPayService', 'ContractLeaveService',
        'ContractInsuranceService', 'ContractPensionService', 'action', 'contract', 'content', 'utils', 'settings',
        function($scope, $modal, $modalInstance, $q, $rootElement, ContractDetailsService, ContractHoursService,
                 ContractPayService, ContractLeaveService, ContractInsuranceService, ContractPensionService, action,
                 contract, content, utils, settings){


            var content = content || {},
                action = action || 'view';

            $scope.allowSave = typeof content.allowSave !== 'undefined' ? content.allowSave : false;
            $scope.contract = {};
            $scope.isDisabled = typeof content.isDisabled !== 'undefined' ? content.isDisabled : true;
            $scope.title = typeof content.title !== 'undefined' ? content.title : 'Contract';
            $scope.utils = utils;

            angular.copy(contract,$scope.contract);

            $scope.cancel = function () {

                if (action == 'view' || angular.equals(contract,$scope.contract)) {
                    $modalInstance.dismiss('cancel');
                    return;
                }

                var modalInstance = $modal.open({
                    targetDomEl: $rootElement.find('div').eq(0),
                    templateUrl: settings.pathApp+'/views/modalDialog.html?v='+(new Date()).getTime(),
                    size: 'sm',
                    controller: 'ModalDialogCtrl',
                    resolve: {
                        content: function(){
                            return {
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

            if ($scope.allowSave) {
                function contractEdit(){
                    $q.all({
                        details: ContractDetailsService.save($scope.contract.details),
                        hours: ContractHoursService.save($scope.contract.hours),
                        pay: ContractPayService.save($scope.contract.pay),
                        leave: ContractLeaveService.save($scope.contract.leave),
                        insurance: ContractInsuranceService.save($scope.contract.insurance),
                        pension: ContractPensionService.save($scope.contract.pension)
                    }).then(function(results){

                        //TODO (incorrect date format in the API response)
                        results.details.period_start_date = $scope.contract.details.period_start_date;
                        results.details.period_end_date = $scope.contract.details.period_end_date;
                        //

                        results.requireReload = contract.details.period_end_date ? contract.details.period_end_date !== results.details.period_end_date : !!contract.details.period_end_date !== !!results.details.period_end_date;

                        $modalInstance.close(results);
                    });
                }

                function contractChange(){
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

                }

                $scope.save = function () {

                    switch (action){
                        case 'edit':
                            contractEdit();
                            break;
                        case 'change':
                            contractChange();
                            break;
                        default:
                            $modalInstance.dismiss('cancel');
                            return;
                    }
                }
            }


        }]);
});