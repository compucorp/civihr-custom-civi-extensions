console.log('SummaryController');
define(['mock','controllers/controllers','services/contractDetails'], function(mock, controllers){
    controllers.controller('ContractSummaryCtrl',['$scope','ContractDetailsService',
        function($scope, ContractDetailsService){
            var details = ContractDetailsService.query();
            $scope.details = details.values[0];
        }]);
});