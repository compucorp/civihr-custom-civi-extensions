console.log('Controller: RevisionCtrl');
define(['controllers/controllers',
    'services/contractDetails',
    'services/contractLeave',
    'services/contractPension',
    'services/contractInsurance'], function(controllers){
    controllers.controller('RevisionCtrl',['$scope', '$route', '$modal', '$rootElement', '$q', 'settings',
        'ContractDetailsService', 'ContractLeaveService', 'ContractInsuranceService','ContractPensionService',
        function($scope, $route, $modal, $rootElement, $q, settings, ContractDetailsService,
                 ContractLeaveService, ContractInsuranceService, ContractPensionService){

            var promiseContractDetails = ContractDetailsService.getOne({ jobcontract_revision_id: $scope.revision.details_revision_id }),
                promiseContractLeave = ContractLeaveService.get({ jobcontract_revision_id: $scope.revision.leave_revision_id }),
                promiseContractInsurance = ContractInsuranceService.getOne({ jobcontract_revision_id: $scope.revision.health_revision_id }),
                promiseContractPension = ContractPensionService.getOne({ jobcontract_revision_id: $scope.revision.pension_revision_id });

            $q.all({
                details: promiseContractDetails,
                leave: promiseContractLeave,
                insurance: promiseContractInsurance,
                pension: promiseContractPension
            }).then(function(results){
                $scope.details = results.details;
                $scope.leave = results.leave;
                $scope.insurance = results.insurance;
                $scope.pension = results.pension;
            });

        }]);
});