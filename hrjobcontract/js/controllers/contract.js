console.log('Controller: ContractCtrl');
define(['controllers/controllers',
        'services/contractDetails',
        'services/contractHours',
        'services/contractPay',
        'services/contractLeave',
        'services/contractPension',
        'services/contractInsurance',
        'services/utils',], function(controllers){
    controllers.controller('ContractCtrl',['$timeout','$scope', '$route', '$filter', '$modal', '$rootElement', '$q', 'settings',
        'API', 'ContractDetailsService', 'ContractHoursService', 'ContractPayService', 'ContractLeaveService',
        'ContractInsuranceService', 'ContractPensionService',
        function($timeout, $scope, $route, $filter, $modal, $rootElement, $q, settings, API, ContractDetailsService,
                 ContractHoursService, ContractPayService, ContractLeaveService, ContractInsuranceService,
                 ContractPensionService){

            var contractId = $scope.contract.id, contractRevisionIdObj;

            $scope.contractLoaded = false;
            $scope.isCollapsed = true;
            $scope.model = angular.copy($scope.model);
            $scope.revisionList = [];
            $scope.revisionDataList = [];

            angular.extend($scope, $scope.model);

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
                $scope.details.is_primary = !!+$scope.details.is_primary;

                angular.extend($scope.hours, results.hours || contractRevisionIdObj);
                angular.extend($scope.pay, results.pay || contractRevisionIdObj);

                $scope.leave = results.leave.length ? results.leave : ContractLeaveService.model($scope.utils.absenceType, contractRevisionIdObj);

                angular.extend($scope.insurance, results.insurance || contractRevisionIdObj);
                angular.extend($scope.pension, results.pension || contractRevisionIdObj);

                $scope.contractLoaded = true;
                $scope.isCollapsed = !!$scope.$index || !+$scope.contract.is_current;

            });


            $scope.modalContract = function(action, revisionEntityIdObj){

                var modalInstance,
                    options = {
                    targetDomEl: $rootElement.find('div').eq(0),
                    templateUrl: settings.pathApp+'/views/modalForm.html?v='+(new Date()).getTime(),
                    size: 'lg',
                    resolve: {
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

                                angular.extend(contract, $scope.model);
                                angular.extend(contract.details, results.details);
                                angular.extend(contract.hours, results.hours || contractRevisionIdObj);
                                angular.extend(contract.pay, results.pay || contractRevisionIdObj);
                                contract.leave = results.leave.length ? results.leave : ContractLeaveService.model($scope.utils.absenceType, contractRevisionIdObj);
                                angular.extend(contract.insurance, results.insurance || contractRevisionIdObj);
                                angular.extend(contract.pension, results.pension || contractRevisionIdObj);

                                return contract;
                            });
                        },
                        utils: function(){
                            return $scope.utils
                        }
                    }
                };

                switch(action){
                    case 'edit':
                        options.controller = 'ModalContractEditCtrl';
                        break;
                    case 'change':
                        options.controller = 'ModalContractChangeCtrl';
                        break;
                    case 'view':
                        options.controller = 'ModalContractViewCtrl';
                        break;
                    default:
                        options.controller = 'ModalContractViewCtrl';
                }

                modalInstance = $modal.open(options);

                modalInstance.result.then(function(results){

                    console.log(results);

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

                });
            };

            $scope.modalRevision = function(entity){

                if (!entity) {
                    return null;
                }

                var i = 0, len = $scope.revisionList.length, promiseEntityRevisionList = [];
                for (i; i < len; i++){
                    promiseEntityRevisionList.push(API.getOne('HRJob'+$filter('capitalize')(entity),{
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
                    case 'leave':
                        alert('Soon!');
                        return
                        break;
                }

                var options = {
                    targetDomEl: $rootElement.find('div').eq(0),
                    size: 'lg',
                    controller: 'ModalRevisionCtrl',
                    templateUrl: settings.pathApp+'/views/modalRevision.html?v='+(new Date()).getTime(),
                    resolve: {
                        entity: function(){
                            return entity;
                        },
                        revisionDataList: function(){
                            return $q.all(promiseEntityRevisionList);
                        }
                    }
                };

                return $modal.open(options);
            }

        }]);
});