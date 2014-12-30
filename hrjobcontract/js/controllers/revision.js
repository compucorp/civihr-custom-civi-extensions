console.log('Controller: RevisionCtrl');
define(['controllers/controllers',
    'services/contractDetails',
    'services/contractHours',
    'services/contractPay',
    'services/contractLeave',
    'services/contractPension',
    'services/contractInsurance'], function(controllers){
    controllers.controller('RevisionCtrl',['$scope', '$route', '$modal', '$rootElement', '$q', 'settings',
        'ContractDetailsService', 'ContractHoursService', 'ContractPayService', 'ContractLeaveService',
        'ContractInsuranceService', 'ContractPensionService',
        function($scope, $route, $modal, $rootElement, $q, settings, ContractDetailsService, ContractHoursService,
                 ContractPayService, ContractLeaveService, ContractInsuranceService, ContractPensionService){

            $q.all({
                details: ContractDetailsService.getOne({ jobcontract_revision_id: $scope.revision.details_revision_id }),
                hours: ContractHoursService.getOne({ jobcontract_revision_id: $scope.revision.hour_revision_id }),
                pay: ContractPayService.getOne({ jobcontract_revision_id: $scope.revision.pay_revision_id }),
                leave: ContractLeaveService.get({ jobcontract_revision_id: $scope.revision.leave_revision_id }),
                insurance: ContractInsuranceService.getOne({ jobcontract_revision_id: $scope.revision.health_revision_id }),
                pension: ContractPensionService.getOne({ jobcontract_revision_id: $scope.revision.pension_revision_id })
            }).then(function(results){
                console.log(results.details);
                $scope.details = results.details;
                $scope.hours = results.hours;
                $scope.pay = results.pay;
                $scope.leave = results.leave;
                $scope.insurance = results.insurance;
                $scope.pension = results.pension;
            });

        }]);
});