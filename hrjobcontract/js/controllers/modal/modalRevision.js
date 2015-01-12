console.log('Controller: ModalRevisionCtrl');
define(['controllers/controllers'], function(controllers){
    controllers.controller('ModalRevisionCtrl',['$scope','$modalInstance', 'settings', 'revisionDataList',
        'revisionList', 'entity',
        function($scope, $modalInstance, settings, revisionDataList, revisionList, entity){

            $scope.entity = entity;
            $scope.entityHistoryFields = settings.entityHistoryFields;
            $scope.revisionDataList = revisionDataList;
            $scope.revisionList = revisionList;

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }]);
});