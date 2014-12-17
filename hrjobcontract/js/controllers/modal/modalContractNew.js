console.log('Controller: ModalContractNewCtrl');
define(['controllers/controllers',
        'services/contract',
        'services/contractDetails',
        'services/contractLeave'], function(controllers){

    controllers.controller('ModalContractNewCtrl', ['$scope','$modalInstance','$q', 'Contract',
        'ContractDetailsService','ContractLeaveService','utils','settings',
        function($scope, $modalInstance, $q, Contract, ContractDetailsService, ContractLeaveService, utils, settings){

            $scope.allowSave = true;
            $scope.isDisabled = false;
            $scope.title = 'Add New Job Contract';
            $scope.utils = utils;

            $scope.contract = {
                details: {},
                leave: ContractLeaveService.model($scope.utils.absenceType)
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
                    var contractId = data.values[0].id;

                    var contractDetails = $scope.contract.details;
                    contractDetails.jobcontract_id = contractId;
                    contractDetails.is_primary = 0;

                    var contractLeave = $scope.contract.leave;
                    angular.forEach(contractLeave, function(values){
                        values.jobcontract_id = contractId;
                    });

                    var promiseContractLeave = ContractLeaveService.save(contractLeave),
                        promiseContractDetails = ContractDetailsService.save(contractDetails);

                    $q.all([promiseContractLeave, promiseContractDetails]).then(function(results){
                        console.log(results);
                        $modalInstance.close(data.values[0]);
                    });
                });
            };

        }]);
});