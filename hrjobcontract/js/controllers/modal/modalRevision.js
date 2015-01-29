console.log('Controller: ModalRevisionCtrl');
define(['controllers/controllers'], function(controllers){
    controllers.controller('ModalRevisionCtrl',['$scope', '$rootScope', '$modalInstance', '$filter','settings', 'revisionDataList',
        'revisionList', 'entity', 'fields', 'modalContract',
        function($scope, $rootScope, $modalInstance, $filter, settings, revisionDataList, revisionList, entity, fields, modalContract){

            $scope.entity = entity;
            $scope.fields = angular.copy(fields);
            $scope.subFields = {};
            $scope.revisionDataList = revisionDataList;
            $scope.revisionList = revisionList;
            $scope.modalContract = modalContract;
            $scope.isMultiDim = false;

            var i = 0, len = $scope.fields.length, field;
            for (i; i < len; i++) {
                field = $scope.fields[i];
                field.selected = true;
                field.isArray = false;

                if (field.name == 'id' || field.name == 'jobcontract_revision_id') {
                    field.display = false;
                    continue;
                }

                field.display = true;
            }

            switch (entity) {
                case 'details':
                    $filter('filter')($scope.fields,{name: 'is_primary'})[0].pseudoconstant = true;
                    break;
                case 'leave':
                    $scope.isMultiDim = true;
                    break
                case 'pay':
                    $scope.subFields = {
                        annual_benefits: [{
                            name: 'name',
                            title: 'Benefit',
                            pseudoconstant: 'benefit_name'
                        },{
                            name: 'type',
                            title: 'Type',
                            pseudoconstant: 'benefit_type'
                        },{
                            name: 'amount_pct',
                            title: '% amount',
                            pseudoconstant: false
                        },{
                            name: 'amount_abs',
                            title: 'Absolute amount',
                            pseudoconstant: false
                        }],
                        annual_deductions: [{
                            name: 'name',
                            title: 'Deduction',
                            pseudoconstant: 'deduction_name'
                        },{
                            name: 'type',
                            title: 'Type',
                            pseudoconstant: 'deduction_type'
                        },{
                            name: 'amount_pct',
                            title: '% amount',
                            pseudoconstant: false
                        },{
                            name: 'amount_abs',
                            title: 'Absolute amount',
                            pseudoconstant: false
                        }]
                    }
                    break;
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