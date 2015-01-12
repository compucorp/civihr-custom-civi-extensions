console.log('Controller: ModalDialogCtrl');
define(['controllers/controllers'], function(controllers){
    controllers.controller('ModalDialogCtrl',['$scope','$modalInstance','content',
        function($scope, $modalInstance, content){

            $scope.title = content.title || 'CiviHR Job Contract';
            $scope.msg = content.msg || '';
            $scope.copyConfirm = content.copyConfirm || 'Yes';
            $scope.copyCancel = content.copyCancel || 'Cancel';

            $scope.confirm = function () {
                $modalInstance.close(true);
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }]);
});