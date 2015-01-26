console.log('Controller: ModalRevisionCtrl');
define(['controllers/controllers'], function(controllers){
    controllers.controller('ModalRevisionCtrl',['$scope', '$rootScope', '$modalInstance', 'settings', 'revisionDataList',
        'revisionList', 'entity', 'modalContract',
        function($scope, $rootScope, $modalInstance, settings, revisionDataList, revisionList, entity, modalContract){

            $scope.entity = entity;
            $scope.entityHistoryFields = settings.entityHistoryFields;
            $scope.revisionDataList = revisionDataList;
            $scope.revisionList = revisionList;
            $scope.modalContract = modalContract;

            $modalInstance.opened.then(function(){
                $rootScope.$broadcast('hrjc-loader-hide');
            });

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }]);
});