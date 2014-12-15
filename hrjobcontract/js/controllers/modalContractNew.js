console.log('Controller: ModalContractNewCtrl');
define(['controllers/controllers','services/contract','services/contract','services/contractDetails'], function(controllers){
    controllers.controller('ModalContractNewCtrl',['$scope','$modalInstance','$log', 'Contract','ContractDetailsService','settings',
        function($scope, $modalInstance, $log, Contract, ContractDetailsService, settings){

            $scope.details = {};
            $scope.title = 'Add New Job Contract';
            $scope.allowSave = true;
            $scope.isDisabled = false;

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
                    var contractDetails = $scope.details;
                        contractDetails.jobcontract_id = data.values[0].id;
                        contractDetails.is_primary = 0;

                    var promiseContractDetails = ContractDetailsService.save(contractDetails);

                    promiseContractDetails.then(function(){
                        $modalInstance.close(data.values[0]);
                    },function(reason){
                        $log.error('Failed: ' + reason);
                    });


                });
            };

        }]);
});