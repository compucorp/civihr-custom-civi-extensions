define(['controllers/controllers'], function(controllers){
    controllers.controller('ModalRevisionCtrl',['$scope', '$rootScope', '$modalInstance', '$filter','$q','settings',
        'revisionDataList', 'revisionList', 'entity', 'fields', 'modalContract','utils','ContactService','$log',
        function($scope, $rootScope, $modalInstance, $filter, $q, settings, revisionDataList, revisionList, entity,
                 fields, modalContract, utils, ContactService,$log){
            $log.debug('Controller: ModalRevisionCtrl');

            $scope.$broadcast('hrjc-loader-show');
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
                case 'hours':
                    (function(){
                        alert('ok');
                        var hoursLocation;
                        angular.forEach($scope.revisionDataList, function(revisionData){
                            console.log(revisionData.location_standard_hours);
                            if (revisionData.location_standard_hours) {
                                hoursLocation = $filter('filter')(utils.hoursLocation,{id: revisionData.location_standard_hours})[0];
                                revisionData.location_standard_hours = hoursLocation.location + ': ' +
                                hoursLocation.standard_hours + 'h per ' +
                                hoursLocation.periodicity;
                            }
                        });
                    })();
                    break;
                case 'insurance':
                    angular.forEach($scope.revisionDataList, function(revisionData){
                        if (revisionData.provider) {
                            ContactService.getOne(revisionData.provider).then(function(contact){
                                revisionData.provider = contact.label;
                            });
                        }

                        if (revisionData.provider_life_insurance) {
                            ContactService.getOne(revisionData.provider_life_insurance).then(function(contact){
                                revisionData.provider_life_insurance = contact.label;
                            });
                        }
                    });
                    break;
                case 'leave':
                    $scope.isMultiDim = true;
                    break
                case 'pay':
                    (function(){
                        var payScaleGrade;
                        angular.forEach($scope.revisionDataList, function(revisionData){
                            if (revisionData.pay_scale) {
                                payScaleGrade = $filter('filter')(utils.payScaleGrade,{id: revisionData.pay_scale})[0] || $filter('filter')(utils.payScaleGrade,{pay_scale: revisionData.pay_scale})[0];
                                revisionData.pay_scale = payScaleGrade.pay_scale +
                                (payScaleGrade.pay_grade ? ' - ' + payScaleGrade.pay_grade : '') +
                                (payScaleGrade.currency ? ' - ' + $rootScope.options.pay.pay_currency[payScaleGrade.currency] : '') +
                                (payScaleGrade.amount ? ' ' + payScaleGrade.amount : '') +
                                (payScaleGrade.periodicity ? ' per ' + payScaleGrade.periodicity : '');
                            }
                        });
                    })();

                    $filter('filter')($scope.fields,{name: 'pay_is_auto_est'})[0].pseudoconstant = true;

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
                case 'pension':
                    $filter('filter')($scope.fields,{name: 'is_enrolled'})[0].pseudoconstant = true;
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