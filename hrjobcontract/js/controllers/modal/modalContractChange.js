console.log('Controller: ModalContractChangeCtrl');
define(['controllers/controllers'], function(controllers){
    controllers.controller('ModalContractChangeCtrl',['$scope','$modalInstance','contract',
        function($scope, $modalInstance, contract){

            $scope.contract = {};
            angular.copy(contract,$scope.contract);

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }]);
});