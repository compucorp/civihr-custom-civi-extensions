console.log('Controller: ModalContractEditCtrl');
define(['controllers/controllers','services/contractDetails'], function(controllers){
    controllers.controller('ModalContractEditCtrl',['$scope','$modalInstance','$log', 'ContractDetailsService','details',
        function($scope, $modalInstance, $log, ContractDetailsService, details){

            $scope.details = {};
            $scope.title = 'Edit contract';
            $scope.allowSave = true;
            $scope.isDisabled = false;

            angular.copy(details,$scope.details);

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

            $scope.save = function () {
                var promiseContractDetails = ContractDetailsService.save($scope.details);

                promiseContractDetails.then(function(contractDetails){
                    $modalInstance.close(contractDetails);
                },function(reason){
                    $log.error('Failed: ' + reason);
                });
            };

        }]);
});