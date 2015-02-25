define(['controllers/controllers',
        'services/contractDetails',
        'services/contractHour',
        'services/contractPay',
        'services/contractLeave',
        'services/contractPension',
        'services/contractHealth',
        'services/utils',], function(controllers){
    controllers.controller('ContractCtrl',['$scope', '$route', '$filter', '$modal', '$rootElement', '$q', 'settings',
        'API', 'ContractDetailsService', 'ContractHourService', 'ContractPayService', 'ContractLeaveService',
        'ContractHealthService', 'ContractPensionService','ContractFilesService','$log',
        function($scope, $route, $filter, $modal, $rootElement, $q, settings, API, ContractDetailsService,
                 ContractHourService, ContractPayService, ContractLeaveService, ContractHealthService,
                 ContractPensionService, ContractFilesService, $log){
            $log.debug('Controller: ContractCtrl');

            var contractId = $scope.contract.id, promiseFiles;

            $scope.contractLoaded = false;
            $scope.isCollapsed = true;
            $scope.revisionCurrent = {};
            $scope.revisionList = [];
            $scope.revisionDataList = [];

            angular.extend($scope, angular.copy($scope.model));

            function updateContractView(newScope){
                var contractRevisionIdObj = {
                    id: null,
                    jobcontract_id: contractId,
                    jobcontract_revision_id: newScope.details.jobcontract_revision_id
                };

                angular.extend($scope.details, newScope.details);
                angular.extend($scope.hour, newScope.hour || contractRevisionIdObj);
                angular.extend($scope.pay, newScope.pay || contractRevisionIdObj);
                angular.extend($scope.health, newScope.health || contractRevisionIdObj);
                angular.extend($scope.pension, newScope.pension || contractRevisionIdObj);

                angular.forEach($scope.leave, function(leaveType, leaveTypeId){
                    angular.extend(leaveType, newScope.leave ? newScope.leave[leaveTypeId] || contractRevisionIdObj : contractRevisionIdObj);
                });
            }

            $q.all({
                details: ContractDetailsService.getOne({ jobcontract_id: contractId}),
                hour: ContractHourService.getOne({ jobcontract_id: contractId}),
                pay: ContractPayService.getOne({ jobcontract_id: contractId}),
                leave: ContractLeaveService.get({ jobcontract_id: contractId}),
                health: ContractHealthService.getOne({ jobcontract_id: contractId}),
                pension: ContractPensionService.getOne({ jobcontract_id: contractId})
            }).then(function(results){

                updateContractView(results);

                $scope.contractLoaded = true;

                $scope.$watch('contract.is_primary',function(){
                    $scope.isCollapsed = !+$scope.contract.is_primary;
                });

                $scope.$broadcast('hrjc-loader-hide');

            }).then(function(){
                promiseFiles = $q.all({
                    details: ContractFilesService.get($scope.details.jobcontract_revision_id,'civicrm_hrjobcontract_details'),
                    pension: ContractFilesService.get($scope.pension.jobcontract_revision_id,'civicrm_hrjobcontract_pension')
                });
            });

            $scope.modalContract = function(action, revisionEntityIdObj){
                $scope.$broadcast('hrjc-loader-show');

                var modalInstance,
                    options = {
                        controller: 'ModalContractCtrl',
                        targetDomEl: $rootElement.find('div').eq(0),
                        templateUrl: settings.pathApp+'views/modalForm.html?v=ergreg',
                        size: 'lg',
                        resolve: {
                            action: function(){
                                return action || 'view'
                            },
                            content: function(){
                                return null;
                            },
                            contract: function(){

                                if (!revisionEntityIdObj) {
                                    return {
                                        id: contractId,
                                        details: $scope.details,
                                        hour: $scope.hour,
                                        pay: $scope.pay,
                                        leave: $scope.leave,
                                        health: $scope.health,
                                        pension: $scope.pension
                                    }
                                }

                                return $q.all({
                                    details: ContractDetailsService.getOne({ jobcontract_revision_id: revisionEntityIdObj.details_revision_id }),
                                    hour: ContractHourService.getOne({ jobcontract_revision_id: revisionEntityIdObj.hour_revision_id }),
                                    pay: ContractPayService.getOne({ jobcontract_revision_id: revisionEntityIdObj.pay_revision_id }),
                                    leave: ContractLeaveService.get({ jobcontract_revision_id: revisionEntityIdObj.leave_revision_id }),
                                    health: ContractHealthService.getOne({ jobcontract_revision_id: revisionEntityIdObj.health_revision_id }),
                                    pension: ContractPensionService.getOne({ jobcontract_revision_id: revisionEntityIdObj.pension_revision_id })
                                }).then(function(results){

                                    var contract = {},
                                        contractRevisionIdObj = {
                                            id: null,
                                            jobcontract_id: contractId,
                                            jobcontract_revision_id: results.details.jobcontract_revision_id
                                        };

                                    angular.extend(contract, angular.copy($scope.model));
                                    angular.extend(contract.details, results.details);
                                    angular.extend(contract.hour, results.hour || contractRevisionIdObj);
                                    angular.extend(contract.pay, results.pay || contractRevisionIdObj);
                                    angular.forEach(contract.leave, function(leaveType, leaveTypeId){
                                        angular.extend(leaveType, results.leave ? results.leave[leaveTypeId] || contractRevisionIdObj : contractRevisionIdObj);
                                    });
                                    angular.extend(contract.health, results.health || contractRevisionIdObj);
                                    angular.extend(contract.pension, results.pension || contractRevisionIdObj);

                                    return contract;
                                });
                            },
                            files: function(){

                                if (!revisionEntityIdObj) {
                                    return promiseFiles;
                                }

                                return $q.all({
                                    details: ContractFilesService.get(revisionEntityIdObj.details_revision_id,'civicrm_hrjobcontract_details'),
                                    pension: ContractFilesService.get(revisionEntityIdObj.pension_revision_id,'civicrm_hrjobcontract_pension')
                                })

                            },
                            utils: function(){
                                return $scope.utils
                            }
                        }
                    };

                switch(action){
                    case 'edit':
                        options.resolve.content = function(){
                            return {
                                allowSave: true,
                                isDisabled: false,
                                copy: {
                                    close: 'Cancel',
                                    save: 'Save without making a new revision',
                                    title: 'Edit contract'
                                }
                            }
                        };
                        break;
                    case 'change':
                        options.resolve.content = function(){
                            return {
                                allowSave: true,
                                isDisabled: false,
                                copy: {
                                    close: 'Cancel',
                                    save: 'Save and make a new revision',
                                    title: 'Change contract terms'
                                }
                            }
                        };
                        break;
                }

                modalInstance = $modal.open(options);

                modalInstance.result.then(function(results){

                    if (results.requireReload) {
                        $route.reload();
                    }

                    if (results.revisionCreated) {
                        var dateEffectiveRevisionCreated = new Date(results.revisionCreated.effective_date).setHours(0, 0, 0, 0),
                            dateEffectiveRevisionCurrent = new Date($scope.revisionCurrent.effective_date).setHours(0, 0, 0, 0),
                            dateToday = new Date().setHours(0, 0, 0, 0);

                        if ((dateEffectiveRevisionCreated <= dateToday &&
                            dateEffectiveRevisionCreated >= dateEffectiveRevisionCurrent) ||
                            (dateEffectiveRevisionCurrent > dateToday &&
                            dateEffectiveRevisionCreated <= dateEffectiveRevisionCurrent)) {
                            updateContractView(results);
                        }

                        $scope.revisionList.unshift(results.revisionCreated);
                        $scope.revisionDataList.unshift({
                            revisionEntityIdObj: results.revisionCreated,
                            details: results.details,
                            hour: results.hour,
                            pay: results.pay
                        });
                    } else {
                        updateContractView(results);
                        angular.forEach($scope.revisionDataList, function(revisionData){
                            if (revisionData.revisionEntityIdObj.id == $scope.revisionCurrent.id) {
                                angular.extend(revisionData, {
                                    details: results.details,
                                    hour: results.hour,
                                    pay: results.pay
                                });
                            }
                        })
                    }

                    if (results.isPrimarySet) {
                        $scope.$parent.$parent.toggleIsPrimary(contractId, !!results.revisionCreated);
                    }

                    if (results.files) {
                        promiseFiles = $q.all({
                            details: ContractFilesService.get($scope.details.jobcontract_revision_id,'civicrm_hrjobcontract_details'),
                            pension: ContractFilesService.get($scope.pension.jobcontract_revision_id,'civicrm_hrjobcontract_pension')
                        });
                    }

                });
            };

            $scope.modalRevision = function(entity){
                $scope.$broadcast('hrjc-loader-show');
                if (!entity) {
                    return null;
                }

                var promiseEntityRevisionDataList = [],
                    apiMethod = entity != 'leave' ? 'getOne' : 'get',
                    i = 0, len = $scope.revisionList.length;

                for (i; i < len; i++){
                    promiseEntityRevisionDataList.push(API[apiMethod]('HRJob'+$filter('capitalize')(entity),{
                        jobcontract_revision_id: $scope.revisionList[i][entity+'_revision_id']
                    }));
                }

                var options = {
                    targetDomEl: $rootElement.find('div').eq(0),
                    size: 'lg',
                    controller: 'ModalRevisionCtrl',
                    templateUrl: settings.pathApp+'views/modalRevision.html?v=wfrwe',
                    windowClass: 'modal-revision',
                    resolve: {
                        entity: function(){
                            return entity;
                        },
                        fields: function(){
                            return $scope.$parent.$parent.fields[entity];
                        },
                        model: function(){
                            return $scope.model[entity];
                        },
                        utils: function(){
                            return $scope.utils
                        },
                        revisionDataList: function(){
                            return $q.all(promiseEntityRevisionDataList);
                        },
                        revisionList: function(){
                            return $scope.revisionList
                        },
                        modalContract: function(){
                            return $scope.modalContract;
                        }
                    }
                };
                return $modal.open(options);
            }

            $scope.$on('unsetIsPrimary',function(e, excludeContractId){
                if (contractId == excludeContractId) {
                    $scope.details.is_primary = 0;
                }
            });

            $scope.$on('updateContractView',function(){
                $scope.$broadcast('hrjc-loader-show');
                $q.all({
                    details: ContractDetailsService.getOne({ jobcontract_revision_id: $scope.revisionCurrent.details_revision_id }),
                    hour: ContractHourService.getOne({ jobcontract_revision_id: $scope.revisionCurrent.hour_revision_id }),
                    pay: ContractPayService.getOne({ jobcontract_revision_id: $scope.revisionCurrent.pay_revision_id }),
                    leave: ContractLeaveService.get({ jobcontract_revision_id: $scope.revisionCurrent.leave_revision_id }),
                    health: ContractHealthService.getOne({ jobcontract_revision_id: $scope.revisionCurrent.health_revision_id }),
                    pension: ContractPensionService.getOne({ jobcontract_revision_id: $scope.revisionCurrent.pension_revision_id })
                }).then(function(results){
                    updateContractView(results)
                    $scope.$broadcast('hrjc-loader-hide');
                });
            });

        }]);
});