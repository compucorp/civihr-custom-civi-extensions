console.log('Controller: ModalRevisionCtrl');
define(['controllers/controllers'], function(controllers){
    controllers.controller('ModalRevisionCtrl',['$scope','$modalInstance', 'settings', 'revisionDataList', 'entity',
        function($scope, $modalInstance, settings, revisionDataList, entity){

            $scope.entity = entity;
            $scope.entityHistoryFields = settings.entityHistoryFields;
            $scope.revisionDataList = revisionDataList;

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }]);
});