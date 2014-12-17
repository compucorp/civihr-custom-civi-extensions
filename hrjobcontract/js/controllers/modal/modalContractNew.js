console.log('Controller: ModalContractNewCtrl');
define(['controllers/controllers',
        'services/contract',
        'services/contractDetails',
        'services/contractLeave',
        'services/contractPension'], function(controllers){

    controllers.controller('ModalContractNewCtrl', ['$scope','$modalInstance','$q', 'Contract',
        'ContractDetailsService','ContractLeaveService','ContractPensionService','utils','settings',
        function($scope, $modalInstance, $q, Contract, ContractDetailsService, ContractLeaveService,
                 ContractPensionService, utils, settings){

            $scope.allowSave = true;
            $scope.isDisabled = false;
            $scope.title = 'Add New Job Contract';
            $scope.utils = utils;

            $scope.contract = {
                details: {},
                leave: ContractLeaveService.model($scope.utils.absenceType),
                pension: {}
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

            $scope.save = function () {
                var contract = new Contract();
                contract.$save({
                    action: 'create',
                    json: {
                        sequential: 1,
                        contact_id: settings.contactId
                    }
                },function(data){
                    var contract = data.values[0],
                        contractId = contract.id,
                        contractDetails = $scope.contract.details,
                        contractLeave = $scope.contract.leave,
                        contractPension = $scope.contract.pension;

                    contract.is_current = !contractDetails.period_end_date || new Date(contractDetails.period_end_date) > new Date();

                    contractDetails.jobcontract_id = contractId;
                    contractDetails.is_primary = 0;

                    angular.forEach(contractLeave, function(values){
                        values.jobcontract_id = contractId;
                    });

                    contractPension.jobcontract_id = contractId;

                    var promiseContractDetails = ContractDetailsService.save(contractDetails),
                        promiseContractLeave = ContractLeaveService.save(contractLeave),
                        promiseContractPension = ContractPensionService.save(contractPension);

                    $q.all([promiseContractDetails, promiseContractLeave, promiseContractPension]).then(function(){
                        $modalInstance.close(contract);
                    });
                });
            };

        }]);
});