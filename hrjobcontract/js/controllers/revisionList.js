define(['controllers/controllers', 'services/contract'], function(controllers){
    controllers.controller('RevisionListCtrl',['$scope', '$filter', '$q', '$modal', '$rootElement', 'settings', 'ContractService',
        'ContractDetailsService', 'ContractHourService', 'ContractPayService', '$log',
        function($scope, $filter, $q, $modal, $rootElement, settings, ContractService, ContractDetailsService,
                 ContractHourService, ContractPayService, $log){
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
                            hour: ContractHourService.getOne({
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
                var url = settings.pathReport + '?',
                    fields = $scope.fields;

                angular.forEach(fields, function(entityFields, entityName){
                    url += 'fields['+entityName+'_revision_id]=1&';
                    angular.forEach(entityFields, function(field){
                        url += 'fields['+entityName+'_'+field.name+']=1&';
                    })
                });

                url += 'fields[id]=1&' +
                'fields[change_reason]=1&' +
                'fields[contact_id]=1&' +
                'fields[created_date]=1&' +
                'fields[editor_uid]=1&' +
                'fields[effective_date]=1&' +
                'fields[modified_date]=1&' +
                'fields[status]=1&' +
                'order_bys[1][column]=sort_name&order_bys[1][order]=ASC' +
                '&order_bys[2][column]=-&order_bys[2][order]=ASC' +
                '&order_bys[3][column]=-&order_bys[3][order]=ASC' +
                '&order_bys[4][column]=-&order_bys[4][order]=ASC' +
                '&order_bys[5][column]=-&order_bys[5][order]=ASC' +
                '&contract_id_op=eq&permission=access+CiviReport' +
                '&row_count=' +
                '&_qf_Summary_submit_csv=Preview+CSV' +
                '&groups=' +
                '&contract_id_value='+contractId;

                return url;
            };
            $scope.urlCSV = urlCSVBuild();

            $scope.modalRevisionEdit = function(revisionEntityIdObj){
                var date = revisionEntityIdObj.effective_date,
                    reasonId = revisionEntityIdObj.change_reason;

                var modalChangeReason = $modal.open({
                    targetDomEl: $rootElement.find('div').eq(0),
                    templateUrl: settings.pathApp+'views/modalChangeReason.html?v='+(new Date()).getTime(),
                    controller: 'ModalChangeReasonCtrl',
                    resolve: {
                        content: function() {
                            return {
                                copy: {
                                    title: 'Edit revision data'
                                }
                            }
                        },
                        date: function(){
                            return date;
                        },
                        reasonId: function(){
                            return reasonId;
                        }
                    }
                });

                modalChangeReason.result.then(function(results){
                    if (results.date != date || results.reasonId != reasonId) {
                        ContractService.saveRevision({
                            id: revisionEntityIdObj.id,
                            change_reason: results.reasonId,
                            effective_date: results.date
                        }).then(function(){
                            revisionEntityIdObj.effective_date = results.date;
                            revisionEntityIdObj.change_reason = results.reasonId;
                            $scope.sortBy();
                            $scope.createPage();
                        });
                    }
                });
            };

            $scope.$watch('currentPage', function() {
                $scope.createPage();
            });

            $scope.$watch('revisionDataList.length', function() {
                revisionDataListCurrent = $scope.revisionDataList;
                $scope.sortBy();
                $scope.createPage();
            });

            $scope.$on('unsetIsPrimary',function(e, excludeContractId, revisionCreated){
                if (contractId == excludeContractId) {
                    if (revisionCreated) {
                        fetchRevisions(contractId);
                    }
                }
            });

        }]);
});