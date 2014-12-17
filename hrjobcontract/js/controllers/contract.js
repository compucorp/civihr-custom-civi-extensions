console.log('Controller: ContractCtrl');
define(['controllers/controllers','services/contractDetails','services/contractLeave'], function(controllers){
    controllers.controller('ContractCtrl',['$scope', '$modal', '$rootElement', '$q', 'settings', 'ContractDetailsService',
        'ContractLeaveService',
        function($scope, $modal, $rootElement, $q, settings, ContractDetailsService, ContractLeaveService){

            $scope.isCollapsed = !!$scope.$index || !+$scope.contract.is_current;

            var contractId = $scope.contract.id,
                promiseContractDetails = ContractDetailsService.getOne(contractId),
                promiseContractLeave = ContractLeaveService.get({ jobcontract_id: contractId});

            $q.all({
                details: promiseContractDetails,
                leave: promiseContractLeave
            }).then(function(results){
                $scope.details = results.details;
                $scope.details.is_primary = !!+$scope.details.is_primary;

                $scope.leave = results.leave;
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

                modalInstance.result.then(function(results){
                    $scope.details = results.details;
                    $scope.leave = results.leave;
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