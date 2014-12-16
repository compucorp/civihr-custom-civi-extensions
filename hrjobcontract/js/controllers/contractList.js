console.log('Controller: ContractListCtrl');
define(['controllers/controllers'], function(controllers){
    controllers.controller('ContractListCtrl',['$scope','$rootElement','$modal','contractList','settings',
        function($scope, $rootElement, $modal, contractList, settings){

            $scope.contractCurrent = contractList;
            $scope.contractPast = [];


            $scope.modalContract = function(action){
                if (!action || action !== 'new') {
                    return null;
                }

                var modalInstance,
                    options = {
                        targetDomEl: $rootElement.find('div').eq(0),
                        templateUrl: settings.pathApp+'/views/modalForm.html?v='+(new Date()).getTime(),
                        size: 'lg',
                        controller: 'ModalContractNewCtrl'
                    }

                modalInstance = $modal.open(options);

                modalInstance.result.then(function(contract){
                    $scope.contractCurrent.push(contract);
                });
            }

        }]);
});