console.log('Controller: HistoryCtrl');
define(['controllers/controllers',
        'services/contractDetails',
        'services/contractLeave',
        'services/contractPension',
        'services/contractInsurance'], function(controllers){
    controllers.controller('HistoryCtrl',['$scope', '$route', '$modal', '$rootElement', '$q', 'settings',
        'ContractDetailsService', 'ContractLeaveService', 'ContractInsuranceService','ContractPensionService',
        function($scope, $route, $modal, $rootElement, $q, settings, ContractDetailsService,
                 ContractLeaveService, ContractInsuranceService, ContractPensionService){



        }]);
});