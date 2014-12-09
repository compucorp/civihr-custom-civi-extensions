console.log('ModalFormCtrl');
define(['controllers/controllers'], function(controllers){
    controllers.controller('ModalFormCtrl',['$scope','$modal','settings',
        function($scope, $modal, settings){
            $scope.open = function(action) {

                var modalInstance = $modal.open({
                    templateUrl: settings.templatePath+'/modalForm.html'
                });

            }
        }]);
});