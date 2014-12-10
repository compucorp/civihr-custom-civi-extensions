console.log('Controller: ModalFormCtrl');
define(['controllers/controllers'], function(controllers){
    controllers.controller('ModalFormCtrl',['$scope','$rootElement','$modal','settings',
        function($scope, $rootElement, $modal, settings){

            $scope.open = function(action) {

                var modalInstance = $modal.open({
                    controller: 'ModalFormInstanceCtrl',
                    size: 'lg',
                    scope: $scope,
                    targetDomEl: $rootElement.find('div').eq(0),
                    templateUrl: settings.templatePath+'/modalForm.html'
                });

            }
        }]);
});