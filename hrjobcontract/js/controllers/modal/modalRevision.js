console.log('Controller: ModalRevisionCtrl');
define(['controllers/controllers'], function(controllers){
    controllers.controller('ModalRevisionCtrl',['$scope','$modalInstance',
        function($scope, $modalInstance){
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }]);
});