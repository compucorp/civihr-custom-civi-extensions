console.log('Controller: ContractCtrl');
define(['controllers/controllers',
        'services/contractDetails',
        'services/contractHours',
        'services/contractPay',
        'services/contractLeave',
        'services/contractPension',
        'services/contractInsurance'], function(controllers){
    controllers.controller('ContractCtrl',['$scope', '$route', '$modal', '$rootElement', '$q', 'settings',
        'ContractDetailsService', 'ContractHoursService', 'ContractPayService', 'ContractLeaveService',
        'ContractInsuranceService', 'ContractPensionService',
        function($scope, $route, $modal, $rootElement, $q, settings, ContractDetailsService, ContractHoursService,
                 ContractPayService, ContractLeaveService, ContractInsuranceService, ContractPensionService){

            var contractId = $scope.contract.id, revisionId, contractRevisionIdObj;

            $scope.isCollapsed = !!$scope.$index || !+$scope.contract.is_current;
            $scope.revisionList = [];

            $q.all({
                details: ContractDetailsService.getOne({ jobcontract_id: contractId}),
                hours: ContractHoursService.getOne({ jobcontract_id: contractId}),
                pay: ContractPayService.getOne({ jobcontract_id: contractId}),
                leave: ContractLeaveService.get({ jobcontract_id: contractId}),
                insurance: ContractInsuranceService.getOne({ jobcontract_id: contractId}),
                pension: ContractPensionService.getOne({ jobcontract_id: contractId})
            }).then(function(results){

                $scope.details = results.details;
                $scope.details.is_primary = !!+$scope.details.is_primary;
                revisionId = results.details.jobcontract_revision_id;
                contractRevisionIdObj = {
                    jobcontract_id: contractId,
                    jobcontract_revision_id: revisionId
                };

                $scope.hours = results.hours || contractRevisionIdObj;
                $scope.pay = results.pay || contractRevisionIdObj;
                $scope.leave = results.leave.length ? results.leave : ContractLeaveService.model($scope.utils.absenceType, contractRevisionIdObj);
                $scope.insurance = results.insurance || contractRevisionIdObj;
                $scope.pension = results.pension || contractRevisionIdObj;

            });


            $scope.modalContract = function(action, revisionId){

                var modalInstance,
                    options = {
                    targetDomEl: $rootElement.find('div').eq(0),
                    templateUrl: settings.pathApp+'/views/modalForm.html?v='+(new Date()).getTime(),
                    size: 'lg',
                    resolve: {
                        contract: function(){
                            return !revisionId ? {
                                id: contractId,
                                details: $scope.details,
                                hours: $scope.hours,
                                pay: $scope.pay,
                                leave: $scope.leave,
                                insurance: $scope.insurance,
                                pension: $scope.pension
                            } : $q.all({
                                details: ContractDetailsService.getOne({ jobcontract_revision_id: revisionId }),
                                hours: ContractHoursService.getOne({ jobcontract_revision_id: revisionId }),
                                pay: ContractPayService.getOne({ jobcontract_revision_id: revisionId }),
                                leave: ContractLeaveService.get({ jobcontract_revision_id: revisionId }),
                                insurance: ContractInsuranceService.getOne({ jobcontract_revision_id: revisionId }),
                                pension: ContractPensionService.getOne({ jobcontract_revision_id: revisionId })
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

                    if (results.requireReload) {
                        $route.reload();
                    }

                    $scope.details = results.details;
                    $scope.hours = results.hours;
                    $scope.pay = results.pay;
                    $scope.leave = results.leave;
                    $scope.insurance = results.insurance;
                    $scope.pension = results.pension;

                    if (results.revisionCreated) {
                        $scope.revisionList.unshift({
                            revisionId: results.revisionCreated,
                            details: results.details,
                            hours: results.hours,
                            pay: results.pay
                        });
                    } else {
                        angular.extend($scope.revisionList[0], {
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

                var options = {
                    targetDomEl: $rootElement.find('div').eq(0),
                    size: 'lg',
                    controller: 'ModalRevisionCtrl',
                    templateUrl: settings.pathApp+'/views/modalRevision.html?v='+(new Date()).getTime()
                };

                return $modal.open(options);
            }

        }]);
});