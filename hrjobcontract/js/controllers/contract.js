console.log('Controller: ContractCtrl');
define(['controllers/controllers','services/contractDetails'], function(controllers){
    controllers.controller('ContractCtrl',['$scope', 'ContractDetailsService', '$modal', '$rootElement', 'settings',
        function($scope, ContractDetailsService, $modal, $rootElement, settings){

            $scope.isCollapsed = !!$scope.$index;

            $scope.details = ContractDetailsService.query($scope.contract.id);
            $scope.details.is_primary = Boolean(+$scope.details.is_primary);

            $scope.modal = function(type, action) {
                var modalInstance = null,
                    targetDomEl = $rootElement.find('div').eq(0);

                if (type == 'form') {
                    modalInstance = $modal.open({
                        controller: 'ModalFormCtrl',
                        size: 'lg',
                        targetDomEl: targetDomEl,
                        templateUrl: settings.templatePath+'/modalForm.html'
                    });
                }

                if (type == 'revision') {
                    modalInstance = $modal.open({
                        controller: 'ModalRevisionCtrl',
                        size: 'lg',
                        targetDomEl: targetDomEl,
                        templateUrl: settings.templatePath+'/modalRevision.html'
                    });
                }

                return modalInstance;
            }

        }]);
});