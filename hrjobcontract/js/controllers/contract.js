console.log('Controller: ContractCtrl');
define(['controllers/controllers','services/contractDetails','services/contractLeave'], function(controllers){
    controllers.controller('ContractCtrl',['$scope', '$modal', '$rootElement', 'settings', 'ContractDetailsService',
        'ContractLeaveService',
        function($scope, $modal, $rootElement, settings, ContractDetailsService, ContractLeaveService){

            $scope.isCollapsed = !!$scope.$index;

            var contractId = $scope.contract.id;
            var promiseContractDetails = ContractDetailsService.getOne(contractId),
                promiseContractLeave = ContractLeaveService.get({ contractId: contractId});

            promiseContractDetails.then(function(contractDetails){
                $scope.details = contractDetails;
                $scope.details.is_primary = Boolean(+$scope.details.is_primary);
            },function(reason){
                console.log('Failed: ' + reason);
            });

            promiseContractLeave.then(function(contractLeave){
                $scope.leave = contractLeave;
                console.log($scope.leave);
            },function(reason){
                console.log('Failed: ' + reason);
            });

            $scope.modalContract = function(action){

                if (!action) {
                    return null;
                }

                var modalInstance,
                    options = {
                    targetDomEl: $rootElement.find('div').eq(0),
                    templateUrl: settings.pathApp+'/views/modalForm.html?v='+(new Date()).getTime(),
                    size: 'lg',
                    resolve: {
                        contract: function(){
                            return {
                                details: $scope.details,
                                leave: $scope.leave
                            }
                        },
                        utils: function(){
                            return $scope.utils
                        }
                    }
                }

                switch(action){
                    case 'view':
                        options.controller = 'ModalContractViewCtrl'
                        break;
                    case 'edit':
                        options.controller = 'ModalContractEditCtrl'
                        break;
                    case 'change':
                        options.controller = 'ModalContractChangeCtrl'
                        break;
                }

                modalInstance = $modal.open(options);

                modalInstance.result.then(function(details){
                    $scope.details = details;
                });
            }

            $scope.modalRevision = function(entity){

                if (!entity) {
                    return null;
                }

                var options = {
                    targetDomEl: $rootElement.find('div').eq(0),
                    size: 'lg',
                    controller: 'ModalRevisionCtrl',
                    templateUrl: settings.pathApp+'/views/modalRevision.html?v='+(new Date()).getTime()
                }

                return $modal.open(options);
            }

        }]);
});