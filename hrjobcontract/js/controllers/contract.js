console.log('Controller: ContractCtrl');
define(['controllers/controllers','services/contractDetails'], function(controllers){
    controllers.controller('ContractCtrl',['$scope', 'ContractDetailsService', '$modal', '$rootElement', 'settings',
        function($scope, ContractDetailsService, $modal, $rootElement, settings){

            $scope.isCollapsed = !!$scope.$index;

            $scope.details = ContractDetailsService.query($scope.contract.id);
            $scope.details.is_primary = Boolean(+$scope.details.is_primary);

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
                            templateUrl: settings.templatePath+'/modalForm.html?v='+(new Date()).getTime()
                        }
                        break;
                    case 'revision':
                        optionsExt = {
                            controller: 'ModalRevisionCtrl',
                            templateUrl: settings.templatePath+'/modalRevision.html?v='+(new Date()).getTime()
                        }
                        break;
                }

                return $modal.open(angular.extend(options,optionsExt));
            }

        }]);
});