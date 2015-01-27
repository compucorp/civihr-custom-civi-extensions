console.log('Controller: ModalRevisionCtrl');
define(['controllers/controllers'], function(controllers){
    controllers.controller('ModalRevisionCtrl',['$scope', '$rootScope', '$modalInstance', 'settings', 'revisionDataList',
        'revisionList', 'entity', 'fields', 'modalContract',
        function($scope, $rootScope, $modalInstance, settings, revisionDataList, revisionList, entity, fields, modalContract){

            $scope.entity = entity;
            $scope.fields = angular.copy(fields);
            $scope.entityHistoryFields = settings.entityHistoryFields;
            $scope.revisionDataList = revisionDataList;
            $scope.revisionList = revisionList;
            $scope.modalContract = modalContract;

            angular.forEach($scope.fields, function(value, index){
                if (value.name == 'id' || value.name == 'jobcontract_revision_id') {
                    $scope.fields.splice(index,1);;
                }
            });

            $modalInstance.opened.then(function(){
                $rootScope.$broadcast('hrjc-loader-hide');
            });

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }]);
});