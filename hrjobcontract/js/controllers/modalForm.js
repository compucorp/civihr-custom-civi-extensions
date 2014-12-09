console.log('ModalFormCtrl');
define(['controllers/controllers'], function(controllers){
    controllers.controller('ModalFormCtrl',['$scope','$rootElement','$modal','settings',
        function($scope, $rootElement, $modal, settings){

            $scope.open = function(action) {

                var modalInstance = $modal.open({
                    controller: 'ModalFormInstanceCtrl',
                    parentNode: $rootElement.find('div').eq(0),
                    size: 'lg',
                    scope: $scope,
                    templateUrl: settings.templatePath+'/modalForm.html'
                });

            }
        }]);
});