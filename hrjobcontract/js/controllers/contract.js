console.log('ContractCtrl');
define(['controllers/controllers','services/contractDetails'], function(controllers){
    controllers.controller('ContractCtrl',['$scope', 'ContractDetailsService',
        function($scope, ContractDetailsService){
            $scope.isCollapsed = $scope.$index;
            $scope.details = ContractDetailsService.query($scope.contract.id);
            $scope.details.is_primary = Boolean(+$scope.details.is_primary);
        }]);
});