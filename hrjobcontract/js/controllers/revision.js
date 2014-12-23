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

            $q.all({
                details: ContractDetailsService.getOne({ jobcontract_revision_id: $scope.revision.details_revision_id }),
                leave: ContractLeaveService.get({ jobcontract_revision_id: $scope.revision.leave_revision_id }),
                insurance: ContractInsuranceService.getOne({ jobcontract_revision_id: $scope.revision.health_revision_id }),
                pension: ContractPensionService.getOne({ jobcontract_revision_id: $scope.revision.pension_revision_id })
            }).then(function(results){
                $scope.details = results.details;
                $scope.leave = results.leave;
                $scope.insurance = results.insurance;
                $scope.pension = results.pension;
            });

        }]);
});