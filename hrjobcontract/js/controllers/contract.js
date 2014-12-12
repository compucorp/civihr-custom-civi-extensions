console.log('Controller: ContractCtrl');
define(['controllers/controllers','services/contractDetails'], function(controllers){
    controllers.controller('ContractCtrl',['$scope', 'ContractDetailsService', '$modal', '$rootElement', 'settings',
        function($scope, ContractDetailsService, $modal, $rootElement, settings){

            $scope.isCollapsed = !!$scope.$index;

            var promiseContractDetails = ContractDetailsService.getContractDetails($scope.contract.id);
            promiseContractDetails.then(function(contractDetails){
                $scope.details = contractDetails[0];
                $scope.details.is_primary = Boolean(+$scope.details.is_primary);
            },function(reason){
                console.log('Failed: ' + reason);
            });

            $scope.modal = function(type, action) {

                var options = {
                    targetDomEl: $rootElement.find('div').eq(0),
                    size: 'lg'
                },
                optionsExt = {};

                switch (type) {
                    case 'form':
                        optionsExt = {
                            controller: 'ModalFormCtrl',
                            templateUrl: settings.pathApp+'/views/modalForm.html?v='+(new Date()).getTime(),
                            resolve: {
                                details: function(){
                                    return promiseContractDetails
                                }
                            }
                        }
                        break;
                    case 'revision':
                        optionsExt = {
                            controller: 'ModalRevisionCtrl',
                            templateUrl: settings.pathApp+'/views/modalRevision.html?v='+(new Date()).getTime()
                        }
                        break;
                }

                return $modal.open(angular.extend(options,optionsExt));
            }

        }]);
});