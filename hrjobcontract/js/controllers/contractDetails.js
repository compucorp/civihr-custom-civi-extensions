console.log('ContractDetailsCtrl');
define(['controllers/controllers','services/contractDetails'], function(controllers){
    controllers.controller('ContractDetailsCtrl',['$scope','ContractDetailsService',
        function($scope, ContractDetailsService){
            var details = ContractDetailsService.query();
            $scope.details = details.values[0];
        }]);
});