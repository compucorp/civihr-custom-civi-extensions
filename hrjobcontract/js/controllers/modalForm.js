console.log('Controller: ModalFormCtrl');
define(['controllers/controllers'], function(controllers){
    controllers.controller('ModalFormCtrl',['$scope','$modalInstance','details',
        function($scope, $modalInstance, details){

            $scope.details = {};
            angular.copy(details[0],$scope.details);

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }]);
});