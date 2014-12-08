console.log('SummaryController');
define(['controllers/controllers','services/contractList'], function(controllers){
    controllers.controller('ContractListCtrl',['$scope','ContractListService',
        function($scope, ContractListService){
            var data = ContractListService.query();
            $scope.currentContract = data.values;
            console.log($scope.currentContract);
        }]);
});