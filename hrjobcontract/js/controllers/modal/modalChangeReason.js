console.log('Controller: ModalChangeReasonCtrl');
define(['controllers/controllers'], function(controllers){
    controllers.controller('ModalChangeReasonCtrl',['$scope','$modalInstance',
        function($scope, $modalInstance){

            $scope.save = function () {
                $modalInstance.close(true);
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }]);
});