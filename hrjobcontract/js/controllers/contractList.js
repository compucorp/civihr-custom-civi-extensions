console.log('Controller: ContractListCtrl');
define(['controllers/controllers'], function(controllers){
    controllers.controller('ContractListCtrl',['$scope','contractList',
        function($scope, contractList){

            console.log(contractList);

            $scope.contractCurrent = contractList;
            $scope.contractLast = [];
        }]);
});