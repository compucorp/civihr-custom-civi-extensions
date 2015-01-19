console.log('Controller: ModalRevisionCtrl');
define(['controllers/controllers'], function(controllers){
    controllers.controller('ModalRevisionCtrl',['$scope','$modalInstance', 'settings', 'revisionDataList',
        'revisionList', 'entity', 'modalContract',
        function($scope, $modalInstance, settings, revisionDataList, revisionList, entity, modalContract){

            $scope.entity = entity;
            $scope.entityHistoryFields = settings.entityHistoryFields;
            $scope.revisionDataList = revisionDataList;
            $scope.revisionList = revisionList;
            $scope.modalContract = modalContract;

            console.log('$scope.revisionDataList');
            console.log($scope.revisionDataList);

            console.log('$scope.revisionList');
            console.log($scope.revisionList);

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }]);
});