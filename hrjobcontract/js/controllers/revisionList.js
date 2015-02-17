define(['controllers/controllers', 'services/contract'], function(controllers){
    controllers.controller('RevisionListCtrl',['$scope', '$filter', '$q', 'settings', 'ContractService',
        'ContractDetailsService', 'ContractHoursService', 'ContractPayService', '$log',
        function($scope, $filter, $q, settings, ContractService, ContractDetailsService, ContractHoursService,
                 ContractPayService, $log){
            $log.debug('Controller: RevisionListCtrl');

            var contractId = $scope.contract.id,
                revisionDataListCurrent = $scope.revisionDataList = $scope.$parent.$parent.$parent.$parent.revisionDataList;

            $scope.currentPage = 1;
            $scope.itemsPerPage = 5;
            $scope.maxSize = 5;
            $scope.sortCol = 'revisionEntityIdObj.effective_date';
            $scope.sortReverse = true;

            $scope.createPage = function(){
                var start = (($scope.currentPage - 1) * $scope.itemsPerPage),
                    end = start + $scope.itemsPerPage;

                $scope.revisionDataListPage = revisionDataListCurrent.slice(start, end);
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

                revisionDataListCurrent = $filter('orderBy')($scope.revisionDataList, $scope.sortCol, $scope.sortReverse);
            };

            $scope.$watch('currentPage', function() {
                $scope.createPage();
            });

            $scope.$watch('revisionDataList.length', function() {
                revisionDataListCurrent = $scope.revisionDataList;
                $scope.sortBy();
                $scope.createPage();
            });

            function fetchRevisions(contractId){
                $scope.revisionList.length = 0;
                $scope.revisionDataList.length = 0;

                ContractService.getRevision(contractId).then(function(revisionList){
                    var promiseRevisionList = [];

                    revisionList = $filter('orderBy')(revisionList, 'id', true);

                    $scope.revisionList.push.apply($scope.revisionList,revisionList);

                    angular.forEach(revisionList, function(revision){
                        revision.effective_date = revision.effective_date || '';

                        promiseRevisionList.push($q.all({
                            revisionEntityIdObj: revision,
                            details: ContractDetailsService.getOne({
                                jobcontract_revision_id: revision.details_revision_id,
                                return: 'position, location'
                            }),
                            hours: ContractHoursService.getOne({
                                jobcontract_revision_id: revision.hour_revision_id,
                                return: 'hours_type'
                            }),
                            pay: ContractPayService.getOne({
                                jobcontract_revision_id: revision.pay_revision_id,
                                return: 'pay_scale, pay_annualized_est, pay_currency'
                            })
                        }));
                    });

                    return $q.all(promiseRevisionList);

                }).then(function(results){
                    $scope.revisionDataList.push.apply($scope.revisionDataList,results);
                });
            };
            fetchRevisions(contractId);

            function urlCSVBuild(){
                var url = settings.pathReport + '?', fieldName, entityName, prefix;
                console.log($scope.fields);


                /*
                angular.forEach($scope.fields, function(field){

                    fieldName = field.name != 'editor_name' ? field.name : 'editor_uid';
                    prefix = !field.extends ? (entityName + '_') : '';

                    if (field.selected) {
                        url += 'fields['+prefix+fieldName+']=1&';
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
                */
            };
            $scope.urlCSV = urlCSVBuild();

            $scope.$on('unsetIsPrimary',function(e, excludeContractId, revisionCreated){
                if (contractId == excludeContractId) {
                    if (revisionCreated) {
                        fetchRevisions(contractId);
                    }
                }
            });

        }]);
});