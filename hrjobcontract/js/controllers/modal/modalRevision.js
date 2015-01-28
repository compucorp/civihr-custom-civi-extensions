console.log('Controller: ModalRevisionCtrl');
define(['controllers/controllers'], function(controllers){
    controllers.controller('ModalRevisionCtrl',['$scope', '$rootScope', '$modalInstance', 'settings', 'revisionDataList',
        'revisionList', 'entity', 'fields', 'modalContract',
        function($scope, $rootScope, $modalInstance, settings, revisionDataList, revisionList, entity, fields, modalContract){

            $scope.entity = entity;
            $scope.fields = angular.copy(fields);
            $scope.revisionDataList = revisionDataList;
            $scope.revisionList = revisionList;
            $scope.modalContract = modalContract;

            console.log($scope.entity);
            console.log($scope.fields);
            console.log($scope.revisionDataList);
            console.log($scope.revisionList);

            var i = 0, len = $scope.fields.length, field;
            for (i; i < len; i++) {
                field = $scope.fields[i];
                field.selected = true;

                if (field.name == 'id' || field.name == 'jobcontract_revision_id') {
                    field.display = false;
                    continue;
                }

                field.display = true;
            }

            function urlCSVBuild(){
                var url = settings.pathReport + '?', entityName;

                //TODO
                switch($scope.entity){
                    case 'insurance':
                        entityName = 'health';
                        break;
                    case 'hours':
                        entityName = 'hour';
                        break;
                }

                angular.forEach($scope.fields, function(field){
                    if (field.selected) {
                        url += 'fields['+field.name+']=1&';
                    }
                });

                url += 'order_bys[1][column]=sort_name&order_bys[1][order]=ASC' +
                        '&order_bys[2][column]=-&order_bys[2][order]=ASC' +
                        '&order_bys[3][column]=-&order_bys[3][order]=ASC' +
                        '&order_bys[4][column]=-&order_bys[4][order]=ASC' +
                        '&order_bys[5][column]=-&order_bys[5][order]=ASC' +
                        '&group_bys[civicrm_hrjobcontract_'+entityName+'_jobcontract_revision_id]=1' +
                        '&contract_id_op=eq&permission=access+CiviReport' +
                        '&row_count=' +
                        '&_qf_Summary_submit_csv=Preview+CSV' +
                        '&groups=' +
                        '&contract_id_value='+$scope.revisionList[0].jobcontract_id

                return url;
            };
            $scope.urlCSV = urlCSVBuild();

            $scope.toggleFieldsSelected = function (field) {
                field.selected = !field.selected;
                $scope.urlCSV = urlCSVBuild();
            };


            $modalInstance.opened.then(function(){
                $rootScope.$broadcast('hrjc-loader-hide');
            });

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }]);
});