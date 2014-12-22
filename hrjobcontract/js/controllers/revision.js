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

            console.log($scope.revision);

        }]);
});