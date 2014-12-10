console.log('Controller: ModalFormCtrl');
define(['controllers/controllers'], function(controllers){
    controllers.controller('ModalFormCtrl',['$scope','$modalInstance',
        function($scope, $modalInstance){
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }]);
});