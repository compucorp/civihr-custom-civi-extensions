console.log('ContractCtrl');
define(['controllers/controllers'], function(controllers){
    controllers.controller('ContractCtrl',['$scope',
        function($scope){
            $scope.isCollapsed = $scope.$index;
        }]);
});