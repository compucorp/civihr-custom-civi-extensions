console.log('Controller: ContractCtrl');
define(['controllers/controllers',
        'services/contractDetails',
        'services/contractHours',
        'services/contractPay',
        'services/contractLeave',
        'services/contractPension',
        'services/contractInsurance',
        'services/utils',], function(controllers){
    controllers.controller('ContractCtrl',['$scope', '$route', '$filter', '$modal', '$rootElement', '$q', 'settings',
        'API', 'ContractDetailsService', 'ContractHoursService', 'ContractPayService', 'ContractLeaveService',
        'ContractInsuranceService', 'ContractPensionService','ContractFilesService',
        function($scope, $route, $filter, $modal, $rootElement, $q, settings, API, ContractDetailsService,
                 ContractHoursService, ContractPayService, ContractLeaveService, ContractInsuranceService,
                 ContractPensionService, ContractFilesService){

            var contractId = $scope.contract.id, contractRevisionIdObj, promiseFiles;

            $scope.contractLoaded = false;
            $scope.isCollapsed = true;
            $scope.revisionList = [];
            $scope.revisionDataList = [];

            angular.extend($scope, angular.copy($scope.model));

            $q.all({
                details: ContractDetailsService.getOne({ jobcontract_id: contractId}),
                hours: ContractHoursService.getOne({ jobcontract_id: contractId}),
                pay: ContractPayService.getOne({ jobcontract_id: contractId}),
                leave: ContractLeaveService.get({ jobcontract_id: contractId}),
                insurance: ContractInsuranceService.getOne({ jobcontract_id: contractId}),
                pension: ContractPensionService.getOne({ jobcontract_id: contractId})
            }).then(function(results){

                contractRevisionIdObj = {
                    id: null,
                    jobcontract_id: contractId,
                    jobcontract_revision_id: results.details.jobcontract_revision_id
                };

                angular.extend($scope.details, results.details);
                angular.extend($scope.hours, results.hours || contractRevisionIdObj);
                angular.extend($scope.pay, results.pay || contractRevisionIdObj);

                angular.forEach($scope.leave, function(leaveType, leaveTypeId){
                    angular.extend(leaveType, results.leave ? results.leave[leaveTypeId] || contractRevisionIdObj : contractRevisionIdObj);
                });


                angular.extend($scope.insurance, results.insurance || contractRevisionIdObj);
                angular.extend($scope.pension, results.pension || contractRevisionIdObj);

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
                        templateUrl: settings.pathApp+'views/modalForm.html?v='+(new Date()).getTime(),
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
                                        hours: $scope.hours,
                                        pay: $scope.pay,
                                        leave: $scope.leave,
                                        insurance: $scope.insurance,
                                        pension: $scope.pension
                                    }
                                }

                                return $q.all({
                                    details: ContractDetailsService.getOne({ jobcontract_revision_id: revisionEntityIdObj.details_revision_id }),
                                    hours: ContractHoursService.getOne({ jobcontract_revision_id: revisionEntityIdObj.hour_revision_id }),
                                    pay: ContractPayService.getOne({ jobcontract_revision_id: revisionEntityIdObj.pay_revision_id }),
                                    leave: ContractLeaveService.get({ jobcontract_revision_id: revisionEntityIdObj.leave_revision_id }),
                                    insurance: ContractInsuranceService.getOne({ jobcontract_revision_id: revisionEntityIdObj.insurance_revision_id }),
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
                                    angular.extend(contract.hours, results.hours || contractRevisionIdObj);
                                    angular.extend(contract.pay, results.pay || contractRevisionIdObj);
                                    angular.forEach(contract.leave, function(leaveType, leaveTypeId){
                                        angular.extend(leaveType, results.leave ? results.leave[leaveTypeId] || contractRevisionIdObj : contractRevisionIdObj);
                                    });
                                    angular.extend(contract.insurance, results.insurance || contractRevisionIdObj);
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

                    angular.extend($scope.details, results.details);
                    angular.extend($scope.hours, results.hours);
                    angular.extend($scope.pay, results.pay);
                    $scope.leave = results.leave;
                    angular.extend($scope.insurance, results.insurance);
                    angular.extend($scope.pension, results.pension);

                    if (results.revisionCreated) {
                        $scope.revisionList.unshift(results.revisionCreated);

                        $scope.revisionDataList.unshift({
                            revisionEntityIdObj: results.revisionCreated,
                            details: results.details,
                            hours: results.hours,
                            pay: results.pay
                        });

                    } else {
                        angular.extend($scope.revisionDataList[0], {
                            details: results.details,
                            hours: results.hours,
                            pay: results.pay
                        });
                    }

                    if (results.isPrimarySet) {
                        $scope.$parent.$parent.toggleIsPrimary(contractId);
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

                //TODO
                switch(entity){
                    case 'health':
                        entity = 'insurance';
                        break;
                    case 'hour':
                        entity = 'hours';
                        break;
                }

                var options = {
                    targetDomEl: $rootElement.find('div').eq(0),
                    size: 'lg',
                    controller: 'ModalRevisionCtrl',
                    templateUrl: settings.pathApp+'views/modalRevision.html?v='+(new Date()).getTime(),
                    windowClass: 'modal-revision',
                    resolve: {
                        entity: function(){
                            return entity;
                        },
                        fields: function(){
                            return $scope.$parent.$parent.fields[entity];
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

        }]);
});