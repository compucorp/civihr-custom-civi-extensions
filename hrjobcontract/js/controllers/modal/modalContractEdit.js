console.log('Controller: ModalContractEditCtrl');
define(['controllers/controllers',
        'services/contractDetails',
        'services/contractLeave'], function(controllers){

    controllers.controller('ModalContractEditCtrl',['$scope','$modalInstance','$q', 'ContractDetailsService',
        'ContractLeaveService','contract','utils',
        function($scope, $modalInstance, $q, ContractDetailsService, ContractLeaveService, contract, utils){

            $scope.allowSave = true;
            $scope.contract = {};
            $scope.isDisabled = false;
            $scope.title = 'Edit contract';
            $scope.utils = utils;

            angular.copy(contract,$scope.contract);

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

            $scope.save = function () {
                var promiseContractDetails = ContractDetailsService.save($scope.contract.details),
                    promiseContractLeave = ContractLeaveService.save($scope.contract.leave);

                $q.all({
                    details: promiseContractDetails,
                    leave: promiseContractLeave
                }).then(function(results){
                    $modalInstance.close(results);
                });

            };

        }]);
});