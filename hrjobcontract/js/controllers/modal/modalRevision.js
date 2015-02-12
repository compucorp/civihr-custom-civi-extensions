define(['controllers/controllers'], function(controllers){
    controllers.controller('ModalRevisionCtrl',['$scope', '$rootScope', '$modalInstance', '$filter','$q','settings',
        'revisionDataList', 'revisionList', 'entity', 'fields', 'model', 'modalContract','utils','ContactService','$log',
        function($scope, $rootScope, $modalInstance, $filter, $q, settings, revisionDataList, revisionList, entity,
                 fields, model, modalContract, utils, ContactService, $log){
            $log.debug('Controller: ModalRevisionCtrl');

            $scope.$broadcast('hrjc-loader-show');
            $scope.currentPage = 1;
            $scope.entity = entity;
            $scope.fields = angular.copy(fields);
            $scope.itemsPerPage = 5;
            $scope.revisionDataList = [];
            $scope.revisionList = [];
            $scope.sortCol = 'effective_date';
            $scope.subFields = {};
            $scope.maxSize = 5;
            $scope.modalContract = modalContract;
            $scope.sortReverse = true;

            (function(){
                var i = 0, len = $scope.fields.length, field;
                for (i; i < len; i++) {
                    field = $scope.fields[i];
                    field.selected = true;
                    field.isArray = field.name == 'leave_type' || field.name == 'leave_amount';

                    if (field.name == 'id' || field.name == 'jobcontract_revision_id') {
                        field.display = false;
                        continue;
                    }

                    field.display = true;
                }

                $scope.fields.unshift({
                    name: 'effective_date',
                    title: 'Effective Date',
                    display: true,
                    selected: true,
                    isArray: false
                });

                $scope.fields.push({
                    name: 'editor_name',
                    title: 'Change Recorded By',
                    display: true,
                    selected: true,
                    isArray: false
                },{
                    name: 'change_reason',
                    title: 'Reason For Change',
                    display: true,
                    selected: true,
                    isArray: false
                })

            })();

            (function(){
                var i = 0, iNext, isLast, len = revisionDataList.length, isUnique;
                for (i; i < len; i++){
                    iNext = i+1;
                    isLast = iNext == len;

                    if (!revisionDataList[i]) {
                        revisionDataList[i] = model;
                    }

                    if (!isLast && !revisionDataList[iNext]) {
                        revisionDataList[iNext] = model;
                    }

                    if (!angular.isArray(revisionDataList[i])) {
                        isUnique = isLast || revisionDataList[i].jobcontract_revision_id != revisionDataList[iNext].jobcontract_revision_id;
                    } else {
                        isUnique = isLast || revisionDataList[i][0].jobcontract_revision_id != revisionDataList[iNext][0].jobcontract_revision_id;

                        revisionDataList[i] = {
                            jobcontract_revision_id: revisionDataList[i][0].jobcontract_revision_id,
                            data: revisionDataList[i]
                        }
                    }

                    if (isUnique) {
                        angular.extend(revisionDataList[i],{
                            effective_date: $filter('date')(revisionList[i].effective_date, 'yyyy/MM/dd') || '',
                            editor_name: revisionList[i].editor_name || '',
                            change_reason: $rootScope.options.contract.change_reason[revisionList[i].change_reason] || ''
                        })
                        $scope.revisionDataList.push(revisionDataList[i]);
                    }
                }
            })();

            switch (entity) {
                case 'details':
                    $filter('filter')($scope.fields,{name: 'is_primary'})[0].pseudoconstant = true;
                    break;
                case 'hours':
                    (function(){
                        var hoursLocation;
                        angular.forEach($scope.revisionDataList, function(revisionData){
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
                        '&contract_id_value='+revisionList[0].jobcontract_id;

                return url;
            };
            $scope.urlCSV = urlCSVBuild();

            $scope.createPage = function(){
                var start = (($scope.currentPage - 1) * $scope.itemsPerPage),
                    end = start + $scope.itemsPerPage;

                $scope.revisionDataListPage = $scope.revisionDataList.slice(start, end);
            }

            $scope.sortBy = function(sortCol, sortReverse){

                if (typeof sortCol !== 'undefined') {

                    if ($scope.sortCol == sortCol) {
                        $scope.sortReverse = !$scope.sortReverse;
                    } else {
                        $scope.sortCol = sortCol;
                    }

                }

                if (typeof sortReverse !== 'undefined') {
                    $scope.sortReverse = sortReverse;
                }

                $scope.revisionDataList = $filter('orderBy')($scope.revisionDataList, $scope.sortCol, $scope.sortReverse);
            };
            $scope.sortBy();

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

            $scope.$watch('currentPage', function() {
                $scope.createPage();
            });
        }]);
});