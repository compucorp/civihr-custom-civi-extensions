console.log('Controller: ContractListCtrl');
define(['controllers/controllers'], function(controllers){
    controllers.controller('ContractListCtrl',['$scope','contractList',
        function($scope, contractList){
            $scope.currentContract = contractList.values;
        }]);
});