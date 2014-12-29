console.log('Controller: ModalContractEditCtrl');
define(['controllers/controllers',
        'services/contractDetails',
        'services/contractHours',
        'services/contractLeave',
        'services/contractInsurance',
        'services/contractPension'], function(controllers){

    controllers.controller('ModalContractEditCtrl',['$scope','$modalInstance','$q', 'ContractDetailsService',
        'ContractHoursService', 'ContractLeaveService','ContractInsuranceService','ContractPensionService','contract',
        'utils',
        function($scope, $modalInstance, $q, ContractDetailsService, ContractHoursService, ContractLeaveService,
            ContractInsuranceService, ContractPensionService, contract, utils){

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

                $q.all({
                    details: ContractDetailsService.save($scope.contract.details),
                    hours: ContractHoursService.save($scope.contract.hours),
                    leave: ContractLeaveService.save($scope.contract.leave),
                    insurance: ContractInsuranceService.save($scope.contract.insurance),
                    pension: ContractPensionService.save($scope.contract.pension)
                }).then(function(results){

                    //TODO (incorrect date format in the API response)
                    results.details.period_start_date = $scope.contract.details.period_start_date;
                    results.details.period_end_date = $scope.contract.details.period_end_date;
                    //

                    results.requireReload = contract.details.period_end_date ? contract.details.period_end_date !== results.details.period_end_date : !!contract.details.period_end_date !== !!results.details.period_end_date;

                    $modalInstance.close(results);
                });

            };

        }]);
});